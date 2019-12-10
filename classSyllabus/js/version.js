$(function () {
    $('.sub').click(function () {
        var template = $('#template').val();
        var formulator = $('#formulator').val();
        var reviewer = $('#reviewer').val();
        var principal = $('#principal').val();
        var made = $('#made').val();
        var made1 = $('#made1').val();
        var made2 = $('#made2').val();

        if(IsNull(template)){
            if (!(/^\d+$/.test(template))) {
                layer.alert('(大纲（模板）版本号为数字、字符)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('大纲（模板）版本号不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(formulator)){
            if (!(/[\u4e00-\u9fa5]/gm.test(formulator))) {
                layer.alert('(大纲制定人签字为中文', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('大纲制定人签字不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(reviewer)){
            if (!(/[\u4e00-\u9fa5]/gm.test(reviewer))) {
                layer.alert('(团队审核人签字为中文)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('团队审核人签字不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(principal)){
            if (!(/[\u4e00-\u9fa5]/gm.test(principal))) {
                layer.alert('(系部负责人签字为中文)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('系部负责人签字不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(made)){
            if (!(/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(made))) {
                layer.alert('(制定日期为中文、数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('制定日期不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(made1)){
            if (!(/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(made1))) {
                layer.alert('(审核日期为中文、数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('审核日期不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }

        if(IsNull(made2)){
            if (!(/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(made2))) {
                layer.alert('(审核日期为中文、数字)', {offset: ['340px','716px'],icon: 2});
                return false;
            }
        }else{
            layer.alert('审核日期不为空！', {offset: ['340px','716px'],icon: 2});
            return false;
        }
    });

    function IsNull(str) {
        return /\S/.test(str);
    }

});