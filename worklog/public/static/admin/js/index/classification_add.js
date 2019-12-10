$(function() {
    layui.use(['form', 'layer'], function() {
        var form = layui.form();
        layer = layui.layer;
        localStorage.setItem("isupdate", false);
        let categorysID = getPar('id');
        if (categorysID) {

            var json = JSON.parse(localStorage.getItem("json"));
            $('input').eq(0).val(json.bName);
            $('input').eq(1).val(json.sName);

            localStorage.removeItem("json");
            form.render();

        }

        $('.classification-subBtn').on('click', function() {
            if (categorysID) {
                update();
            } else {
                add();
            }
        })

        //添加操作
        function add() {
            category_big_name = $('input').eq(0).val();
            category_name = $('input').eq(1).val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'post',
                url: '/admin/categorys',
                data: {
                    'category_big_name': category_big_name,
                    'category_name': category_name
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
            category_big_name = $('input').eq(0).val();
            category_name = $('input').eq(1).val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'put',
                url: '/admin/categorys/' + categorysID,
                data: {
                    'category_big_name': category_big_name,
                    'category_name': category_name
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

            })

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