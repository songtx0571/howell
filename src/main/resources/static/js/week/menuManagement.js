var path = "";
$(function () {
    showMenuOne()
    //显示信息
    showTable(23);
    $("#menuListTemplate").val(1)
});

//显示一级菜单
function showMenuOne() {
    layui.use(['form'], function () {
        var form = layui.form;
        $.ajax({
            type: "GET",
            url: path + "/menu/getMenuMap",
            data: {"template": 4, parent: 0},
            dataType: "json",
            success: function (data) {
                $("#menuList").empty();
                $("#menuOneList").empty();
                var option1 = "";
                for (var i = 0; i < data.length; i++) {
                    option1 += "<option label='" + data[i].template + "' value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                var option2 = "<option value='' >请选择</option>";
                for (var i = 0; i < data.length; i++) {
                    option2 += "<option value='" + data[i].template + "'>" + data[i].name + "</option>";
                }
                $('#menuList').append(option1);
                $('#menuOneList').append(option2);
                form.render();//菜单渲染 把内容加载进去
            }
        });
        form.on('select(menuList)', function (data) {
            $("#menuListHidden").val(data.value);//得到被选中的值
            var dom = data.elem[data.elem.selectedIndex].label;
            $("#menuListTemplate").val(dom);
            showTable(data.value)
        });
        form.on('select(menuOneList)', function (data) {
            $("#menuOneListHidden").val(data.value);//得到被选中的值
            $.ajax({
                type: "GET",
                url: path + "/menu/getMenuMap",
                data: {"template": data.value, parent: 0},
                dataType: "json",
                success: function (data) {
                    $("#menuTwoList").empty();
                    var option = "<option value='' >请选择</option>";
                    for (var i = 0; i < data.length; i++) {
                        option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                    $('#menuTwoList').append(option);
                    form.render();//菜单渲染 把内容加载进去
                }
            });
        });
        form.on('select(menuTwoList)', function (data) {
            $("#menuTwoListHidden").val(data.value);//得到被选中的值
        });
    })
}

//显示信息
function showTable(template) {
    var win = $(window).height();
    var height = win - 100;
    layui.use(['table'], function () {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , height: height
            , toolbar: true
            , url: path + "/menu/getMenuList?template=" + template//数据接口
            , cols: [[ //表头
                {field: 'name', title: '菜单名称', align: 'center'}
                // , {field: 'parent', title: '父类菜单', align: 'center'}
                , {field: 'active', title: '是否活跃', align: 'center'}
                , {field: 'url', title: '模板路径', align: 'center'}
                /*, {field: 'priority', title: '优先级', align: 'center'}
                , {field: 'template', title: '菜单', align: 'center'}*/
                , {fixed: '', title: '操作', toolbar: '#barDemo', align: 'center '}
            ]]
            , done: function (res, curr, count) {
            }
        });
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event == "edit") {//修改
                showMenu(data.id, "")
            } else if (obj.event == "up") {//上移
                $.ajax({
                    "type": 'put',
                    "url": path + "/menu/updPriority",
                    data: {id: Number(data.id), template: Number($("#menuListTemplate").val())},
                    dataType: "json",
                    "success": function (data) {
                        if ($("#menuListHidden").val() == "") {
                            showTable(23);
                        } else {
                            showTable(Number($("#menuListHidden").val()));
                        }
                    }
                });
            }
        });
    });
}

//打开操作页面
function showMenu(id, type) {
    $('#menuLevelHidden').val(type);
    layui.use(['form'], function () {
        var form = layui.form;
        $("#menuName").val("");
        $("#menuUrl").val("");
        $("#menuOneList").val("");
        $("#menuOneListHidden").val("");
        $("#menuTwoList").val("");
        $("#menuTwoListHidden").val("");
        form.render(); //更新全部
    })
    if (id == "") { //添加
        if (type == 2) { //二级
            $(".menuThreeTr").css("display", "none");
            $(".menuTwoTr").css("display", "revert");
        } else if (type == 3) { //三级
            $(".menuTwoTr").css("display", "revert");
            $(".menuThreeTr").css("display", "revert");
        }
    } else { //修改

    }
    layui.use('layer', function () {
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , id: 'saveMenuDiv' //防止重复弹出
            , content: $(".saveMenuDiv")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
}

//保存
function saveMenu() {
    var menu = {};
    menu.name = $("#menuName").val();
    if ($("#menuLevelHidden").val() == '2') {
        menu.parent = 0;
    } else if ($("#menuLevelHidden").val() == '3') {
        menu.parent = Number($("#menuLevelHidden").val());
    } else{
        menu.parent = 0;
    }
    menu.url = $("#menuUrl").val();
    menu.template = Number($("#menuOneListHidden").val());
    console.log(menu)
    if (menu.name.trim().length <= 0) {
        layer.alert("请输入名称");
        return false;
    }
    if (menu.url.trim().length <= 0) {
        layer.alert("请输入路径");
        return false;
    }
    $.ajax({
        "type": 'put',
        "url": path + "/menu/addMenu",
        data: JSON.stringify(menu),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        "success": function (data) {
            if (data == "wrongParameter") {
                layer.alert("参数有误");
            } else if (data == "havaRecord") {
                layer.alert("存在同名");
            } else if (data == "success") {
                layer.alert("操作成功");
                showTable(23);
                layer.closeAll();
            }
        }
    });
}

//取消
function cancel() {
    layer.closeAll();
}