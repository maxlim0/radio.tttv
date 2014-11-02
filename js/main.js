/* кодировка файлов utf8 */
$(function () {
    /*jQuery("#a3").click( function(){
     var su=jQuery("#list3").jqGrid('setRowData',11,{name:"33300"}).trigger("reloadGrid");
     if(su) alert("Succes. Write custom code to update row in server"); else alert("Can not update");
     });*/
    jQuery("#list3").jqGrid({
        url: 'vchat.php?check=18',
        height: 750,
        width: 1075,
        datatype: "json",
        colNames: ['<img src="images/lock.png" />', '<img src="images/user1.gif" />', 'Логин', 'ФИО', 'Телефон', 'Пароль', 'E-mail', 'Дата регистрации', 'IP рег-ии', 'Страна рег-ии', 'Город рег-ии', 'Дата последнего входа', 'Группа', 'Статус'],
        colModel: [
            {name: 'closed', index: 'closed', width: 20},
            {name: 'moderation', index: 'moderation', width: 20},
            {name: 'name', index: 'name', width: 100},
            {name: 'fio', index: 'fio', width: 150},
            {name: 'phone', index: 'phone', width: 100},
            {name: 'upass', index: 'upass', width: 80},
            {name: 'mail', index: 'mail', width: 160},
            {name: 'dat_reg', index: 'dat_reg', width: 65},
            {name: 'ip_reg', index: 'ip_reg', width: 85},
            {name: 'country_reg', index: 'country_reg', width: 20},
            {name: 'city_reg', index: 'city_reg', width: 70},
            {name: 'dat_ses', index: 'dat_ses', width: 65},
            {name: 'group', index: 'group', width: 50},
            {name: 'role', index: 'role', width: 80}
        ],
        rowNum: 100,
        rowList: [30, 50, 100, 200, 300, 400, 500, 600, 800, 1000],
        pager: '#pager3',
        sortname: 'name',
        viewrecords: true,
        sortorder: "desc",
        loadonce: false,
        loadComplete: function () {
            /*	var su = $("#list3").getCol('moderation',false);
             var u_col = su.length;
             var u_mod = 0;
             for(var i = 0;i < su.length; i++){
             if(su[i] == ''){
             u_mod=u_mod+1;
             }
             }*/
            
            //alert(su);
            /*
            $.post('vchat.php', {check: 19}, function (data) {
                document.getElementById("reg_moder_conf").innerHTML = data;
            });
            */
            $('#reg_moder_conf').load('vchat.php?check=19&type_reg=2', function () {});
            $('#reg_users_conf').load('vchat.php?check=19&type_reg=1', function () {});
            /*
            var su = $("#list3").jqGrid('getGridParam', 'records');
            document.getElementById("reg_users_conf").innerHTML = su;
            */
        },
        multiselect: true
    }).jqGrid('navGrid', '#pager3', {edit: false, add: false, del: false, search: false});

//$("#list3").jqGrid('navGrid','#pager3',{edit:false,add:false,del:false});
    /*
     $("#table_us").tablesorter({
     headers: {
     0: { sorter: false },
     1: { sorter: false },
     8: { sorter: false },
     9: { sorter: false },
     10: { sorter: false }
     }
     }); 
     */
    $("#client_fio").focus(function () {
        if (this.value == this.defaultValue) {
            this.value = '';
            $(this).removeClass("cforms_reg_val").addClass("cforms_reg");
        }
    });

    $("#all_close_conf").click(function () { // при клике по главному чекбоксу
        if ($('#all_close_conf').attr('checked')) { // проверяем его значение
            $('.check_chat:enabled').attr('checked', true); // если чекбокс отмечен, отмечаем все чекбоксы
        } else {
            $('.check_chat:enabled').attr('checked', false); // если чекбокс не отмечен, снимаем отметку со всех чекбоксов
        }
    });
    $("#all_reg_conf").click(function () { // при клике по главному чекбоксу
        if ($('#all_reg_conf').attr('checked')) { // проверяем его значение
            $('.check_chat_m:enabled').attr('checked', true); // если чекбокс отмечен, отмечаем все чекбоксы
        } else {
            $('.check_chat_m:enabled').attr('checked', false); // если чекбокс не отмечен, снимаем отметку со всех чекбоксов
        }
    });

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
        arr = jQuery("#list3").jqGrid('getGridParam', 'selarrrow');
        alert(arr);
        //('#table_us').load('vchat.php',data);
        url = "vchat.php";
        var data = {check: "1", id: arr, close_chat: 2}
        $.post(url, data, function () {
        });
        $("#list3").setGridParam({url: "vchat.php?check=18", page: 1}).trigger('reloadGrid');
        //$('#table_us').load('vchat.php',data);

        return false;
    });
    $('#add_moderation_conference').click(function () {
        var arr = [];
        $(".check_chat_m:checked").each(function () {
            arr.push(this.value);
        });
        if (arr.length > 0) {
            var data = {check: "17", id: arr, moder_chat: 1}
            $('#table_us').load('vchat.php', data);
        } else {
            var data = {check: "17", id: arr, moder_chat: 2}
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
    $("#dialog_add_group").dialog({
        autoOpen: false,
        show: "blind",
        width: 450,
        title: "Добавить группу",
        modal: true,
        //hide: "explode"
    });
    $("#dialog_del_group").dialog({
        autoOpen: false,
        show: "blind",
        width: 450,
        title: "Удалить группу",
        modal: true,
        //hide: "explode"
    });

    $("#dialog_edit_group").dialog({
        autoOpen: false,
        show: "blind",
        width: 450,
        title: "Редактировать группу",
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
    $("#dialog_online").dialog({
        autoOpen: false,
        show: "blind",
        width: 360,
        title: "Количество пользователей on-Line",
        modal: true,
        //hide: "explode"
    });
    $("#canc_online")
            .button()
            .click(function () {
                $("#dialog_online").dialog("close");
                return false;
            });

    $("#canc_add_group")
            .button()
            .click(function () {
                $("#dialog_add_group").dialog("close");
                return false;
            });

    $("#canc_del_group")
            .button()
            .click(function () {
                $("#dialog_del_group").dialog("close");
                return false;
            });

    $("#canc_edit_group")
            .button()
            .click(function () {
                $("#dialog_edit_group").dialog("close");
                return false;
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

    $("#add_users_group").dialog({
        autoOpen: false,
        show: "blind",
        width: 500,
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

    $("#canc_us_group")
            .button()
            .click(function () {
                $("#add_users_group").dialog("close");
                return false;
            });

    $("#opener").click(function () {
        $("#dialog").dialog("open");
        $('.ui-dialog-title').css('color', '#000');
        $('#view_auth_table').load('vuser.php', function () {
        });
        return false;
    });
    $("#online_client_chat").click(function () {
        $("#dialog_online").dialog("open");
        var data = {check: "16"};
        $('#info_online').load('vchat.php', data);
        return false;
    });

    $("#sel_group_edit").change(function () {
        var sel_group_edit = $('#sel_group_edit :selected').text();
        if ($("#sel_group_edit :first").attr("selected") == 'selected')
            sel_group_edit = '';
        $('#group_edit_name').val(sel_group_edit);
    });
    
    $("#view_activ_group").click(function () {
        $("#list3").setGridParam({url: "vchat.php?check=18", page: 1}).trigger('reloadGrid');
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
                if ($('#pass').val() == '' && closed_c == 3 && $('#login').val() == '') {
                    alert('Введите данные!');
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

                $.post(url, {login: login, pass: pass, closed_c: closed_c},
                function (data) {
                    //alert(data);
                    if (data == 1) {
                        $("#dialog").dialog("close");
                        window.location.reload();
                    } else {
                        if (data == -2 || data == -100 || data == -3) {
                            $("#dialog").dialog("close");
                            $("#dialog_err").dialog("open");
                        }
                        if (data == -1) {
                            $("#dialog").dialog({title: " Авторизация не пройдена! ", });
                            $('.ui-dialog-title').css('color', '#F90707');
                        }
                        alert('Неверный логин или пароль!');
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

                name_add = $('#name_add').val();
                pass_add = $('#pass_add').val();
                mail_add = $('#mail_add').val();
                fio_add = $('#fio_add').val();
                phone_add = $('#phone_add').val();
                role_add = $('#sel_role_add').val();
                group_add = $('#sel_addgr_user').val();

                if (!/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ0-9\.]+$/.test(name_add)) {
                    alert("Имя пользователя не может содержать специальные символы: ! @ # $ % ^ & *");
                    return false;
                }
                if (name_add.length < 3) {
                    alert("Имя пользователя должно быть болше 2 символов!");
                    return false;
                }
                var re = /^[0-9]*$/;
                if (re.test(name_add)) {
                    alert("Имя пользователя не можеть состоять только из цифр!");
                    return false;
                }
                //if(!/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,10}$/i.test(mail_add)){
                if (!/\S+@\S+\.\S+/.test(mail_add)) {
                    alert("Введите корректный e-mail");
                    return false;
                }
                $("#list3").setGridParam({url: "vchat.php?check=3&name=" + name_add + "&fio=" + fio_add + "&phone=" + phone_add + "&pass=" + pass_add + "&mail=" + mail_add + "&group=" + group_add + "&role=" + role_add + "", page: 1}).trigger('reloadGrid');
                $("#dialog_add_users").dialog("close");
                //alert('Данные изменены проверьте информацию.');
                return false;
            });

    $("#work_edit")
            .button()
            .click(function () {
                if ($('#name_edit').val() == '') {
                    alert('Введите имя!');
                    return false;
                }
                name_edit = $('#name_edit').val();
                pass_edit = $('#pass_edit').val();
                mail_edit = $('#mail_edit').val();
                fio_edit = $('#fio_edit').val();
                phone_edit = $('#phone_edit').val();
                id_edit = $('#id_edit').val();
                role_edit = $('#sel_role_edit').val();
                group_edit = $('#user_sel_group_edit').val();
                coltab_edit = $('#edit_coltab').text();
                $("#list3").setGridParam({url: "vchat.php?check=5&name=" + name_edit + "&fio=" + fio_edit + "&phone=" + phone_edit + "&newpass=" + pass_edit + "&mail=" + mail_edit + "&group=" + group_edit + "&role=" + role_edit + "&id=" + id_edit + "", page: 1}).trigger('reloadGrid');
                $("#dialog_edit_user").dialog("close");
                //alert('Данные изменены проверьте информацию.');
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

    $("#work_us_group")
            .button()
            .click(function () {
                var arr_id = jQuery("#list3").jqGrid('getGridParam', 'selarrrow');
                var group_id = $('#sel_group_users :selected').val();
                url = "vchat.php?check=20&group=" + group_id + "&id=" + arr_id;
                $.post(url, function (data) {
                    if (data == false) {
                        alert('Ошибка!');
                    } else {
                        alert('Пользователи успешно добавлены в группу!');
                    }
                });
                $("#list3").setGridParam({url: "vchat.php?check=18", page: 1}).trigger('reloadGrid');
                $("#add_users_group").dialog("close");
                return false;
            });


    $("#work_add_group")
            .button()
            .click(function () {
                var group_name = $('#group_add').val();
                url = "vchat.php?check=201&group_name=" + group_name;
                $.post(url, function (data) {
                    if (data == 0)
                        alert('Error!');
                    if (data == 1)
                        alert('Группа успешно добавлена!');
                    if (data == 2)
                        alert('Группа уже существует!');
                });
                $("#dialog_add_group").dialog("close");
                return false;
            });
    $("#work_del_group")
            .button()
            .click(function () {
                var group_id = $('#sel_group_del :selected').val();

                url = "vchat.php?check=202&group=" + group_id;
                $.post(url, function (data) {
                    if (data == 0)
                        alert('Error!');
                    if (data == 1)
                        alert('Группа успешно добавлена!');
                    if (data == 2)
                        alert('Error! Группа активна!');
                });
                $("#list3").setGridParam({url: "vchat.php?check=18", page: 1}).trigger('reloadGrid');
                $("#dialog_del_group").dialog("close");
                return false;
            });

    $("#work_edit_group")
            .button()
            .click(function () {
                var group_id        = $('#sel_group_edit :selected').val();
                var sel_group_name  = $('#sel_group_edit :selected').html()
                var group_name      = $('#group_edit_name').val();
                var name_activ_gr   = $("#view_activ_group").html();
                if ($("#activ_group").prop("checked") == true) {
                    var action_group = '1';
                    var activ_group_id = group_id;
                } else {
                    var action_group = '0';
                    var activ_group_id = '0';
                }
                /*
                if(sel_group_name ==  name_activ_gr){
                    $("#view_activ_group").text(group_name);   
                }
                */
                url = "vchat.php?check=200&group=" + group_id + "&group_name=" + group_name + "&action_group=" + action_group;
                $.post(url, function (data) {
                    var obj = jQuery.parseJSON(data);
                        switch(obj.result){
                            case 0:
                             alert('Ошибка редактирования группы!');
                            break
                            case 1:
                             $("#view_activ_group").text(group_name);   
                             alert('Изменения выполнены. Группа активна.');
                            break
                            case 2:
                             alert('Изменения выполнены.');
                            break
                            case 3:
                             alert('Группа не может быть активной. Конференция активна!');
                            break
                        }
                });
                
                $("#list3").setGridParam({url: "vchat.php?check=18&group="+activ_group_id+"", page: 1}).trigger('reloadGrid');
                $("#dialog_edit_group").dialog("close");
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
function logoutHandler() {
    url = 'vchat.php';
    user = $('#username').val();
    $.post(url, {check: 15, user: user},
    function (data) {
        //alert(data);
    });
    $("#opener").addClass("but_auth_log");
    $('#opener').show();
}
function UserManagerView() {
    window.open('inf/user_manager.php', '', 'Toolbar=0,Location=0,Directories=0,Status=0,Menubar=0,Scrollbars=1,Resizable=1,Width=950,Height=800,screenX=200,screenY=400');
}
function f_UsersOptions(opt) {

    var arr_id = jQuery("#list3").jqGrid('getGridParam', 'selarrrow');

    if (arr_id == '') {
        if (opt == '104' || opt == '107' || opt > 199) {
            switch (opt) {
                case '104':
                    $("#dialog_add_users").dialog("open");
                    $("#sel_addgr_user").load('vchat.php?check=203&flg_edit=1', function () {});
                    break
                case '107':
                    $("#list3").setGridParam({url: "vchat.php?check=18&group_flag=1", page: 1}).trigger('reloadGrid');
                    break
                case '200': //Edit group users
                    $("#activ_group").prop("checked", false);
                    $('#group_edit_name').val('');
                    $("#sel_group_edit").load('vchat.php?check=203', function () {});
                    $("#dialog_edit_group").dialog("open");
                    break
                case '201': //Add group users
                    $("#dialog_add_group").dialog("open");
                    break
                case '202': //Delete group users
                    $("#sel_group_del").load('vchat.php?check=203', function () {});
                    $("#dialog_del_group").dialog("open");
                    break
            }
        } else {
            $("#regmoder_users :first").attr("selected", "selected");
            alert("Для выполнения операции необходимо отметить пользователя!");
        }
    } else {
        switch (opt) {
            case '100': //Установить закрытую конференцию
                $("#list3").setGridParam({url: "vchat.php?check=1&close_chat=1&id=" + arr_id + "", page: 1}).trigger('reloadGrid');
                break
            case '101': //Отменить закрытую конференцию
                $("#list3").setGridParam({url: "vchat.php?check=1&close_chat=2&id=" + arr_id + "", page: 1}).trigger('reloadGrid');
                break
            case '102': //Подтверждение регистрации
                $("#list3").setGridParam({url: "vchat.php?check=17&moder_chat=1&id=" + arr_id + "", page: 1}).trigger('reloadGrid');
                break
            case '103': //Отменить подтверждение регистрации
                $("#list3").setGridParam({url: "vchat.php?check=17&moder_chat=2&id=" + arr_id + "", page: 1}).trigger('reloadGrid');
                break
            case '105': //Удалить пользователя
                if (!confirm(' Внимание пользователь будет удален!\n\n Удалить пользователя?\n\n')) {
                } else {
                    $("#list3").setGridParam({url: "vchat.php?check=12&id=" + arr_id + "", page: 1}).trigger('reloadGrid');
                }
                break
            case '106': //Change users for select group
                $("#sel_group_users").load('vchat.php?check=203', function () {});
                $("#add_users_group").dialog("open");
                break
            default:
                alert('Error options users!');
        }
    }
    $("#regmoder_users :first").attr("selected", "selected");
    $("#reg_group_users :first").attr("selected", "selected");
}	