$(function () {
    $('.sub').click(function () {
        var english = $('#english').val();
        var prerequisite = $('#prerequisite').val();
        var teaching = $('#teaching').val();
        if(IsNull(english)){
            if (!(/^\w+$/.test(english))) {
                layer.alert('(英文名称为字母、数字组成)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('英文名称不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(prerequisite)){
            if (!(/[\u4e00-\u9fa5]/gm.test(prerequisite))) {
                layer.alert('(先修课程为中文)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('先修课程不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(teaching)){
            if (!(/[\u4e00-\u9fa5]/gm.test(teaching))) {
                layer.alert('(授课对象为中文、数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('授课对象不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }
    });

    function IsNull(str) {
        return /\S/.test(str);
    }
    
});