<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/accountManagement.css">
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <%--头部--%>
        <div class="top">
           <div class="companyDiv">
               <%--公司：<select name="companyList" id="companyList">--%>
                       <%--<option value="0">请选择公司</option>--%>
                       <%--<option value="1">111</option>--%>
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
           </div>
            <div class="departmentDiv">
                <%--部门：<select name="departmentList" id="departmentList">
                        <option value="0">请选择部门</option>
                        <option value="1">111</option>
                    </select>--%>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">部门</label>
                            <div class="layui-input-inline">
                                <select name="modules" lay-verify="required" lay-filter="departmentList" lay-search="" id="departmentList">
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="postDiv">
                <%--岗位：<select name="departmentList" id="postList">
                        <option value="0">请选择岗位</option>
                        <option value="1">111</option>
                    </select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">岗位</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required" lay-filter="postList" lay-search="" id="postList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>
            <p style="clear: both"></p>
        </div>
        <div class="center">
            <input type="hidden" id="companyIdHidden">
            <input type="hidden" id="departmentIdHidden">
            <input type="hidden" id="postIdHidden">
            <%--添加按钮--%>
            <div class="addBox" id="addBox">
                <button class="addBtn" id="addBtn" onclick="addBtn()">创建</button>
            </div>
            <%--账户信息表格--%>
            <h1 style="text-align: center">账户信息表格</h1>
            <table id="demo" lay-filter="test"></table>
            <form  id="testAdd" method="post" target="iframe1" class="layui-form" action="">
                <%--添加页面--%>
                <div class="addUser">
                    <div style="margin: 10px auto 0;width: 638px">
                        <h1 style="text-align: center;margin-bottom: 30px">添加账户</h1>
                        <div class="userInputDiv" style="height: 100px;">
                            <%--<span><samp>*</samp>编号:</span>--%>
                            <%--<select name="" id="userNumberSelect"></select>--%>
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label"><samp>*</samp>编号:</label>
                                    <div class="layui-input-inline">
                                        <select name="" lay-verify="required" lay-filter="userNumberSelect" lay-search="" id="userNumberSelect">
                                        </select>
                                        <input type="number" id="userNumberInput" style="width: 250px;margin-top: 10px;" placeholder="请输入数字">
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="userNumberSelectValue">
                            <input type="hidden" name="userNumber" id="userNumber">
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>姓名:</span>
                            <input type="text" id="userName" name="userName">
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>性别:</span>
                            <div style="float:left;line-height: 50px;">
                                男&nbsp;&nbsp;<input type="radio" name="sex" checked="checked" value="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女&nbsp;&nbsp;<input type="radio" name="sex" value="0">
                            </div>
                        </div>
                        <div class="userInputDiv">
                            <span>联系电话:</span>
                            <input type="text" id="phone" name="phone">
                        </div>
                        <div class="userInputDiv">
                            <span>邮箱:</span>
                            <input type="text" id="email" name="email" placeholder="123_aa@aa.com">
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
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label"><samp>*</samp>部门:</label>
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
                                    <label class="layui-form-label"><samp>*</samp>岗位:</label>
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
                            <span>邮箱:</span>
                            <input type="text" id="email1" name="email">
                        </div>
                        <div class="userInputDiv">
                            <span><samp>*</samp>在职状态:</span>
                            <div style="float:left;line-height: 50px;">
                                在职&nbsp;&nbsp;<input type="radio" name="state" value="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离职&nbsp;&nbsp;<input type="radio" name="state" value="0">
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
    </div>

    <script type="text/html" id="barDemo11">
        <a class="layui-btn layui-btn-xs" lay-event="edit" id="showUpdataUser">编辑</a>
    </script>
    <script>
        var index=0;//layer弹窗
        //var path = "http://192.168.1.26:8080/";
        var path = "";
        $(function () {
            // 获取公司
            showCompany();
        });
        // 显示表格
        function showUserTable() {
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#demo'
                    ,height: 470
                    ,url: path + 'user/getUserList?companyId='+$("#companyIdHidden").val()  //数据接口
                    ,page: true //开启分页
                    ,limit: 10
                    ,limits: [10, 20, 30]
                    ,cols: [[ //表头
                        // {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left',}
                        {field: 'userNumber', title: '编号', width:80}
                        ,{field: 'userName', title: '姓名', width:100}
                        ,{field: 'sexName', title: '性别', width:80}// 1男
                        ,{field: 'phone', title: '联系方式'}
                        ,{field: 'email', title: '邮箱'}
                        ,{field: 'stateName', title: '在职状态', width: 100, sort: true}// 1 在职
                        ,{field: 'companyName', title: '公司'}
                        ,{field: 'departName', title: '部门'}
                        ,{field: 'postName', title: '岗位'}
                        ,{fixed: '', title:'操作', toolbar: '#barDemo11', width:70,align:'center '}
                    ]]
                    ,done: function(res, curr, count){
                    }
                });
                //监听行工具事件
                table.on('tool(test)', function(obj) {
                    var data = obj.data;
                    $("#userIdHidden").val(data.id)
                    $("#userName1").val(data.userName)
                    $("#departmentId").val(data.departmentId)
                    $("#postId").val(data.postId)
                    $("#phone1").val(data.phone)
                    $("#email1").val(data.email)
                    $("input[name=state]").eq(0).attr("checked", true);
                    // console.log(data)
                    if (obj.event === 'edit') {
                        index=layer.open({
                            type: 1
                            ,id: 'updateUser' //防止重复弹出
                            ,content: $(".updateUser")
                            ,btnAlign: 'c' //按钮居中
                            ,shade: 0 //不显示遮罩
                            ,area: ['440px', '400px']
                            ,yes: function(){
                            }
                        });
                    }
                });
            });
        }
        // 显示公司
        function showCompany() {
            layui.use(['form'], function(){
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: "http://192.168.1.26:8080/user/getCompanyList",
                    data: {"parent": 0},
                    dataType: "json",
                    success: function(data){
                        data = data.data;
                        console.log(data)
                        $("#companyList").empty()
                        var option="<option value='0' >请选择公司名称</option>"
                        for (var i = 0; i < data.length; i ++) {
                            option += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                        }
                        $('#companyList').append(option);
                        form.render();//菜单渲染 把内容加载进去
                    },
                    error : function (err) {
                        console.log(err)
                    }
                });
                form.on('select(companyList)', function(data){
                    $(".departmentDiv").css("display", "block")
                    $(".postDiv").css("display", "block")
                    $(".addBtn").css("display", "block")
                    $(".layui-form ").css("display", "block")
                    showUserNumber();
                    $("#companyIdHidden").val(data.value);//得到被选中的值
                    //根据公司id得到部门
                    layui.use(['form'], function() {
                        var form = layui.form;
                        $.ajax({
                            type: "GET",
                            url: path + "user/getCompanyList",
                            dataType: "json",
                            data: {"parent": $("#companyIdHidden").val()},
                            success: function (data) {
                                data = data.data;
                                $("#departmentList").empty();
                                var option = ""
                                var option = "<option value='0' >请选择部门名称</option>"
                                for (var i = 0; i < data.length; i++) {
                                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                                }
                                $('#departmentList').html(option);
                                form.render();//菜单渲染 把内容加载进去
                            }
                        });
                        form.on('select(departmentList)', function(data){//  // 选择部门
                            $("#departmentIdHidden").val(data.value);
                        })
                        $.ajax({
                            type: "GET",
                            url: path + "user/getCompanyList",
                            dataType: "json",
                            data: {"parent": $("#companyIdHidden").val()},
                            success: function (data) {
                                data = data.data;
                                $("#departmentId").empty()
                                var option = ""
                                var option = "<option value='0' >请选择部门名称</option>"
                                for (var i = 0; i < data.length; i++) {
                                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                                }
                                $('#departmentId').html(option);
                                form.render();//菜单渲染 把内容加载进去
                            }
                        });
                        $.ajax({
                            type: "GET",
                            url: path + "user/getPostList",
                            dataType: "json",
                            data: {"companyId": $("#companyIdHidden").val()},
                            success: function (data) {
                                $("#postList").empty()
                                var option = "<option value='0' >请选择岗位名称</option>"
                                for (var i = 0; i < data.length; i++) {
                                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                                }
                                $('#postList').html(option);
                                form.render();//菜单渲染 把内容加载进去
                            }
                        });
                        form.on('select(postList)', function(data){//  选择岗位
                            $("#postIdHidden").val(data.value);
                        });
                        $.ajax({
                            type: "GET",
                            url: path + "user/getPostList",
                            dataType: "json",
                            data: {"companyId": $("#companyIdHidden").val()},
                            success: function (data) {
                                $("#postId").empty()
                                var option = ""
                                for (var i = 0; i < data.length; i++) {
                                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                                }
                                $('#postId').html(option);
                                form.render();//菜单渲染 把内容加载进去
                            }
                        });
                        showUserTable()
                    });
                });
            });
        }
        // 点击显示添加账户
        function addBtn() {
            $(".addUser").css("display", "block");
        }
        // 根据公司id得到将要添加的公司编号
        function showUserNumber() {
            layui.use(['form'], function() {
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: path + "user/getCodeNameList",
                    dataType: "json",
                    data: {"companyId": $("#companyIdHidden").val()},
                    success: function (data) {
                        $("#userNumberSelect").empty()
                        var option = "<option value='0' >请选择部门名称</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].text + "'>" + data[i].text + "</option>"
                        }
                        $('#userNumberSelect').html(option);
                    }
                });
                form.on('select(userNumberSelect)', function (data) {// 添加公司时，公司代号发生改变
                    $("#userNumberSelectValue").val(data.value);
                    $("#userNumber").val($("#userNumberSelectValue").val() + $("#userNumberInput").val());
                })
            });
        }
        //添加账户
        function addUser() {
            // 公司编号
            $("#userNumber").val($("#userNumberSelectValue").val() + $("#userNumberInput").val());
            var departmentIdHidden = $("#departmentIdHidden").val();
            var postIdHidden = $("#postIdHidden").val();
            var companyIdHidden = $("#companyIdHidden").val();
            if (departmentIdHidden == "" || postIdHidden == ""){
                alert("请选择部门和岗位，才可添加账号");
                return;
            }
            //正则
            if(!(/^1[3456789]\d{9}$/.test($("#phone").val()))) {
                alert("手机号码格式输入错误")
                return;
            }
            /*if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test($("#email").val()))) {
                alert("邮箱格式输入错误")
            }*/
            $.ajax({
                type: "GET",
                url: path + "user/addUser",
                data: $.param({"companyId": companyIdHidden, "departmentId": departmentIdHidden, "postId": postIdHidden}) + '&' + $("#testAdd").serialize(),
                dataType: "json",
                success: function(data){
                    if (data == "success") {
                        alert("添加成功")
                        showUserTable()
                        $("#email").val("");
                        $("#phone").val("");
                        $("#userNumberInput").val("");
                        $("#userName").val("")
                        // $("#userNumberSelect").val("0")
                        // $("input[name=sex]").eq(0).attr("checked", true);
                    }else{
                        alert("添加失败")
                    }
                    $(".addUser").css("display", "none");
                },

                error : function (err) {
                    console.log(err)
                }
            });
        }
        // 修改账户
        function updUser() {
            layer.close(index);
            console.log($("#testUpd").serialize())
            //正则
            if(!(/^1[3456789]\d{9}$/.test($("#phone1").val()))) {
                alert("手机号码格式输入错误")
                return;
            }
            // if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test($("#email1").val()))) {
            //     alert("邮箱格式输入错误")
            //     return;
            // }
            var userId = $("#userIdHidden").val();
            $.ajax({
                type: "GET",
                url: path + "user/updateUser",
                data: $.param({"id": userId}) + '&' + $("#testUpd").serialize(),
                dataType: "json",
                success: function(data){
                    if (data == "success") {
                        alert("修改成功")
                        showUserTable()
                    }else{
                        alert("修改失败")
                    }
                    layer.close(index);
                },
                error : function (err) {
                    console.log(err)
                }
            });
        }
        // 取消
        function cancel() {
            $(".addUser").css("display", "none")
            layer.close(index);
        }
    </script>

</body>
</html>
