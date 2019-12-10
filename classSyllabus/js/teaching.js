$(function () {
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');

        $('.btn').on('click', function(){
            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['340px','716px'],icon: 2});
                return false;
            }

        });
    });

    function IsNull(str) {
        return /\S/.test(str);
    }
});