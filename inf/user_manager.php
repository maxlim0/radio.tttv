<?php
	require_once '../core/class_Auth.php';
	require_once '../core/class_News.php';
		$us_role = $_SESSION['user_role_chat'];
		if($us_role!= 1&&$us_role!= 4){
			header("location: /");
			exit();
	}
	$u_user = new BoardView();
	$u_user->ViewUsersOnline();
	$tbody_t = $u_user->ViewUsersOnline();
	$user_online_conf = $u_user ->ConfUsersChat();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Пользователи в конференции</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" href="../css/style.css" type="text/css" media="screen, projection" />
</head>
<body>
<?php 
		echo"
			<div id='content_us'>
			<div class='right_reg'>$user_online_conf</div>
				<table class='tablesorter'  id='table_us' width='900' border='0' cellpadding='5' cellspacing='2'>
					<thead>
						<tr class='tabluser_view_top'>
							<th align='center' width='10'>№ п/п</th>
							<th align='center' width='150'>Логин</th>
							<th align='center' width='150'>ФИО</th>
							<th align='center' width='150'>Дата рег-ии</th>
							<th align='center' width='100'>Дата посл.входа</th>
							<th align='center' width='80'>Текущий IP</th>
							<th align='center' width='80'>Страна</th>
							<th align='center' width='100'>Город</th>
						</tr>
					</thead>
						<tbody>
						$tbody_t
						</tbody>
				</table>
			</div>";
		  unset($u_user);
?>
<div align="center">
<input name="button" type="button" onClick="self.close()" value="Закрыть"  align="center">
</div>
</body>
</html>
