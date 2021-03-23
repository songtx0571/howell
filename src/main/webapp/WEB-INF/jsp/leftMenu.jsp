<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="js/font/css/font-awesome.css">
    <link rel="stylesheet" href="css/leftMenu.css">

    <script type="text/javascript"  src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="js/week/leftMenu.js?version=1.09"></script>
</head>
<body>
    <div class="leftBox">
        <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="height: 100%;background: #f8f8f8;">
            <shiro:hasPermission name='运行引导管理系统'>
                <li class="layui-nav-item first23">
                    <a href="javascript:;"  class="left23" onclick="showDown(23)"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-clipboard"></i>&nbsp;&nbsp;guide系统</a>
                    <dl class="layui-nav-child erji23"></dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='Ai智能系统'>
                <li class="layui-nav-item first24">
                    <a href="javascript:;"  class="left24" onclick="showDown(24)" style="color: #000;"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-snowflake-o"></i>&nbsp;&nbsp;AI系统</a>
                    <dl class="layui-nav-child erji24"></dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='考勤管理系统'>
                <li class="layui-nav-item first25">
                    <a href="javascript:;" class="left25" onclick="showDown(25)" style="color: #000;"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-hourglass-2"></i>&nbsp;&nbsp;WA系统</a>
                    <dl class="layui-nav-child erji25"></dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='考试管理系统'>
                <li class="layui-nav-item first26">
                    <a href="javascript:;" class="left26"  onclick="showDown(26)"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-leanpub"></i>&nbsp;&nbsp;Exam系统</a>
                    <dl class="layui-nav-child erji26"></dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='缺陷管理系统'>
                <li class="layui-nav-item first27">
                    <a href="javascript:;" class="left27"  onclick="showDown(27)"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-file-text"></i>&nbsp;&nbsp;Defect系统</a>
                    <dl class="layui-nav-child erji27"></dl>
                </li>
            </shiro:hasPermission>
        </ul>
    </div>
</body>
</html>
