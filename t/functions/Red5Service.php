<?php
	class Red5Service {
		function  Red5Service() 
		{ 
			$this->methodTable = array( "login" => array( "description" => "login user -> returns true/false", "access" => "remote", "arguments" => array ("username","password") ), "logout" => array( "description" => "logout user -> returns nothing", "access" => "remote", "arguments" => array ("username") ) ); 
		}
		
		function login($username,$password) 
		{ 
			return true; 
		} 
		function logout($username) 
		{
			return; 
		}
	}
?>