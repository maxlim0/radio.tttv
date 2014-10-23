/* кодировка файлов utf8 */
$(function(){
	    $("#all_close_conf").click( function() { // при клике по главному чекбоксу
            if($('#all_close_conf').attr('checked')){ // проверяем его значение
                $('.check_chat:enabled').attr('checked', true); // если чекбокс отмечен, отмечаем все чекбоксы
            } else {
                $('.check_chat:enabled').attr('checked', false); // если чекбокс не отмечен, снимаем отметку со всех чекбоксов
            }
       });
	   	    $("#all_reg_conf").click( function() { // при клике по главному чекбоксу
            if($('#all_reg_conf').attr('checked')){ // проверяем его значение
                $('.check_chat_m:enabled').attr('checked', true); // если чекбокс отмечен, отмечаем все чекбоксы
            } else {
                $('.check_chat_m:enabled').attr('checked', false); // если чекбокс не отмечен, снимаем отметку со всех чекбоксов
            }
       });
	   $("#table_us").tablesorter({
        headers: {
			0: { sorter: false },
			1: { sorter: false },
			8: { sorter: false },
            9: { sorter: false },
            10: { sorter: false }
        }
    }); 
	//Update id='reg_users_conf' and id='reg_moder_conf'
});
