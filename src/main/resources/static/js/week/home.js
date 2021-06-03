$(function () {
    //让导航线加载
    for (var i = 23; i < 27; i++) {
        showContent(i);
    }
    //获取当前登陆人
    $.ajax({
        url: "/getLoginUserInfo",//请求地址
        dataType: "json",//数据格式
        type: "get",//请求方式
        success: function (data) {
            $("#userName").html(data.userName);
        }
    });
})

//导航栏二级菜单显示隐藏
function mouseFun(num) {
    var arr = [0, 1, 2, 3];
    var removeNumList = remove(arr, num);
    for (let item in removeNumList) {
        $(".top_list1_chide" + removeNumList[item]).css("display","none");
        $(".top_list1Two" + removeNumList[item]).css({"background": '#F3F6FB',"color": '#000'});
        $(".iconfont" + removeNumList[item]).css("color", "#0056FF");
    }
    if ($(".top_list1_chide" + num).css("display") == "none") {
        $(".top_list1_chide" + num).css("display","block");
        $(".top_list1Two" + num).css({"background": '#0056FF',"color": '#fff'});
        $(".iconfont" + num).css("color", "#fff");
    } else {
        $(".top_list1_chide" + num).css("display","none");
        $(".top_list1Two" + num).css({"background": '#F3F6FB',"color": '#000'});
        $(".iconfont" + num).css("color", "#0056FF");
    }
    $(".top_list2_chide1").css("display","none");
    $(".top_list2_chide2").css("display","none");
}
function mouseFun2 (type) {
    if (type == '1') {
        if ($(".top_list2_chide1").css("display") == "block"){
            $(".top_list2_chide1").css("display","none");
            $(".top_list2_chide2").css("display","none");
        } else {
            $(".top_list2_chide1").css("display","block");
            $(".top_list2_chide2").css("display","none");
        }
    } else {
        if ($(".top_list2_chide2").css("display") == "block"){
            $(".top_list2_chide1").css("display","none");
            $(".top_list2_chide2").css("display","none");
        } else {
            $(".top_list2_chide2").css("display","block");
            $(".top_list2_chide1").css("display","none");
        }
    }
    for (var i = 0; i < 4; i ++) {
        $(".top_list1_chide" + i).css("display","none");
        $(".top_list1Two" + i).css({"background": '#F3F6FB',"color": '#000'});
        $(".iconfont" + i).css("color", "#0056FF");
    }
}

//删除数组指定元素
function remove(arr, num) {
    const newArr = [...arr];
    if (newArr.indexOf(num) != -1) {
        newArr.splice(newArr.indexOf(num), 1);
        return newArr;
    }
}

//菜单显示
function showContent(typeHtml) {
    $.ajax({
        type: "POST",
        url: '/getMenuTree',
        sync: true,
        data: {rootMenuId: typeHtml},
        dataType: "json",
        success: function (data) {
            // 将data转为字符串:JSON.stringify(data)
            menuFun(typeHtml, JSON.stringify(data), JSON.stringify(data))
        }
    });
}

function menuFun(typeHtml, data, str) {
    data = eval('(' + data + ')');
    var list1_div = "";
    for (var i = 0; i < data.length; i++) {
        if (typeHtml == 23) {//guide
            list1_div += fullFun(str, "", i, 23)+"</div></div>";
            $(".top_list1_chide0").html(list1_div);
        }
        if (typeHtml == 24) {//ai
            list1_div += fullFun(str, "", i, 24) + "</div></div>";
            $(".top_list1_chide1").html(list1_div);
        }
        if (typeHtml == 25) {//wa
            list1_div += fullFun(str, "", i, 25) + "</div></div>";
            $(".top_list1_chide2").html(list1_div);
        }
        if (typeHtml == 26) {//exam
            list1_div += fullFun(str, "", i, 26) + "</div></div>";
            $(".top_list1_chide3").html(list1_div);
        }
    }
}

//填充二级、三级菜单
function fullFun(data, div, i, typeHtml) {
    data = eval('(' + data + ')');
    div += "<div><div><strong><span>" + data[i].name + "</span></strong></div><div>";
    var three = data[i].children;//三级菜单
    for (var k = 0; k < three.length; k++) {
        three[k].url = "'" + three[k].url + "'";//刚给路径加上双引号，存放到点击事件里
        div += '<span onclick="jump(' + typeHtml + ',' + three[k].url + ')">' + three[k].name + '</span>'
    }
    return div;
}

//跳转
function jump(project, url) {
    var src = "";
    if (project == "25") {//wa
        src = "http://localhost:8081" + url;
    } else if (project == "23") {//guide
        src = "http://localhost:8082" + url;
    } else if (project == "24") {//ai
        src = "http://localhost:8084" + url;
    } else if (project == "26") {//exam
        src = "http://localhost:8083" + url;
    } else if (project == "27") {//defect
        src = "http://localhost:8085" + url;
    }
    var $iframeRight = $('.iframeContent');
    $iframeRight.attr("src", src);


    /*var src = "http://test.howellop.com" + url;
    var $iframeRight = $('.iframeContent');
    $iframeRight.attr("src", src);*/
}

var $iframeRight1 = $(".iframeContent");

//管理
function administration(type) {
    if (type == "dynamicRegion") {//动态区域
        $iframeRight1.attr("src", "dynamicRegion");
    } else if (type == "noticeManagement") {//通知管理
        $iframeRight1.attr("src", "noticeManagement");
    } else if (type == "departmentManagement") {//部门管理
        $iframeRight1.attr("src", "departmentManagement");
    } else if (type == "roleManagement") {//角色管理
        $iframeRight1.attr("src", "roleManagement");
    } else if (type == "postManagement") {//岗位管理
        $iframeRight1.attr("src", "postManagement");
    } else if (type == "accountManagement") {//账户管理
        $iframeRight1.attr("src", "accountManagement");
    } else if (type == "authorityManagement") {//权限管理
        $iframeRight1.attr("src", "authorityManagement");
    } else if (type == "messageManagement") {//通讯管理
        $iframeRight1.attr("src", "messageManagement");
    } else if (type == "message") {//通讯管理
        $iframeRight1.attr("src", "index");
    } else if (type == "menuManagement") {//菜单管理
        $iframeRight1.attr("src", "menuManagement");
    }
}

//弹窗界面
function homePopup(data) {
    $iframeRight1.attr("src", "homePopup?data=" + data);
}

//版本号
function version() {
    $iframeRight1.attr("src", "versionManagement");
}