// var path = "http://192.168.1.26:8080/";
$(function () {
    fillRole();
})
// debugger
// 显示角色数据
function fillRole () {
    $.ajax({
        type: "GET",
        url: path + "getRole",
        dataType: "json",
        success: function(data){
            $("#roleTbody tr").remove("tr[id=roleTr123]");
            var tbody = document.getElementById("roleTbody");
            for(var i=0;i<data.length;i++){
                var tr = document.createElement("tr");
                tr.setAttribute("class","roleTr");
                var td = "" +
                    // "<td>"+(i+1)+"</td>" +
                    "<td>"+data[i].roleName+"</td><td class='buttonBtn'>" +
                    "<input type='button' value='添加角色' class='button' onclick='showAddRoleDiv("+data[i].id+")' />" +
                    "<input type='button' value='修改角色' class='button' onclick='showUpdateRoleDiv("+data[i].id+")' />" +
                    "<input type='button' value='删除角色' class='button' onclick='delRole("+data[i].id+")'/>" +
                    "<input type='button' value='修改角色权限' class='button' onclick='showRolePermission("+data[i].id+")'/>" +
                    "</td>";
                tr.innerHTML = td;
                tbody.appendChild(tr);
            }
        },
        error : function (err) {
            console.log(err)
        }
    })
}
//修改的div标签
var updateRoleDiv = $(".updateRole")[0];
// 角色文本框
var updataInput = $("#updataInput")[0];
// 角色id
var updataRoleId = $("#updataPermissionRoleId")[0];
//添加的div标签
var addRoleDiv = $(".addRole")[0];
// 角色文本框
var addInput = $("#addInput")[0];
// 角色id
var addRoleId = $("#addPermissionRoleId")[0];
// 角色权限
var white_content1 =  $(".white_content1")[0];

// 将将要修改的角色名称显示在文本框中
function showUpdateRoleDiv(id) {
    updateRoleDiv.style.display = "block";
    // console.log(id)
    var updataInput = $("#updataInput")[0];
    $.ajax({
        url: path + "getRoleById",
        datatype: "json",
        type: "GET",
        data: {"id": id},
        success: function (data) {
            // console.log(JSON.parse(data))
            // console.log(updataInput)
            updataInput.value = JSON.parse(data).roleName;
            updataRoleId = id;
            // console.log(updataRoleId)
        }
    });
}
// 修改角色
function updateRole(id, roleName) {
    roleName = $("#updataInput").val();
    id = updataRoleId;
    // console.log(roleId)
    $.ajax({
        url: path + "updateRole",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"roleName": roleName,"id":id},
        success: function (data) {
            // console.log(data);
            updateRoleDiv.style.display = "none";
            location.reload();
        }
    });
}
// 添加角色
function showAddRoleDiv() {
    addRoleDiv.style.display = "block"
}
function addRole() {
    var roleName = $("#addInput").val()
    $.ajax({
        url: path + "addRole",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"roleName": roleName},
        success: function (data) {
            // console.log(data);
            addRoleDiv.style.display = "none";
            location.reload();
        }
    });
}
// 删除角色
function delRole(id) {
    $.ajax({
        url: path + "deleteRole",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id},
        success: function (data) {
            // console.log(data);
            location.reload();
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
            // console.log(data)
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
    // console.log(obj)
}

function change2(parentId,id){
    var obj = document.getElementById('check-'+parentId+'-'+id);
    if(!obj.checked){
        document.getElementById('check-'+parentId).checked = false;
    }
    $("input[id^=check-"+parentId+"-"+id+"]").each(function(){
        this.checked = obj.checked;
        // console.log(obj)
    })
}

function change3(parentId,id,childId){
    var obj = document.getElementById('check-'+parentId+'-'+id+'-'+childId);
    // console.log(obj);
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
    // console.log(permissionIds);
    $.ajax({
        url: path + "updateRolePermission",//请求地址
        datatype: "json",//数据格式
        type: "get",//请求方式
        data: {"roleId": roleId,"permissionIds":permissionIds},
        success: function (data) {
            // console.log(data);
            $(".white_content1")[0].style.display='none';
            location.reload();
        }
    });
}

