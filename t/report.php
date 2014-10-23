<?php
session_start();
	$us_role = $_SESSION['user_role_chat'];
		if($us_role!= 1){
			header("location: /");
			exit();
		}
header('Content-type: text/x-csv');
header ( "Content-Disposition: inline; filename=report.csv");
require_once 'core/class_Auth.php';
require_once 'core/class_News.php';
	$u_freport = new BoardView();
	$u_freport->getCSV();
	unset($u_freport);
	$output = file_get_contents('inf/report.csv'); 
	echo $output;
?>