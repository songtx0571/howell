<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="js/font/css/font-awesome.css">
    <script type="text/javascript" src="js/week/leftMenu.js"></script>
    <style>
        <%--全局样式--%>
        *{
            margin: 0;
            padding: 0;
            font-family: "PingFang SC","Lantinghei SC","Microsoft YaHei","HanHei SC","Helvetica Neue","Open Sans",Arial,"Hiragino Sans GB","微软雅黑",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif;
        }
        a{
            text-decoration: none;
            color: #fff;
        }
        li{
            list-style: none;
        }
        /*局部样式*/
        .leftBox{
            width: 180px;
            height: 100%;
            background: #b1baca;
            font-size: 1.5rem;
            border-right: 1px solid #ccc;
        }
        .leftBox ul li{
            width: 100%;
            line-height: 60px;
            text-indent: 15px;
        }
        .leftBox .left_listIcon{
            float: right;
            margin-right: 10px;
            line-height: 60px;
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="leftBox">
        <ul id="leftList">

        </ul>
    </div>
</body>
</html>
