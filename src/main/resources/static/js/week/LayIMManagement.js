var path = "http://192.168.1.89:8080";
$(function () {
    //显示公司
    getCompanyList();
    //显示部门信息
    showTable("");
});
//获取公司信息
function getCompanyList() {
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/message/getLayIMDepMap",
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
            $("#companyIdHidden").val(data.value);//得到被选中的值
            showTable($("#companyIdHidden").val())
        });
    })
}
//显示部门信息
function showTable(companyId) {
    var top = $(".top").css("height");
    var win = $(window).height();
    var tp = top.indexOf("p");
    var topHeight = top.substring(0,tp);
    var height = win-topHeight-60;
    layui.use(['table'], function() {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , height: height
            , toolbar: true
            , url:  path + "/message/getLayIMDepList?companyId="+companyId //数据接口
            , cols: [[ //表头
                {field: 'name', title: '名称', align: 'center'}
                , {fixed: '', title: '状态', toolbar: '#barDemo', align: 'center '}
            ]]
            , done: function (res, curr, count) {
                for (var i = 0; i < res.data.length; i ++){
                    var status = res.data[i].layIMState;
                    if (status == "0"){//禁用
                        $(".closeStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).css("background", "#ccc");
                        $(".closeStatus"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".closeStatus"+res.data[i].id).css("cursor","no-drop");
                        $(".openStatus"+res.data[i].id).removeAttr("disabled");
                        $(".openStatus"+res.data[i].id).css("cursor","pointer");
                    }else if (status == "1") {//启用
                        $(".closeStatus"+res.data[i].id).css("background", "#ccc");
                        $(".openStatus"+res.data[i].id).css("background", "#1E9FFF");
                        $(".openStatus"+res.data[i].id).attr({"disabled":"disabled"});
                        $(".openStatus"+res.data[i].id).css("cursor","no-drop");
                        $(".closeStatus"+res.data[i].id).removeAttr("disabled");
                        $(".closeStatus"+res.data[i].id).css("cursor","pointer");
                    }
                }
            }
        });
        table.on('tool(test)', function(obj) {
            var data = obj.data;
            if (obj.event == "statusOpen"){//启用
                $(".closeStatus"+data.id).css("background", "#ccc");
                $(".openStatus"+data.id).css("background", "#1E9FFF");
                $(".openStatus"+data.id).attr({"disabled":"disabled"});
                $(".openStatus"+data.id).css("cursor","no-drop");
                $(".closeStatus"+data.id).removeAttr("disabled");
                $(".closeStatus"+data.id).css("cursor","pointer");
                $.ajax({
                    url:   path + '/message/updLayIMDep',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'layIMState':1},
                    success: function (data) {
                        showTable(companyId);
                    }
                });
            } else if (obj.event == "statusClose"){//禁用
                $(".closeStatus"+data.id).css("background", "#1E9FFF");
                $(".openStatus"+data.id).css("background", "#ccc");
                $(".closeStatus"+data.id).attr({"disabled":"disabled"});
                $(".closeStatus"+data.id).css("cursor","no-drop");
                $(".openStatus"+data.id).removeAttr("disabled");
                $(".openStatus"+data.id).css("cursor","pointer");
                $.ajax({
                    url: path + '/message/updLayIMDep',
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data:{'id':data.id,'layIMState':0},
                    success: function (data) {
                        showTable(companyId);
                    }
                });
            }
        });
    });
}