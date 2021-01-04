var path = "";
$(function () {
    $("#companyIdHidden").val("");
    // 获取公司
    showCompany();
    //获取角色
    showRoleList();
    //显示表格
    showUserTable(1,$("#companyIdHidden").val());
    //获取部门岗位
    showDepartmentPost($("#companyIdHidden").val());
    //根据条件搜索
    $("#searchBtn").click(function(){
        var searchName = $("#searchName").val();
        var top = $(".top").css("height");
        var win = $(window).height();
        var tp = top.indexOf("p");
        var topHeight = top.substring(0,tp);
        var height = win-topHeight-20;
        layui.use('table', function(){
            var table = layui.table;
            table.render({
                elem: '#demo'
                ,height: height
                ,url: path + '/user/searchUsersList?search='+ searchName+'&companyId='+ $("#companyIdHidden").val() //数据接口
                , page: {
                    curr: 1
                } //开启分页
                ,limit: 100
                ,id: 'testReload'
                ,limits: [100,150]
                ,cols: [[ //表头
                    {field: 'userNumber', title: '编号', width:80,sort:true,align:'center'}
                    ,{field: 'userName', title: '姓名', width:80,align:'center'}
                    ,{field: 'sexName', title: '性别', width:60,align:'center'}// 1男
                    ,{field: 'phone', title: '联系方式',align:'center'}
                    ,{field: 'email', title: '邮箱',align:'center'}
                    ,{field: 'stateName', title: '状态', width: 80, sort: true,align:'center'}// 1 在职
                    ,{field: 'companyName', title: '公司',align:'center'}
                    ,{field: 'departName', title: '部门',align:'center'}
                    ,{field: 'postName', title: '岗位',align:'center'}
                    ,{field: 'roleName', title: '角色', width: 260,align:'center'}
                    ,{fixed: '', title:'操作', toolbar: '#barDemo11', width:70,align:'center'}
                ]]
                , parseData: function(res) {}
                ,done: function(res, curr, count){}
            });
            //监听行工具事件
            table.on('tool(test)', function(obj) {
                var data = obj.data;
                $("#userIdHidden").val(data.id);
                $("#userName1").val(data.userName);//姓名
                $("#phone1").val(data.phone);//电话
                layui.use('form', function(){
                    var form = layui.form;
                    if(data.stateName == '在职'){
                        $("input[name=state][value='1']").prop("checked", "true");
                    }else{
                        $("input[name=state][value='0']").prop("checked", "true");
                    }
                    $("#updCompanyList").val(data.companyId);//公司
                    $("#departmentId").val(data.departmentId);//部门
                    $("#postId").val(data.postId);//岗位
                    form.render('select');
                    form.render(); //更新全部
                });
                if (obj.event === 'edit') {
                    $("#searchName").val("");
                    //执行重载
                    table.reload('testReload', {});
                    showUpdate();
                    layer.open({
                        type: 1
                        ,id: 'updateUser' //防止重复弹出
                        ,content: $(".updateUser")
                        ,btnAlign: 'c' //按钮居中
                        ,shade: 0.5 //不显示遮罩
                        ,area: ['100%', '100%']
                        ,yes: function(){}
                    });
                }
            });
        });
        $(".center").css("display", "block");
    });
    //回车查询
    $('#searchName').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            $("#searchBtn").click();
        }
    })
});
//将字符串转化为json
function strToJson(str){
    var json = eval('(' + str + ')');
    return json;
}
// 显示表格
function showUserTable(page,companyId) {
    companyId = $("#companyIdHidden").val();
    var top = $(".top").css("height");
    var win = $(window).height();
    var tp = top.indexOf("p");
    var topHeight = top.substring(0,tp);
    var height = win-topHeight-20;
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demo'
            ,height: height
            ,url: path + '/user/getUserList?companyId='+ companyId //数据接口
            ,page: {
                curr: page //重新从第 1 页开始
            }
            ,limit: 100
            ,id: 'testReload'
            ,limits: [100, 150]
            ,cols: [[ //表头
                {field: 'userNumber', title: '编号', width:80,sort:true,align:'center'}
                ,{field: 'userName', title: '姓名', width:80,align:'center'}
                ,{field: 'sexName', title: '性别', width:60,align:'center'}// 1男
                ,{field: 'phone', title: '联系方式',align:'center'}
                ,{field: 'email', title: '邮箱',align:'center'}
                ,{field: 'stateName', title: '状态', width: 80, sort: true,align:'center'}// 1 在职
                ,{field: 'companyName', title: '公司',align:'center'}
                ,{field: 'departName', title: '部门',align:'center'}
                ,{field: 'postName', title: '岗位',align:'center'}
                ,{field: 'roleName', title: '角色', width: 260,align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemo11', width:70,align:'center'}
            ]]
            , parseData: function(res) {
                // alert("权限认证失败
                //
                // ");demo
            }
            ,done: function(res, curr, count) {

            }
        });
        //监听行工具事件
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            $("#userIdHidden").val(data.id);
            $("#userName1").val(data.userName);//姓名
            $("#phone1").val(data.phone);//电话
            layui.use('form', function(){
                var form = layui.form;
                if(data.stateName == '在职'){
                    $("input[name=state][value='1']").prop("checked", "true");
                }else{
                    $("input[name=state][value='0']").prop("checked", "true");
                }
                $("#updCompanyList").val(data.companyId);//公司
                $("#departmentId").val(data.departmentId);//部门
                $("#postId").val(data.postId);//岗位
                form.render('select');
                form.render(); //更新全部
            });
            if (obj.event === 'edit') {
                $("#searchName").val("");
                //执行重载
                table.reload('testReload', {});
                showUpdate();
                layer.open({
                    type: 1
                    ,id: 'updateUser' //防止重复弹出
                    ,content: $(".updateUser")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.5 //不显示遮罩
                    ,area: ['100%', '100%']
                    ,yes: function(){}
                });
            }
        });
    });
    $(".center").css("display", "block");
}
// 显示公司
function showCompany() {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/user/getCompanyList",
            data: {"parent": 0},
            dataType: "json",
            success: function(data){
                data = data.data;
                $("#companyList").empty();
                $("#companyList1").empty();
                $("#updCompanyList").empty();
                var option="<option value='' >请选择公司名称</option>";
                for (var i = 0; i < data.length; i ++) {
                    option += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                }
                $('#companyList').append(option);
                $("#companyList1").append(option);
                $('#updCompanyList').append(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(companyList1)', function(data){
            $(".layui-form ").css("display", "block");
            $("#companyIdHidden").val(data.value);//得到被选中的值
        });
        form.on('select(companyList)', function(data){
            $("#addCompanyListHidden").val(data.value);//得到被选中的值
            showAddDepartmentPost();
        });
        form.on('select(updCompanyList)', function(data){
            $("#updCompanyListHidden").val(data.value);
            //根据公司id得到部门
            layui.use(['form'], function() {
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: path + "/user/getCompanyList",
                    dataType: "json",
                    data: {"parent": $("#updCompanyListHidden").val()},
                    success: function (data) {
                        data = data.data;
                        $("#departmentId").empty();
                        var option = "";
                        var option = "<option value='0' >请选择部门名称</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                        }
                        $('#departmentId').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    }
                });
                form.on('select(departmentList)', function(data){//  // 选择部门
                    $("#updDepartmentIdHidden").val(data.value);
                })
                $.ajax({
                    type: "GET",
                    url: path + "/user/getPostList",
                    dataType: "json",
                    data: {"companyId": $("#updCompanyListHidden").val()},
                    success: function (data) {
                        console.log(data)
                        $("#postId").empty()
                        var option = "";
                        var option = "<option value='0' >请选择岗位名称</option>";
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                        }
                        $('#postId').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    }
                });
                form.on('select(postList)', function(data){//  选择岗位
                    $("#updPostIdHidden").val(data.value);
                });
            });
        });
    });
}
//显示部门岗位
function showDepartmentPost(companyId) {
    companyId = $("#companyIdHidden").val();
    //根据公司id得到部门
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/user/getCompanyList",
            dataType: "json",
            data: {"parent": companyId},
            success: function (data) {
                data = data.data;
                $("#departmentId").empty();
                var option = "";
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
            url: path + "/user/getPostList",
            dataType: "json",
            data: {"companyId": $("#companyIdHidden").val()},
            success: function (data) {
                $("#postId").empty();
                var option = "<option value='0' >请选择岗位名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                $('#postId').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
    });
}
//显示添加页面部门岗位
function showAddDepartmentPost() {
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/user/getCompanyList",
            dataType: "json",
            data: {"parent": $("#addCompanyListHidden").val()},
            success: function (data) {
                data = data.data;
                $("#departmentList").empty();
                var option = "";
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
        });
        $.ajax({
            type: "GET",
            url: path + "/user/getPostList",
            dataType: "json",
            data: {"companyId": $("#addCompanyListHidden").val()},
            success: function (data) {
                $("#postList").empty();
                var option = "<option value='0' >请选择岗位名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                $('#postList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(postList)', function(data){//  选择岗位
            $("#postIdHidden").val(data.value);
        });
    });
}
//显示角色
function showRoleList() {
    layui.use(['jquery', 'formSelects'], function(){
        var formSelects = layui.formSelects;
        formSelects.config('tags2', {
            keyName: 'name',
            keyVal: 'id',
        }).data('tags2', 'server', {
            url: path + '/user/getRolesMap'
        });
        formSelects.closed('tags2', function(id){
            $("#addRoleListHidden").val(layui.formSelects.value('tags2', 'val'));
        });

        formSelects.config('tags1', {
            keyName: 'name',
            keyVal: 'id',
        }).data('tags1', 'server', {
            url: path + '/user/getRolesMap'
        });
        formSelects.closed('tags1', function(id){
            $("#updRoleListHidden").val(layui.formSelects.value('tags1', 'val'));
        });
    });
}
// 点击显示添加账户
function addBtn() {
    $("#searchName").val("");
    layui.use(['form','laydate'], function() {
        var form = layui.form;
        var laydate = layui.laydate;
        //点我触发
        laydate.render({
            elem: '#test25'
            ,eventElem: '#test25'
            ,trigger: 'click'
        });
        layer.open({
            type: 1
            ,id: 'addUser' //防止重复弹出
            ,content: $(".addUser")
            ,btnAlign: 'c' //按钮居中
            ,shade: 0 //不显示遮罩
            ,area: ['100%', '100%']
            ,yes: function(){}
        });
    });
}
// 启用
function noDisabledSelect() {
    layui.use('form', function(){
        var form = layui.form;
        $("input[name=sex][value='1']").prop("checked", "true");
        form.render('select');
        form.render();
    });
}
//添加账户
function addUser() {
    $("#searchName").val("");
    noDisabledSelect();//启用公司下拉框
    var departmentIdHidden = $("#departmentIdHidden").val();//部门
    var postIdHidden = $("#postIdHidden").val();//岗位
    var companyIdHidden = $("#addCompanyListHidden").val();//公司
    var roles="["+$("#addRoleListHidden").val()+"]";//角色
    if($("#userNumber").val()== "") {
        $("#userNumberSamp").css("display","block");
        return;
    }
    if($("#userName").val()== "") {
        $("#userNameSamp").css("display","block");
        $("#userNumberSamp").css("display","none");
        $("#postSamp").css("display","none");
        $("#departmentSamp").css("display","none");
        return;
    }
    if (companyIdHidden == ""){
        $("#companySamp").css("display","block");
        $("#postSamp").css("display","none");
        $("#userNumberSamp").css("display","none");
        $("#userNameSamp").css("display","none");
        $("#departmentSamp").css("display","none");
        return;
    }
    if (departmentIdHidden == ""){
        $("#departmentSamp").css("display","block");
        $("#userNumberSamp").css("display","none");
        $("#userNameSamp").css("display","none");
        $("#postSamp").css("display","none");
        $("#companySamp").css("display","none");
        return;
    }
    if (postIdHidden == ""){
        $("#companySamp").css("display","none");
        $("#postSamp").css("display","block");
        $("#userNumberSamp").css("display","none");
        $("#userNameSamp").css("display","none");
        $("#departmentSamp").css("display","none");
        return;
    }
    $.ajax({
        type: "GET",
        url: path + "/user/addUser",
        data: $.param({"companyId": companyIdHidden, "departmentId": departmentIdHidden, "postId": postIdHidden, "roles": roles}) + '&' + $("#testAdd").serialize(),
        dataType: "json",
        success: function(data){
            layer.closeAll();
            if (data == "success") {
                showUserTable(1,$("#companyIdHidden").val());
                resetFun();
                noDisabledSelect();//启用公司下拉框
            }else if(data == "haveNumber"){
                alert("该编号已存在");
            } else{
                alert("添加失败");
            }
        }
    });
}
//根据id获取所有角色
function showUpdate() {
    var userId = $("#userIdHidden").val();
    layui.use('form', function() {
        var form = layui.form;
        var formSelects = layui.formSelects;
        //发送角色ID到后台查询用户所绑定的标签id存入到数组中
        var vArray = new Array();
        $.ajax({
            url: path + "/user/getUserRoles",
            data: {"userId": userId},
            type: "get",
            async: true,
            success: function (data) {
                data = strToJson(data);
                //遍历id存入到vArray 数组中
                for (var i = 0; i < data.length; i++) {
                    vArray[i] = data[i].id;
                }
            },
        });
        //这个是查询数据添加到下拉多选框的方法  注意：（动态选中下拉框必须等渲染下拉框完成之后再选中）
        layui.formSelects.config('tags1', {
            searchUrl: path + "/user/getRolesMap",
            success: function(id, url, searchVal, result){
                formSelects.value('tags1', vArray);
            }
        });
        form.render('select');
        form.render(); //更新全部
    });
}
// 修改账户
function updUser() {
    layer.closeAll();
    var userId = $("#userIdHidden").val();
    var roles = "";
    if ($("#updRoleListHidden").val() == "" || $("#updRoleListHidden").val() == null){

    } else {
        roles = "["+$("#updRoleListHidden").val()+"]";
    }
    $.ajax({
        type: "GET",
        url: path + "/user/updateUser",
        data: $.param({"id": userId, "roles": roles}) + '&' + $("#testUpd").serialize(),
        dataType: "json",
        success: function(data){
            layer.closeAll();
            if (data == "success") {
                showUserTable(1,$("#companyIdHidden").val())
            }else{
                alert("修改失败");
            }
        }
    });
}
//重置
function resetFun() {
    $("#email").val("");
    $("#phone").val("");
    $("#userNumber").val("");
    $("#userName").val("");
    $("#userNumberSamp").css("display","none");
    $("#userNameSamp").css("display","none");
    $("#postSamp").css("display","none");
    $("#departmentSamp").css("display","none");
    $("#companySamp").css("display","none");
    layui.use('form', function(){
        var form = layui.form;
        $("#companyList").val("0");
        $("#departmentList").val("0");
        $("#postList").val("0");
        $("#test25").val("");
        form.render('select');
        form.render(); //更新全部
    });
    layui.use(['jquery', 'formSelects'], function () {
        var formSelects = layui.formSelects;
        formSelects.config('tags2', {
            keyName: 'name',
            keyVal: 'id',
        }).data('tags2', 'server', {
            url: path + '/user/getRolesMap'
        });
    });
}
// 取消
function cancel() {
    resetFun();
    layer.closeAll();
}