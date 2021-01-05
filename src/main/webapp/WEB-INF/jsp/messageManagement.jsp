<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/messageManagement.css">
    <script type="text/javascript" src="js/week/messageManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
<div class="warp">
    <div class="top">
        <nav>
            <ul class="navList1">
                <%--<shiro:hasPermission name='群组管理'>--%>
                    <li onclick="showGroup()">
                        <a href="#">
                            群组管理
                        </a>
                    </li>
                <%--</shiro:hasPermission>--%>
                    <li onclick="showDepart()">
                        <a href="#">
                            部门管理
                        </a>
                    </li>
            </ul>
        </nav>
    </div>
</div>
</body>
</html>
