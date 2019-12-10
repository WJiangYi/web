$(function () {
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');

        $('.sub').click(function () {
            var name = $('.name-input').val();
            var result = $('.result-input').val();
            if (IsNull(name)) {
                if (!(/[\u4e00-\u9fa5]/gm.test(name))) {
                    layer.alert('(项目名称为中文)', {offset: ['200px','350px'], icon: 2});
                    return false;
                }
            } else {
                layer.alert('项目名称不为空！', {offset: ['200px','350px'], icon: 2});
                return false;
            }

            if (IsNull(result)) {
                if (!(/[\u4e00-\u9fa5]/gm.test(result))) {
                    layer.alert('(成果物为中文)', {offset: ['200px','350px'], icon: 2});
                    return false;
                }
            } else {
                layer.alert('成果物名称不为空！', {offset: ['200px','350px'], icon: 2});
                return false;
            }

            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['200px','350px'],icon: 2});
                return false;
            }
        });

        function IsNull(str) {
            return /\S/.test(str);
        }

    });
});
