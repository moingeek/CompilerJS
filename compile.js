var express = require('express')
var bodyParser = require('body-parser')
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console
var app = express();
compiler.init(options);
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// create application/json parser
var jsonParser = bodyParser.json();
app.route('/')
.get((request,response) => {
  response.render('try.ejs');
}).post(urlencodedParser,(request,response) => {      //POST REQUEST USING URLENCODER
  //if windows
  var envData = { OS : "windows"};
  //else
  var envData = { OS : "linux" };

  var lang = request.body.lang;
  //console.log(lang);

  if(lang=="Python")
  {
    //Python without input
  compiler.compilePython( envData , request.body.code , function(data){
      response.send(data);
  });
  //Python with input
  compiler.compilePythonWithInput( envData , request.body.code , request.body.input ,  function(data){
       response.send(data);
   });
  }
   //Java without input
  if(lang=="Java"){
    //Java without input
   compiler.compileJava( envData , request.body.code , function(data){
   response.send(data);
   });
   //JAVA without input
   compiler.compileJavaWithInput( envData , request.body.code , request.body.input ,  function(data){
        response.send(data);
    });
 }
 if(lang=="C"){
   //C without input
   //if windows
   var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
   //else
   var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
   compiler.compileCPP(envData , request.body.code , function (data) {
       response.send(data);
  });
  //C with input
  var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPPWithInput(envData , request.body.code , request.body.input , function (data) {
        response.send(data);
    });
 }
 if(lang=="C++"){
   //C++ without input
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , request.body.code , function (data) {
        response.send(data);
      });
        //C++ with input
        var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
        compiler.compileCPPWithInput(envData , request.body.code , request.body.input , function (data) {
            response.send(data);
        });
  }
 if(lang=="VB"){
   //VB without input
   var envData = { OS : "windows"};
    compiler.compileVB( envData , request.body.code , function(data){
        response.send(data);
    });
    //VB with input
    var envData = { OS : "windows"};
    compiler.compileVBWithInput( envData , request.body.code , request.body.input ,  function(data){
        response.send(data);
    });
  if(lang=="Chash"){
    //without input C#
    var envData = { OS : "windows"};
    //mono modules for linux is not included till now
    compiler.compileCS( envData , request.body.code , function(data){
        response.send(data);
    });
    //With input C#
    var envData = { OS : "windows"};
    //mono modules for linux is not included till now
    compiler.compileCSWithInput( envData , request.body.code , request.body.input ,  function(data){
        response.send(data);
    });
  }
 }
});
compiler.flush(function(){
    console.log('All temporary files flushed !');

    app.route('/uploadProcess.php')
    .get((request,response) => {
      response.render('upload.ejs');
    }).post(urlencodedParser,(request,response) => {      //POST REQUEST USING URLENCODER
        response.send("Your File has been uploaded sucessfully");
    })
});
app.listen(8008);
