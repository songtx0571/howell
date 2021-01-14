var path = "";
$(function () {
    showCompany()
})
// 查询公司
function showCompany() {
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "post/getCompanyList",
            data: {"parent": 0},
            dataType: "json",
            success: function (data) {
                $("#companyList").empty()
                var option = "<option value='0' >请选择公司名称</option>"
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#companyList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(companyList)', function(data){// 根据公司id显示岗位
            $(".postTable").css("display", "block")
            $(".addBtn").css("display", "block")
            $("#companyId").val(data.value);
            var companyId = data.value;
            $.ajax({
                type: "GET",
                url: path + "post/getPostList",
                data: {"companyId": companyId},
                dataType: "json",
                success: function (data) {
                    var tbody = document.getElementById("postTbody");
                    if (data != "") {
                        tbody.innerHTML = ""
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].remark == undefined){
                                data[i].remark = ""
                            }
                            var tr = document.createElement("tr");
                            tr.setAttribute("class", "postTr");
                            var td = "<td>" + data[i].name + "</td><td>" + data[i].remark + "</td>" +
                                "<td><shiro:hasPermission name='更新岗位信息'><input type='button' value='修改' class='button' onclick='showUpdataPost(" + data[i].id + ")' /></shiro:hasPermission></td>";
                            tr.innerHTML = td;
                            tbody.appendChild(tr);
                        }
                    } else {
                        alert("该公司没有设置岗位")
                        tbody.innerHTML = ""
                    }
                }
            });
        })
    })
}
// 添加 / 修改岗位后的刷新页面
function showCompanyPost() {
    // 公司的 id
    var companyId = $("#companyId").val();
    $.ajax({
        type: "GET",
        url: path + "post/getPostList",
        data: {"companyId": companyId},
        dataType: "json",
        success: function (data) {
            var tbody = document.getElementById("postTbody");
            if (data != "") {
                tbody.innerHTML = ""
                for (var i = 0; i < data.length; i++) {
                    if (data[i].remark == undefined){
                        data[i].remark = ""
                    }
                    var tr = document.createElement("tr");
                    tr.setAttribute("class", "postTr");
                    var td = "<td>" + data[i].name + "</td><td>" + data[i].remark + "</td>" +
                        "<td><input type='button' value='修改' class='button' onclick='showUpdataPost(" + data[i].id + ")' /></td>";
                    tr.innerHTML = td;
                    tbody.appendChild(tr);
                }
            } else {
                alert("该公司没有设置岗位");
                tbody.innerHTML = ""
            }
        }
    });
}
// 显示添加岗位
function showAddPost() {
    $(".addPost").css("display", "block")
}
// 添加岗位
function addPost() {
    var companyId = $("#companyId").val();
    var addInput = $("#addInput").val()
    var addRemork = $("#addRemork").val()
    $.ajax({
        type: "GET",
        url: path + "post/addPost",
        data: {"companyId": companyId, "name": addInput, "remark": addRemork},
        dataType: "json",
        success: function(data){
            $(".addPost").css("display", "none")
            addInput = "";
            addRemork = "";
            if (companyId != ""){
                showCompanyPost()
            }
        }
    });
}
// 显示修改岗位
function  showUpdataPost(id) {
    var updataPostId = id
    $("#updataPostId").val(id)
    $.ajax({
        type: "GET",
        url: path + "post/getPost",
        data: {"id": updataPostId},
        dataType: "json",
        success: function(data){
            $(".updataPost").css("display", "block");
            $("#updataInput").val(data.name);
            $("#updataRemork").val(data.remark);
        }
    });
}
//修改岗位
// 如果改变了id值，返回true
var identification = "false";
$("#updataInput").keyup(function () {
    identification = "true";
})
function updataPost() {
    var id = $("#updataPostId").val();
    var companyId = $("#companyId").val();
    var updataInput = $("#updataInput").val();
    var updataRemork = $("#updataRemork").val();
    $.ajax({
        type: "GET",
        url: path + "post/updatePost",
        data: {"id": id, "companyId": companyId, "name": updataInput, "remark": updataRemork, "identification": identification},
        dataType: "json",
        success: function(data){
            $(".updataPost").css("display", "none");
            if (companyId != ""){
                showCompanyPost()
            }
        }
    });
    identification="false";
}
// 取消
function cancel() {
    $(".addPost").css("display", "none")
    $(".updataPost").css("display", "none")
}