var path = "";
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
                var td = "<td>"+data[i].roleName+"</td><td>"+data[i].departmentName+"</td><td>"+data[i].description+"</td><td>" +
                       + "<shiro:hasPermission name='修改角色'><input type='button' value='修改'  class='layui-btn' onclick='showUpdateRoleDiv("+data[i].id+")' /></shiro:hasPermission>" +
                       + "<shiro:hasPermission name='删除角色'><input type='button' value='删除' class='layui-btn' onclick='delRole("+data[i].id+")'/></shiro:hasPermission></td>";
                tr.innerHTML = td;
                tbody.appendChild(tr);
            }
        }
    })
}
// 角色id
var updataRoleId = $("#updataPermissionRoleId")[0];
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
            updataRoleId = id;
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
    role.id = updataRoleId;
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

// 查看角色权限
function showRolePermission(id) {
    $("#permissionRoleId").val(id)
    $(".white_content1")[0].style.display = "block"
    fillPermission()
    setTimeout(function () {
        fillChecked(id);
    }, 1000);
}
//显示权限管理数据
function fillPermission(){
    $('#permissionFrom').html('');
    $.ajax({
        url: path + "getPermissionByparentId",//请求地址
        datatype: "json",//数据格式
        type: "get",//请求方式
        data: {"parentId": 0},
        success: function (data) {
            data = JSON.parse(data)
            var permissionFrom = document.getElementById('permissionFrom'); //2、找到父级元素
            for(var i=0;i<data.length;i++){
                var div = document.createElement('div');
                div.setAttribute("id","div-"+data[i].id);
                div.innerHTML = "<input type='checkbox' id='check-"+data[i].id+"' value='"+data[i].id+"' onclick='change1("+data[i].id+")'>" +
                    "<label id='labelcheck' for='check-"+data[i].id+"'></label>"+ data[i].permissionName;
                permissionFrom.appendChild(div);
                fillPermissionChild(data[i].id);
            }
        }
    });
}
function fillChecked(roleId){
    $.ajax({
        url: path + "getRolePermissionByRoleId",//请求地址
        datatype: "json",//数据格式
        type: "get",//请求方式
        data: {"roleId": roleId},
        success: function (data) {
            data = JSON.parse(data)
            for(var i=0;i<data.length;i++){
                if(data[i].type==1){
                    if(data[i].parentId1==0){
                        if(data[i].parentId2==0){
                            document.getElementById('check-'+data[i].permissionId).checked = true;
                        }else{
                            document.getElementById('check-'+data[i].parentId2+'-'+data[i].permissionId).checked = true;
                        }
                    }else{
                        document.getElementById('check-'+data[i].parentId1+'-'+data[i].parentId2+'-'+data[i].permissionId).checked = true;
                    }
                }
            }
        }
    });
}
function fillPermissionChild(id){
    $.ajax({
        url: path + "getPermissionByparentId",//请求地址
        datatype: "json",//数据格式
        type: "get",//请求方式
        data: {"parentId": id},
        success: function (data) {
            data = JSON.parse(data)
            if(data.length>0){
                var permissionFrom = document.getElementById('div-'+id);
                for(var i=0;i<data.length;i++){
                    var div = document.createElement('div')
                    div.setAttribute("id",'div-'+id+'-'+data[i].id);
                    div.innerHTML = "<input type='checkbox' id='check-"+id+"-"+data[i].id+"' value='"+data[i].id+"' onclick='change2("+id+","+data[i].id+")'>" +
                        "<label id='labelcheck' for='check-"+id+"-"+data[i].id+"'></label>"+ data[i].permissionName;
                    permissionFrom.appendChild(div);
                    fillPermissionChild2(id,data[i].id)
                }
            }
        }
    });
}
function fillPermissionChild2(parentId,id){
    $.ajax({
        url: path + "getPermissionByparentId",//请求地址
        datatype: "json",//数据格式
        type: "post",//请求方式
        data: {"parentId": id},
        success: function (data) {
            data = JSON.parse(data)
            if(data.length>0){
                var permissionFrom = document.getElementById('div-'+parentId+'-'+id);
                for(var i=0;i<data.length;i++){
                    var div = document.createElement('div')
                    div.setAttribute("id",'div-'+parentId+'-'+id+'-'+data[i].id);
                    div.innerHTML = "<input type='checkbox' id='check-"+parentId+"-"+id+"-"+data[i].id+"' onclick='change3("+parentId+","+id+","+data[i].id+")' value='"+data[i].id+"'>" +
                        "<label id='labelcheck' for='check-"+parentId+"-"+id+"-"+data[i].id+"'></label>"+ data[i].permissionName;
                    permissionFrom.appendChild(div);
                    fillPermissionChild2(id,data[i].id)
                }
            }
        }
    });
}
function change1(id){
    var obj = document.getElementById('check-'+id);
    $("input[id^=check-"+id+"]").each(function(){
        this.checked = obj.checked;
    })
}
function change2(parentId,id){
    var obj = document.getElementById('check-'+parentId+'-'+id);
    if(!obj.checked){
        document.getElementById('check-'+parentId).checked = false;
    }
    $("input[id^=check-"+parentId+"-"+id+"]").each(function(){
        this.checked = obj.checked;
    })
}
function change3(parentId,id,childId){
    var obj = document.getElementById('check-'+parentId+'-'+id+'-'+childId);
    if(!obj.checked){
        document.getElementById('check-'+parentId).checked = false;
        document.getElementById('check-'+parentId+'-'+id).checked = false;
    }
}
//修改权限
function addUpdPermission(){
    var roleId = $('#permissionRoleId').val();
    var checkVal = new Array();
    $('input[id^="check-"]:checked').each(function(){
        checkVal.push($(this).val());
    });
    var permissionIds = checkVal.join(',');
    $.ajax({
        url: path + "updateRolePermission",//请求地址
        datatype: "json",//数据格式
        type: "get",//请求方式
        data: {"roleId": roleId,"permissionIds":permissionIds},
        success: function (data) {
            $(".white_content1")[0].style.display='none';
            location.reload();
        }
    });
}
// 取消按钮
function cancel() {
    layer.closeAll();
    // 角色权限
    var white_content1 =  $(".white_content1")[0];
    white_content1.style.display = "none";
}
