<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/noticeManagement.css">
    <script src="js/week/noticeManagement.js"></script>
    <script type="text/javascript" src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <style>
        .content {
            padding: 15px 10px;
            box-sizing: border-box;
        }
        .btnTop .topList {
            display: flex;
            justify-content: space-around;
            width: 100%;
            background: gainsboro;
            border-radius: 20px;
        }
        .layui-input-inline .xm-select-parent .xm-select{
            height: 36px;
        }
    </style>
</head>
<body>
<div class="warp">
    <div class="content">
        <div class="btnTop">
            <ul class="topList">
                <shiro:hasPermission name="添加通知">
                    <li>
                        <a href="#" onclick="noticeClickFS()">我发送的</a>
                    </li>
                </shiro:hasPermission>
                <li>
                    <a href="#" onclick="noticeClickSD('2')">我收到的</a>
                </li>
                <%--<shiro:hasPermission name="添加通知">--%>
                    <li>
                        <a href="#"onclick="noticeClickSD('3')">查看所有通知</a>
                    </li>
                <%--</shiro:hasPermission>--%>
                <shiro:hasPermission name="添加通知">
                    <li>
                        <a href="#"onclick="showAddInfo()">添加通知</a>
                    </li>
                </shiro:hasPermission>
                <%--<shiro:hasPermission name="通知类型">
                    <li>
                        <a href="#" onclick="typeClick()">类型</a>
                    </li>
                </shiro:hasPermission>--%>
            </ul>
        </div>
        <%--通知--%>
        <script type="text/html" id="barDemoFS">
            <a class="layui-btn layui-btn-sm layui-btn-normal" lay-event="detail">查看</a>
                <shiro:hasPermission name="修改通知">
                    <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
                </shiro:hasPermission>
            <a class="layui-btn layui-btn-sm layui-btn-normal" lay-event="viewed">查看情况</a>
            <a class="layui-btn layui-btn-sm layui-btn-danger" lay-event="del">删除</a>
        </script>
        <div class="demoInfoFS" style="display: none;margin-top: 10px;">
            <table id="demoInfoFS" lay-filter="testFS" style="width: 100%">
            </table>
        </div>
        <%--收到--%>
        <script type="text/html" id="barDemoSD">
            <a class="layui-btn layui-btn-sm" lay-event="detailSD">查看</a>
        </script>
        <div class="demoInfoSD" style="display: none;margin-top: 10px;">
            <table id="demoInfoSD" lay-filter="testSD" style="width: 100%">
            </table>
        </div>
        <%--添加通知--%>
        <div class="addInfo">
            <h1 style="text-align: center;margin-bottom: 30px">添加通知</h1>
            <div>
                <span class="span1">标题:</span>
                <input type="text" style="width: 445px" id="addInfoTitle">
            </div>
            <br>
            <div style="clear: both"></div>
            <div>
                <span class="span1">内容:</span>
                <textarea style="float: left;width: 445px;height: 210px;outline: none;font-size: 18px;" type="text" id="addInfoContent"></textarea>
            </div>
            <br>
            <div style="clear: both"></div>
           <%-- <div class="addInfoDiv">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">类型:&nbsp;&nbsp;</label>
                            <div class="layui-input-inline">
                                <select name="addTypeList" lay-verify="required" lay-filter="addTypeList" lay-search=""
                                        id="addTypeList">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <div class="layui-input-inline">
                                <select name="addTypeSonList" lay-verify="required" lay-filter="addTypeSonList"
                                        lay-search="" id="addTypeSonList">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <input type="hidden" id="addTypeId">
                <input type="hidden" id="addTypeSonId">
            </div>--%>
            <br>
            <div style="clear: both"></div>
            <div>
                <span class="span1">人员:</span>
                <strong id="showUser" style="float: left;width: 160px;line-height: 50px;"></strong>
                <button id="showAddUserBtn" onclick="showAddUser()">选择</button>
            </div>
            <br>
            <div style="clear: both"></div>
            <div>
                <span class="span1">上传:</span>
                <button type="button" class="layui-btn layui-btn-primary" id="test3"><i class="layui-icon"></i>选择文件
                </button>
                <button type="button" class="layui-btn" id="test9">开始上传</button>
            </div>
            <br>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="addInfoBtn" onclick="addInfo()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onclick="cancel()">取消</button>
            </div>
        </div>
        <%--人员列表--%>
        <div class="addUser">
            <h1 style="text-align: center;margin-bottom: 30px">选择人员</h1>
            <div style="margin-top: 10px;">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">公司：</label>
                            <div class="layui-input-inline"
                                 style="width: 300px;float: left;margin-top: 10px;margin-left: -30px;">
                                <select name="modules" lay-verify="required" lay-filter="companyList" lay-search=""
                                        id="companyList">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <input type="hidden" id="companyIdHidden">
            </div>
            <div style="clear: both"></div>
            <div style="margin-top: 10px;">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">部门：</label>
                            <div class="layui-input-inline"
                                 style="width: 300px;float: left;margin-top: 10px;margin-left: -30px;">
                                <select name="modules" lay-verify="required" lay-filter="addUserDepartment"
                                        lay-search="" id="addUserDepartment">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <input type="hidden" id="addUserDepartmentId">
            </div>
            <div style="clear: both"></div>
            <div style="margin-top: 10px;">
                <label style="text-align: right;">人员：</label>
                <div class="layui-input-inline" style="width: 300px;">
                    <select name="tags" id="tags" lay-verify="required" xm-select="tags">
                    </select>
                </div>
                <input type="hidden" id="addUserSelectId">
            </div>
            <div style="clear: both"></div>
            <div style="padding: 32px;line-height: 32px;box-sizing: border-box;">
                <strong style="margin-left: 37px;float: left;">选择的人员有：</strong>
                <samp style="float: left;margin-left: 18px;width: 205px;word-break:break-all"
                      id="checkUser">请选择人员</samp>
            </div>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="addUserBtn" onclick="addUser()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onclick="cancel1()">取消</button>
            </div>
        </div>
        <%--查看通知--%>
        <div class="detail">
            <p id="detailData" hidden></p>
            <div class="detailTop" style="border-bottom:1px solid;height: 70px">
                <button id="downLoad" class="layui-btn layui-btn" onclick="downLoad()"
                        style="margin: 10px 60px;float: right;">下载
                </button>
            </div>
            <div style="margin: 10px;line-height: 28px;font-size: 20px">
                <p style="text-align: center;font-weight: bold" id="detailDataTitle"></p>
                <p style="text-indent: 10px;" id="detailDataContent"></p>
            </div>
        </div>
        <%--编辑通知--%>
        <div class="updateInfo">
            <input type="hidden" id="updInformId">
            <h1 style="text-align: center;margin-bottom: 30px">编辑通知</h1>
            <div>
                <span>标题:</span>
                <input type="text" id="updInfoTitle">
            </div>
            <div style="clear: both"></div>
            <div>
                <span>内容:</span>
                <textarea style="float: left;width: 305px;height: 200px;outline: none;font-size: 18px;" type="text"
                          id="updInfoContent"></textarea>
            </div>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="updInfoBtn" onclick="updInfo()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onclick="cancel()">取消</button>
            </div>
        </div>
        <%--已查看人员--%>
        <div class="viewedInfo">
            <h3 style="text-align: center;margin-bottom: 30px">已查看人员</h3>
            <div id="userAgo"></div>
            <h3 style="text-align: center;margin-bottom: 30px">未查看人员</h3>
            <div id="userAfter"></div>
        </div>
        <%--&lt;%&ndash;类型&ndash;%&gt;
        <script type="text/html" id="barDemo2">
            <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
            <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
        </script>
        <div class="demoType" style="display: none;margin-top: 10px;">
            <table class="demoType1" id="demoType" lay-filter="test" style="width: 100%">
                <tr>
                    <th>
                        <button style="width: 100%;margin-bottom: -10px;border: 1px solid #e6e6e6;height: 75px;color: #666;font-weight: 400;border-bottom: none;font-size: 22px;"
                                onclick="showAddType()">添加
                        </button>
                    </th>
                </tr>
            </table>
        </div>
        <div>
            <input type="hidden" id="addSonTypeTypeId">
        </div>
        &lt;%&ndash;添加父类类型&ndash;%&gt;
        <div class="addType">
            <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
            <div>
                <span>类型名称:</span>
                <input type="text" id="addTypeTypeName">
            </div>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="addTypeBtn" onclick="addType()">确定</button>
                <button onclick="cancel()">取消</button>
            </div>
        </div>
        &lt;%&ndash;添加子类类型&ndash;%&gt;
        <div class="addSonType">
            <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
            <div>
                <span>类型名称:</span>
                <input type="text" id="addSonTypeTypeName">
            </div>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="addSonTypeBtn" onclick="addSonType()">确定</button>
                <button onclick="cancel()">取消</button>
            </div>
        </div>
        &lt;%&ndash;修改父类类型&ndash;%&gt;
        <div class="updateType">
            <h1 style="text-align: center;margin-bottom: 30px;">修改类型</h1>
            <input type="hidden" id="updateTypeId">
            <div>
                <span>类型名称:</span>
                <input type="text" id="updateTypeTypeName">
            </div>
            <div style="clear: both"></div>
            <div class="btnBox">
                <button id="updateTypeBtn" onclick="updateType()">确定</button>
                <button onclick="cancel()">取消</button>
            </div>
        </div>--%>
    </div>
</div>
</body>
</html>
