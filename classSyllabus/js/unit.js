$(function () {
    var content = null;
    var claim = null;
    var focus = null;

    layui.use('layedit', function() {
        var layedit = layui.layedit;
        var edbuild = layedit.build('editorunit');

        layui.use('form', function(){
            var form = layui.form;

            form.on('select(teach-content)',function (data) {

                if(data.value === null){
                    edbuild = layedit.build('editorunit');
                    $("iframe[textarea=editorunit]").contents().find("body").click(function(){
                        layer.alert('请先选择下拉框');
                    });
                }

                if (data.value==='0'){
                    $("#editorunit").val('');
                    if (content!=null){
                        $("#editorunit").val(content);
                    }
                    edbuild = layedit.build('editorunit');
                    $("iframe[textarea=editorunit]").contents().find("body").keyup(function(){
                        content=layedit.getContent(edbuild);
                    });
                }
                if (data.value==='1'){
                    $("#editorunit").val('');
                    if (claim!=null){
                        $("#editorunit").val(claim);
                    }
                    edbuild = layedit.build('editorunit');
                    $("iframe[textarea=editorunit]").contents().find("body").keyup(function(){
                        claim=layedit.getContent(edbuild)
                    });
                }
                if (data.value==='2'){
                    $("#editorunit").val('');
                    if (focus!=null){
                        $("#editorunit").val(focus);
                    }
                    edbuild = layedit.build('editorunit');
                    $("iframe[textarea=editorunit]").contents().find("body").keyup(function(){
                        focus=layedit.getContent(edbuild)
                    });
                }
            })


        });

        $('.layui-btn').click(function () {
            var unit = $('.unit-name').val();

           if(IsNull(unit)){
                if (!(/[\u4e00-\u9fa5]/gm.test(unit))) {
                    layer.alert('(单元名称为中文、数字)', {offset: ['160px','280px'],icon: 2});
                    return false;
                }
            }else{
                layer.alert('单元名称不为空！', {offset: ['160px','280px'],icon: 2});
                return false;
            }

            if(!IsNull(layedit.getContent(edbuild))){
                layer.alert('内容不为空！', {offset: ['160px','280px'],icon: 2});
                return false;
            }
        });

    });



    function IsNull(str) {
        return /\S/.test(str);
    }



});