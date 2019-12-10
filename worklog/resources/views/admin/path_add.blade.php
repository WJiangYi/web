<!DOCTYPE html>
<html class="iframe-h">

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>学习路线添加</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/ueditor.config.js')}}"></script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/ueditor.all.min.js')}}"> </script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/lang/zh-cn/zh-cn.js')}}"></script>
</head>

<body class="iframe-h">

    <div class="return">
    <button class="layui-btn layui-btn-mini layui-btn-normal returnButton" ><i class="layui-icon">&#xe603;</i> 返回</button>
    </div>
    <form class="layui-form system-content pathAddContent-left" style="width: 90%;padding-top: 20px;">
        <div class="layui-form-item pathadd-title">
            <label class="layui-form-label system-label ">标题：</label>
            <div class="layui-input-block pathadd-input">
                <input type="text" name="title" required lay-verify="required" placeholder="请输入备案" autocomplete="off"
                    class="layui-input">
            </div>
        </div>
        <div class="layui-form-item pathadd-title">
            <label class="layui-form-label system-label pathadd-introduction">简介：</label>
            <div class="layui-input-block pathadd-input">
                <textarea class="pathadd-text"></textarea>
            </div>
        </div>
        <div class="layui-form-item pathadd-context">
            <label class="layui-form-label system-label">正文：</label>
            <div class="layui-input-block pathadd-input">



                <script id="editor" type="text/plain" style="width:1200px;height:500px;"></script>



            </div>
        </div>
    </form>
    <div class="pathAddContent-right">
        <div class="pathAddContent-right-img">
            <div class="layui-form-item pathadd-pic">
                <label class="layui-form-label system-label">封面图片：</label>
                <div class="layui-input-block system-input">
                    <div>
                        <img class="pathadd-img" src="{{url('img/head/shizhan1.jpg')}}" />
                    </div>
                    <button type="button" class="layui-btn layui-btn-normal pathadd-upload">选择图片</button>
                </div>
            </div>
           
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label system-label pathadd-label">上传视频：</label>
        <div class="pathadd-video">
            <img src="{{url('img/head/video.png')}}"/>
        </div>
    </div>
    <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn layui-btn-normal path-sub-btn" lay-submit lay-filter="formDemo">提 交</button>
            </div>
        </div>

    <script>
        //Demo
        layui.use(['form'], function () {
            var form = layui.form();
            form.render();
            //监听提交
            form.on('submit(formDemo)', function (data) {
                layer.msg(JSON.stringify(data.field));
                return false;
            });
        });
        var ue = UE.getEditor('editor');

        function getContent() {
            console.log(UE.getEditor('editor').getContent())
        }
    </script>
</body>

</html>