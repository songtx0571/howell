<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="layui/layui.js"></script>
    <script type="text/javascript" src="js/week/sockjs.min.js"></script>
    <script type="text/javascript" src="js/week/index.js"></script>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
<div class="warp">
    <table id="demo" lay-filter="test"></table>
    <div>
        <form class="layui-form" action="" style="margin-bottom: 10px;text-align: center;" target="iframe1">
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <select name="modules" lay-verify="required" lay-filter="selTime" lay-search="" id="selTime">
                        <option value="10">10秒</option>
                        <option value="15">15秒</option>
                        <option value="20">20秒</option>
                    </select>
                </div>
                <div style="float: left;margin-right: 30px;">
                    背景色：<div id="test2" style="margin-right: 30px;"></div>
                    字体颜色：<div id="test3"></div>
                </div>
            </div>
        </form>
        <iframe id="iframe1" name="iframe1" style="display:none;"></iframe>
    </div>

    <div class="notice" id="notice">
        <ul id="noticeUl" style="">
        </ul>
    </div>
</div>

</body>
</html>
