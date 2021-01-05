var usersId = "";
var groupList = "";
$(function () {
    showTable(1,"");
    //查询群名
    $("#searchBtn").click(function () {
        var groupName = $("#groupName").val();
        showTable(1,groupName);
    })
    // 回车键搜索
    $('#groupName').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            $("#searchBtn").click();
        }
    })
    //查询群员
    $("#searchGroupMemberBtn").click(function () {
        var userName = $("#groupMember").val();
        showTableMember(userName,$("#groupMemberId").val());
    })
    // 回车键搜索
    $('#groupMember').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            $("#searchGroupMemberBtn").click();
        }
    })
    //编辑群员的公司
    getCompanyList();
});
/*********************************************************显示群*******************************************************************/
//显示表格
function showTable(page,groupName) {
    if (groupName != "" || groupName != null) {
        groupName = $("#groupName").val();
    }
    var top = $(".top").css("height");
    var win = $(window).height();
    var tp = top.indexOf("p");
    var topHeight = top.substring(0,tp);
    var height = win-topHeight-20;
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#groupDemo'
            ,height: height
            ,url: '/message/getGroupList?groupName='+ groupName //数据接口
            ,page: {curr: page }
            ,limit: 100
            ,id: 'testReload'
            ,limits: [100, 150]
            ,cols: [[ //表头
                {field: 'id', title: '编号', width:80,sort:true,align:'center', hide:true}
                ,{field: 'groupName', title: '群名',align:'center',style:'color:red;cursor: pointer;', event: 'edit'}
                // ,{field: 'number', title: '人数',align:'center'}
                ,{field: 'created', title: '创建时间',align:'center'}
                ,{field: 'userName', title: '创建人',align:'center'}
                ,{field: 'remark', title: '备注',align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#groupBarDemo', width:150,align:'center'}
            ]]
            , parseData: function(res) {}
            ,done: function(res, curr, count){}
        });
        //监听行工具事件
        table.on('tool(groupTest)', function(obj) {
            var data = obj.data;
            if (obj.event === 'edit') {
                $("#updGroupName").val(data.groupName);
                $("#updRemark").val(data.remark);
                $("#updGroupId").val(data.id);
                layer.open({
                    type: 1
                    ,id: 'updGroupNameDiv' //防止重复弹出
                    ,content: $(".updGroupNameDiv")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,area: ['100%', '100%']
                    ,yes: function(){}
                });
            }
            /*else if (obj.event === 'del'){
                $.ajax({
                    type: "POST",
                    url: "/message/delGroup",
                    data: { id: data.id },
                    dataType: "json",
                    success: function(data){
                        showData(data,$("#groupName").val());
                    }
                });
            }*/
            else if (obj.event === 'showMember'){//显示群员
                $("#groupMemberId").val(data.id)
                layer.open({
                    type: 1
                    ,id: 'showGroupMember' //防止重复弹出
                    ,content: $(".showGroupMember")
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,area: ['100%', '100%']
                    ,yes: function(){}
                });
                showTableMember("",$("#groupMemberId").val());
            }
        });
    });
}
//修改
function updGroup() {
    var group = {};
    group.id = $("#updGroupId").val();
    group.groupName = $("#updGroupName").val();
    group.remark = $("#updRemark").val();
    $.ajax({
        url: "/message/updGroup",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: JSON.stringify(group),
        contentType: "application/json; charset=utf-8",
        success: function (data) {//成功
            showData(data,$("#groupName").val());
        }
    });
}
//打开新增页面
function showAddGroup() {
    layer.open({
        type: 1
        ,id: 'addGroupNameDiv' //防止重复弹出
        ,content: $(".addGroupNameDiv")
        ,btnAlign: 'c' //按钮居中
        ,shade: 0.5 //不显示遮罩
        ,area: ['100%', '100%']
        ,yes: function(){}
    });
}
//添加
function addGroup() {
    var group = {};
    group.groupName = $("#addGroupName").val();
    group.remark = $("#addRemark").val();
    $.ajax({
        url: "/message/addGroup",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: JSON.stringify(group),
        contentType: "application/json; charset=utf-8",
        success: function (data) {//成功
            showData(data,"");
         }
    });
}
/*********************************************************群员*******************************************************************/
//显示群员
function showTableMember(userName,groupId) {
    $(".groupMemberTop").css("display","block");
    $(".groupMemberDemoTable").css("display","block");
    $(".groupMemberDiv").css("display","none");
    if (userName != "" || userName != null) {
        userName = $("#groupMember").val();
    }
    var top = $(".top").css("height");
    var win = $(window).height();
    var tp = top.indexOf("p");
    var topHeight = top.substring(0,tp);
    var height = win-topHeight-60;
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#groupMemberDemo'
            ,height: height
            ,url: '/message/getGroupUsersList' //数据接口
            ,where: {userName:userName,groupId:groupId}
            ,id: 'testReload1'
            ,cols: [[ //表头
                {field: 'id', title: '编号', width:80,sort:true,align:'center', hide:true}
                ,{field: 'userNumber', title: '编号',sort:true,align:'center'}
                ,{field: 'name', title: '人名',align:'center'}
                ,{field: 'companyName', title: '部门',align:'center'}
                ,{fixed: '', title:'操作', toolbar: '#groupMemberBarDemo', width:150,align:'center'}
            ]]
            , parseData: function(res) {}
            ,done: function(res, curr, count){
                groupList = res.data;
            }
        });
        table.on('tool(groupMemberTest)', function(obj) {
            var data = obj.data;
            if (obj.event === 'delMember'){
                $.ajax({
                    type: "POST",
                    url: "/message/delGroupUser",
                    data: { groupId:groupId,employeeId: data.id },
                    dataType: "json",
                    success: function(data){
                        showTableMember(userName,groupId);
                    }
                });
            }
        });
    });
}
//获取部门
function getCompanyList() {
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: "/message/getLayIMDepMap",
            data: {companyId: "0"},
            dataType: "json",
            success: function (data) {
                $("#companyList").empty();
                var option = "<option value='' >请选择公司名称</option>";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                $('#companyList').append(option);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(companyList)', function (data) {
            $("#companyListHidden").val(data.value);//得到被选中的值
            $.ajax({
                type: "GET",
                url: "/message/getLayIMDepShowMap",
                data:{companyId: $("#companyListHidden").val()},
                dataType: "json",
                success: function (data) {
                    $("#departList").empty();
                    var option = "<option value='' >请选择部门名称</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                    $('#departList').append(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
            form.on('select(departList)', function (data) {
                $("#departListHidden").val(data.value);//得到被选中的值
                getPeopel($("#departListHidden").val());
            })
        });
    })
}
//显示员工
function getPeopel(departId) {
    layui.use(['jquery', 'formSelects'], function(){
        var formSelects = layui.formSelects;
        formSelects.config('tags2', {
            keyName: 'name',
            keyVal: 'id',
        }).data('tags2', 'server', {
            url: "/message/getEmployeeMap?companyId="+departId,
        });
        formSelects.closed('tags2', function(id){
            usersId = layui.formSelects.value('tags2', 'val');
        });
    });
}
//打开编辑群员
function showGroupMemberBtn() {
    $("#departListHidden").val("");
    //群员
    getPeopel("");
    accordId();
    layui.use('form', function(){
        var form = layui.form;
        $("#companyList").val("");//公司
        $("#departList").val("");//部门
        form.render('select');
        form.render(); //更新全部
    });

    $(".groupMemberTop").css("display","none");
    $(".groupMemberDemoTable").css("display","none");
    $(".groupMemberDiv").css("display","block");
}
//根据群ID得出群员
function accordId() {
    layui.use('form', function() {
        var form = layui.form;
        var formSelects = layui.formSelects;
        //发送角色ID到后台查询用户所绑定的标签id存入到数组中
        var vArray = new Array();
        //遍历id存入到vArray 数组中
        for (var i = 0; i < groupList.length; i++) {
            vArray[i] = groupList[i].id;
        }
        //这个是查询数据添加到下拉多选框的方法  注意：（动态选中下拉框必须等渲染下拉框完成之后再选中）
        layui.formSelects.config('tags2', {
            searchUrl: "/message/getEmployeeMap?companyId="+$("#departListHidden").val(),
            success: function(id, url, searchVal, result){
                formSelects.value('tags2', vArray);
            }
        });
        form.render('select');
        form.render(); //更新全部
    });

}
//确定群员groupId,employeeIds
function editGroupMember() {
    usersId = usersId.toString();
    $.ajax({
        type: "POST",
        url: "/message/addGroupUsers",
        data: { groupId: $("#groupMemberId").val(), employeeIds:usersId , companyId: $("#departListHidden").val()},
        dataType: "json",
        success: function(data){
            $(".groupMemberTop").css("display","block");
            $(".groupMemberDemoTable").css("display","block");
            $(".groupMemberDiv").css("display","none");
            if (data == "SUCCESS") {
                layer.alert("成功");
                showTableMember("",$("#groupMemberId").val());
            } else if (data == "ERROR") {
                layer.alert("后台错误");
            } else if (data == "CANCEL") {
                layer.alert("页面错误");
            } else if (data == "INVALID") {
                layer.alert("登录信息失效");
            } else {
                layer.alert("存在同名");
            }

        }
    });
}
//取消
function cancel1() {
    $(".groupMemberTop").css("display","block");
    $(".groupMemberDemoTable").css("display","block");
    $(".groupMemberDiv").css("display","none");
}
//更新
function showData(data,name) {
    layer.closeAll();
    if (data == "SUCCESS") {
        layer.alert("成功");
        showTable(1,name);
    } else if (data == "ERROR") {
        layer.alert("后台错误");
    } else if (data == "CANCEL") {
        layer.alert("页面错误");
    } else if (data == "INVALID") {
        layer.alert("登录信息失效");
    } else {
        layer.alert("存在同名");
    }
}
// 取消
function cancel() {
    layer.closeAll();
}