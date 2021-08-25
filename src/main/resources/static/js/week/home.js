var os = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();

if (os.isAndroid || os.isPhone) {//手机
    vertical();
} else {//平板 电脑
    horizontal();
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

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
        $(".top_list1_chide" + removeNumList[item]).css("display", "none");
        $(".top_list1Two" + removeNumList[item]).css({"background": '#F3F6FB', "color": '#000'});
        $(".iconfont" + removeNumList[item]).css("color", "#0056FF");
    }
    if ($(".top_list1_chide" + num).css("display") == "none") {
        $(".top_list1_chide" + num).css("display", "block");
        $(".top_list1Two" + num).css({"background": '#0056FF', "color": '#fff'});
        $(".iconfont" + num).css("color", "#fff");
    } else {
        $(".top_list1_chide" + num).css("display", "none");
        $(".top_list1Two" + num).css({"background": '#F3F6FB', "color": '#000'});
        $(".iconfont" + num).css("color", "#0056FF");
    }
    $(".top_list2_chide1").css("display", "none");
    $(".top_list2_chide2").css("display", "none");
}

function mouseFun2(type) {
    if (type == '1') {
        if ($(".top_list2_chide1").css("display") == "block") {
            $(".top_list2_chide1").css("display", "none");
            $(".top_list2_chide2").css("display", "none");
        } else {
            $(".top_list2_chide1").css("display", "block");
            $(".top_list2_chide2").css("display", "none");
        }
    } else {
        if ($(".top_list2_chide2").css("display") == "block") {
            $(".top_list2_chide1").css("display", "none");
            $(".top_list2_chide2").css("display", "none");
        } else {
            $(".top_list2_chide2").css("display", "block");
            $(".top_list2_chide1").css("display", "none");
        }
    }
    for (var i = 0; i < 4; i++) {
        $(".top_list1_chide" + i).css("display", "none");
        $(".top_list1Two" + i).css({"background": '#F3F6FB', "color": '#000'});
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
            list1_div += fullFun(str, "", i, 23) + "</div></div>";
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
    hengshuping();
}

//填充二级、三级菜单
function fullFun(data, div, i, typeHtml) {
    data = eval('(' + data + ')');
    div += "<div><div><strong><span>" + data[i].name + "</span></strong></div><div>";
    var three = data[i].children;//三级菜单
    for (var k = 0; k < three.length; k++) {
        three[k].url = "'" + three[k].url + "'";//刚给路径加上双引号，存放到点击事件里
        if (three[k].name == "查询设备" && typeHtml == 23) {
            div += '<span style="box-shadow: 0px 0px 5px #eab949;" onclick="jump(' + typeHtml + ',' + three[k].url + ')">' + three[k].name + '</span>'
        } else {
            div += '<span onclick="jump(' + typeHtml + ',' + three[k].url + ')">' + three[k].name + '</span>'
        }

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

//判断手机横竖屏状态：
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {//竖屏状态
        vertical();
    }
    if (window.orientation == 90 || window.orientation == -90) {//横屏状态
        horizontal();
    }
}

//横屏样式
function horizontal() {
    $(".top").css({'height': '60px'});
    $(".top .logo img").css({'width': '40px'});
    $(".erjiTitle1").html('运行引导')
    $(".erjiTitle2").html('AI管理')
    $(".erjiTitle3").html('考勤管理')
    $(".erjiTitle4").html('考试管理')
    $(".erjiTitle").css({'font-size': '20px'})
    $(".iconfont").css({'font-size': '16px'})
    $(".top .top_list1 > li").css({'font-size': '14px', 'margin-top': '0px'});
    $(".top_list2 > li").css({'line-height': '40px'});
    $(".top_list2 > li > span").css({'font-size': '19px'})
    $(".top_list2 > li:last-child").css({'font-size': '18px', 'line-height': '40px'});
    $(".top_list1 .top_list1Li .top_list1_chide2").css({'width': '605px','left':'0px'})
    $(".top_list1_chide2>div>div:last-child").css({'width': '480px'})
    $(".top_list1_chide div strong").css({'width': '105px','font-size': '16px'})
    $(".top_list1_chide div").css({'line-height': '40px'});
    $(".top_list1_chide div>span").css({'font-size': '16px'})
    $(".top_list1 .top_list1Li .top_list1_chide1").css({'width': '285px'});
    $(".top_list1 .top_list1Li .top_list1_chide3").css({'width': '355px','left':'0px'});
    $(".top_list1 .top_list1Li .top_list1_chide0").css({'width': '650px'});
    $(".top_list1_chide0>div>div:last-child").css({'width': '483px'});
    $(".top_list2 .top_list2_chide1").css({'width': '112px','left':'-25px','font-size': '16px', 'line-height': '30px'})
    $(".top_list2_information .top_list2_chide2").css({'width': '112px','left':'-25px','font-size': '16px', 'line-height': '30px'})
}

//竖屏样式
function vertical() {
    $(".top").css({'height': '80px'});
    $(".top .logo img").css({'width': '60px'});
    $(".erjiTitle1").html('运行')
    $(".erjiTitle2").html('AI')
    $(".erjiTitle3").html('考勤')
    $(".erjiTitle4").html('考试')
    $(".erjiTitle").css({'font-size': '25px'})
    $(".iconfont").css({'font-size': '20px'})
    $(".top .top_list1 > li").css({'font-size': '20px', 'margin-top': '10px'});
    $(".top_list2 > li").css({'line-height': '60px'});
    $(".top_list2 > li > span").css({'font-size': '26px'})
    $(".top_list2 > li:last-child").css({'font-size': '25px', 'line-height': '55px'});
    $(".top_list1 .top_list1Li .top_list1_chide2").css({'width': '750px','left':'-255px'})
    $(".top_list1_chide2>div>div:last-child").css({'width': '605px'})
    $(".top_list1_chide div strong").css({'width': '125px','font-size': '20px'})
    $(".top_list1_chide div").css({'line-height': '55px'});
    $(".top_list1_chide div>span").css({'font-size': '23px'})
    $(".top_list1 .top_list1Li .top_list1_chide1").css({'width': '345px'});
    $(".top_list1 .top_list1Li .top_list1_chide3").css({'width': '400px','left':'-30px'});
    $(".top_list1 .top_list1Li .top_list1_chide0").css({'width': '750px'});
    $(".top_list1_chide0>div>div:last-child").css({'width': '595px'});
    $(".top_list2 .top_list2_chide1").css({'width': '140px','left':'-50px','font-size': '22px', 'line-height': '37px'})
    $(".top_list2_information .top_list2_chide2").css({'width': '140px','left':'-50px','font-size': '22px', 'line-height': '37px'})
}