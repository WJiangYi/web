$(function () {
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#made'
            ,format: 'yyyy年MM月dd日'
        });
        laydate.render({
            elem: '#made1'
            ,format: 'yyyy年MM月dd日'
        });
        laydate.render({
            elem: '#made2'
            ,format: 'yyyy年MM月dd日'
        });
    });
});