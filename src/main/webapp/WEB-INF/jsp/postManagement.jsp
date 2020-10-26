<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/week/postManagement.js"></script>
    <link rel="stylesheet" href="css/postManagement.css">
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <h1 style="text-align: center;">岗位信息</h1>
        <div class="top">
            <form class="layui-form" action="">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">公司</label>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="companyList" lay-search="" id="companyList">
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <shiro:hasPermission name='岗位查看'>
        <div class="content">
            <shiro:hasPermission name='添加岗位'>
            <button class="addBtn" onclick="showAddPost()">添加岗位</button>
            </shiro:hasPermission>
            <input type="hidden" id="companyId">
            <table class="postTable">
                <thead>
                <tr class="postTr">
                    <th>岗位名称</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id='postTbody'>

                </tbody>
            </table>
            <%--添加岗位页面--%>
            <div class="addPost">
                <h1 style="text-align: center;margin-bottom: 30px">添加岗位</h1>
                <div>
                    <span>岗位名称:</span>
                    <input type="text" id="addInput">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>备注:</span>
                    <input type="text" id="addRemork">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="addPost()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--修改岗位页面--%>
            <div class="updataPost">
                <h1 style="text-align: center;margin-bottom: 30px">修改岗位</h1>
                <input type="hidden" id="updataCompanyId">
                <input type="hidden" id="updataPostId">
                <div>
                    <span>岗位名称:</span>
                    <input type="text" id="updataInput">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>备注:</span>
                    <input type="text" id="updataRemork">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="updataPost()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
    </shiro:hasPermission>
</body>
</html>
