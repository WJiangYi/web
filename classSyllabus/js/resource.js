$(function () {
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editor');
        var edbuild1 = layedit.build('editor1');

        $('.btn').on('click', function(){
            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('参考教材内容不为空！', {offset: ['320px','716px'],icon: 2});
                return false;
            }

            if(!IsNull(layedit.getContent(edbuild1))){
                layer.alert('参考资料内容不为空！', {offset: ['320px','716px'],icon: 2});
                return false;
            }

        });
    });

    function IsNull(str) {
        return /\S/.test(str);
    }
});