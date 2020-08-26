<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/week/postManagement.js"></script>
    <link rel="stylesheet" href="css/postManagement.css">
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <h1 style="text-align: center;">岗位信息</h1>
        <div class="top">
            <%--<label>公司：</label>--%>
            <%--<select name="companyList" id="companyList" >--%>
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
        <div class="content">
            <button class="addBtn" onclick="showAddPost()">添加岗位</button>
            <input type="hidden" id="companyId">
            <table class="postTable">
                <thead>
                <tr class="postTr">
                    <th>岗位名称</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id='postTbody'>

                </tbody>
            </table>
            <%--添加岗位页面--%>
            <div class="addPost">
                <h1 style="text-align: center;margin-bottom: 30px">添加岗位</h1>
                <div>
                    <span>岗位名称:</span>
                    <input type="text" id="addInput">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>备注:</span>
                    <input type="text" id="addRemork">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="addPost()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--修改岗位页面--%>
            <div class="updataPost">
                <h1 style="text-align: center;margin-bottom: 30px">修改岗位</h1>
                <input type="hidden" id="updataCompanyId">
                <input type="hidden" id="updataPostId">
                <div>
                    <span>岗位名称:</span>
                    <input type="text" id="updataInput">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>备注:</span>
                    <input type="text" id="updataRemork">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="updataPost()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        //var path = "http://192.168.1.26:8080/";
        var path = "";
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
                    alert(data)
                    if (companyId != ""){
                        showCompanyPost()
                    }
                },
                error : function (err) {
                    console.log(err)
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
                },
                error : function (err) {
                    console.log(err)
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
            // console.log(identification)
            $.ajax({
                type: "GET",
                url: path + "post/updatePost",
                data: {"id": id, "companyId": companyId, "name": updataInput, "remark": updataRemork, "identification": identification},
                dataType: "json",
                success: function(data){
                    alert(data)
                    $(".updataPost").css("display", "none");
                    if (companyId != ""){
                        showCompanyPost()
                    }
                },
                error : function (err) {
                    console.log(err)
                }
            });
            identification="false";
        }
        // 取消
        function cancel() {
            $(".addPost").css("display", "none")
            $(".updataPost").css("display", "none")
        }
    </script>
</body>
</html>
