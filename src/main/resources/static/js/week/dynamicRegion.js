var path = "";
$(function () {
    showTable("","");
});
//显示表格
function showTable(keyword,userSelectId) {
    var win = $(window).height();
    var height = win-100;
    userSelectId = "["+userSelectId+"]";
    layui.use('table', function() {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , height: height
            , url: path + '/operation/all'//数据接口
            , page: true //开启分页
            , limit: 50
            , limits: [50,100,150]
            , id: 'demoInfo'
            , cols: [[ //表头R
                {field: 'createTime', title: '时间', align: 'center', sort: true, width: 150}
                , {field: 'sendName', title: '人员', width: 200}
                , {field: 'verb', title: '动作'}
                , {field: 'content', title: '内容'}
                , {field: 'type', title: '模块'}
                ,{fixed: '', title:'状态', toolbar: '#barDemo',align:'center'}
            ]]
            , parseData: function (res) {
            }
            , done: function (res, curr, count) {
            }
        });
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            if (obj.event === 'daile') {
                $.ajax({
                    url:path + "/operation/isRead/"+ data.id,
                    type: "get",//请求方式
                    success:function(data){
                        showTable("","");
                    }
                });
            }
        });
    });
}
//打开自定义页面
function showCustomDiv() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'customColor' //防止重复弹出
            , content: $(".customColor")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
    //级别
    levelFun();
    $.ajax({
        url: "/setting/get",//请求地址
        dataType: "json",//数据格式
        type: "get",//请求方式
        data:{},
        success: function (data) {
            data = data.data;
            $("#idHidden").val(data.id)
            $("#guideHidden").val(data.guideLevel);
            $("#AIHidden").val(data.aiLevel);
            $("#defectHidden").val(data.defectLevel);
            $("#examHidden").val(data.examLevel);
            $("#howellHidden").val(data.howeiLevel);
            $("#waHidden").val(data.waLevel);
            $("#timeHidden").val(data.rollingTime);
            layui.use('form', function () {
                var form = layui.form;
                $("#selGuide").val(data.guideLevel);
                $("#selAI").val(data.aiLevel);
                $("#selDefect").val(data.defectLevel);
                $("#selExam").val(data.examLevel);
                $("#selHowell").val(data.howeiLevel);
                $("#selWa").val(data.waLevel);
                $("#selTime").val(data.rollingTime);
                form.render('select');
                form.render(); //更新全部
            });
        }
    });
}

//级别
function levelFun() {
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('select(selGuide)', function (data) {
            $("#guideHidden").val(data.value);
        });
        form.on('select(selDefect)', function (data) {
            $("#defectHidden").val(data.value);
        });
        form.on('select(selExam)', function (data) {
            $("#examHidden").val(data.value);
        });
        form.on('select(selAI)', function (data) {
            $("#AIHidden").val(data.value);
        });
        form.on('select(selWa)', function (data) {
            $("#waHidden").val(data.value);
        });
        form.on('select(selHowell)', function (data) {
            $("#howellHidden").val(data.value);
        });
        form.on('select(selTime)', function (data) {
            $("#timeHidden").val(data.value);
        });
    });
}

// 确定自定义
function customOk() {
    var userSetting = {};
    userSetting.rollingTime = $("#timeHidden").val();
    if (userSetting.rollingTime == "" || userSetting.rollingTime == null) {
        userSetting.rollingTime = "10000";
    }
    userSetting.id = $("#idHidden").val();
    userSetting.guideLevel = $("#guideHidden").val();
    userSetting.defectLevel = $("#defectHidden").val();
    userSetting.howeiLevel = $("#howellHidden").val();
    userSetting.examLevel = $("#examHidden").val();
    userSetting.waLevel = $("#waHidden").val();
    userSetting.aiLevel = $("#AIHidden").val();

    $.ajax({
        url: "/setting/save",//请求地址
        dataType: "json",//数据格式
        type: "post",//请求方式
        data:JSON.stringify(userSetting),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            layer.closeAll();
        }
    })
}

//取消
function cancel() {
    layer.closeAll();
}