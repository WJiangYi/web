$(function () {
    $('.sub').click(function () {
        var time = $('#time').val();
        var test = $('#test').val();
        var teach = $('#teach').val();
        var type = $('#type').val();
        if(IsNull(time)){
            if (!(/^\d+$/.test(time))) {
                layer.alert('(考试时长为数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('考试时长不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(test)){
            if (!(/^\d+$/.test(test))) {
                layer.alert('(试卷满分为数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('试卷满分不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(teach)){
            if (!(/^\d+$/.test(teach))) {
                layer.alert('(教学大纲覆盖率为数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('教学大纲覆盖率不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(type)){
            if (!(/[\u4e00-\u9fa5]/gm.test(type))) {
                layer.alert('(试题类型为文字和字符)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('试题类型不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }
    });

    function IsNull(str) {
        return /\S/.test(str);
    }

});