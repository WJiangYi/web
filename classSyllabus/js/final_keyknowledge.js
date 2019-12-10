$(function () {
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');

        $('.layui-btn').on('click', function(){
            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['150px','260px'],icon: 2});
                return false;
            }

        });
    });

    function IsNull(str) {
        return /\S/.test(str);
    }
});