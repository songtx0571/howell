<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/groupManagement.css">
    <script type="text/javascript" src="js/week/groupManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
</head>
<body>
    <div class="warp">
        <div class="top">
            <%--添加按钮--%>
            <div class="addBox" id="addBox">
                <button class="layui-btn layui-btn-normal addBtn" onclick="showAddGroup()">新增</button>
            </div>
            <%--搜索群名--%>
            <div style="float: left;">
                <input type="text" placeholder="请输入群名" id="groupName">
                <input type="button" value="搜索" class="layui-btn" id="searchBtn" >
            </div>
            <div style="clear: both;"></div>
        </div>
        <%--显示群--%>
        <div class="groupContainer">
            <div class="showGroupName">
                <table id="groupDemo" lay-filter="groupTest"></table>
                <script type="text/html" id="groupBarDemo">
                    <a class="layui-btn layui-btn-xs" lay-event="showMember">编辑群员</a>
                    <%--<a class="layui-btn layui-btn-xs" lay-event="del">删除</a>--%>
                </script>
            </div>
            <%--修改群--%>
            <div class="updGroupNameDiv">
                <input type="hidden" id="updGroupId">
                <table>
                    <tr>
                        <td>群名称：</td>
                        <td><input type="text" id="updGroupName"></td>
                    </tr>
                    <tr>
                        <td>备&nbsp;&nbsp;注：</td>
                        <td><textarea name="" id="updRemark" cols="30" rows="5"></textarea></td>
                    </tr>
                    <tr style="text-align: center;">
                        <td colspan="2">
                            <button class="layui-btn" onclick="updGroup()">确定</button>&nbsp;
                            <button class="layui-btn layui-btn-normal" onclick="cancel()">取消</button>
                        </td>
                    </tr>
                </table>
            </div>
            <%--添加群--%>
            <div class="addGroupNameDiv">
                <table>
                    <tr>
                        <td>群名称：</td>
                        <td><input type="text" id="addGroupName"></td>
                    </tr>
                    <tr>
                        <td>备&nbsp;&nbsp;注：</td>
                        <td><textarea name="" id="addRemark" cols="30" rows="5"></textarea></td>
                    </tr>
                    <tr style="text-align: center;">
                        <td colspan="2">
                            <button class="layui-btn" onclick="addGroup()">确定</button>&nbsp;
                            <button class="layui-btn layui-btn-normal" onclick="cancel()">取消</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <%--显示群员--%>
        <div class="showGroupMember">
            <div class="groupMemberTop">
                <input type="hidden" id="groupMemberId">
                <%--添加按钮--%>
                <button class="layui-btn layui-btn-normal addBtn"  onclick="showGroupMemberBtn()">编辑群员</button>
                <%--搜索群名--%>
                <div style="float: left;">
                    <input type="text" placeholder="请输入人名/编号" id="groupMember">
                    <input type="button" value="搜索" class="layui-btn" id="searchGroupMemberBtn" >
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="groupMemberDemoTable">
                <table id="groupMemberDemo" lay-filter="groupMemberTest"></table>
                <script type="text/html" id="groupMemberBarDemo">
                    <a class="layui-btn layui-btn-xs" lay-event="delMember">删除</a>
                    <%--<a class="layui-btn layui-btn-xs" lay-event="del">删除</a>--%>
                </script>
            </div>
            <%--编辑群员--%>
            <div class="groupMemberDiv">
                <div style="width: 80%;margin: 20px auto;">
                    <select name="name" xm-select="example6_4">
                        <option value="0">请选择成员</option>
                    </select>
                </div>
                <div class="footBtn">
                    <button class="layui-btn layui-btn-normal" style="width: 200px;" onclick="editGroupMember()">确定</button>
                    <button class="layui-btn" style="width: 200px;" onclick="cancel1()">取消</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
