$(function() {
    localStorage.setItem("isupdate", false);
    let usersID = getPar('id');
    //Demo
    layui.use(['form', 'layer'], function() {
        var form = layui.form(),
            layer = layui.layer;
        if (usersID) {
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'get',
                url: "/admin/users/" + usersID,
                dataType: "json",
                success: function(data) {
                    $('input').eq(0).val(data.data.user_name);
                    $('input').eq(1).val(data.data.user_student_number);
                    $('input').eq(2).val(data.data.user_grade);
                    $('input').eq(3).val(data.data.user_major);
                    if (data.data.user_permissions == 1) {
                        $("input[name=status][value=1]").attr("checked", "checked");
                    } else {
                        $("input[name=status][value=2]").attr("checked", "checked");
                    }
                    form.render();
                },
            });
        }



        $('.member-sub-btn').on('click', function() {
            if (usersID) {
                update();
            } else {
                add();
            }
        })

        //添加操作
        function add() {
            user_name = $('input').eq(0).val();
            user_student_number = $('input').eq(1).val();
            user_grade = $('input').eq(2).val();
            user_major = $('input').eq(3).val();
            user_permissions = $('input:radio:checked').val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'post',
                url: '/admin/users',
                data: {
                    'user_name': user_name,
                    'user_student_number': user_student_number,
                    'user_grade': user_grade,
                    'user_major': user_major,
                    'user_permissions': user_permissions
                },
                dataType: 'json',
                success: function(data) {
                    localStorage.setItem("isupdate", true);
                    layer.msg(data.msg);
                },
                error: function(error) {
                    let text = '服务器错误！';
                    if (error.status === 422) {
                        text = ''
                        error.responseJSON.data.forEach(function(a) {
                            text += a + '<br>';
                        });
                    } else if (error.status === 403) {
                        text = error.responseJSON.msg;
                    }
                    layer.alert(text, {
                        title: error.responseJSON.msg,
                        icon: 2
                    });
                }
            });

        }

        //修改操作
        function update() {
            user_name = $('input').eq(0).val();
            user_student_number = $('input').eq(1).val();
            user_grade = $('input').eq(2).val();
            user_major = $('input').eq(3).val();
            user_permissions = $('input:radio:checked').val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'put',
                url: '/admin/users/' + usersID,
                data: {
                    'user_name': user_name,
                    'user_student_number': user_student_number,
                    'user_grade': user_grade,
                    'user_major': user_major,
                    'user_permissions': user_permissions
                },
                dataType: 'json',
                success: function(data) {
                    localStorage.setItem("isupdate", true);
                    layer.msg(data.msg);
                },
                error: function(error) {
                    let text = '服务器错误！';
                    if (error.status === 422) {
                        text = ''
                        error.responseJSON.data.forEach(function(a) {
                            text += a + '<br>';
                        });
                    } else if (error.status === 403) {
                        text = error.responseJSON.msg;
                    }
                    layer.alert(text, {
                        title: error.responseJSON.msg,
                        icon: 2
                    });
                }
            });
        }
    });


    function getPar(par) {
        //获取当前URL
        var local_url = document.location.href;
        //获取要取得的get参数位置
        var get = local_url.indexOf(par + "=");
        if (get == -1) {
            return false;
        }
        //截取字符串
        var get_par = local_url.slice(par.length + get + 1);
        //判断截取后的字符串是否还有其他get参数
        var nextPar = get_par.indexOf("&");
        if (nextPar != -1) {
            get_par = get_par.slice(0, nextPar);
        }
        return get_par;
    }
})