//var path = "http://192.168.1.26:8080/";
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
            },
            error: function (err) {
                console.log(err)
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
                                "<td><input type='button' value='修改' class='button' onclick='showUpdataPost(" + data[i].id + ")' /></td>";
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