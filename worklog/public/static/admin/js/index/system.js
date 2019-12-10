$(function() {
    layui.use(['form'], function() {
        var form = layui.form();
        form.render();

        var baseUrl = 'http://127.0.0.1:8000';

        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'get',
            url: baseUrl + "/admin/system_setting",
            dataType: "json",
            success: function(data) {
                if (data.code === 200) {
                    $('#filing').val(data.data.system_setting_site_record_info);
                    $('#keyid').val(data.data.system_access_key_id);
                    $('#keysecret').val(data.data.system_access_key_secret);
                    $('#footer').val(data.data.system_setting_other);
                    document.getElementById('systemimg').src = data.data.system_setting_wx_qrcode;
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

        //提交
        $('.system-sub-btn').on('click', function() {
            system_setting_site_record_info = $('input').eq(0).val();
            system_access_key_id = $('input').eq(1).val();
            system_access_key_secret = $('input').eq(2).val();
            system_setting_wx_qrcode = $('#systemcode img').attr('src');
            system_setting_other = $('input').eq(4).val();
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'put',
                url: '/admin/system_setting/1',
                data: {
                    'system_setting_site_record_info': system_setting_site_record_info,
                    'system_access_key_id': system_access_key_id,
                    'system_access_key_secret': system_access_key_secret,
                    'system_setting_wx_qrcode': system_setting_wx_qrcode,
                    'system_setting_other': system_setting_other
                },
                dataType: 'json',
                success: function(data) {
                    layer.msg(data.msg);
                    location.reload();
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
        })
    });
})

function selectImage(file) {
    $('#systemcode').empty();
    if (!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
        var img = document.createElement('img');
        img.src = evt.target.result;
        $('#systemcode').append(img);
    }
    reader.readAsDataURL(file.files[0]);

}