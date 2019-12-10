$(function () {

    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');

        $('.sub').click(function () {
            var text = $('.text-input').val();
            var name = $('.name-input').val();
            var result = $('.result-input').val();
            if (IsNull(text)) {
                if (!(/[\u4e00-\u9fa5]/gm.test(text))) {
                    layer.alert('(考核项目为中文)', {offset: ['200px','380px'], icon: 2});
                    return false;
                }
            } else {
                layer.alert('考核项目不为空！', {offset: ['200px','380px'], icon: 2});
                return false;
            }

            if (IsNull(name)) {
                if (!(/[\u4e00-\u9fa5]/gm.test(name))) {
                    layer.alert('(考核时间安排为中文、数字、字符)', {offset: ['200px','380px'], icon: 2});
                    return false;
                }
            } else {
                layer.alert('考核时间安排不为空！', {offset: ['200px','380px'], icon: 2});
                return false;
            }

            if (IsNull(result)) {
                if (!(/^\d+$/.test(result))) {
                    layer.alert('(所占权重为数字)', {offset: ['200px','380px'], icon: 2});
                    return false;
                }
            } else {
                layer.alert('所占权重不为空！', {offset: ['200px','380px'], icon: 2});
                return false;
            }

            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['200px','380px'],icon: 2});
                return false;
            }
        });
    });

    function IsNull(str) {
        return /\S/.test(str);
    }

});
