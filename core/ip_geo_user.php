<?php
		$ip_user = $_SERVER['REMOTE_ADDR'];		//$ip_user = '194.50.9.161';
		$SxGeo = new SxGeo('ipgeo/SxGeoCity.dat', SXGEO_BATCH | SXGEO_MEMORY); // Самый быстрый режим 
		$fullinfo_ip = $SxGeo->getCityFull($ip_user); // возвращает полную информацию о городе и регионе
		 $_SESSION['user_geo_ip'] 	= $ip_user;
		 $_SESSION['user_geo_city']		= $fullinfo_ip['city'];
		 $_SESSION['user_geo_country']	= $fullinfo_ip['country'];
		 $_SESSION['user_geo_region'] 	= $fullinfo_ip['region_name'];
		 unset($SxGeo);
		 $news = new BoardView();
if($_SESSION['user_chat']){
		$usercookie = $_SESSION['user_chat'];
		setcookie("UserChatCookie",$usercookie,time()+3600);/* период действия 1 час */	
		if($_SESSION['user_role_chat']!=''){
			$user_role = $_SESSION['user_role_chat'];
			$auth_ses = new userAuth();
			//echo "ses = $_SESSION[user_chat],$user_role  ses =$_SESSION[new_ses]<br>";	
			$check_ses = $auth_ses->CheckSession($_SESSION['user_chat'],$user_role);
			if($check_ses!=1){
				$auth_ses->DelSession($_SESSION['user_chat']);
				unset($_SESSION['user_chat']);
				unset($_SESSION['user_role_chat']);
				$user_role = 0;				
			}
			}else{
			$user_role = 0;
		}
		$auth_ses->ip_users_geo($fullinfo_ip,$ip_user,trim($_SESSION['user_chat']));//geo ip,city,country current user 
		unset($_SESSION['new_ses']);
		unset($auth_ses);
		switch ($user_role) {
			case 1:
				$view_user = $news->adminViewChat($user_role);
				if($view_user == '11'){
					$chat_flash_swf ='MayakovskiyChat.swf';
					$chat_flash_id ='MayakovskiyChat';
					$chat_flash_name ='MayakovskiyChat';
					}else{
					$chat_flash_id ='MayakovskiyChatAdmin';
					$chat_flash_name ='MayakovskiyChatAdmin';
					$chat_flash_swf ='MayakovskiyChatAdmin.swf';
				}
				$chat_flash_vars='name: "'.$_SESSION['user_chat'].'"';
				break;
			case 2:
				$view_user = 2;
				$chat_flash_vars='name: "'.$_SESSION['user_chat'].'"';
				$chat_flash_swf ='MayakovskiyChat.swf';
				$chat_flash_id ='MayakovskiyChat';
				$chat_flash_name ='MayakovskiyChat';
				break;
			case 3:
				$view_user = 3;
				$chat_flash_vars='name: "'.$_SESSION['user_chat'].'"';
				$chat_flash_swf ='MayakovskiyChat.swf';
				$chat_flash_id ='MayakovskiyChat';
				$chat_flash_name ='MayakovskiyChat';
				break;
			case 4:
				$view_user = $news->adminViewChat($user_role);
				if($view_user == '41'){
					$chat_flash_swf ='MayakovskiyChat.swf';
					$chat_flash_id ='MayakovskiyChat';
					$chat_flash_name ='MayakovskiyChat';
					}else{
					$chat_flash_id ='MayakovskiyChatAdmin';
					$chat_flash_name ='MayakovskiyChatAdmin';
					$chat_flash_swf ='MayakovskiyChatAdmin.swf';
				}
				$chat_flash_vars='name: "'.$_SESSION['user_chat'].'"';
				break;
			default:
				$view_user = 3;
				$chat_flash_vars='name: "'.$_SESSION['user_chat'].'"';
				$chat_flash_swf ='MayakovskiyChat.swf';
				$chat_flash_id ='MayakovskiyChat';
				$chat_flash_name ='MayakovskiyChat';
		}
		//$chat_flash_ip ='$_SESSION['user_geo_ip']';
	}else{
				$view_user = 3;
				$chat_flash_vars='';
				$chat_flash_swf ='MayakovskiyChat.swf';
				$chat_flash_id ='MayakovskiyChat';
				$chat_flash_name ='MayakovskiyChat';
}

?>