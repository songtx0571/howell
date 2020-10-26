var path = "";
$(function () {
    showCompanyInfo();
    // 定义预处理事件
    document.body.onmousedown = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.type === 'radio'&& target.id=="addHeadquarters") {//确定元素
            target.previousValue = target.checked;
            target.value = 0;//本部
        }
    };
    // 定义点击事件
    document.body.onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.type === 'radio' && target.id=="addHeadquarters") {
            if (target.previousValue) {//根据预处理结果 确定选中取消
                target.checked = false;
                target.value = 1;
            }
        }
    };
});
// -------------------------公司---------------------------------
var updataCompanyIsActive = $(".updataCompanyIsActive")[0];
var updataCompanyId = $(".updataCompanyId")[0];
function showCompanyInfo() {
    $.ajax({
        type: "GET",
        url: path + "getCompanyList",
        dataType: "json",
        data: {"parent": 0},
        success: function(data){
            var tbody = document.getElementById("companyTbody");
            tbody.innerHTML = "";
            for(var i=0;i<data.length;i++){
                var tr = document.createElement("tr");
                tr.setAttribute("class","companyTr");
                var isActive = data[i].isactive;
                updataCompanyIsActive = isActive;
                var headQuarters = data[i].headQuarters;
                // updataCompanyId = data[i].id
                var td = "<td class='companyNameB"+i+"'>"+data[i].name+"</td>" +
                    "<td><input type='button' value='启用' class='button openActiveBtn"+i+"' onclick='openActive("+data[i].id+")'  />&nbsp;" +
                    "<input type='button' value='关闭' class='button closeActiveBtn"+i+"' onclick='closeActive("+data[i].id+")'   /></td>" +
                    "<td><input type='button' value='修改' class='button' onclick='showUpdataCompany("+data[i].id+")' /></td>" +
                    "<td><input type='button' value='查看部门' class='button' onclick='showRightDepartment("+data[i].id+")' /></td>";
                tr.innerHTML = td;
                tbody.appendChild(tr);
                if(isActive == '0') {// 未启用
                    $(".openActiveBtn"+i).css("background", "#ccc")
                    $(".closeActiveBtn"+i).css("background", "#1E9FFF")
                    $(".closeActiveBtn"+i).attr({"disabled":"disabled"});
                    $(".closeActiveBtn"+i).css("cursor","no-drop")
                } else {// 启用
                    $(".openActiveBtn"+i).css("background", "#1E9FFF")
                    $(".closeActiveBtn"+i).css("background", "#ccc")
                    $(".openActiveBtn"+i).attr({"disabled":"disabled"});
                    $(".openActiveBtn"+i).css("cursor","no-drop")
                }
                if (headQuarters == '0'){// 本部0
                    $(".companyNameB"+i).css("color", 'red');
                } else{
                    $(".companyNameB"+i).css("color", '#000');
                }
            }

        }
    })
}
// 启用公司
function openActive(id) {
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "isactive": 1},
        success: function (data) {
            if(data == '"success"'){
                showCompanyInfo()
            } else if (data == "no") {
                alert("无法修改")
            } else {
                alert("修改失败，请联系技术人员")
            }
        }
    });
}
// 禁用公司
function closeActive(id) {
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "isactive": 0},
        success: function (data) {
            if (data == '"success"') {
                showCompanyInfo()
            } else if (data == "no") {
                alert("无法修改")
            } else {
                alert("修改失败，请联系技术人员")
            }
        }
    });
}
// 显示修改公司
function showUpdataCompany(id) {
    updataCompanyId = id;
    $(".updateCompany").css("display", "block");
    var updataInput = $("#updataInput")[0];
    $.ajax({
        url: path + "getCompany",
        datatype: "json",
        type: "GET",
        data: {"id": id},
        success: function (data) {
            updataInput.value = JSON.parse(data).name;
        }
    });
}
// 修改公司
function updateCompany(id, name) {
    id = updataCompanyId;
    name = $("#updataInput")[0].value;
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "name": name},
        success: function (data) {
            if(data == '"success"'){
                $(".updateCompany").css("display", "none");
                // location.reload()
                showCompanyInfo()
            } else if (data == "no") {
                alert("无法修改")
            } else {
                alert("修改失败，请联系技术人员")
            }
        }
    });
}
//显示添加公司
function showAddCompany() {
    $(".addCompany").css("display", "block")
}
// 添加公司
function addCompany() {
    var name = $("#addInput").val();
    var headQuarters = $("#addHeadquarters")[0];
    var headQuartersValue = headQuarters.value;
    if (headQuartersValue == "on"){
        headQuartersValue = 1;
    }
    $.ajax({
        url: path + "addCompany",//请求地址
        dataType: "json",//数据格式
        type: "GET",//请求方式
        data: {"name": name,"type" : 0,"headQuarters":headQuartersValue},
        success: function (data) {
            if(data == "SUCCESS"){
                $(".addCompany").css("display", "none");
                showCompanyInfo()
            } else if (data == "haveHeadQuarters") {
                alert("已存在本部");
            } else {
                alert("添加失败，请联系技术人员");
            }
        }
    });
}
// ----------------------------------------部门-----------------------------------
// 点击公司显示对应的部门
function showRightDepartment(id) {
    $.ajax({
        type: "GET",
        url: path + "getCompanyList",
        dataType: "json",
        data: {"parent": id},
        success: function(data){
            //公司的id
            $("#addDepartmentId").val(id);
            //添加部门按钮
            $("#showAddDepartmentBtn").css("display", "block");
            if (data != "0") {
                // 显示表格
                $(".departmentTable").css("display", "block");
                var tbody = document.getElementById("departmentTbody");
                tbody.innerHTML = "";
                for(var i=0;i<data.length;i++){
                    var tr = document.createElement("tr");
                    tr.setAttribute("class","departmentTr");
                    //是否可用
                    var isActive = data[i].isactive;
                    var td = "<td>"+data[i].name+"</td><td>"+data[i].codeName+"</td>" +
                        "<td><input type='button' value='启用' class='button openActiveBtnD"+i+"' onclick='openDepartmentActive("+data[i].id+")' />&nbsp;" +
                        "<input type='button' value='关闭' class='button closeActiveBtnD"+i+"' onclick='closeDepartmentActive("+data[i].id+")' /></td>" +
                        "<td><input type='button' value='修改' class='button' onclick='showUpdataDepartment("+data[i].id+")' /></td>";
                    tr.innerHTML = td;
                    tbody.appendChild(tr);
                    if(isActive == "0") {// 未启用
                        $(".openActiveBtnD"+i).css("background", "#ccc");
                        $(".closeActiveBtnD"+i).css("background", "#1E9FFF");
                        $(".closeActiveBtnD"+i).attr({"disabled":"disabled"});
                        $(".closeActiveBtnD"+i).css("cursor","no-drop");
                    } else {// 启用
                        $(".openActiveBtnD"+i).css("background", "#1E9FFF");
                        $(".closeActiveBtnD"+i).css("background", "#ccc");
                        $(".openActiveBtnD"+i).attr({"disabled":"disabled"});
                        $(".openActiveBtnD"+i).css("cursor","no-drop");
                    }
                }
            }else {
                $(".departmentTable").css("display", "none");
            }
        }
    })
}
//启用部门
function openDepartmentActive(id) {
    var idC = $("#addDepartmentId").val()
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "isactive": 1},
        success: function (data) {
            if(data == '"success"'){
                showRightDepartment(idC);
            } else if (data == "no") {
                alert("无法修改");
            } else {
                alert("修改失败，请联系技术人员");
            }
        }
    });
}
//禁用部门
function closeDepartmentActive(id) {
    var idC = $("#addDepartmentId").val()
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "isactive": 0},
        success: function (data) {
            if (data == '"success"') {
                showRightDepartment(idC)
            } else if (data == "no") {
                alert("无法修改");
            } else {
                alert("修改失败，请联系技术人员");
            }
        }
    });
}
//点击显示添加部门
function showAddDepartment() {
    $(".addDepartment").css("display", "block");
}
//添加部门
function addDepartment() {
    var name = $("#addDepartmentInput").val();
    var id = $("#addDepartmentId").val();
    var codeName = $("#addDepartmentCodeName").val();
    if (name == "" || codeName == "") {
        alert("请将消息填写完整")
        return;
    }
    $.ajax({
        url: path + "addCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"name": name, "type" : 1, "parent": id, "codeName": codeName},
        success: function (data) {
            if(data == '"success"'){
                $(".addDepartment").css("display", "none");
                showRightDepartment(id)
            } else if (data == "no") {
                alert("无法添加")
            } else {
                alert("添加失败，请联系技术人员")
            }
        }
    });
}
//点击显示修改页面
function showUpdataDepartment(id) {
    $(".updataDepartment").css("display", "block");
    $("#updataDepartmentId").val(id);
    $.ajax({
        url: path + "getCompany",
        dataType: "json",
        type: "GET",
        data: {"id": id},
        success: function (data) {
            $("#updataDepartmentInput").val(JSON.parse(data).name);
            $("#updataDepartmentCodeName").val(JSON.parse(data).codeName);
        }
    });
}
//修改部门
function updataDepartment(id, name, codeName) {
    name = $("#updataDepartmentInput").val();
    id = $("#updataDepartmentId").val();
    codeName = $("#updataDepartmentCodeName").val();
    $.ajax({
        url: path + "updateCompany",//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id": id, "name": name, "codeName": codeName},
        success: function (data) {
            if(data == '"success"'){
                $(".updataDepartment").css("display", "none");
                $("#updataDepartmentInput").val("");
                showRightDepartment($("#addDepartmentId").val())
            } else if (data == "no") {
                alert("无法修改")
            } else {
                alert("修改失败，请联系技术人员")
            }
        }
    });
}
// 取消
function cancel() {
    $(".updateCompany").css("display", "none");
    $(".addCompany").css("display", "none");
    $(".addDepartment").css("display", "none");
    $(".updataDepartment").css("display", "none")
}