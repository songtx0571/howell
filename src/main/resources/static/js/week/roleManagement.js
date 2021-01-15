var path = "";
// 角色id
var updateRoleId = $("#updatePermissionRoleId")[0];
var updRoleId = "";
var authoritys = "";
$(function () {
    fillRole();
    showUpdDepartment();
});
//部门下拉框
function showUpdDepartment() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "getDepartmentMap",
            dataType: "json",
            success: function (data) {
                //通用部门下拉框
                $("#updDepartmentList").empty();
                $("#addDepartmentList").empty();
                var option = "<option value='0' >请选择部门名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#updDepartmentList').html(option);
                $('#addDepartmentList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(updDepartmentList)', function (data) {
            $("#updDepartmentHidden").val(data.value)
        });
        form.on('select(addDepartmentList)', function (data) {
            $("#addDepartmentHidden").val(data.value)
        });
    });
}
// 显示角色数据
function fillRole () {
    $.ajax({
        type: "GET",
        url: path + "getRole",
        dataType: "json",
        success: function(data){
            $("#roleTbody tr").remove("tr[id=roleTr123]");
            var tbody = document.getElementById("roleTbody");
            tbody.innerHTML = "";
            for(var i=0;i<data.length;i++){
                var tr = document.createElement("tr");
                tr.setAttribute("class","roleTr");
                var td = "<td>"+data[i].roleName+"</td><td>"+data[i].departmentName+"</td><td>"+data[i].description+"</td><td>"+data[i].description+"</td><td>" +
                    "<shiro:hasPermission name='修改角色'><input type='button' value='修改'  class='layui-btn' onclick='showUpdateRoleDiv("+data[i].id+")' /></shiro:hasPermission>&nbsp;&nbsp;" +
                    "<shiro:hasPermission name='修改权限'><input type='button' value='权限'  class='layui-btn layui-btn-normal' onclick='showUpdateAuthDiv("+data[i].id+")' /></shiro:hasPermission>&nbsp;&nbsp;" +
                    "<shiro:hasPermission name='删除角色'><input type='button' value='删除' class='layui-btn  layui-btn-danger' onclick='delRole("+data[i].id+")'/></shiro:hasPermission></td>";
                tr.innerHTML = td;
                tbody.appendChild(tr);
            }
        }
    })
}
// 将将要修改的角色名称显示在文本框中
function showUpdateRoleDiv(id) {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'updateRole' //防止重复弹出
            , content: $(".updateRole")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
    var updataInput = $("#updataInput")[0];
    var updDescription = $("#updDescription")[0];
    $.ajax({
        url: path + "getRoleById",
        datatype: "json",
        type: "GET",
        data: {"id": id},
        success: function (data) {
            updataInput.value = JSON.parse(data).roleName;
            updDescription.value = JSON.parse(data).description;
            updateRoleId = id;
            layui.use('form', function(){
                var form = layui.form;
                $("#updDepartmentList").val(JSON.parse(data).departmentId);
                form.render('select');
                form.render(); //更新全部
            });
        }
    });
}
// 修改角色
function updateRole() {
    var role = {};
    role.id = updateRoleId;
    role.roleName = $("#updataInput").val();
    role.description = $("#updDescription").val();
    $.ajax({
        url: path + "updateRole",//请求地址
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: JSON.stringify(role),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            layer.closeAll();
            fillRole();
        }
    });
}
// 添加角色
function showAddRoleDiv() {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'addRole1' //防止重复弹出
            , content: $(".addRole1")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
}
function addRole() {
    var role = {};
    role.roleName = $("#addChinaInput").val();
    role.description = $("#addDescription").val();
    role.departmentId = $("#addDepartmentHidden").val();
    if (role.name == ""){
        return;
    }
    if (role.departmentId == ""){
        return;
    }else{
        $.ajax({
            url: path + "addRole",
            dataType: "json",//数据格式
            type: "post",//请求方式
            data: JSON.stringify(role),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                layer.closeAll();
                fillRole();
            }
        });
    }
}
// 删除角色
function delRole(id) {
    $.ajax({
        url: path + "deleteRole",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id},
        success: function (data) {
            fillRole();
        }
    });
}
//显示权限
function showUpdateAuthDiv(roleId) {
    updRoleId = roleId;
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'updateAuth' //防止重复弹出
            , content: $(".updateAuth")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
    var demoData = "";
    layui.use(['element','layer', 'dtree'], function(){
        var dtree1 = layui.dtree,
            $ = layui.$;
        $.ajax({
            url:path + "/getAuthorityURLMap",
            data: {id: roleId},
            type:"GET",
            dataType:"json",
            async:false,
            success:function(result){
                var node = result?result:null;
                if (node!=null) {
                    demoData=node;
                }
            }
        });
        var DTreeNode  = dtree1.render({
            elem: "#demoTree1",  //绑定元素
            checkbar: true,
            data: demoData,  //数据
            checkbarData: "choose"
        });
        // 绑定节点点击事件
        dtree1.on("node(demoTree1)", function(obj){
            var nodeId = obj.param.nodeId;

            DTreeNode.clickNodeCheckbar(nodeId);// 点击节点选中复选框

            var checkedData = dtree1.getCheckbarNodesParam("demoTree1");
            var authoritysId = "";
            for (var i = 0; i < checkedData.length; i ++) {
                authoritysId += checkedData[i].nodeId + ",";
            }
            authoritysId = authoritysId.substring(0,authoritysId.length-1);
            authoritys = "["+authoritysId+"]";
        });
    });
}
//修改权限
function getChecked() {
    $.ajax({
        type:'POST',
        dataType: "json",//数据格式
        url:path + "/distributeRoleAuthority",
        data:{"roleId": updRoleId, "authoritys": authoritys},
        success:function(data){
            if (data == 'SUCCESS'){
                layer.closeAll();
                fillRole();
            } else if (data == 'ERROR'){
                layer.closeAll();
                alert("系统发生错误");
            } else if(data == 'CANCEL'){
                layer.closeAll();
                alert("页面发生错误");
            } else {
                layer.closeAll();
                alert("登录信息失效")
            }
        }
    });
}
// 取消按钮
function cancel() {
    layer.closeAll();
}
