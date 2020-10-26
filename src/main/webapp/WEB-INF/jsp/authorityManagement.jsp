<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/authorityManagement.css">
    <script type="text/javascript" src="js/week/authorityManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <link rel="stylesheet" href="js/font/css/font-awesome.css">
</head>
<body>
    <div class="warp">
        <div class="top">
            <nav>
                <ul class="navList1">
                    <shiro:hasPermission name='开发人员'>
                        <li onclick="showDevelop()">
                            <a href="#">开发</a>
                        </li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name='查看角色所有权限'>
                    <li onclick="showAuthority()">
                        <a href="#">
                            角色权限分配
                        </a>
                    </li>
                    </shiro:hasPermission>
                </ul>
            </nav>
        </div>
        <%--开发--%>
        <div class="develop">
            <div>
                <div class="demo-side">
                    <table id="demoTreeTb"></table>
                </div>
                <!-- 表格操作列 -->
                <script type="text/html" id="tbBar">
                    <shiro:hasPermission name='创建权限'>
                        <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="add">添加</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name='更新权限信息'>
                        <a class="layui-btn layui-btn-xs" lay-event="edit">修改</a>
                    </shiro:hasPermission>
                </script>
            </div>
            <div class="develop_insert">
                <table class="develop_add">
                    <caption>添加权限</caption>
                    <tr>
                        <td>
                            <span style="float: left;">类别：</span>
                            <p style="float: right;width: 270px;" id="addDevelopType"></p>
                        </td>
                        <td>
                            <span>标题：</span>
                            <input type="text" id="addDevelopName">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>路径：</span>
                            <input type="text" id="addDevelopUrl"  style="width: 620px;">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span style="float: left;line-height: 80px;">备注：</span>
                            <textarea style="width: 620px;float: left;margin-top: 10px;" rows="3" cols="20" id="addDevelopRemark"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right">
                            <button type="button" class="layui-btn" onclick="addDevelop()">确定</button>&nbsp;&nbsp;&nbsp;
                        </td>
                        <td style="text-align: left">
                            &nbsp;&nbsp;&nbsp;<button type="button" class="layui-btn" onclick="cancel()">取消</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <%--用户权限--%>
        <div class="authority">
            <form class="layui-form" action="">
                <div class="authorityDiv">
                    <input type="hidden" id="pathListHidden">
                    <div class="layui-inline">
                        <label class="layui-form-label">路径名称</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="pathList" lay-search="" id="pathList">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="authorityDiv">
                    <table class="authorityTable">
                        <thead>
                            <tr>
                                <th width="30%">路径名称</th>
                                <th width="70%">备注</th>
                            </tr>
                        </thead>
                        <tbody class="authorityTbody" id="authorityTbody">

                        </tbody>
                    </table>
                </div>

                    <div class="authorityDiv">
                        <shiro:hasPermission name='为角色分配权限'>
                        <script type="text/html" id="barDemo4">
                            <a class="layui-btn layui-btn-sm" lay-event="edit1">分配权限</a>
                        </script>
                        </shiro:hasPermission>
                        <shiro:hasPermission name='查看角色所拥有的权限'>
                        <script type="text/html" id="barDemo5">
                            <a class="layui-btn layui-btn-sm" lay-event="see">查看权限</a>
                        </script>
                        </shiro:hasPermission>
                        <table id="test4" lay-filter="test4"></table>
                    </div>

                <div class="authorityDiv">
                    <div class="authorityDiv_div">
                        <p style="font-size: 20px;background: #f2f2f2;border-bottom: 1px solid #e6e6e6;" id="roleAuthority"></p>
                        <span style="display: block;position: absolute;right: 10px;top: 10px;" onclick="authorityClose()">
                             <i class="fa fa-remove fa-2x"></i>
                        </span>
                        <ul class="authorityList" id="authorityList">
                        </ul>
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div class="authority_update">
                    <div id="test12" class="demo-tree-more" style="width: 500px;margin: 10px auto;"></div>
                    <div style="width: 500px;margin: 20px auto;display: flex;justify-content: space-around">
                        <button type="button" class="layui-btn" lay-demo="getChecked">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="layui-btn" onclick="cancel()">取消</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
