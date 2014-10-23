<?php
	$us_role = $_SESSION['user_role_chat'];
		if($us_role!= 1){
			header("location: /");
			exit();
		}
?>	
