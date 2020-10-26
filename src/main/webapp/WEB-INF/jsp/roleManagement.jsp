<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/week/roleManagement.js"></script>
    <link rel="stylesheet" href="css/roleManagement.css">
    <script src="js/week/alert.js"></script>
    <script type="text/javascript"  src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
    <input type="hidden" id="companyIdHidden">
    <div class="warp">
        <shiro:hasPermission name='添加角色'>
            <div class="top">
                <button type="button" class="layui-btn  layui-btn-fluid" onclick="showAddRoleDiv()">添加</button>
            </div>
        </shiro:hasPermission>
        <div class="showRole">
            <h1 style="text-align: center;margin-bottom: 20px">角色管理</h1>
            <table class="roleTable">
                <thead>
                <tr>
                    <th width='25%'>角色名称</th>
                    <th width='20%'>部门</th>
                    <th width='30%'>备注</th>
                    <th width='25%'>操作</th>
                </tr>
                </thead>
                <tbody id='roleTbody'>

                </tbody>
            </table>
        </div>
        <%--修改角色--%>
        <form class="layui-form" action="">
        <div class="updateRole">
            <h1 style="text-align: center;margin-bottom: 30px">修改角色</h1>
            <input type="hidden" id='updataPermissionRoleId'/>
            <div class="addDiv">
                <span><samp style="color: #ff210b">*</samp>角色名称:</span>
                <input type="text" id="updataInput">
            </div>
            <div class="addDiv">
                <span><samp style="color: #ff210b">*</samp>部门:</span>
                <input type="hidden" id="updDepartmentHidden">
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <select name="updDepartmentList" lay-verify="required" lay-filter="updDepartmentList" lay-search="" id="updDepartmentList" disabled>
                        </select>
                    </div>
                </div>
            </div>
            <div class="addDiv1">
                <span>备注:</span>
                <textarea id="updDescription"></textarea>
            </div>
            <div class="btnBox">
                <button type="button" class="layui-btn" onclick="updateRole(id)">确定</button>
                <button type="button" class="layui-btn" onclick="cancel()">取消</button>
            </div>
        </div>
        <%--添加角色--%>
        <div class="addRole1">
            <h1 style="text-align: center;margin-bottom: 30px">添加角色</h1>
            <input type="hidden" id='addPermissionRoleId'/>
            <div class="addDiv">
                <span><samp style="color: #ff210b">*</samp>角色名称:</span>
                <input type="text" id="addChinaInput">
            </div>
            <div class="addDiv">
                <span><samp style="color: #ff210b">*</samp>部门:</span>
                <input type="hidden" id="addDepartmentHidden">
                    <div class="layui-inline">
                        <div class="layui-input-inline">
                            <select name="addDepartmentList" lay-verify="required" lay-filter="addDepartmentList" lay-search="" id="addDepartmentList">
                            </select>
                        </div>
                    </div>
            </div>
            <div class="addDiv1">
                <span>备注:</span>
                <textarea id="addDescription"></textarea>
            </div>
            <div class="btnBox">
                <button type="button" class="layui-btn" onclick="addRole()">确定</button>
                <button type="button" class="layui-btn" onclick="cancel()">取消</button>
            </div>
        </div>
        </form>
        <%--修改角色权限--%>
        <div id='permission' class="white_content1">
            <h1 style="text-align: center;margin-bottom: 30px">修改角色权限</h1>
            <input type="hidden" id='permissionRoleId'/>
            <div id="tDiv" class="tab-div">
                <div class="tab-content tab-content-show">
                    <div id='permissionFrom'>

                    </div>
                    <div class="btnBox btnBox1">
                        <button onclick="addUpdPermission()">确定</button>
                        <button onclick="cancel()">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
