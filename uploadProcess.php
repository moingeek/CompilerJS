<?php
	echo "<p>
	Upload File is running
	</p>";
	define('path','resources/');
	if(isset($_POST['submit']))
	{
		$fileName = $_FILES['uploadExp']['name'];
		$target = path.$fileName;
		move_uploaded_file($_FILES['uploadExp']['tmp_name'],$target);
	}
?>
