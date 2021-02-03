var path = "";
$(function () {
    //显示添加日期
    showCycleData();
    //显示时间线
    showTimeLine();
});
//显示添加日期
function showCycleData() {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //查询工作业绩日期
        laydate.render({
            elem: '#test4'
            ,format: 'yyyy年MM月dd日'
            ,trigger: 'click'//呼出事件改成click
            ,done: function(value){
                $("#cycleDataHidden").val(value);
            }
        });
    })
}
//显示时间线
function showTimeLine() {
    var timeline = $("#timeline");
    timeline.html("");
    $.ajax({
        type: "get",
        url: path+'/sysVersion/list',
        dataType: "json",
        success: function (data) {
            var li = "";
            data = data.data;
            for (var i = 0; i < data.length; i ++) {
                li += '<li class="layui-timeline-item"><i class="layui-icon layui-timeline-axis"></i>' +
                    '<div class="layui-timeline-content layui-text">' +
                    '<h3 class="layui-timeline-title">'+data[i].releaseDate+'</h3>' +
                    '<p>'+data[i].content+'</p></div></li>';
            }
            timeline.html(li);
        }
    });
}
//打开添加页面
function showAddVersion() {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            , id: 'addVersion' //防止重复弹出
            , content: $(".addVersion")
            , btnAlign: 'c' //按钮居中
            , shade: 0.1 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
}
//确定添加
function addVersionBtn() {
    var releaseDate = $("#cycleDataHidden").val();
    var content = $("#content").val();
    $.ajax({
        type: "post",
        url: path+'/sysVersion/add',
        data: {releaseDate: releaseDate, content: content},
        dataType: "json",
        success: function (data) {
            layer.closeAll();
            showTimeLine();
        }
    });
}
//取消
function cancel() {
    layer.closeAll();
}