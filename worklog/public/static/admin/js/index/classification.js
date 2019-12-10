$(function() {
    layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog'], function() {
        var form = layui.form(),
            $ = layui.jquery;
        form.render();
        dialog = layui.dialog;
        var laypage = layui.laypage
        var baseUrl = 'http://127.0.0.1:8000';

        // 分页初始化值
        var pageNum;
        var allData;

        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'get',
            url: baseUrl + "/admin/categorys",
            dataType: "json",
            async: false,
            success: function(data) {
                $('#classification-tbody').empty();
                if (data.code === 200) {


                    allData = data.data.total;
                    pageNum = Math.ceil(allData / 10);

                    var text = '';
                    $(data.data.data).each(function(index, item) {
                        text += `
                        <tr>
                            <td id="bName" class="hidden-xs">${item.category_big_name}</td>
                            <td id="sName">${item.category_name}</td>
                            <td class="hidden-xs">
                                <button class="layui-btn layui-btn-mini layui-btn-normal classification-edit-btn" data-url="classification_add" data-id="${item.category_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.category_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                            </td>
                        </tr>`
                    })
                    $('#classification-tbody').append(text);
                }
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
                layer.alert(text, { title: error.responseJSON.msg, icon: 2 });
            }
        });

        //列表删除
        $(document).on('click', '.del-btn', function() {
            let categoryID = $(this).attr('data-id')
            dialog.confirm({
                message: '您确定要进行删除吗？',
                success: function() {
                    $.ajax({
                        type: 'Delete',
                        async: false,
                        url: baseUrl + "/admin/categorys/" + categoryID,
                        dataType: "json",
                        success: function(data) {
                            if (data.code === 200) {
                                layer.msg(data.msg)
                                location.reload(true)
                            }
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
                },
                cancel: function() {
                    layer.msg('取消了')
                }
            })
            return false;
        })



        // 分页
        laypage({
            cont: 'demo2',
            pages: pageNum,
            skin: '#1E9FFF',
            count: allData,
            limit: 10,
            jump: function(obj, first) {
                $.ajax({
                    type: 'get',
                    url: '/admin/categorys',
                    dataType: "json",
                    data: {
                        page: obj.curr
                    },
                    success: function(data) {
                        $('#classification-tbody').empty();
                        if (data.code === 200) {


                            allData = data.data.total;
                            pageNum = Math.ceil(allData / 10);

                            var text = '';
                            $(data.data.data).each(function(index, item) {
                                text += `
                                <tr>
                                    <td id="bName" class="hidden-xs">${item.category_big_name}</td>
                                    <td id="sName">${item.category_name}</td>
                                    <td class="hidden-xs">
                                        <button class="layui-btn layui-btn-mini layui-btn-normal classification-edit-btn" data-url="classification_add" data-id="${item.category_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                        <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.category_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                                    </td>
                                </tr>`
                            })
                            $('#classification-tbody').append(text);
                        }
                    },
                })
            }
        })

    });
});