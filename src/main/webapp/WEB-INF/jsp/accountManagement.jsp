<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/accountManagement.css">
    <script type="text/javascript" src="js/week/accountManagement.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
</head>
<body>
    <div class="warp">
        <%--头部--%>
        <div class="top">
           <div style="margin: 0 auto;width: 750px;">
                <shiro:hasPermission name='可选公司'>
               <div class="companyDiv">
                   <form class="layui-form" action="">
                       <div class="layui-form-item">
                           <div class="layui-inline">
                               <div class="layui-input-inline">
                                   <select name="modules" lay-verify="required" lay-filter="companyList1" lay-search="" id="companyList1">
                                   </select>
                               </div>
                           </div>
                       </div>
                   </form>
               </div>
                </shiro:hasPermission>
               <%--搜索员工--%>
               <div style="float: left;">
                   <input type="text" placeholder="请输入员工编号/姓名" id="searchName">
                   <input type="button" value="搜索" class="btn" id="searchBtn" >
               </div>
               <%--添加按钮--%>
               <shiro:hasPermission name='添加新账户'>
               <div class="addBox" id="addBox">
                   <button class="layui-btn" id="addBtn" onclick="addBtn()" style="width: 60px;">+</button>
               </div>
               </shiro:hasPermission>
               <p style="clear: both"></p>
           </div>
        </div>
    <shiro:hasPermission name='账户查看'>
        <div class="center">
            <input type="hidden" id="companyIdHidden">
            <input type="hidden" id="departmentIdHidden">
            <input type="hidden" id="postIdHidden">

            <%--账户信息表格--%>
            <table id="demo" lay-filter="test"></table>
            <form  id="testAdd" method="post" target="iframe1" class="layui-form" action="">
                <%--添加页面--%>
                <div class="addUser">
                    <div style="margin: 10px auto 0;width: 530px">
                        <h1 style="text-align: center;margin-bottom: 30px">添加账户</h1>
                        <div class="userInputDiv">
                            <span><samp>*</samp>编号:</span>
                            <input type="text" name="userNumber" id="userNumber" style="width: 296px"/>
                            <samp style="position: absolute;right: -4px;top: 6px;color: red;display: none;" id="userNumberSamp">请输入编号</samp>
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>姓名:</span>
                            <input type="text" id="userName" name="userName" style="width: 296px">
                            <samp style="position: absolute;right: -4px;top: 6px;color: red;display: none;" id="userNameSamp">请输入姓名</samp>
                        </div>
                        <div class="userInputDiv">
                            <input type="hidden" id="addCompanyListHidden">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>公司:</label>
                                    <div class="layui-input-inline">
                                        <select name="companyId" lay-verify="required" lay-filter="companyList" lay-search="" id="companyList">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <samp style="position: absolute;right: -4px;top: 6px;color: red;display: none;" id="companySamp">请输入公司</samp>
                        </div>
                        <div class="userInputDiv">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>部门:</label>
                                    <div class="layui-input-inline">
                                        <select name="modules" lay-verify="required" lay-filter="departmentList" lay-search="" id="departmentList">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <samp style="position: absolute;right: -4px;top: 6px;color: red;display: none;" id="departmentSamp">请输入部门</samp>
                        </div>
                        <div class="userInputDiv">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>岗位:</label>
                                    <div class="layui-input-inline">
                                        <select name="modules" lay-verify="required" lay-filter="postList" lay-search="" id="postList">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <samp style="position: absolute;right: -4px;top: 6px;color: red;display: none;" id="postSamp">请输入岗位</samp>
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>性别:</span>
                            <div style="float:left;line-height: 50px;">
                                男&nbsp;&nbsp;<input type="radio" name="sex" checked="checked" value="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女&nbsp;&nbsp;<input type="radio" name="sex" value="0">
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <span>联系电话:</span>
                            <input type="text" id="phone" name="phone" style="width: 296px">
                        </div>
                        <div class="userInputDiv">
                            <div class="layui-form">
                                <div class="layui-form-item">
                                    <div class="layui-inline">
                                        <label class="layui-form-label" id="test25-1" style="width: 115px;">入职日期:</label>
                                        <div class="layui-input-inline">
                                            <input type="text" class="layui-input" name="entryDate" id="test25" readonly="" placeholder="yyyy-MM-dd">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <span>邮箱:</span>
                            <input type="text" id="email" name="email" placeholder="123_aa@aa.com" style="width: 296px">
                        </div>
                        <div class="userInputDiv2">
                            <input type="hidden" id="addRoleListHidden">
                            <div class="layui-inline">
                                <label class="layui-form-label" style="width: 115px;">角色：</label>
                                <div class="layui-input-inline">
                                    <select name="tags2" id="tags2" lay-verify="tags2" xm-select="tags2">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="btnBox">
                            <button onclick="addUser()">确定</button>
                            <button onclick="cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </form>
            <form  id="testUpd" method="post" target="iframe2" class="layui-form" action="">
                <%--修改页面--%>
                <div class="updateUser">
                    <div style="width:440px;">
                        <h1 style="text-align: center;margin-bottom: 30px">修改账户</h1>
                        <input type="hidden" id="userIdHidden">
                        <div class="userInputDiv">
                            <span><samp>*</samp>姓名:</span>
                            <input type="text" id="userName1" name="userName">
                        </div>
                        <div class="userInputDiv">
                            <input type="hidden" id="updCompanyListHidden">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>公司:</label>
                                    <div class="layui-input-inline">
                                        <select name="companyId" lay-verify="required" lay-filter="updCompanyList" lay-search="" id="updCompanyList">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>部门:</label>
                                    <div class="layui-input-inline">
                                        <select name="departmentId" lay-verify="required" lay-filter="departmentId" lay-search="" id="departmentId">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label" style="width: 115px;"><samp>*</samp>岗位:</label>
                                    <div class="layui-input-inline">
                                        <select name="postId" lay-verify="required" lay-filter="postId" lay-search="" id="postId">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <span>联系电话:</span>
                            <input type="text" id="phone1" name="phone">
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>在职状态:</span>
                            <div style="float:left;line-height: 50px;">
                                在职&nbsp;&nbsp;<input type="radio" name="state" value="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离职&nbsp;&nbsp;<input type="radio" name="state" value="0">
                            </div>
                        </div>
                        <div class="userInputDiv2">
                            <input type="hidden" id="updRoleListHidden">
                            <div class="layui-inline">
                                <label class="layui-form-label" style="width: 115px;">角色：</label>
                                <div class="layui-input-inline">
                                    <select name="tags1" id="tags1" lay-verify="tags1" xm-select="tags1">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="btnBox">
                            <button onclick="updUser()">确定</button>
                            <button onclick="cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </form>
            <iframe id="iframe1" name="iframe1" style="display:none;"></iframe>
            <iframe id="iframe2" name="iframe2" style="display:none;"></iframe>
        </div>
    </shiro:hasPermission>
    </div>
    <shiro:hasPermission name='修改账户信息'>
    <script type="text/html" id="barDemo11">
            <a class="layui-btn layui-btn-xs" lay-event="edit" id="showUpdataUser">编辑</a>
    </script>
    </shiro:hasPermission>
</body>
</html>
