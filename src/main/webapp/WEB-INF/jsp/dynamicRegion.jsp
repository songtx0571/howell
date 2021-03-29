<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/LayIMManagement.css">
    <script type="text/javascript" src="js/week/dynamicRegion.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <style>
        .layui-input-inline .xm-select-parent .xm-select {
            height: 36px;
        }
    </style>
</head>
<body>
    <div class="warp">
<%--        <div class="top" style="width: 685px;margin: 0 auto;">--%>
<%--            <input type="text" style="float: left;width: 300px;height: 36px;border: 1px solid #e6e6e6;border-right: none;" id="keyword">--%>
<%--            <div style="float: left;">--%>
<%--                <div class="layui-input-inline" style="width: 300px;">--%>
<%--                    <select name="tags" id="tags" lay-verify="required" xm-select="tags">--%>
<%--                    </select>--%>
<%--                </div>--%>
<%--                <input type="hidden" id="userSelectId">--%>
<%--            </div>--%>
<%--            &lt;%&ndash;<button type="button" class="layui-btn layui-btn-normal" style="float: left;margin-left: 20px;height: 36px;" id="btnOkBtn" onclick="btnOk()">确认</button>&ndash;%&gt;--%>
<%--        </div>--%>
        <div class="content">
            <table id="demo" lay-filter="test"></table>
            <script type="text/html" id="barDemo">
                {{# if(d.isRead==1){  }}
                <span>已读</span>
                {{# }else{  }}
                <a class="layui-btn layui-btn-xs" lay-event="daile">查看</a>
                {{# }  }}
            </script>
        </div>
    </div>
</body>
</html>
