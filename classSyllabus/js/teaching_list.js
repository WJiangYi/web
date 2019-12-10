$(function () {
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');

        $('.sub').on('click', function(){
            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['180px','350px'],icon: 2});
                return false;
            }

        });
    });

    function IsNull(str) {
        return /\S/.test(str);
    }
});