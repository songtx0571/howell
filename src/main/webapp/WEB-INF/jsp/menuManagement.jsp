<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/menuManagement.css">
    <script type="text/javascript" src="js/week/menuManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
<div class="warp">
    <div class="top">
        <form class="layui-form" action="" style="float: left;">
            <input type="hidden" id="menuListTemplate">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">项目</label>
                    <div class="layui-input-inline">
                        <select name="modules" lay-verify="required" lay-filter="menuList" lay-search="" id="menuList">
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <button class="layui-btn" onclick="showMenu('',2)">添加二级</button>
        <button class="layui-btn" onclick="showMenu('',3)">添加三级</button>
    </div>
    <div class="content">
        <input type="hidden" id="menuId">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="barDemo">
            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
            <a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="up">上移</a>
        </script>
    </div>
    <div class="saveMenuDiv">
        <input type="hidden" id="menuLevelHidden">
        <table>
            <tr class="menuTwoTr">
                <td>一级菜单</td>
                <td>
                    <input type="hidden" id="menuOneListHidden">
                    <form class="layui-form" action="" style="float: left;">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="menuOneList" lay-search=""
                                        id="menuOneList">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr class="menuThreeTr">
                <td>二级菜单</td>
                <td>
                    <input type="hidden" id="menuTwoListHidden">
                    <form class="layui-form" action="" style="float: left;">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="menuTwoList" lay-search=""
                                        id="menuTwoList">
                                </select>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
            <tr>
                <td>名称</td>
                <td>
                    <input type="text" class="menuName" id="menuName">
                </td>
            </tr>
            <tr>
                <td>路径</td>
                <td>
                    <input type="text" class="menuName" id="menuUrl">
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="layui-btn" onclick="saveMenu()">确定</button>
                    <button class="layui-btn" onclick="cancel()">取消</button>
                </td>
            </tr>
        </table>
    </div>
</div>

</body>
</html>
