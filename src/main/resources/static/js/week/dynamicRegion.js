var path = "";
$(function () {
    showFormSelects();
    showTable("","");
    $('#keyword').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            showTable($("#keyword").val(),$("#userSelectId").val());
        }
    })

});
//下拉多选框
function showFormSelects () {
    layui.use(['jquery', 'formSelects'], function(){
        var formSelects = layui.formSelects;
        formSelects.config('tags', {
            keyName: 'name',
            keyVal: 'id',
        }).data('tags', 'server', {
            url: path + ''
        });
        formSelects.closed('tags', function(id){
            $("#userSelectId").val(layui.formSelects.value('tags', 'val'));
            showTable($("#keyword").val(),$("#userSelectId").val());
        });
    });
}
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
                    dataType: "json",//数据格式
                    type: "get",//请求方式
                    success:function(data){

                        showTable("","");
                    }
                });
            }
        });
    });
}