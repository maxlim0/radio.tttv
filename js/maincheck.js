/* кодировка файлов utf8 */
        $(function () {
            $("#email_tel_out").dialog({
                autoOpen: false,
                show: "blind",
                width: 500,
                title: 'Отправить сообщение администратору'
                        //position: [100,25] 
                        //hide: "explode"
            });

            $("#add_news_chat_us").click(function () {
                $("#dialog_add_news").dialog("open");
                $('#inform_add_news').load('vchat.php?check=13', function () {
                });
                return false;
            });
            $("#mail_work")
                    .button()
                    .click(function () {
                        if (document.getElementById("name_out").value == '' || document.getElementById("mail_out").value == '' || document.getElementById("quest_out").value == '') {
                            alert('Необходимо заполнить требуемые поля!');
                            return false;
                        }
                        url = 'vchat.php';
                        var name_out = document.getElementById("name_out").value;
                        var mail_out = document.getElementById("mail_out").value;
                        var quest_out = document.getElementById("quest_out").value;
                        $("#email_tel_out").dialog("close");

                        $.post(url, {name_out: name_out, mail_out: mail_out, quest_out: quest_out, check: 14},
                        function (data) {
                            //alert(data);
                        });
                        alert('Сообщение успешно отправлено!');
                        return false;
                    });
            $("#mail_canc")
                    .button()
                    .click(function () {
                        $("#email_tel_out").dialog("close");
                        return false;
                    });
            $("#mail_out_us").click(function () {
                $("#email_tel_out").dialog("open");
                return false;
            });

            $('#add_closed_conference').click(function () {
                var arr = [];
                $(".check_chat:checked").each(function () {
                    arr.push(this.value);
                });
                if (arr.length > 0) {
                    var data = {check: "1", id: arr, close_chat: 1}
                    $('#table_us').load('vchat.php', data);
                } else {
                    var data = {check: "1", id: arr, close_chat: 2}
                    $('#table_us').load('vchat.php', data);
                }
                return false;
            });

            // Dialog Link
            $("#dialog").dialog({
                autoOpen: false,
                show: "blind",
                width: 360,
                title: "Авторизация",
                modal: true,
                //hide: "explode"
            });
            $("#dialog_edit_news").dialog({
                autoOpen: false,
                show: "blind",
                width: 850,
                position: [, 100],
                title: "Редактирование новости",
                modal: true,
                //hide: "explode"
            });
            $("#dialog_edit_user").dialog({
                autoOpen: false,
                show: "blind",
                width: 500,
                title: "Редактирование данных пользователя",
                modal: true,
                //hide: "explode"
            });
            $("#dialog_del_user").dialog({
                autoOpen: false,
                show: "blind",
                width: 250,
                title: "Удалить пользователя?",
                modal: true,
                //hide: "explode"
            });
            $("#canc_del")
                    .button()
                    .click(function () {
                        $("#dialog_del_user").dialog("close");
                        return false;
                    });
            $("#canc_news_add")
                    .button()
                    .click(function () {
                        $("#dialog_add_news").dialog("close");
                        return false;
                    });
            $("#canc_news")
                    .button()
                    .click(function () {
                        $("#dialog_edit_news").dialog("close");
                        return false;
                    });
            $("#dialog_err").dialog({
                autoOpen: false,
                show: "blind",
                width: 360,
                modal: true,
                //hide: "explode"
            });
            $("#dialog_reg").dialog({
                autoOpen: false,
                show: "blind",
                width: 460,
                modal: true,
                //hide: "explode"
            });

            $("#dialog_add_users").dialog({
                autoOpen: false,
                show: "blind",
                width: 600,
                modal: true,
                //hide: "explode"
            });
            $("#dialog_add_news").dialog({
                autoOpen: false,
                show: "blind",
                width: 850,
                modal: true,
                //hide: "explode"
            });
            $("#reg_client_chat").button().click(function () {
                $("#dialog").dialog("close");
                $("#dialog_reg").dialog("open");
                return false;
            });
            $("#add_client_chat_us").click(function () {
                $("#dialog_add_users").dialog("open");
                return false;
            });


            $("#add_users_canc")
                    .button()
                    .click(function () {
                        $("#dialog_add_users").dialog("close");
                        return false;
                    });
            $("#view_client_chat").click(function () {
                $("#dialog_add_users").dialog("open");
                $('#inform_add_users').load('vuser.php', function () {
                });
                return false;
            });

            $("#canc")
                    .button()
                    .click(function () {
                        $("#dialog_err").dialog("close");
                        return false;
                    });

            $("#opener").click(function () {
                $("#dialog").dialog("open");
                $('.ui-dialog-title').css('color', '#000');
                $('#view_auth_table').load('vuser.php', function () {
                });
                return false;
            });


            $("#work")
                    .button()
                    .click(function () {
                        if ($("#closed_flag_conference").length) {
                            closed_c = $('#closed_flag_conference').val();
                        } else {
                            closed_c = '';
                        }
                        if ($('#login').val() == '') {
                            alert('Введите имя!');
                            return false;
                        }
                        if ($('#pass').val() == '' && closed_c == 1) {
                            alert('Введите пароль!');
                            return false;
                        }
                        if ($('#pass').val() == '' && closed_c == 3) {
                            alert('Введите пароль!');
                            return false;
                        }
                        if ($('#pass').val() == '' && closed_c == 4) {
                            alert('Введите пароль!');
                            return false;
                        }

                        url = "core/class_Auth.php";
                        if ($("#login").length) {
                            login = $('#login').val();
                        } else {
                            login = '';
                        }
                        if ($("#pass").length) {
                            pass = $('#pass').val();
                        } else {
                            pass = '';
                        }

                        if (!/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ0-9\.]+$/.test(login)) {
                            alert("Имя пользователя не может содержать специальные символы: ! @ # $ % ^ & *");
                            return false;
                        }

                        $.post(url, {login: login, pass: pass, closed_c: closed_c},
                        function (data) {
                            //alert(data);
                            if (data == -95 || data == -103 || data == -200) {
                                alert('Данное имя уже используется в конференции.');
                            }
                            if (data == -3) {
                                alert('На данный момент Ваша группа не активна.');
                            }
                            if (data == -98) {
                                alert('На данный момент вещание не открыто попробуйте войти позже.');
                            }
                            if (data == -100) {
                                alert('Неверный логин или пароль.');
                            }
                            if (data == 1) {
                                $("#dialog").dialog("close");
                                window.location.reload();
                            } else {
                                if (data == -97 || data == -1 || data == -2 || data == -96 || data == -102 || data == -99) {
                                    $("#dialog").dialog("close");
                                    $("#dialog_err").dialog("open");
                                }

                                if (data == -1) {
                                    $("#dialog").dialog({title: " Авторизация не пройдена! ", });
                                    $('.ui-dialog-title').css('color', '#F90707');
                                }

                            }
                        });
                        return false;
                    });
            $("#work_add")
                    .button()
                    .click(function () {
                        if ($('#name_add').val() == '') {
                            alert('Введите имя!');
                            return false;
                        }
                        if ($('#pass_add').val() == '') {
                            alert('Введите пароль!');
                            return false;
                        }
                        if (!/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ0-9\.]+$/.test(name_add)) {
                            alert("Введите корректное имя пользователя");
                            return false;
                        }
                        name_add = $('#name_add').val();
                        pass_add = $('#pass_add').val();
                        mail_add = $('#mail_add').val();
                        role_add = $('#sel_role_add').val();

                        var data = {check: "3", name: name_add, pass: pass_add, mail: mail_add, role: role_add}
                        $('#table_us').load('vchat.php', data);
                        $("#dialog_add_users").dialog("close");
                        alert('Данные изменены проверьте информацию.');
                        return false;
                    });


            $("#work_del")
                    .button()
                    .click(function () {
                        id_del = $('#id_del').val();
                        $('#table_us').load('vchat.php?check=4&id=' + id_del, function () {
                        });
                        $("#dialog_del_user").dialog("close");
                        return false;
                    });
            $("#boardnews_add")
                    .button()
                    .click(function () {
                        text_news = CKEDITOR.instances.news_add_edit.getData();
                        //text_news = $('#news_add_edit').val();
                        var data = {check: "9", text: text_news};
                        $('#table_news').load('vchat.php', data);
                        $("#dialog_add_news").dialog("close");
                        return false;
                    });
            $("#users_news_edit")
                    .button()
                    .click(function () {
                        news_text_edit = CKEDITOR.instances.news_text_edit.getData();
                        //alert( news_text_edit );
                        news_id_edit = $('#news_id_edit').val();
                        var data = {check: "8", text: news_text_edit, id: news_id_edit}
                        $('#table_news').load('vchat.php', data);
                        $("#dialog_edit_news").dialog("close");
                        return false;
                    });

            $("#clwork")
                    .button()
                    .click(function () {
                        if ($('#login').val() == '') {
                            alert('Заполните имя!');
                            return false;
                        }
                        url = "core/class_Auth.php";
                        if ($("#login").length) {
                            login = $('#login').val();
                        } else {
                            login = '';
                        }
                        pass = $('#pass').val();
                        $.post(url, {login: login, pass: pass, closed_c: 0},
                        function (data) {
                            alert(data);
                            if (data == 1) {
                                $("#dialog").dialog("close");
                                window.location.reload();
                            } else {
                                if (data == -2) {
                                    $("#dialog").dialog("close");
                                    $("#dialog_err").dialog("open");
                                }
                                if (data == -1) {
                                    $("#dialog").dialog({title: " Авторизация не пройдена! ", });
                                    $('.ui-dialog-title').css('color', '#F90707');
                                }

                            }
                        });
                        return false;
                    });


            $("#work_reg")
                    .button()
                    .click(function () {
                        url = "core/class_Auth.php";
                        client_name = $('#client_name').val();
                        client_fio = $('#client_fio').val();
                        client_pass = $('#client_pass').val();
                        client_mail = $('#client_mail').val();
                        client_phone = $('#client_phone').val();
                        if (!/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ0-9\.]+$/.test(client_name)) {
                            alert("Имя пользователя не может содержать специальные символы: ! @ # $ % ^ & *");
                            return false;
                        }
                        if (client_name.length < 3) {
                            alert("Имя пользователя должно быть болше 2 символов!");
                            return false;
                        }
                        var re = /^[0-9]*$/;
                        if (re.test(client_name)) {
                            alert("Имя пользователя не можеть состоять только из цифр!");
                            return false;
                        }

                        if (!/\S+@\S+\.\S+/.test(client_mail)) {
                            alert("Введите корректный e-mail");
                            return false;
                        }

                        if (client_name == '' || client_pass == '' || client_mail == '' || client_fio == '' || client_fio == 'Введите Ваше ФИО') {
                            alert('Заполните правильно необходимые поля!');
                            return false;
                        }
                        $.post(url, {cl_name: client_name, cl_phone: client_phone, cl_fio: client_fio, cl_pass: client_pass, cl_mail: client_mail},
                        function (data) {
                            if (data == 1) {
                                $("#dialog_reg").dialog("close");
                                //window.location.reload();
                            } else {
                                if (data == -2) {
                                    $("#dialog_reg").dialog({title: " Данное имя уже зарегистрировано! ", });
                                } else {
                                    $("#dialog_reg").dialog({title: " Ошибка регистрации! ", });
                                }
                                $('.ui-dialog-title').css('color', '#F90707');
                            }
                        });
                        return false;
                    });

            $("#out_client_chat").click(function () {
                url = "core/class_Auth.php";
                $.post(url, {out: 1},
                function () {
                    window.location.reload();
                });
                return false;
            });
        });

function del_news(key_news) {
    url = "core/class_Auth.php";
    $.post(url, {key: key_news, del: 1},
    function (data) {
        if (data == 1) {
            window.location.reload();
        } else {
            alert('Ошибка удаления новости!');
        }
    });
    return false;
}
function del_user(id) {
    if (!confirm(' Внимание пользователь будет удален!\n\n Удалить пользователя?\n\n')) {
        return false;
    } else {
        var data = {check: "12", id: id};
        $('#table_us').load('vchat.php', data);
        return false;
    }
}

function del_news(id) {
    if (!confirm(' Внимание объявление будет удалено!\n\n Удалить объявление?\n\n')) {
        return false;
    } else {
        var data = {check: "11", id: id};
        $('#table_news').load('vchat.php', data);
        return false;
    }
}

function edit_user(id) {
    $("#dialog_edit_user").dialog("open");
    $('#table_user_view').load('vchat.php?check=2&id=' + id, function () {
    });
    return false;
}
function edit_news(id) {
    $("#dialog_edit_news").dialog("open");
    $('#inform_view_news').load('vchat.php?check=7&id=' + id, function () {
    });
    return false;
}

/*
 $( "#add_news_chat_us" ).click(function() {
 $( "#dialog_add_news" ).dialog( "open" );
 return false;
 });
 $('.check_chat').click(function() {
 if (this.checked){
 val_user = $(this).val();
 alert (val_user+'1');
 var data = { check: "1", id: val_user, close_chat: 1 }
 $('#table_us').load('vchat.php',data);
 }else{
 val_user = $(this).val();
 alert (val_user+'0');
 var data = { check: "1", id: val_user, close_chat: 2 }	
 $('#table_us').load('vchat.php',data);			
 }
 
 });
 */
