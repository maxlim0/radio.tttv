<?php	
	// createChat, logoutUser, dropChat
	$comand = $_POST["comand"];
	
	$option=$_POST["option"];
	
	//echo 'comand is '.$comand;
	
	$myFile = "log.txt";
	$fh = fopen($myFile, 'a');
	
	fwrite($fh, $comand.'\n');
	
	fclose($fh);
?>