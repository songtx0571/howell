<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/week/roleManagement.js"></script>
    <link rel="stylesheet" href="css/roleManagement.css">
    <script src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <div class="showRole">
            <h1 style="text-align: center;margin-bottom: 20px">角色管理</h1>
            <table class="roleTable">
                <thead>
                <tr>
                    <%--<th width='20%'>序号</th>--%>
                    <th width='25%'>角色名称</th>
                    <th width='75%'>操作</th>
                </tr>
                </thead>
                <tbody id='roleTbody'>

                </tbody>
            </table>
        </div>
        <%--修改角色--%>
        <div class="updateRole">
            <h1 style="text-align: center;margin-bottom: 30px">修改角色</h1>
            <input type="hidden" id='updataPermissionRoleId'/>
            <span>角色名称:</span>
            <input type="text" id="updataInput">
            <divs style="clear: both"></divs>
            <div class="btnBox">
                <button onclick="updateRole(id)">确定</button>
                <button onclick="cancel()">取消</button>
            </div>
        </div>
        <%--添加角色--%>
        <div class="addRole">
            <h1 style="text-align: center;margin-bottom: 30px">添加角色</h1>
            <input type="hidden" id='addPermissionRoleId'/>
            <span>角色名称:</span>
            <input type="text" id="addInput">
            <divs style="clear: both"></divs>
            <div class="btnBox">
                <button onclick="addRole()">确定</button>
                <button onclick="cancel()">取消</button>
            </div>
        </div>
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
    <script>
        //修改的div标签
        var updateRoleDiv = $(".updateRole")[0];
        //添加的div标签
        var addRoleDiv = $(".addRole")[0];
        // 角色权限
        var white_content1 =  $(".white_content1")[0];
        // 取消按钮
        function cancel() {
            updateRoleDiv.style.display = "none";
            addRoleDiv.style.display = "none"
            white_content1.style.display = "none"
        }
    </script>
</body>
</html>
