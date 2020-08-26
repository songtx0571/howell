<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/noticeManagement.css">
    <%--<script src="js/week/noticeManagement.js"></script>--%>
    <script type="text/javascript"  src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <script type="text/javascript"  src="js/week/alert.js"></script>
</head>
<body>
    <div class="warp">
        <div class="content">
            <div class="btnTop">
                <div style="margin-top: 20px;">
                    <%--公司：<select name="companyList" id="companyList">--%>
                            <%--<option value="0">请选择公司</option>--%>
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
                    <input type="hidden" id="companyIdHidden">
                </div>
                <div class="noticeType" style="display: none">
                    通知信息：<input type="button" class="topBtn" value="通知" onclick="noticeClick()">
                </div>
                <div class="noticeType" style="display: none">
                    类型信息：<input type="button" class="topBtn" value="类型" onclick="typeClick()">
                </div>
            </div>
            <h1 style="text-align: center">信息</h1>
            <%--通知--%>
            <script type="text/html" id="barDemo1">
                <a class="layui-btn layui-btn-sm" lay-event="detail">查看</a>
                <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
                <a class="layui-btn layui-btn-sm" lay-event="viewed">已查看人员</a>
            </script>
            <div class="demoInfo" style="display: none;margin-top: 10px;">
                <table id="demoInfo" lay-filter="test" style="width: 100%">
                    <tr>
                        <th><button style="width: 100%;margin-bottom: -10px;border: 1px solid #e6e6e6;height: 75px;color: #666;font-weight: 400;border-bottom: none;font-size: 22px;" onclick="showAddInfo()">添加</button></th>
                    </tr>
                </table>
            </div>
            <%--添加通知--%>
            <div class="addInfo">
                <h1 style="text-align: center;margin-bottom: 30px">添加通知</h1>
                <div>
                    <span>标题:</span>
                    <input type="text" id="addInfoTitle">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>内容:</span>
                    <textarea  style="float: left;width: 230px;height: 100px;outline: none;font-size: 18px;" type="text" id="addInfoContent"></textarea>
                </div>
                <div style="clear: both"></div>
                <div class="addInfoDiv">
                    <%--<span style="height: 108px;line-height: 108px;">类型:</span>--%>
                    <%--<select name="addTypeList" id="addTypeList">--%>
                        <%--<option value="0">请选择总类型</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">类型&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <div class="layui-input-inline">
                                    <select name="addTypeList" lay-verify="required" lay-filter="addTypeList" lay-search="" id="addTypeList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <%--<select name="addTypeSonList" id="addTypeSonList">--%>
                        <%--<option value="0">请选择子类型</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <div class="layui-input-inline">
                                    <select name="addTypeSonList" lay-verify="required" lay-filter="addTypeSonList" lay-search="" id="addTypeSonList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addTypeId">
                    <input type="hidden" id="addTypeSonId">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>人员:</span>
                    <strong id="showUser" style="float: left;width: 160px;line-height: 50px;"></strong>
                    <button id="showAddUserBtn" onclick="showAddUser()">选择</button>
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>上传:</span>
                    <button type="button" class="layui-btn layui-btn-primary" id="test3" ><i class="layui-icon"></i>上传文件</button>
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addInfoBtn">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--人员列表--%>
            <div class="addUser">
                <h1 style="text-align: center;margin-bottom: 30px">选择人员</h1>
                <div style="margin-top: 10px;">
                    <%--<span>部门：</span>--%>
                    <%--<select name="addUserDepartment" id="addUserDepartment">--%>
                        <%--<option value="0">按照部门查询</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">部门</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required" lay-filter="addUserDepartment" lay-search="" id="addUserDepartment">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addUserDepartmentId">
                </div>
                <div style="clear: both"></div>
                <div style="margin-top: 10px;">
                    <label>人员：</label>
                    <div class="layui-input-inline" style="width: 68%;">
                        <select name="tags" id="tags" lay-verify="required" xm-select="tags" xm-select-skin="normal">
                        </select>
                    </div>
                    <input type="hidden" id="addUserSelectId">
                </div>
                <div style="clear: both"></div>
                <div style="padding: 32px;line-height: 32px;box-sizing: border-box;">
                    <strong style="margin-left: 37px;float: left;">选择的人员有：</strong>
                    <samp style="float: left;margin-left: 18px;width: 205px;word-break:break-all" id="checkUser">请选择人员</samp>
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addUserBtn" onclick="addUser()">确定</button>
                    <button onclick="cancel1()">取消</button>
                </div>
            </div>
            <%--查看通知--%>
            <div class="detail">
                <p id="detailData" hidden></p>
                <div class="detailTop" style="border-bottom:1px solid;height: 70px">
                    <button id="downLoad" class="layui-btn layui-btn" onclick="downLoad()" style="margin: 10px 60px;float: right;">下载</button>
                </div>
                <div style="margin: 10px;line-height: 28px;font-size: 20px">
                    <p style="text-align: center;font-weight: bold" id="detailDataTitle"></p>
                    <p style="text-indent: 10px;" id="detailDataContent"></p>
                </div>
            </div>
            <%--编辑通知--%>
            <div class="updateInfo">
                <input type="hidden" id="updInformId">
                <h1 style="text-align: center;margin-bottom: 30px">编辑通知</h1>
                <div>
                    <span>标题:</span>
                    <input type="text" id="updInfoTitle">
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>内容:</span>
                    <textarea  style="float: left;width: 305px;height: 200px;outline: none;font-size: 18px;" type="text" id="updInfoContent"></textarea>
                </div>
                <div style="clear: both"></div>
                <%--<div style="height: 108px;margin: 13px 0">
                    <span style="height: 108px;line-height: 108px;">类型:</span>
                    <select name="addTypeList" id="updTypeList" style="cursor: not-allowed;" disabled>
                        <option value="0">请选择总类型</option>
                    </select>
                    <br><br><br>
                    <select name="addTypeSonList" id="updTypeSonList" style="cursor: not-allowed;" disabled>
                        <option value="0">请选择子类型</option>
                    </select>
                    <input type="hidden" id="updTypeId">
                    <input type="hidden" id="updTypeSonId">
                </div>
                <div style="clear: both"></div>--%>
                <%--<div>
                    <span>上传:</span>
                    <button type="button" class="layui-btn layui-btn-primary" id="test4" ><i class="layui-icon"></i>上传文件</button>
                </div>
                <div style="clear: both"></div>--%>
                <div class="btnBox">
                    <button id="updInfoBtn" onclick="updInfo()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--已查看人员--%>
            <div class="viewedInfo">
                <h1 style="text-align: center;margin-bottom: 30px">已查看过的人员</h1>
                <div id="userAgo"></div>
            </div>
            <%--修改通知--%>
            <%--类型--%>
            <script type="text/html" id="barDemo2">
                <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                <a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
            </script>
            <div class="demoType" style="display: none;margin-top: 10px;">
                <table id="demoType" lay-filter="test" style="width: 100%">
                    <tr>
                        <th><button style="width: 100%;margin-bottom: -10px;border: 1px solid #e6e6e6;height: 75px;color: #666;font-weight: 400;border-bottom: none;font-size: 22px;" onclick="showAddType()">添加</button></th>
                    </tr>
                </table>
            </div>
            <div>
                <input type="hidden" id="addSonTypeTypeId">
            </div>
            <%--添加父类类型--%>
            <div class="addType">
                <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="addTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="addCompanyList" id="addCompanyList">--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">公司：</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required" lay-filter="addCompanyList" lay-search="" id="addCompanyList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addCompanyId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addTypeBtn" onclick="addType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--添加子类类型--%>
            <div class="addSonType">
                <h1 style="text-align: center;margin-bottom: 30px">添加类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="addSonTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="addSonCompanyList" id="addSonCompanyList" style="cursor: not-allowed;" disabled>--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">公司</label>
                                <div class="layui-input-inline">
                                    <select name="modules" lay-verify="required"  lay-filter="addSonCompanyList" lay-search="" id="addSonCompanyList">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <input type="hidden" id="addSonCompanyId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="addSonTypeBtn" onclick="addSonType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--修改父类类型--%>
            <div class="updateType">
                <h1 style="text-align: center;margin-bottom: 30px;">修改类型</h1>
                <div>
                    <span>类型名称:</span>
                    <input type="text" id="updateTypeTypeName">
                </div>
                <div style="clear: both"></div>
                <div class="addTypeDiv" style="padding-left: 68px;box-sizing: border-box;">
                    <%--<span>公司名称:</span>--%>
                    <%--<select name="updateCompanyList" id="updateCompanyList" disabled="disabled" style="cursor:no-drop;">--%>
                        <%--<option value="0">请选择公司</option>--%>
                    <%--</select>--%>
                    <%--<form class="layui-form" action="">--%>
                        <%--<div class="layui-form-item">--%>
                            <%--<div class="layui-inline">--%>
                                <%--<label class="layui-form-label">公司</label>--%>
                                <%--<div class="layui-input-inline">--%>
                                    <%--<select name="modules" lay-verify="required"  disabled="disabled" style="cursor:no-drop;" lay-filter="updateCompanyList" lay-search="" id="updateCompanyList">--%>
                                    <%--</select>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</form>--%>
                    <input type="hidden" id="updateCompanyId">
                    <input type="hidden" id="updateTypeId">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button id="updateTypeBtn" onclick="updateType()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        var index=0;//layer弹窗
        // var path = "http://192.168.1.26:8080/";
         var path = "";
        // 修改类型
        // 如果改变了id值，返回true
        var identification = "0";
        $(function () {
            showCompany()
            // 文件上传
            layui.use(['upload'], function () {
                var upload = layui.upload;
                upload.render({
                    elem: '#test3',
                    url: path+'/inform/addInform',
                    accept: 'file',
                    size: 307200,
                    auto: false,//选择文件后不自动上传
                    bindAction: '#addInfoBtn',
                    //上传前的回调
                    before: function () {
                        this.data = {
                            "title": $("#addInfoTitle").val(),
                            "content":$("#addInfoContent").val(),
                            "companyId": $("#companyIdHidden").val(),
                            "informTypeId": $("#addTypeSonId").val()
                        };
                    },
                    //操作成功的回调
                    done: function (res, index, upload) {
                        if ($("#addInfoTitle").val() == "" || $("#addInfoContent").val() == 0) {
                            alert("请将消息填写完整")
                            return;
                        }
                        $(".addInfo").css("display", "none");
                        alert(res.msg);
                        noticeClick();
                        $("#addInfoTitle").val("");
                        $("#addInfoContent").val("");
                        $("#addTypeList").val(0);
                        $("#addTypeSonList").val(0);
                        $("#showUser").text("")
                    },
                    //上传错误回调
                    error: function (index, upload) {
                        console.log(index);
                        console.log(upload);
                    }
                });
            });



            // 修改类型
            // 如果改变了id值，返回trues
            $("#updateTypeTypeName").keyup(function () {
                identification = "1";
            });

        });
        // 显示公司
        function showCompany() {
            layui.use(['form'], function () {
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: path + "inform/getCompanyList",
                    data: {"parent": 0},
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        //通用公司下拉框
                        $("#companyList").empty()
                        var option = "<option value='0' >请选择公司名称</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                        }
                        $('#companyList').html(option);
                        // 添加父类类型下拉框
                        $("#addCompanyList").empty()
                        $('#addCompanyList').html(option);
                        // 添加子类类型下拉框
                        $("#addSonCompanyList").empty()
                        $('#addSonCompanyList').html(option);
                        // 修改类型下拉框
                        $("#updateCompanyList").empty()
                        $('#updateCompanyList').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
                form.on('select(companyList)', function (data) {
                    $("#companyIdHidden").val(data.value);
                    $(".noticeType").css("display", "block")
                    showInfo();
                });
                form.on('select(addCompanyList)', function (data) {
                    $("#addCompanyId").val(data.value)
                });
                form.on('select(addSonCompanyList)', function (data) {
                    $("#addSonCompanyId").val(data.value);
                    console.log($("#addSonCompanyId").val())
                });
                form.on('select(updateCompanyList)', function (data) {
                    $("#updateCompanyId").val(data.value)
                });
            });
        }
        // 显示类型
        function showInfo() {
            var companyId = $("#companyIdHidden").val();
            layui.use(['form'], function () {
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: path + "inform/getInformTypes",
                    data: {"parent": 0, "companyId": companyId},
                    dataType: "json",
                    success: function (data) {
                        //通用总类型下拉框
                        $("#addTypeList").empty()
                        var option = "<option value='0' >请选择总类型</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                        }
                        $('#addTypeList').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
                form.on('select(addTypeList)', function (data) {//// 父类型发生改变后，显示子类型
                    $("#addTypeId").val(data.value)
                    console.log(data.value)
                    showSonInfo($("#addTypeId").val())
                });
            });

        }

        // 根据父类型的id显示子类型
        function showSonInfo(id) {
            var companyId = $("#companyIdHidden").val();
            layui.use(['form'], function () {
                var form = layui.form;
                $.ajax({
                    type: "GET",
                    url: path + "inform/getInformTypes",
                    data: {"parent": id, "companyId": companyId},
                    dataType: "json",
                    success: function (data) {
                        //通用总类型下拉框
                        $("#addTypeSonList").empty()
                        var option = "<option value='0' >请选择子类型</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                        }
                        $('#addTypeSonList').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
                form.on('select(addTypeSonList)', function (data) {//// 子类型下拉框的值改变
                    $("#addTypeSonId").val(data.value);
                });
            });
        }

        //根据通知按钮查询数据
        function  noticeClick() {
            $(".demoType").css("display", "none");
            $(".demoInfo").css("display", "block")
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#demoInfo'
                    ,height: 700
                    ,url: path + 'inform/getInformList?companyId=' + $("#companyIdHidden").val() //数据接口
                    ,page: true //开启分页
                    ,limit: 10
                    ,limits: [10, 20, 30]
                    ,cols: [[ //表头
                        {field: 'created', title: '时间', align:'center', sort: true, width: 150}
                        ,{field: 'title', title: '标题', align:'center',width: 200}
                        ,{field: 'content', title: '内容', align:'center'}
                        ,{field: 'createdByName', title: '创建人', align:'center', width: 100}
                        ,{field: 'filedir', title: '地址', align:'center', hide: 'false'}
                        ,{field: 'informTypeName', title: '类别', hide: 'false', align:'center'}
                        ,{fixed: '', title:'操作', toolbar: '#barDemo1', width:270, align:'center'}
                    ]]
                    ,done: function(res, curr, count){
                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        //console.log(res);
                        //得到当前页码
                        //console.log(curr);
                        //得到数据总量
                        //console.log(count);
                    }
                });
                //监听工具条
                table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    console.log(data);
                    // 将data转为字符串
                    var jStr = "{ ";
                    for(var item in data){
                        jStr += "'"+item+"':'"+data[item]+"',";
                    }
                    jStr += " }";
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    if(layEvent === 'del'){ //删除
                        layer.confirm('真的删除行么', function(index){
                            /*$.ajax({
                                url: path + 'inform/delInform',
                                type:'get',
                                data:{'id':data.id},//向服务端发送删除的id
                                success:function(data){
                                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                    layer.close(index);
                                    console.log(index);
                                    alert("删除成功");
                                    noticeClick();
                                }
                            });*/
                        });
                    }else if (obj.event === 'edit') {// 编辑
                        index=layer.open({
                            type: 1
                            ,id: 'updateInfo' //防止重复弹出
                            ,content: $(".updateInfo")
                            ,shade: 0 //不显示遮罩
                            ,area: ['510px', '450px']
                            ,success: function (layero, index) {
                                $("#updInfoTitle").val(data.title);
                                $("#updInfoContent").val(data.content);
                                $("#updTypeSonList").val(data.informTypeId);
                                $("#updInformId").val(data.id)
                            }
                            ,yes: function(){
                            }
                            ,style: {
                                top: '10%'
                            }
                        });
                    } else if (obj.event === "detail") {// 查看
                        index=layer.open({
                            type: 1
                            ,id: 'detail' //防止重复弹出
                            ,content: $(".detail")
                            ,data: {"data": data}
                            ,shade: 0 //不显示遮罩
                            ,area: ['510px', '450px']
                            ,success: function (layero, index) {
                                $("#detailData").text(jStr);
                                $("#detailDataTitle").text(data.title);
                                $("#detailDataContent").text(data.content);
                                $.ajax({
                                    type: "GET",
                                    url: path + "inform/updateStatus",
                                    data: {"informId": data.id},
                                    dataType: "json",
                                    success: function(data){
                                        console.log(data)
                                    }
                                });
                            }
                            ,yes: function(){
                            }
                            ,style: {
                                top: '10%'
                            }
                        });
                    } else if (obj.event === "viewed"){ // 已查看人员
                        index=layer.open({
                            type: 1
                            ,id: 'viewedInfo' //防止重复弹出
                            ,content: $(".viewedInfo")
                            ,shade: 0 //不显示遮罩
                            ,area: ['510px', '450px']
                            ,success: function(){
                                $("#userAgo").html("");
                                $.ajax({
                                    type: "GET",
                                    url: path + "inform/selSeen",
                                    data: {"informId": data.id},
                                    dataType: "json",
                                    success: function(res){
                                        console.log(res)
                                        for (var i = 0 ; i < res.data.length; i ++) {
                                            $("#userAgo").append("<span class='userAgoSpan'>"+res.data[i]+"</span>");
                                        }
                                    }
                                });
                            }
                            ,yes: function () {

                            }
                        });
                        layer.style( {
                            top: '0'
                        });
                    }
                });
            });
        }
        // 显示添加通知
        function showAddInfo() {
            $(".addInfo").css("display", "block");
        }
        // 显示人员弹框
        function showAddUser() {
            layui.use(['form'], function () {
                var form = layui.form;
                // 查询部门
                $.ajax({
                    type: "GET",
                    url: path + "inform/getDepartmentList",
                    data: {"parent": $("#companyIdHidden").val()},
                    dataType: "json",
                    success: function (data) {
                        //选择部门
                        $("#addUserDepartment").empty()
                        var option = "<option value='0' >请选择部门名称</option>"
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                        }
                        $('#addUserDepartment').html(option);
                        form.render();//菜单渲染 把内容加载进去
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
                form.on('select(addUserDepartment)', function (data) {// 根据部门的选择，显示人员
                    var departmentId = data.value;
                    console.log($("#companyIdHidden").val());
                    console.log(departmentId);
                    layui.use(['jquery', 'formSelects'], function(){
                        var formSelects = layui.formSelects;
                        //server模式
                        formSelects.config('tags', {
                            keyName: 'name',
                            keyVal: 'id',
                        }).data('tags', 'server', {
                            url: path + 'inform/getUsersList?parent='+$("#companyIdHidden").val() +'&departmentId='+ departmentId
                        });
                    });
                });
            });
            // 未选择部门显示所有人员
            layui.use(['jquery', 'formSelects'], function(){
                var formSelects = layui.formSelects;
                //server模式
                formSelects.config('tags', {
                    keyName: 'name',
                    keyVal: 'id',
                }).data('tags', 'server', {
                    url: path + 'inform/getUsersList?parent='+$("#companyIdHidden").val() +'$departmentId=0'
                });
                formSelects.closed('tags', function(id){
                    // layui.formSelects.value('tags', 'val');       //取值val数组
                    $("#checkUser").text(layui.formSelects.value('tags', 'name'));
                    $("#addUserSelectId").val(layui.formSelects.value('tags', 'val'))
                    // layui.formSelects.value('tags', 'valStr');    //取值val字符串
                    // layui.formSelects.value('tags', 'name');      //取值name数组
                    // layui.formSelects.value('tags', 'nameStr');   //取值name字符串
                });
            });
            $(".addUser").css("display", "block");
        }

        //人员弹框确定
        function addUser() {
            $("#showUser").text($("#checkUser").text());
            $(".addUser").css("display", "none");
        }
        // 下载按钮
        function downLoad() {
            var data = $("#detailData").text().substring(0);
            // 将字符串转换为json
            function strToJson(str){
                var json = eval('(' + str + ')');
                data = json;
            }
            strToJson(data)
            console.log(data);
            if (data.filedir != null & data.filedir != '') {
                var dir = data.filedir;
                var index1 = dir.slice(dir.lastIndexOf(".")+1) ;
                if (index1 == "html") {
                    var fileName=data.filedir.slice(7);
                    // window.open(path + "inform/downloadFile"+fileName);
                } else {
                    window.location.href = path + "inform/downloadFile?id=" + data.id;
                }
            } else {
                layer.close(index);
                alert("无文件");
            }
        }
        // 修改通知
        function updInfo() {
            layer.close(index);
            var title = $("#updInfoTitle").val();
            var content = $("#updInfoContent").val();
            var id = $("#updInformId").val();
            if (title == "" || content == "") {
                alert("请将消息填写完整")
                return;
            }
            $.ajax({
                type: "GET",
                url: path + "inform/updateInform",
                data: {"id": id, "title": title, "content": content},
                dataType: "json",
                success: function(data){
                    layer.close(index);
                    alert("修改成功");
                    noticeClick();
                },
                error : function (err) {
                    console.log(err);
                }
            });
        }

        //根据类型按钮查询类型
        function typeClick() {
            $(".demoInfo").css("display", "none")
            $(".demoType").css("display", "block");
            layui.use('table', function(){
                var table = layui.table;
                var form = layui.form;
                table.render({
                    elem: '#demoType'
                    ,height: 700
                    ,url: path + 'inform/getInformTypeList?companyId=' + $("#companyIdHidden").val() //数据接口
                    // ,page: true //开启分页
                    ,limit: 10
                    ,limits: [10, 20, 30]
                    ,cols: [[ //表头
                        {field: 'name', title: '名称', align:'center'}
                        ,{field: 'created', title: '创建时间', sort: true, width: 200, align:'center'}
                        ,{field: 'companyName', title: '公司', align:'center'}
                        ,{field: 'parent', title: '父级', hide: 'false', align:'center'}
                        ,{fixed: '', title:'操作', toolbar: '#barDemo2', width:200, align:'center'}
                    ]]
                    ,done: function(res, curr, count){
                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        for(var i =0;i<res.data.length;i++){
                            if(res.data[i].parent==0){
                                $(".layui-table tbody tr").eq(i).css("background-color","#d2d2d2")
                            }
                            if(res.data[i].parent!=0){
                                $(".layui-table-col-special  button").eq(i).css("display","none")
                            }
                        }
                        console.log(res);
                        //得到当前页码
                        console.log(curr);
                        //得到数据总量
                        console.log(count);
                    }
                });
                //监听工具条
                table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    console.log(data)
                    $("#addSonTypeTypeId").val(data.id);
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    if(layEvent === 'add'){ //添加
                        $("#addSonCompanyList").val(data.companyId)
                        console.log(data)
                        index=layer.open({
                            type: 1
                            ,id: 'addSonType' //防止重复弹出
                            ,content: $(".addSonType")
                            ,shade: 0 //不显示遮罩
                            ,area: ['510px', '320px']
                            ,yes: function(){

                            }
                        });
                    } else if (obj.event === 'edit') {
                        $("#updateTypeTypeName").val(data.name);
                        $("#updateCompanyList").val(data.companyId)
                        $("#updateTypeId").val(data.id);
                        form.render('select','updateCompanyList');
                        index=layer.open({
                            type: 1
                            ,id: 'updateType' //防止重复弹出
                            ,content: $(".updateType")
                            ,shade: 0 //不显示遮罩
                            ,area: ['510px', '320px']
                            ,yes: function(){
                            }
                        });
                    }
                });
            });
        }
        // 显示添加父类的窗口
        function showAddType() {
            $(".addType").css("display", "block")
        }
        // 添加父类类型
        function addType() {
            layer.close(index);
            var name = $("#addTypeTypeName").val();
            var companyId = $("#addCompanyId").val();
            // console.log(name)
            if (name == "" || companyId == 0) {
                alert("请将消息填写完整")
                return;
            }
            $("#addTypeBtn").css("display", "none")
            $.ajax({
                url: path + 'inform/addInformType',//请求地址
                datatype: "json",//数据格式
                type: "GET",//请求方式
                data: {"companyId": companyId,"parent":"0","name": name},
                success: function (data) {
                    console.log(data)
                    $(".addType").css("display", "none");
                    alert(data)
                    typeClick()
                    $("#addTypeBtn").css("display", "block")
                },
                error: function () {
                    $("#addTypeBtn").css("display", "block")
                }
            });
        }
        // 添加子类类型
        function addSonType() {
            layer.close(index);
            var id = $("#addSonTypeTypeId").val();
            var name = $("#addSonTypeTypeName").val();
            // var companyId = $("#addSonCompanyId").val();
            var companyId = $("#addSonCompanyList").val();
            // console.log(name)
            if (name == "" || companyId == 0) {
                alert("请将消息填写完整")
                return;
            }
            $("#addSonTypeBtn").css("display", "none")
            $.ajax({
                url: path + 'inform/addInformType',//请求地址
                datatype: "json",//数据格式
                type: "GET",//请求方式
                data: {"companyId": companyId,"parent":id,"name": name},
                success: function (data) {
                    layer.close(index);
                    alert(data)
                    typeClick()
                    $("#addSonTypeBtn").css("display", "block")
                    $("#addSonTypeTypeId").val();
                    $("#addSonTypeTypeName").val("");
                    $("#addSonCompanyList").val("0")
                },error: function () {
                    $("#addSonTypeBtn").css("display", "block")
                }
            });
        }
        // 修改类型
        function updateType() {
            layer.close(index);
            var name = $("#updateTypeTypeName").val();
            var companyId = $("#updateCompanyList").val();
            var id = $("#updateTypeId").val();
            console.log(name,companyId,id)
            if (name == "" || companyId == 0) {
                alert("请将消息填写完整")
                return;
            }
            $("#updateTypeBtn").css("display", "none")
            $.ajax({
                url: path + 'inform/updateInformType',//请求地址
                datatype: "json",//数据格式
                type: "GET",//请求方式
                data: {"companyId": companyId,"id":id,"name": name,"type":identification},// type 1 修改 0未修改
                success: function (data) {
                    layer.close(index);
                    alert(data)
                    typeClick()
                    $("#updateTypeBtn").css("display", "block")
                },error: function () {
                    $("#updateTypeBtn").css("display", "block")
                }
            });
            identification = "0";
        }
        // 取消
        function cancel() {
            $(".addType").css("display", "none");
            $(".addInfo").css("display", "none");
            $(".addUser").css("display", "none");
            layer.close(index);
        }
        // 取消
        function cancel1() {
            $(".addUser").css("display", "none");
            layer.close(index);
        }
    </script>
</body>
</html>
