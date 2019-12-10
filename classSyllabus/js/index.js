/*index*/
$(function () {

    layui.use('element', function(){
        var element = layui.element;

    });
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        $("#J_iframe").attr('src',url);
        return false;
    });
});

/*implement*/
$(function () {
    $('.add-btn-implement').click(function () {
        layer.open({
            type: 2,
            title: ['实践教学项目实施计划表-添加', 'text-align: center;padding: 0;'],
            area: ['1000px', '800px'],
            resize: true,
            content: ['syllabus_implement_add.html','no']
        });
    });
});

/*implement_add*/
$(function () {
    layui.config({
        base: '../lib/layui-formSelects-master/dist/'
    }).extend({
        formSelects: 'formSelects-v4'
    });
    layui.use(['jquery', 'formSelects'], function(){
        var formSelects = layui.formSelects;

    });
});

/*teaching_list*/
$(function () {
    $('.add-btn-teach').on('click', function(){
        layer.open({
            type: 2,
            title: ['教学目标列表-添加', 'text-align: center;padding: 0;'],
            area: ['1000px', '700px'],
            resize: false,
            shadeClose: true,
            content: ['syllabus_teaching_list_add.html','no']
        });
    });
});

/*final*/
$(function () {

    $('.knowledge').on('click', function(){
        layer.open({
            type: 2,
            title: ['重点考核知识', 'text-align: center;padding: 0;'],
            area: ['800px', '600px'],
            resize: false,
            shadeClose: true,
            content: ['syllabus_final_keyknowledge.html','no']
        });
    });
});


/*assessment*/
$(function () {

    $('.add-btn-assessment').on('click', function(){
        layer.open({
            type: 2,
            title: ['课程考核-添加', 'text-align: center;padding: 0;'],
            area: ['1000px', '800px'],
            resize: false,
            shadeClose: false,
            content: ['syllabus_assessment_add.html','no']
        });
    });
});

/*unit*/
$(function () {
    var i = 1;
    $(document).ready(function(){
        $('.btn-add').mouseenter(function () {
            $('.btn-add').css("background","#ccc");
        });
        $('.btn-add').mouseleave(function(){
            $('.btn-add').css("background","#fff");
        });
        $('.btn-sub').mouseenter(function () {
            $('.btn-sub').css("background","#ccc");
            $('.btn-hr').css("background","#fff");
        });
        $('.btn-sub').mouseleave(function(){
            $('.btn-sub').css("background","#fff");
            $('.btn-hr').css("background","#333");
        });
        $('.btn-add').click(function () {
            if (i>19) return;
            i++;
            $('.piece').append(`
                    <div class="overall" id="${i}">
                        <div class="each">
                            <img src="../img/unit2.png"/>
                            <button class="layui-btn btn-write">未填写</button>
                            <button class="layui-btn btn-update">填 写</button>
                        </div>
                    </div>`)

        });
        $('.btn-sub').click(function () {
            if (i === 1) return;
            $('#'+i+'').remove();
            i--;
        })
    });
    $('.btn-update').click(function () {
        layer.open({
            type: 2,
            title: ['单元添加-添加', 'text-align: center;padding: 0;'],
            area: ['800px', '600px'],
            resize: false,
            shadeClose: true,
            content: ['syllabus_unit_add.html','no']
        });
    });
});

$(function () {
    $(document).scroll(function() {
        var scroH = $(document).scrollTop();
        if(scroH > 10){
            $('.unit-top').css({top:'0px',background:'#37a7f8',color:'#fff',width: '1260px',left:'200px'});
            $('.unit-content-top p').css({color: '#fff'});
        }
        if(scroH == 0){
            $('.unit-top').css({top: '140px',background: '#fff', color: '#010101'});
            $('.unit-content-top p').css({color: '#010101'});
        }
    });
});
