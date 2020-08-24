var index=0;//layer弹窗
var path = "http://192.168.1.26:8080/";
// 修改类型
// 如果改变了id值，返回true
var identification = "0";
$(function () {
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "inform/getCompanyList",
            data: {"parent": 0},
            dataType: "json",
            success: function (data) {
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

            },
            error: function (err) {
                console.log(err)
            }
        });
        form.on('select(companyList)', function(data){
            $("#companyIdHidden").val(data.value);
            $(".noticeType").css("display", "block")
            showInfo();
        })
    });
    // 父类型发生改变后，显示子类型
    $("#addTypeList").change(function () {
        $("#addTypeId").val(this.value)
        console.log(this.value)
        showSonInfo($("#addTypeId").val())
    });
    // 子类型下拉框的值改变
    $("#addTypeSonList").change(function () {
        $("#addTypeSonId").val(this.value);
    });
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
    // 根据部门的选择，显示人员
    $("#addUserDepartment").change(function () {
        var departmentId = this.value;
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


    // 修改类型
    // 如果改变了id值，返回trues
    $("#updateTypeTypeName").keyup(function () {
        identification = "1";
    });
    $("#addCompanyList").change(function () {
        $("#addCompanyId").val(this.value)
    })
    $("#addSonCompanyList").change(function () {
        $("#addSonCompanyId").val(this.value);
        console.log($("#addSonCompanyId").val())
    })
    $("#updateCompanyList").change(function () {
        $("#updateCompanyId").val(this.value)
    });

});
// 显示类型
function showInfo() {
    var companyId = $("#companyIdHidden").val();
    $.ajax({
        type: "GET",
        url: path + "inform/getInformTypes",
        data: {"parent": 0, "companyId": companyId},
        dataType: "json",
        success: function(data){
            //通用总类型下拉框
            $("#addTypeList").empty()
            var option="<option value='0' >请选择总类型</option>"
            for (var i = 0; i < data.length; i ++) {
                option += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
            }
            $('#addTypeList').html(option);
        },
        error : function (err) {
            console.log(err)
        }
    });
}

// 根据父类型的id显示子类型
function showSonInfo(id) {
    id = $("#addTypeId").val();
    var companyId = $("#companyIdHidden").val()
    $.ajax({
        type: "GET",
        url: path + "inform/getInformTypes",
        data: {"parent": id, "companyId": companyId},
        dataType: "json",
        success: function(data){
            //通用总类型下拉框
            $("#addTypeSonList").empty()
            var option="<option value='0' >请选择子类型</option>"
            for (var i = 0; i < data.length; i ++) {
                option += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
            }
            $('#addTypeSonList').html(option);
        },
        error : function (err) {
            console.log(err)
        }
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
    // 查询部门
    $.ajax({
        type: "GET",
        url: path + "inform/getDepartmentList",
        data: {"parent": $("#companyIdHidden").val()},
        dataType: "json",
        success: function(data){
            //选择部门
            $("#addUserDepartment").empty()
            var option="<option value='0' >请选择部门名称</option>"
            for (var i = 0; i < data.length; i ++) {
                option += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
            }
            $('#addUserDepartment').html(option);
        },
        error : function (err) {
            console.log(err)
        }
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
                $("#updateTypeId").val(data.id)
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