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
                <li class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" onclick='showcontent("23")' class="left23"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-clipboard"></i>&nbsp;&nbsp;guide系统</a>
                    <dl class="layui-nav-child erji23">
                    </dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='Ai智能系统'>
                <li class="layui-nav-item">
                    <a href="javascript:;" onclick='showcontent("24")' class="left24" style="color: #000;"><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-snowflake-o"></i>&nbsp;&nbsp;AI系统</a>
                    <dl class="layui-nav-child erji24">
                    </dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='考勤管理系统'>
                <li class="layui-nav-item">
                    <a href="javascript:;" class="left25" onclick='showcontent("25")'><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-hourglass-2"></i>&nbsp;&nbsp;WA系统</a>
                    <dl class="layui-nav-child erji25">
                    </dl>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name='考试管理系统'>
                <li class="layui-nav-item">
                    <a href="javascript:;" class="left26" onclick='showcontent("26")'><i style="font-size: 1.4rem;margin-left: -25px;" class="fa fa-leanpub"></i>&nbsp;&nbsp;Exam系统</a>
                    <dl class="layui-nav-child erji26">
                    </dl>
                </li>
            </shiro:hasPermission>
        </ul>
    </div>
</body>
</html>
