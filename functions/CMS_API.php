<?php	
//session_start();
require_once '../core/DB.php';
require_once '../core/class_News.php';
	$data = $_POST["data"];
	$voice = new BoardView();
	$obj = json_decode($data);
	$report_log = date('d-m-Y H:i:s')." Input Flash Post:".$data." \r\n";
	
	if($obj->{'comand'} == "createChat"){
		$cl = $obj->{'closed'};
		//if($cl==''||$cl == 0)$cl =2;
		switch ($cl) {//closed это закрытая конференция (0 или отсутствие параметра - открытая)
			case 0:
				$cl = 2; //открытая конференция
				break;
			case 1:
				$cl = 3; //открытая конференция + модерация
				break;
			case 2:
				$cl = 1; //закрытая конференция
				break;
			default:
			    $cl = 2; //открытая конференция
		}
		$tt=$voice->ClosedConference($cl);
		$report_log .=  "Obrabotka closed=".$cl." For Web=".$tt." \r\n"; 
	}
	if($obj->{'comand'} == "logoutUser"){//выход пользователя из чата (и по таймауту тоже)
		//$kind = $obj->{'kind'};
		//$kind = 0;
		if($obj->{'kind'} == "1"){
			$k = "2";
			}else{
			$k = "1";
		}
		$user_name = $obj->{'name'};
		//$test ='&#1080;&#1074;&#1072;&#1085;';
		$u_name =substr($user_name,2);
		$arr_name = explode("&#", $u_name);
		foreach ($arr_name as $v) {
				$code_name .= '&#'.$v.';';
		}

		$user_name = html_entity_decode($code_name, ENT_NOQUOTES,'UTF-8');
		$user_name = str_replace("_Admin", "", $user_name);
		$voice->UserClosed($user_name,$k);
		$report_log .=  "Obrabotka logoutUser=".$user_name." kind=".$k." Code_name=".$code_name." For Web UserClosed \r\n"; 
	}

	if($obj->{'comand'} == "dropChat"||$obj->{'comand'} == "createChat"){//закрытие конференции (и по таймауту администратора тоже)
			$checkConf = $obj->{'comand'};
			$voice->CheckAllConference($checkConf);
		$report_log .=  "Obrabotka DROP/CREATE CHAT=".$checkConf." For Web CheckAllConference \r\n";			
}
	
unset($voice);	
	
	$myFile = "log.txt";
	$fh = fopen($myFile, 'a');
	fwrite($fh, $report_log);
	fclose($fh);
/* createChat, logoutUser, dropChat
	$data = $_POST["data"];
	
	$myFile = "log.txt";
	$fh = fopen($myFile, 'a');
	fwrite($fh, $data.'<br/>');
	fclose($fh);
	 создание чата
 {"closed":"1","comand":"createChat"}  где closed это закрытая конференция (0 или отсутствие параметра - открытая)
 
 выход пользователя из чата (и по таймауту тоже)
 {"name":"u-s-e-r-n-a-m-e","comand":"logoutUser"}
  
 закрытие конференции (и по таймауту администратора тоже)
 {"comand":"dropChat"}

*/
?>
