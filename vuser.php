<?php
//header('Content-Type: text/html; charset=utf-8');
	require_once 'core/class_Check.php';
	require_once 'core/class_News.php';
	
	$chkview = new CheckView();

	$new_confernce = $chkview->CheckConference();
	switch($new_confernce){
		 case 1:
 			$closed_c = 1;
			$text_conference = "Закрытый клуб. Введите логин и пароль.";
			$class = 'login_conference_user_cl';
			$login_class = "cforms";
		 break;
		 case 2:
			$closed_c = 2;
			$login_class = "input_login";
			$text_conference = "Бриффинг. Введите логин. </br>Пароль не требуется.";
			$class = 'login_conference_user';
		 break;
		 case 3:
			$closed_c = 3;
			$login_class = "cforms";
			$text_conference = "Открытый клуб. Введите логин и пароль.";
			$class = 'login_conference_user_cl';
		 break;
 		default:
			$closed_c = 4;
			$login_class = "cforms";
			$text_conference = "Нет конференции";
			$class = 'login_conference_user_cl';
		 break;
 }

		echo"  <tr>
					<td class='$class' colspan='2' align='center'>
					$text_conference
					</td>
				</tr>
	
				<tr>
					<td width='120px' align='right'>
					<strong>Введите логин:</strong>
					</td>
					<td  align='left'>
					<input class='cforms' type='text' name='login' id='login'  />
					</td>
				</tr>
				<tr>
					<td align='right'>
					<strong>Введите пароль:</strong>
					</td>
					<td align='left'>
					<input class='$login_class'  type='password' name='pass' id='pass'  />
					</td>
				</tr>
				<tr>
					<td colspan='2' align='center'>
					<br>
					<button id='work'> Войти </button><button id='reg_client_chat'> Регистрация </button>
					<input name='closed_flag_conference' id='closed_flag_conference' type='hidden' value='$closed_c'>
					<br><br>
					</td>
				</tr>";
	unset($chkview);
	

?>	
<script src="js/maincheck.js" type="text/javascript"></script>	