<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/noticeManagement.css">
    <script src="js/week/noticeManagement.js"></script>
    <script type="text/javascript"  src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <script type="text/javascript"  src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <div class="content">
            <div class="btnTop">
                <div style="margin-top: 20px;">
                    <%--公司：<select name="companyList" id="companyList">--%>
                            <%--<option value="0">请选择公司</option>--%>
                        <%--</select>--%>
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
                    <input type="hidden" id="companyIdHidden">
                </div>
                <div class="noticeType" style="display: none">
                    通知信息：<input type="button" class="topBtn" value="通知" onclick="noticeClick()">
                </div>
                <div class="noticeType" style="display: none">
                    类型信息：<input type="button" class="topBtn" value="类型" onclick="typeClick()">
                </div>
            </div>
            <h1 style="text-align: center">信息</h1>
            <%--通知--%>
            <script type="text/html" id="barDemo1">
                <a class="layui-btn layui-btn-sm" lay-event="detail">查看</a>
                <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
                <a class="layui-btn layui-btn-sm" lay-event="viewed">已查看人员</a>
            </script>
            <div class="demoInfo" style="display: none;margin-top: 10px;">
                <table id="demoInfo" lay-filter="test" style="width: 100%">
                    <tr>
                        <th><button style="width: 100%;margin-bottom: -10px;border: 1px solid #e6e6e6;height: 75px;color: #666;font-weight: 400;border-bottom: none;font-size: 22px;" onclick="showAddInfo()">添加</button></th>
                    </tr>
                </table>
            </div>
            <%--添加通知--%>
            <div class="addInfo">
                <h1 style="text-align: center;margin-bottom: 30px">添加通知</h1>
                <div>
                    <span>标题:</span>
                    <input type="text" id="addInfoTitle">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>内容:</span>
                    <textarea  style="float: left;width: 230px;height: 100px;outline: none;font-size: 18px;" type="text" id="addInfoContent"></textarea>
                </div>
                <div style="clear: both"></div>
                <div class="addInfoDiv">
                    <%--<span style="height: 108px;line-height: 108px;">类型:</span>--%>
                    <%--<select name="addTypeList" id="addTypeList">--%>
                        <%--<option value="0">请选择总类型</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">类型&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <div class="layui-input-inline">
                                    <select name="addTypeList" lay-verify="required" lay-filter="addTypeList" lay-search="" id="addTypeList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <%--<select name="addTypeSonList" id="addTypeSonList">--%>
                        <%--<option value="0">请选择子类型</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <div class="layui-input-inline">
                                    <select name="addTypeSonList" lay-verify="required" lay-filter="addTypeSonList" lay-search="" id="addTypeSonList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addTypeId">
                    <input type="hidden" id="addTypeSonId">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>人员:</span>
                    <strong id="showUser" style="float: left;width: 160px;line-height: 50px;"></strong>
                    <button id="showAddUserBtn" onclick="showAddUser()">选择</button>
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>上传:</span>
                    <button type="button" class="layui-btn layui-btn-primary" id="test3" ><i class="layui-icon"></i>上传文件</button>
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addInfoBtn">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--人员列表--%>
            <div class="addUser">
                <h1 style="text-align: center;margin-bottom: 30px">选择人员</h1>
                <div style="margin-top: 10px;">
                    <%--<span>部门：</span>--%>
                    <%--<select name="addUserDepartment" id="addUserDepartment">--%>
                        <%--<option value="0">按照部门查询</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">部门</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required" lay-filter="addUserDepartment" lay-search="" id="addUserDepartment">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addUserDepartmentId">
                </div>
                <div style="clear: both"></div>
                <div style="margin-top: 10px;">
                    <label>人员：</label>
                    <div class="layui-input-inline" style="width: 68%;">
                        <select name="tags" id="tags" lay-verify="required" xm-select="tags" xm-select-skin="normal">
                        </select>
                    </div>
                    <input type="hidden" id="addUserSelectId">
                </div>
                <div style="clear: both"></div>
                <div style="padding: 32px;line-height: 32px;box-sizing: border-box;">
                    <strong style="margin-left: 37px;float: left;">选择的人员有：</strong>
                    <samp style="float: left;margin-left: 18px;width: 205px;word-break:break-all" id="checkUser">请选择人员</samp>
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addUserBtn" onclick="addUser()">确定</button>
                    <button onclick="cancel1()">取消</button>
                </div>
            </div>
            <%--查看通知--%>
            <div class="detail">
                <p id="detailData" hidden></p>
                <div class="detailTop" style="border-bottom:1px solid;height: 70px">
                    <button id="downLoad" class="layui-btn layui-btn" onclick="downLoad()" style="margin: 10px 60px;float: right;">下载</button>
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
                    <textarea  style="float: left;width: 305px;height: 200px;outline: none;font-size: 18px;" type="text" id="updInfoContent"></textarea>
                </div>
                <div style="clear: both"></div>
                <%--<div style="height: 108px;margin: 13px 0">
                    <span style="height: 108px;line-height: 108px;">类型:</span>
                    <select name="addTypeList" id="updTypeList" style="cursor: not-allowed;" disabled>
                        <option value="0">请选择总类型</option>
                    </select>
                    <br><br><br>
                    <select name="addTypeSonList" id="updTypeSonList" style="cursor: not-allowed;" disabled>
                        <option value="0">请选择子类型</option>
                    </select>
                    <input type="hidden" id="updTypeId">
                    <input type="hidden" id="updTypeSonId">
                </div>
                <div style="clear: both"></div>--%>
                <%--<div>
                    <span>上传:</span>
                    <button type="button" class="layui-btn layui-btn-primary" id="test4" ><i class="layui-icon"></i>上传文件</button>
                </div>
                <div style="clear: both"></div>--%>
                <div class="btnBox">
                    <button id="updInfoBtn" onclick="updInfo()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--已查看人员--%>
            <div class="viewedInfo">
                <h1 style="text-align: center;margin-bottom: 30px">已查看过的人员</h1>
                <div id="userAgo"></div>
            </div>
            <%--修改通知--%>
            <%--类型--%>
            <script type="text/html" id="barDemo2">
                <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
            </script>
            <div class="demoType" style="display: none;margin-top: 10px;">
                <table class="demoType1" id="demoType" lay-filter="test" style="width: 100%">
                    <tr>
                        <th><button style="width: 100%;margin-bottom: -10px;border: 1px solid #e6e6e6;height: 75px;color: #666;font-weight: 400;border-bottom: none;font-size: 22px;" onclick="showAddType()">添加</button></th>
                    </tr>
                </table>
            </div>
            <div>
                <input type="hidden" id="addSonTypeTypeId">
            </div>
            <%--添加父类类型--%>
            <div class="addType">
                <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="addTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="addCompanyList" id="addCompanyList">--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">公司：</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required" lay-filter="addCompanyList" lay-search="" id="addCompanyList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addCompanyId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addTypeBtn" onclick="addType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--添加子类类型--%>
            <div class="addSonType">
                <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="addSonTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="addSonCompanyList" id="addSonCompanyList" style="cursor: not-allowed;" disabled>--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">公司</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required"  lay-filter="addSonCompanyList" lay-search="" id="addSonCompanyList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addSonCompanyId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addSonTypeBtn" onclick="addSonType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--修改父类类型--%>
            <div class="updateType">
                <h1 style="text-align: center;margin-bottom: 30px;">修改类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="updateTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="updateCompanyList" id="updateCompanyList" disabled="disabled" style="cursor:no-drop;">--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <%--<form class="layui-form" action="">--%>
                        <%--<div class="layui-form-item">--%>
                            <%--<div class="layui-inline">--%>
                                <%--<label class="layui-form-label">公司</label>--%>
                                <%--<div class="layui-input-inline">--%>
                                    <%--<select name="modules" lay-verify="required"  disabled="disabled" style="cursor:no-drop;" lay-filter="updateCompanyList" lay-search="" id="updateCompanyList">--%>
                                    <%--</select>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</form>--%>
                    <input type="hidden" id="updateCompanyId">
                    <input type="hidden" id="updateTypeId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="updateTypeBtn" onclick="updateType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
