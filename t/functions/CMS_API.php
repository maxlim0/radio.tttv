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
		switch ($cl) {//closed ��� �������� ����������� (0 ��� ���������� ��������� - ��������)
			case 0:
				$cl = 2; //�������� �����������
				break;
			case 1:
				$cl = 3; //�������� ����������� + ���������
				break;
			case 2:
				$cl = 1; //�������� �����������
				break;
			default:
			    $cl = 2; //�������� �����������
		}
		$tt=$voice->ClosedConference($cl);
		$report_log .=  "Obrabotka closed=".$cl." For Web=".$tt." \r\n"; 
	}
	if($obj->{'comand'} == "logoutUser"){//����� ������������ �� ���� (� �� �������� ����)
		//$kind = $obj->{'kind'};
		//$kind = 0;
		if($obj->{'kind'} == "1"){
			$k = "kind";
			}else{
			$k = "22";
		}
		$user_name = $obj->{'name'};
		$voice->UserClosed($user_name,"111");
		$report_log .=  "Obrabotka logoutUser=".$user_name." kind=".$k ." For Web UserClosed \r\n"; 
	}

	if($obj->{'comand'} == "dropChat"||$obj->{'comand'} == "createChat"){//�������� ����������� (� �� �������� �������������� ����)
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
	 �������� ����
 {"closed":"1","comand":"createChat"}  ��� closed ��� �������� ����������� (0 ��� ���������� ��������� - ��������)
 
 ����� ������������ �� ���� (� �� �������� ����)
 {"name":"u-s-e-r-n-a-m-e","comand":"logoutUser"}
  
 �������� ����������� (� �� �������� �������������� ����)
 {"comand":"dropChat"}

*/

	
?>
