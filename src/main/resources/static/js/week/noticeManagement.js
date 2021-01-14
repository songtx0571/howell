var index=0;//layer弹窗
var path = "";
/*// 修改类型
// 如果改变了id值，返回true
var identification = "0";*/
var filedir = "";
$(function () {
    showCompany();
    // 文件上传
    layui.use(['upload'], function () {
        var upload = layui.upload;
        upload.render({
            elem: '#test3',
            url: path+'/inform/uploadFeiles',
            accept: 'file',
            size: 307200,
            auto: false,//选择文件后不自动上传
            bindAction: '#test9',
            //操作成功的回调
            done: function (res) {
                filedir = res.data[0];
            },
            //上传错误回调
            error: function (index, upload) {}
        });
    });
   /* // 修改类型
    // 如果改变了id值，返回true
    $("#updateTypeTypeName").keyup(function () {
        identification = "1";
    });*/

});
// 显示公司
function showCompany() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/inform/getCompanyList",
            data: {"parent": 0},
            dataType: "json",
            success: function (data) {
                //通用公司下拉框
                $("#companyList").empty();
                var option = "<option value='0' >请选择公司名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                }
                $('#companyList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(companyList)', function (data) {
            $("#companyIdHidden").val(data.value);
            layui.use(['jquery', 'formSelects'], function(){
                var formSelects = layui.formSelects;
                //server模式
                formSelects.config('tags', {
                    keyName: 'name',
                    keyVal: 'id',
                    keySel: 'selected',
                    direction: 'auto',
                    success: function(id, url, searchVal, result){      //使用远程方式的success回调
                        var data = result.data;
                        var names = "";
                        for (var i = 0; i < data.length; i ++) {
                            names += data[i].id + ",";
                        }
                        names = names.substring(0,names.length - 1);
                        if (names.length < 1){
                            $("#checkUser").text("0人");
                        } else{
                            var nameCount = 1;
                            var arr = "["+names+"]";
                            arr = arr.split(',');
                            for (var i = 1; i <= arr.length; i ++){
                                nameCount = i;
                            }
                            $("#checkUser").text(nameCount + "人");
                        }
                        $("#addUserSelectId").val(names);
                    },
                }).data('tags', 'server', {
                    url: path + '/inform/getUsersList?parent='+ data.value
                });
                formSelects.closed('tags', function(id){
                    var names = layui.formSelects.value('tags', 'name');
                    if (names.length < 1){
                        $("#checkUser").text("0人");
                    } else{
                        var nameCount = 1;
                        for (var i = 1; i <= names.length; i ++){
                            nameCount = i;
                        }
                        $("#checkUser").text(nameCount + "人");
                    }
                    $("#addUserSelectId").val(layui.formSelects.value('tags', 'val'));
                });
            });
            // 查询部门
            $.ajax({
                type: "GET",
                url: path + "/inform/getDepartmentList",
                data: {"parent": $("#companyIdHidden").val()},
                dataType: "json",
                success: function (data) {
                    //选择部门
                    $("#addUserDepartment").empty();
                    var option = "<option value='0' >请选择部门名称</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>"
                    }
                    $('#addUserDepartment').html(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
            form.on('select(addUserDepartment)', function (data) {// 根据部门的选择，显示人员
                var departmentId = data.value;
                showUser(departmentId);
            });
        });
    });
}
//显示人员
function showUser(departmentId) {
    layui.use(['jquery', 'formSelects'], function(){
        var formSelects = layui.formSelects;
        //server模式
        formSelects.config('tags', {
            keyName: 'name',
            keyVal: 'id',
            keySel: 'selected',
            direction: 'auto',
            success: function(id, url, searchVal, result){      //使用远程方式的success回调
                var data = result.data;
                var names = "";
                for (var i = 0; i < data.length; i ++) {
                    names += data[i].id + ",";
                }
                names = names.substring(0,names.length - 1);
                if (names.length < 1){
                    $("#checkUser").text("0人");
                } else{
                    var nameCount = 1;
                    var arr = "["+names+"]";
                    arr = arr.split(',');
                    for (var i = 1; i <= arr.length; i ++){
                        nameCount = i;
                    }
                    $("#checkUser").text(nameCount + "人");
                }
                $("#addUserSelectId").val(names);
            },
        }).data('tags', 'server', {
            url: path + '/inform/getUsersList?departmentId='+ departmentId
        });
        formSelects.closed('tags', function(id){
            var names = layui.formSelects.value('tags', 'name');
            if (names.length < 1){
                $("#checkUser").text("0人");
            } else{
                var nameCount = 1;
                for (var i = 1; i <= names.length; i ++){
                    nameCount = i;
                }
                $("#checkUser").text(nameCount + "人");
            }
            $("#addUserSelectId").val(layui.formSelects.value('tags', 'val'));
        });
    });
}
/*// 显示类型
function showInfo() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/inform/getInformTypes",
            data: {"parent": 0},
            dataType: "json",
            success: function (data) {
                //通用总类型下拉框
                $("#addTypeList").empty()
                var option = "<option value='0' >请选择总类型</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                $('#addTypeList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addTypeList)', function (data) {//// 父类型发生改变后，显示子类型
            $("#addTypeId").val(data.value);
            showSonInfo($("#addTypeId").val());
        });
    });

}
// 根据父类型的id显示子类型
function showSonInfo(id) {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/inform/getInformTypes",
            data: {"parent": id},
            dataType: "json",
            success: function (data) {
                //通用总类型下拉框
                $("#addTypeSonList").empty();
                var option = "<option value='0' >请选择子类型</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                $('#addTypeSonList').html(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(addTypeSonList)', function (data) {//// 子类型下拉框的值改变
            $("#addTypeSonId").val(data.value);
        });
    });
}*/
//根据通知按钮查询发送的数据
function  noticeClickFS() {
    // $(".demoType").css("display", "none");
    $(".demoInfoSD").css("display", "none");
    $(".demoInfoFS").css("display", "block");
    var win = $(window).height();
    var height = win-100;
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demoInfoFS'
            ,height: height
            ,url: path + '/inform/getInformList?isactive=1'//数据接口
            ,page: true //开启分页
            ,limit: 10
            ,limits: [10, 20, 30]
            ,id: 'demoInfo'
            ,cols: [[ //表头
                {field: 'created', title: '时间', align:'center', sort: true, width: 150}
                ,{field: 'title', title: '标题', align:'center',width: 200}
                ,{field: 'content', title: '内容', align:'center'}
                ,{field: 'createdByName', title: '创建人', align:'center', width: 100}
                ,{field: 'filedir', title: '地址', align:'center', hide: 'false'}
                ,{field: 'informTypeName', title: '类别', hide: 'false', align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemoFS', width:270, align:'center'}
            ]]
            ,parseData: function(res) {
            }
            ,done: function(res, curr, count){
            }
        });
        //监听工具条
        table.on('tool(testFS)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            // 将data转为字符串
            var jStr = "{ ";
            for(var item in data){
                jStr += "'"+item+"':'"+data[item]+"',";
            }
            jStr += " }";
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if (obj.event === 'edit') {// 编辑
                index=layer.open({
                    type: 1
                    ,id: 'updateInfo' //防止重复弹出
                    ,content: $(".updateInfo")
                    ,shade: 0.4 //不显示遮罩
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
                    ,shade: 0.4 //不显示遮罩
                    ,area: ['510px', '450px']
                    ,success: function (layero, index) {
                        $("#detailData").text(jStr);
                        $("#detailDataTitle").text(data.title);
                        $("#detailDataContent").text(data.content);
                        $.ajax({
                            type: "GET",
                            url: path + "/inform/updateStatus",
                            data: {"informId": data.id},
                            dataType: "json",
                            success: function(data){
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
                    ,shade: 0.4 //不显示遮罩
                    ,area: ['510px', '450px']
                    ,success: function(){
                        $("#userAgo").html("");
                        $.ajax({
                            type: "GET",
                            url: path + "/inform/selSeen",
                            data: {"informId": data.id},
                            dataType: "json",
                            success: function(res){
                                $("#userAfter").html("");
                                $("#userAgo").html("");
                                for (var i = 0 ; i < res.data.length; i ++) {
                                    if (res.data[i].rdStatus == "0") {//未读
                                        $("#userAfter").append("<span class='userSpan'>"+res.data[i].username+"</span>");
                                    } else {
                                        $("#userAgo").append("<span class='userSpan'>"+res.data[i].username+"</span>");
                                    }

                                }
                            }
                        });
                    }
                    ,yes: function () {}
                    ,style: {
                        top: '0'
                    }
                });
            }
        });
    });
}
//根据通知按钮查询收到的数据
function  noticeClickSD() {
    // $(".demoType").css("display", "none");
    $(".demoInfoSD").css("display", "block");
    $(".demoInfoFS").css("display", "none");
    var win = $(window).height();
    var height = win-100;
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#demoInfoSD'
            ,height: height
            ,url: path + '/inform/getInformList?isactive=2'//数据接口
            ,page: true //开启分页
            ,limit: 10
            ,limits: [10, 20, 30]
            ,id: 'demoInfo'
            ,cols: [[ //表头
                {field: 'created', title: '时间', align:'center', sort: true, width: 150}
                ,{field: 'title', title: '标题', align:'center',width: 200}
                ,{field: 'content', title: '内容', align:'center'}
                ,{field: 'createdByName', title: '创建人', align:'center', width: 100}
                ,{field: 'filedir', title: '地址', align:'center', hide: 'false'}
                ,{field: 'informTypeName', title: '类别', hide: 'false', align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemoSD', width:270, align:'center'}
            ]]
            ,parseData: function(res) {
            }
            ,done: function(res, curr, count){
            }
        });
        //监听工具条
        table.on('tool(testSD)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            // 将data转为字符串
            var jStr = "{ ";
            for(var item in data){
                jStr += "'"+item+"':'"+data[item]+"',";
            }
            jStr += " }";
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if (obj.event === "detailSD") {// 查看
                index=layer.open({
                    type: 1
                    ,id: 'detailSD' //防止重复弹出
                    ,content: $(".detail")
                    ,data: {"data": data}
                    ,shade: 0.4 //不显示遮罩
                    ,area: ['510px', '450px']
                    ,success: function (layero, index) {
                        $("#detailData").text(jStr);
                        $("#detailDataTitle").text(data.title);
                        $("#detailDataContent").text(data.content);
                        $.ajax({
                            type: "GET",
                            url: path + "/inform/updateStatus",
                            data: {"informId": data.id},
                            dataType: "json",
                            success: function(data){
                            }
                        });
                    }
                    ,yes: function(){
                    }
                    ,style: {
                        top: '10%'
                    }
                });
            }
        });
    });
}
// 显示添加通知
function showAddInfo() {
    // showInfo();
    $("#addInfoTitle").val("");
    $("#addInfoContent").val("");
    // $("#addTypeList").val(0);
    // $("#addTypeSonList").val(0);
    $("#showUser").text("");
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'addInfo' //防止重复弹出
            , content: $(".addInfo")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
    //显示人员框里的接口调用
    layui.use('form', function(){
        var form = layui.form;
        $("#companyList").val("0");
        $("#addUserDepartment").val("0");
        $("#checkUser").text("0人");
        $("#addUserSelectId").val("");
        form.render('select');
        form.render(); //更新全部
    });
    // 未选择部门显示所有人员
    showUser('0');
}
//添加通知
function addInfo() {
    var title = $("#addInfoTitle").val();
    var content = $("#addInfoContent").val();
    // var informTypeId =  $("#addTypeSonId").val();
    var userId = "";
    if ($("#addInfoTitle").val() == "" || $("#addInfoContent").val() == 0) {
        layer.alert("请填写通知标题");
        return;
    }
    if ($("#addInfoContent").val() == "" || $("#addInfoContent").val() == 0) {
        layer.alert("请填写通知内容");
        return;
    }
    if ($("#addUserSelectId").val() != "" && $("#showUser").text() != "") {
        userId = $("#addUserSelectId").val();
    } else {
        layer.alert("请选择通知人员");
        return;
    }
    /*if (informTypeId == ""){
        layer.alert("请选择类型");
        return;
    }*/
    if (filedir != "ERROR"){
        $.ajax({
            type: "POST",
            url: path+'/inform/addInform',
            // data: {title: title, content: content, informTypeId: informTypeId, usersId: userId, filedir: filedir},
            data: {title: title, content: content, usersId: userId, filedir: filedir},
            dataType: "json",
            success: function (data) {
                layer.closeAll();
                noticeClickSD();
            }
        });
    }

}
// 显示人员弹框
function showAddUser() {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        index = layer.open({
            type: 1
            , id: 'addUser' //防止重复弹出
            , content: $(".addUser")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['80%', '580px']
            , yes: function () {
            }
        });
    });
}
//人员弹框确定
function addUser() {
    $("#showUser").text($("#checkUser").text());
    layer.close(index);
}
// 下载按钮
function downLoad() {
    var data = $("#detailData").text().substring(0);
    // 将字符串转换为json
    function strToJson(str){
        var json = eval('(' + str + ')');
        data = json;
    }
    strToJson(data);
    if (data.filedir != null & data.filedir != '') {
        var dir = data.filedir;
        var index1 = dir.slice(dir.lastIndexOf(".")+1) ;
        if (index1 == "html") {
            var fileName=data.filedir.slice(7);
            window.open(path + "/inform/downloadFile"+fileName);
        } else {
            window.location.href = path + "/inform/downloadFile?id=" + data.id;
        }
    } else {
        layer.alert("无文件");
    }
}
// 修改通知
function updInfo() {
    var title = $("#updInfoTitle").val();
    var content = $("#updInfoContent").val();
    var id = $("#updInformId").val();
    if (title == "" || content == "") {
        layer.alert("请将消息填写完整");
        return;
    }
    $.ajax({
        type: "GET",
        url: path + "/inform/updateInform",
        data: {"id": id, "title": title, "content": content},
        dataType: "json",
        success: function(data){
            layer.closeAll();
            noticeClickFS();
        }
    });
}

/*//根据类型按钮查询类型
function typeClick() {
    $(".demoInfo").css("display", "none");
    $(".demoType").css("display", "block");
    layui.use('table', function(){
        var table = layui.table;
        var form = layui.form;
        table.render({
            elem: '#demoType'
            ,height: 'full-215',
            id: 'demoType'
            ,url: path + '/inform/getInformTypeList' //数据接口
            ,cols: [[ //表头
                {field: 'name', title: '名称', align:'center'}
                ,{field: 'created', title: '创建时间', sort: true, width: 200, align:'center'}
                ,{field: 'companyName', title: '公司', align:'center'}
                ,{field: 'parent', title: '父级', hide: 'false', align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#barDemo2', width:200, align:'center'}
            ]],
            parseData: function(res) {
            },
            done: function(res, curr, count){
                var a=layui.table.cache.demoType;
                for(var i =0;i<a.length;i++){
                    if(a[i].parent==0){
                        $(".demoType .layui-table tbody tr").eq(i).css("background-color","#d2d2d2");
                    }else{
                        $(".layui-table-col-special button").eq(i).css("display","none");
                    }
                }
            }
        });
        //监听工具条
        table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            $("#addSonTypeTypeId").val(data.id);
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'add'){ //添加
                $("#addSonCompanyList").val(data.companyId);
                index=layer.open({
                    type: 1
                    ,id: 'addSonType' //防止重复弹出
                    ,content: $(".addSonType")
                    ,shade: 0.4 //不显示遮罩
                    ,area: ['510px', '355px']
                    ,yes: function(){}
                });
            } else if (obj.event === 'edit') {
                $("#updateTypeTypeName").val(data.name);
                $("#updateCompanyList").val(data.companyId);
                $("#updateTypeId").val(data.id);
                form.render('select','updateCompanyList');
                index=layer.open({
                    type: 1
                    ,id: 'updateType' //防止重复弹出
                    ,content: $(".updateType")
                    ,shade: 0.4 //不显示遮罩
                    ,area: ['510px', '385px']
                    ,yes: function(){
                    }
                });
            }
        });
    });
}
// 显示添加父类的窗口
function showAddType() {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'addType' //防止重复弹出
            , content: $(".addType")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['510px', '385px']
            , yes: function () {
            }
        });
    });
}
// 添加父类类型
function addType() {
    var name = $("#addTypeTypeName").val();
    if (name == "") {
        layer.alert("请将消息填写完整");
        return;
    }
    $("#addTypeBtn").css("display", "none");
    $.ajax({
        url: path + '/inform/addInformType',//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"parent":"0","name": name},
        success: function (data) {
            layer.closeAll();
            $(".addType").css("display", "none");
            typeClick();
            $("#addTypeTypeName").val("");
            $("#addTypeBtn").css("display", "block");
        },
        error: function () {
            $("#addTypeBtn").css("display", "block");
        }
    });
}
// 添加子类类型
function addSonType() {
    var id = $("#addSonTypeTypeId").val();
    var name = $("#addSonTypeTypeName").val();
    if (name == "") {
        layer.alert("请将消息填写完整");
        return;
    }
    $("#addSonTypeBtn").css("display", "none");
    $.ajax({
        url: path + '/inform/addInformType',//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"parent":id,"name": name},
        success: function (data) {
            layer.closeAll();
            typeClick();
            $("#addSonTypeBtn").css("display", "block");
            $("#addSonTypeTypeId").val();
            $("#addSonTypeTypeName").val("");
            $("#addSonCompanyList").val("0");
        },error: function () {
            $("#addSonTypeBtn").css("display", "block");
        }
    });
}
// 修改类型
function updateType() {
    var name = $("#updateTypeTypeName").val();
    var id = $("#updateTypeId").val();
    if (name == "") {
        layer.alert("请将消息填写完整");
        return;
    }
    $("#updateTypeBtn").css("display", "none");
    $.ajax({
        url: path + '/inform/updateInformType',//请求地址
        datatype: "json",//数据格式
        type: "GET",//请求方式
        data: {"id":id,"name": name,"type":identification},// type 1 修改 0未修改
        success: function (data) {
            layer.closeAll();
            typeClick();
            $("#updateTypeBtn").css("display", "block");
        },error: function () {
            $("#updateTypeBtn").css("display", "block");
        }
    });
    identification = "0";
}*/
// 取消
function cancel() {
    layer.closeAll();
    $("#checkUser").text("");
}
// 取消
function cancel1() {
    layer.close(index);
}