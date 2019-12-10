$(function() {
    localStorage.setItem("isupdate", false);
    let navigationID = getPar('id');
    layui.use(['form'], function() {
        var form = layui.form();
        if (navigationID) {
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'get',
                url: "/admin/navigaion_columns/" + navigationID,
                dataType: "json",
                success: function(data) {
                    $('input').eq(0).val(data.data.navigation_columns_name);
                    $('input').eq(1).val(data.data.navigation_jump_url);

                    form.render();
                },
            });
        }

        $('.navigation-subBtn').on('click', function() {
            if (navigationID) {
                update();
            } else {
                add();
            }
        })

        //添加操作
        function add() {
            navigation_columns_name = $('input').eq(0).val();
            navigation_jump_url = $('input').eq(1).val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'post',
                url: '/admin/navigaion_columns',
                data: {
                    'navigation_columns_name': navigation_columns_name,
                    'navigation_jump_url': navigation_jump_url
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
            navigation_columns_name = $('input').eq(0).val();
            navigation_jump_url = $('input').eq(1).val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'put',
                url: '/admin/navigaion_columns/' + navigationID,
                data: {
                    'navigation_columns_name': navigation_columns_name,
                    'navigation_jump_url': navigation_jump_url
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

    })
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