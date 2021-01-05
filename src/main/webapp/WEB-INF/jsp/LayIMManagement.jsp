<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/LayIMManagement.css">
    <script type="text/javascript" src="js/week/LayIMManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
    <div class="warp">
        <div class="top">
            <form  class="layui-form" action="">
                <input type="hidden" id="companyIdHidden">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width: 115px;">公司:</label>
                        <div class="layui-input-inline">
                            <select name="companyList" lay-verify="required" lay-filter="companyList" lay-search="" id="companyList">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="content">
            <table id="demo" lay-filter="test"></table>
            <script type="text/html" id="barDemo">
                <input type="hidden" id="statusHidden">
                <a class="layui-btn layui-btn-xs openStatus{{d.id}}" lay-event="statusOpen">启用</a>
                <a class="layui-btn layui-btn-xs closeStatus{{d.id}}" lay-event="statusClose">禁用</a>
            </script>
        </div>
    </div>
</body>
</html>
