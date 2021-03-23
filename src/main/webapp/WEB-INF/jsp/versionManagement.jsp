<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/versionManagement.css">
    <script type="text/javascript" src="js/week/versionManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
<div class="warp">
   <shiro:hasPermission name="添加版本">
    <button class="layui-btn top" onclick="showAddVersion()">添加版本</button>
    </shiro:hasPermission>
    <%--添加版本--%>
    <div class="addVersion">
        <table>
            <tr>
                <td colspan="2" style="text-align: center;font-size: 20px;font-weight: bold;">
                    添加版本
                </td>
            </tr>
            <tr>
                <td style="text-align: right;">更新标题：</td>
                <td>
                    <textarea rows='3' cols="20" id="title"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align: right;">更新日期：</td>
                <td>
                    <input type="hidden" id="cycleDataHidden">
                    <div class="layui-inline" style="margin-bottom: 10px;float:left;">
                        <div class="layui-input-inline">
                            <input type="text" class="layui-input" id="test4" placeholder="年-月-日">
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="text-align: right;">更新内容：</td>
                <td>
                    <textarea rows='10' cols="20" id="content"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="addVersionBtn()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
    <div style="width: 95%;margin: 10px auto;box-shadow: 5px 10px 20px #ccc;padding: 10px;box-sizing: border-box;">
        <ul class="layui-timeline" id="timeline"></ul>
    </div>
</div>
</body>
</html>
