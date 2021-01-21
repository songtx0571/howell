<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/homePopup.css">
    <script type="text/javascript" src="js/week/homePopup.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
</head>
<body>
    <div class="warp">
        <input type="hidden" value="${param.data}" id="dataHidden">
        <div class="content">
            <%--个人信息--%>
            <div class="infoDiv">
                <div>
                    <input type="hidden" id="employeeId">
                    <form class="layui-form" action="">
                        <table cellspacing="0" >
                            <caption align="top">个人信息</caption>
                            <tr >
                                <td>员工编号：</td>
                                <td><input type="text" name="uUserName" id="uUserName" disabled="disabled"></td>
                                <td>姓名：</td>
                                <td><input type="text" name="uName" id="uName"></td>
                            </tr>
                            <tr>
                                <td>身份证号：</td>
                                <td><input type="text" name="uIdnumber" id="uIdnumber"></td>
                                <td>工资卡号：</td>
                                <td><input type="text" name="uCard" id="uCard"></td>
                            </tr>
                            <tr>
                                <td>联系方式：</td>
                                <td><input type="text" name="uPhone" id="uPhone"></td>
                                <td>邮箱：</td>
                                <td><input type="text" id="uEmail" name="uEmail"></td>
                            </tr>
                            <tr>
                                <td>衣服尺寸：</td>
                                <td><input type="text" name="uCloshe" id="uCloshe"></td>
                                <td>安全帽编号：</td>
                                <td><input type="text" name="uHat" id="uHat"></td>
                            </tr>
                            <tr>
                                <td>应急联系人：</td>
                                <td><input type="text" name="uEmergency" id="uEmergency"></td>
                                <td>应急联系人电话：</td>
                                <td><input type="text" name="uEmergencyTel" id="uEmergencyTel"></td>
                            </tr>
                            <tr>
                                <td>学历：</td>
                                <td colspan="3"><input type="text" name="uEducation" id="uEducation"></td>
                            </tr>
                            <tr>
                                <td>开户行：</td>
                                <td><input type="text" name="uBank" id="uBank"></td>
                                <td>家庭住址：</td>
                                <td><input type="text" name="uAddress" id="uAddress"></td>
                            </tr>
                        </table>
                        <div style="width: 400px;margin: 25px auto 0;display: flex;justify-content: space-around">
                            <button type="button" class="layui-btn" onclick="updateInfo()">确定</button>
                            <button type="button" class="layui-btn" onclick="cancel()">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <%--修改密码--%>
        <div class="updPwd">
            <table>
                <tr>
                    <td>新密码:</td>
                    <td><input type="password" id="pwd1" lay-verify="pass" placeholder="请输入数字或者字母" onkeyup="value=value.replace(/[^0-9,a-z,A-Z]/g,'')" /></td>
                </tr>
                <tr>
                    <td>确定密码:</td>
                    <td><input type="password" id="pwd2" lay-verify="pass" placeholder="请输入数字或者字母"  onkeyup="value=value.replace(/[^0-9,a-z,A-Z]/g,'')" /></td>
                </tr>
                <tr class="tips">
                    <td colspan="2" style="color: red;text-align: center;">两次密码输入不相同</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center"><button type="button" class="layui-btn" onclick="updatePwd()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="layui-btn" onclick="reset()">密码重置</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="layui-btn" onclick="cancel()">取消</button></td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
