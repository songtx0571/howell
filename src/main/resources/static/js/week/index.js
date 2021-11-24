var username = "";//当前登陆人
var timer = "";//定时器动态区域
var timerMyTsk = "";//定时器本人任务
let colorLevel = "";//用户设置的颜色等级
var liList = [];
var index = 0;
var recordCount = 0;
var totalRecordCount = 6;
//计算百分比
var zonghe = 0;//总和
var weiwancheng = 0;//未完成

var date = new Date();//当天时间
var month = date.getMonth() + 1;//月
var day = date.getDate();//日
var week = date.getDay();//周
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

var pieJson = "";//拼接
//判断手机横竖屏
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
} else  {//平板 电脑
    horizontal();
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

$(function () {
    $.ajax({
        type: 'get',
        url: "/getUserInfo",
        data: {},
        dataType: "json",
        success: function (data) {
            username = data;
            getUserSetting();
            fullUl();
            getMyTsk();
        }
    });
    //颜色选择
    colorFun();
    //拼接
    pinjie();
    // 本人任务鼠标移出
    $(".myTaskDiv").mouseover(function(){//鼠标移入事件
        $(this).css({'height':''+$(this).children().length * 30+'px','transition': 'height 5s','-webkit-transition': 'height 5s'})
    });
    $(".myTaskDiv").mouseout(function(){//鼠标移出事件
        $(this).css({'height':'95px','transition': 'height 5s','-webkit-transition': 'height 5s'})
    });
})
//拼接
function pinjie() {
    $.ajax({
        type: 'get',
        url: "/getIndexData",
        data: {},
        async: true, // 异步
        dataType: "json",
        success: function (data) {
            var data1 = data.data;

            function createComprisonFunction(propertyName) {
                return function (object1, object2) {
                    var value1 = object1[propertyName];
                    var value2 = object2[propertyName];
                    if (value1 < value2) {
                        return -1;
                    } else if (value1 > value2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            //上面的函数可以像在下面的列子中这样使用
            data1.sort(createComprisonFunction("departmentId"));

            for (let z = 0; z < data1.length; z++) {
                data = data1[z];
                var div = "<div class=\"warp1\"><div class='left'>" +
                    "<div class='weaDiv weaDiv" + z + "'><div class='weaAll'>";
                div += "<div class='allLeft'><p>" + data.departmentName + "</p><p>" + data.weatherData.tem + "℃</p></div>" +
                    "<div class='allRight'><p><span style='font-size:23px;'>" + data.weatherData.wea_day + "</span></p>" +
                    "<p>" + data.weatherData.win + " " + data.weatherData.win_speed + "<br>最高" + data.weatherData.tem1 + "最低" + data.weatherData.tem2 + "</p>" +
                    "</div></div><div class='clear'></div><ul class='weaList'>";
                $(".weaDiv" + z).css("background", "linear-gradient(rgba(255,148,0,0.8), rgb(255, 255, 255))");//#ff9400--#fff
                if (data.weatherData.wea_day == "阴") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(175,182,193,0.8), rgb(255, 255, 255))");//#afb6c1--#fff
                } else if (data.weatherData.wea_day == "多云") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(63,120,210,0.8), rgb(255, 255, 255))");//#3f78d2--#fff
                } else if (data.weatherData.wea_day == "中雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(63,69,80,0.8), rgb(255, 255, 255))");//#3f4550--#fff
                } else if (data.weatherData.wea_day == "大雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(26,30,37,0.8), rgb(255, 255, 255))");//#1a1e25--#fff
                } else if (data.weatherData.wea_day == "阵雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(63,69,80,0.8), rgb(255, 255, 255))");//#3f4550--#fff
                } else if (data.weatherData.wea_day == "晴") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(255,148,0,0.8), rgb(255, 255, 255))");//#ff9400--#fff
                } else if (data.weatherData.wea_day == "小雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(118,122,130,0.8), rgb(255, 255, 255))");//#767a82--#fff
                } else if (data.weatherData.wea_day == "阴转多云") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(63,120,210,0.8), rgb(255, 255, 255))");//#3f78d2--#fff
                }  else if (data.weatherData.wea_day == "雷阵雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(168,168,168,0.8), rgb(255, 255, 255))");//#a8a8a8--#fff
                }  else if (data.weatherData.wea_day == "暴雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(26,30,37,0.8), rgb(255, 255, 255))");//#1a1e25--#fff
                }  else if (data.weatherData.wea_day == "大到暴雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(26,30,37,0.8), rgb(255, 255, 255))");//#1a1e25--#fff
                }  else if (data.weatherData.wea_day == "小到中雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(168,168,168,0.8), rgb(255, 255, 255))");//#a8a8a8--#fff
                }  else if (data.weatherData.wea_day == "中到大雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(26,30,37,0.8), rgb(255, 255, 255))");//#1a1e25--#fff
                }  else if (data.weatherData.wea_day == "大暴雨") {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(26,30,37,0.8), rgb(255, 255, 255))");//#1a1e25--#fff
                } else {
                    $(".weaDiv" + z).css("background", "linear-gradient(rgba(255,148,0,0.8), rgb(255, 255, 255))");//#ff9400--#fff
                }
                // var arr = ['中雨','雷阵雨','大雨','多云','阴','小雨','晴','阵雨','暴雨','大到暴雨','小到中雨','中到大雨','大暴雨']
                var date = new Date();
                var dataHours = data.weatherData.hours;
                for (var i = 0; i < 6; i++) {
                    if (dataHours[i].hours == "现在") {
                        dataHours[i].hours = date.getHours() + ":00";
                    }
                    div += "<li><p>" + dataHours[i].hours + "</p><p><span class='iconfont icon-" + replaceWeather(dataHours[i]
                            .wea) + "' style='font-size:30px;'></span></p><p>" + dataHours[i].tem +
                        "℃</p></li>";
                }
                div += "</ul></div><div class=\"yunxing\">" +
                    "<p>" +
                    "<span class=\"iconfont icon-peoples\" style=\"margin-right: 11px;color: #0000FF;\"></span>" +
                    "<span class=\"yunxing_title\">运行人员动态</span>" +
                    "</p>" +
                    "<i class=\"yunxing_line\"></i>" +
                    "<ul class=\"yunxing_person yunxing_person0\">";
                for (var i = 0; i < data.departmentYXData.length; i++) {
                    div += "<li><span>" + data.departmentYXData[i].name + "</span><span class=\"layui-badge li_badge\">" + data.departmentYXData[i].taskNum + "</span></li>"
                }
                div += "</ul></div>" +
                    "<div class=\"jianxiu\">" +
                    "<p>" +
                    "<span class=\"iconfont icon-peoples\" style=\"margin-right: 11px;color: #0000FF;\"></span>" +
                    "<span class=\"jianxiu_title\">检修人员动态</span>" +
                    "</p>" +
                    "<i class=\"jianxiu_line\"></i>" +
                    "<ul class=\"jianxiu_person\">";
                for (var i = 0; i < data.departmentJXData.length; i++) {
                    div += "<li><span>" + data.departmentJXData[i].name + "</span><span class='layui-badge li_badge'>" + data.departmentJXData[i].taskNum + "</span></li>"
                }
                div += "</ul></div></div>";
                div += "<ul class=\"pieList\">"
                pieJson = data.staticsData;
                for (let i = 0; i < 2; i++) {
                    div += "<li><p class='pieTitle'><span class=\"iconfont icon-triangle-right\" style=\"margin-right: 8px;color: #0000FF;\"></span><span>" + data.staticsData[i].name + "</span></p>" +
                        "<div id='mainPie" + z + "" + i + "' style=\"width: 280px;height:280px;margin: 5px auto 0;\"></div></li>"
                }
                var result = 0;//结果
                if (data.staticsData[2].data.length == 1) {
                    zonghe = Number(data.staticsData[2].data[0].value);
                    weiwancheng = data.staticsData[2].data[0].value;
                    result = ((1 - weiwancheng / zonghe) * 100).toFixed(0) + "%";
                } else if (data.staticsData[2].data.length == 2) {
                    zonghe = Number(data.staticsData[2].data[0].value) + Number(data.staticsData[2].data[1].value);
                    weiwancheng = data.staticsData[2].data[1].value;
                    result = ((1 - weiwancheng / zonghe) * 100).toFixed(0) + "%";
                } else {
                    result = 100 + "%";
                }
                div += "<li><p class='pieTitle'><span class=\"iconfont icon-triangle-right\" style=\"margin-right: 8px;color: #0000FF;\"></span><span>" + data.staticsData[2].name + "</span></p>" +
                    "<span style='display: block;text-align: center;line-height: 100px;font-size: 32px;'>" + result + "</span></li>"
                var dataA = data.staticsData[3];
                var dataB = data.staticsData[data.staticsData.length - 1];
                var value1, value2, value3, value4;//value1当天次数 value2当天点数 value3当班次数 value4当班点数
                if (dataA.data == "") {
                    value1 = 0;
                    value2 = 0;
                } else {
                    value1 = dataA.data[0].value;
                    value2 = dataA.data[1].value;
                }
                if (dataB.data == "") {
                    value3 = 0;
                    value4 = 0;
                } else {
                    value3 = dataB.data[0].value;
                    value4 = dataB.data[1].value;
                }
                var width1 = value3 / value1 * 100;
                var width2 = value4 / value2 * 100;
                if (value4 == 0) {
                    width1 = 0;
                }
                if (value3 == 0) {
                    width2 = 0;
                }
                div += "<li><p class='pieTitle' style='height: 30px;'><span class='iconfont icon-triangle-right' style='margin - right:8 px;color: #0000FF;'></span><span>巡检统计</span></p>" +
                    "<span style='float: left;'>次数：</span>" +
                    "<div class='countDiv'><div class='shiftCountDiv' style='width: " + width1 + "%'>" + value3 + "</div><div class='dayCountDiv'>" + value1 + "</div></div>" +
                    "<div class='clear'></div><br>" +
                    "<span style='float: left;'>点数：</span>" +
                    "<div class='pointDiv'><div class='shiftPointDiv' style='width: " + width2 + "%'>" + value4 + "</div><div class='dayPointDiv'>" + value2 + "</div></div></li>"
                div += "</ul><div class=\"clear\"></div></div>";
                var pinjie = $(".pinjie");
                pinjie.append(div);
                for (let i = 0; i < 2; i++) {
                    pieChart('mainPie', i, data.staticsData[i].name, z);
                }
                //判断手机横竖屏
                hengshuping();
            }
        }
    });
}

//饼状图
function pieChart(id, i, name, z) {
    id = id + z + i;
    var dom = document.getElementById(id);
    var data = pieJson[i].data;
    if (data == "") {
        dom.innerHTML = "<p style=\"line-height: 60px;color: red;text-align: center;\">无数据</p>";
    } else {
        // 基于准备好的dom，初始化echarts实例\n" +
        var myChart = echarts.init(dom);
        // 指定图表的配置项和数据\n" +
        var option = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: ['40%', '80%'],
                    // roseType: 'area',
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        option && myChart.setOption(option);
    }
}

//替换天气图标
function replaceWeather(type) {
    var icon = "";
    if (type == "阴") {
        icon = "yintian";
    } else if (type == "多云") {
        icon = "duoyun";
    } else if (type == "中雨") {
        icon = "zhongyu";
    } else if (type == "大雨") {
        icon = "dayu";
    } else if (type == "晴") {
        icon = "taiyang";
    } else if (type == "小雨") {
        icon = "xiaoyu";
    } else if (type == "阴转多云") {
        icon = "duoyun";
    } else if (type == "中到大雨") {
        icon = "dayu";
    } else if (type == "雷阵雨") {
        icon = "dayu";
    } else {
        icon = "duoyun";
    }
    return icon;
}

//获取用户设置
function getUserSetting() {
    var ajax = new XMLHttpRequest();
    ajax.open('get', '/setting/get');
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            colorLevel = ajax.response;
            colorLevel = eval("(" + colorLevel + ")").data;
            scrollMyTsk('myTaskDiv', colorLevel["rollingTime"]);
        }
    };
}

//颜色选择
function colorFun() {
    layui.use('colorpicker', function () {
        var $ = layui.$
            , colorpicker = layui.colorpicker;
        //初始色值
        colorpicker.render({
            elem: '#test2'
            , color: '#fff' //设置默认色
            , done: function (color) {
                $("#noticeUl").css("background", color);
            }
        });
        colorpicker.render({
            elem: '#test3'
            , color: '#000' //设置默认色
            , done: function (color) {
                $("#noticeUl").css("color", color);
            }
        });
    });
}

//填充
function fullUl() {
    layui.use(['layer', "jquery"], function () {
        var layer = layui.layer;
        $ = layui.jquery;
        var websocket = null;
        // var userId = $("#userId").val();

        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            // 连接服务端
            websocket = new WebSocket("ws://localhost:8080/operation/" + username);
        } else {
            alert('当前浏览器 不支持WebSocket')
        }

        //连接发生错误的回调方法
        websocket.onerror = function () {
            //setMessageInnerHTML("连接发生错误");
            console.log("webSocket option 连接发生错误")
        };

        //连接成功建立的回调方法
        websocket.onopen = function (event) {
            console.log("webSocket option 连接成功");
        };

        //接收到消息的回调方法，此处添加处理接收消息方法，当前是将接收到的信息显示在网页上
        websocket.onmessage = function (event) {
            setMessageInnerHTML(event.data);
        };

        //连接关闭的回调方法
        websocket.onclose = function () {
            console.log("webSocket option 连接关闭,如需登录请刷新页面。")
        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            websocket.close();
        };
    });
}

function setMessageInnerHTML(json) {
    json = eval('(' + json + ')');
    if (json != undefined && json.length >= 1) {
        liList = json;
    } else {
        liList.push(json)
    }
    //页面加载，显示为3条，第4条开始定时
    if (recordCount == 0 || liList.length > 0) {
        var dom = document.getElementById("noticeUl");
        var html = "";
        let n = liList.length < totalRecordCount ? liList.length : totalRecordCount;
        for (var i = 0; i < n; i++) {
            index = index % liList.length;
            data = liList[index];
            html += "<li id='" + data.id + "' style='color: " + levelColor(colorLevel[data.type + "Level"]) + "' onclick='clickRead(this)'>" +
                "<span>" + data.createTime + "&nbsp;&nbsp;</span>" +
                "<span>" + data.sendName + "&nbsp;&nbsp;</span>" +
                "<span>" + data.verb + "&nbsp;&nbsp;</span>" +
                "<span>" + data.content + "&nbsp;&nbsp;</span>" +
                "<span>" + data.remark + "&nbsp;&nbsp;</span>" +
                "</li>";
            recordCount = recordCount + 1;
            index = index + 1;
        }
        dom.innerHTML = html;
        if (index >= 3) {
            timer = setInterval(rollStart, colorLevel["rollingTime"]);
        }
    }
}

//等级颜色
function levelColor(lever) {
    if (lever == '0') {
        return "#000";
    } else if (lever == '1') {
        return "#cc00ff";
    } else if (lever == '2') {
        return "#0008ff";
    } else if (lever == '3') {
        return "#62ff00";
    } else if (lever == '4') {
        return "#ff8100";
    } else if (lever == '5') {
        return "#f00";
    }
}

//滚动动态区域事件
function scroll(dom, time) {

    timer = setInterval(rollStart, time);
    dom = document.getElementById(dom);
    //鼠标移入
    dom.onmouseover = function () {
        clearInterval(timer);
    };
    //鼠标移出
    dom.onmouseout = function () {
        timer = setInterval(rollStart, time);
    };
}

//定时动态区域事件
function rollStart() {
    if (totalRecordCount > liList.length && index == liList.length) {
    } else {

        var dom = document.getElementById("noticeUl");
        index = index % liList.length;
        data = liList[index];
        dom.innerHTML += "<li id='" + data.id + "' style='color: " + levelColor(colorLevel[data.type + "Level"]) + "' onclick='clickRead(this)'>" +
            "<span>" + data.createTime + "&nbsp;&nbsp;</span>" +
            "<span>" + data.sendName + "&nbsp;&nbsp;</span>" +
            "<span>" + data.verb + "&nbsp;&nbsp;</span>" +
            "<span>" + data.content + "&nbsp;&nbsp;</span>" +
            "<span>" + data.remark + "&nbsp;&nbsp;</span>" +
            "</li>";
        if (recordCount >= totalRecordCount) {
            clearInterval(timer);
            timer = setInterval(rollStart, colorLevel["rollingTime"]);
            var firstNode = dom.firstElementChild;
            firstNode.parentElement.removeChild(firstNode);
        } else {
            clearInterval(timer);
            timer = setInterval(rollStart, 3000);
            recordCount = recordCount + 1;
        }

        index = index + 1;
    }


}

//点击事件
function clickRead(a) {
    a.style.background = "antiquewhite";
    setTimeout(function () {
        a.remove();
    }, 1000);
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open('get', '/operation/isRead/' + a.id);
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
            recordCount = recordCount - 1;
            var $iframeRight = parent.$('.iframeRight');
            var src = a.type;
            $iframeRight.attr("src", src);

        }
    };
}

//本人任务
function getMyTsk() {
    var myTaskDiv = $(".myTaskDiv");
    $.ajax({
        type: 'get',
        url: "/getPersonalTasks",
        data: {},
        async: true, // 异步
        dataType: "json",
        success: function (data) {
            data = data.data;
            var defect = data.defects;//缺陷
            var p = "";
            if (defect.length > 0) {
                for (var i in defect) {
                    if (defect[i].type == '1') {//新创建未认领-未认领
                        p += "<p onclick='jumpUrl(\"defectUrl\")'><span style='color: #9f4ba4'>被创建&nbsp;&nbsp;" + defect[i].number + "</span>&nbsp;&nbsp;" + defect[i].sysName + "&nbsp;&nbsp;" + defect[i].equipmentName + "</p>"
                    } else if (defect[i].type == '5') {//分配完成开始执行-开始执行
                        p += "<p onclick='jumpUrl(\"defectUrl\")'><span style='color: #9f4ba4'>请处理&nbsp;&nbsp;" + defect[i].number + "</span>&nbsp;&nbsp;" + defect[i].sysName + "&nbsp;&nbsp;" + defect[i].equipmentName + "</p>"
                    } else if (defect[i].type == '7') {//缺陷完成待工时确认-工时确认
                        p += "<p onclick='jumpUrl(\"defectUrl\")'><span style='color: #9f4ba4'>请处理&nbsp;&nbsp;" + defect[i].number + "</span>&nbsp;&nbsp;" + defect[i].sysName + "&nbsp;&nbsp;" + defect[i].equipmentName + "</p>"
                    } else if (defect[i].type == '3') {//工时完成待确认-值班确认
                        p += "<p onclick='jumpUrl(\"defectUrl\")'><span style='color: #9f4ba4'>请确认&nbsp;&nbsp;" + defect[i].number + "</span>&nbsp;&nbsp;" + defect[i].sysName + "&nbsp;&nbsp;" + defect[i].equipmentName + "</p>"
                    } else if (defect[i].type == '2') {//开始执行未完成-消缺反馈
                        p += "<p onclick='jumpUrl(\"defectUrl\")'><span style='color: #9f4ba4'>正在执行&nbsp;&nbsp;" + defect[i].number + "</span>&nbsp;&nbsp;" + defect[i].sysName + "&nbsp;&nbsp;" + defect[i].equipmentName + "</p>"
                    }
                }
            }
            var maintainRecords = data.maintainRecords;//维护工作
            if (maintainRecords.length > 0) {
                for (var j in maintainRecords) {
                    p += "<p onclick='jumpUrl(\"maintainRecordsUrl\")'>" + maintainRecords[j].systemName + "&nbsp;&nbsp;" + maintainRecords[j].equipmentName + "&nbsp;&nbsp;" + maintainRecords[j].unitName + "&nbsp;&nbsp;<span style='color: #9f4ba4'>已分配</span></p>"
                }
            }

            var maintains = data.maintains;//维护配置
            if (maintains.length > 0) {
                for (var k in maintains) {
                    p += "<p onclick='jumpUrl(\"maintainsUrl\")'>" + maintains[k].systemName + "&nbsp;&nbsp;" + maintains[k].equipmentName + "&nbsp;&nbsp;" + maintains[k].unitName + "&nbsp;&nbsp;<span style='color: #9f4ba4'>待分配</span></p>"
                }
            }
            myTaskDiv.html(p)
        }
    })
}

//滚动本人任务事件
function scrollMyTsk(dom, time) {
    timerMyTsk = setInterval(rollMyTsk, time);
    dom = document.getElementsByClassName(dom)[0];
    //鼠标移入
    dom.onmouseover = function () {
        clearInterval(timerMyTsk);
    };
    //鼠标移出
    dom.onmouseout = function () {
        timerMyTsk = setInterval(rollMyTsk, time);
    };
}

//定时本人任务事件
function rollMyTsk() {
    var dom = document.getElementsByClassName("myTaskDiv")[0];
    var firstDom = dom.firstElementChild;
    if (!firstDom) {
        return;
    } else {
        if (dom.childNodes > 3) {
            firstDom.style.marginTop = "0px";
            dom.appendChild(firstDom);
            var firstDom = dom.firstElementChild;
            firstDom.style.marginTop = "-30px";
        }
    }
}

//跳转
function jumpUrl(url) {
    var src = "";
    if (url == "defectUrl") {
        src = "http://localhost:8082/guide/defect/toDefect";
    } else if (url == "maintainRecordsUrl") {
        src = "http://localhost:8082/guide/maintain/toMaintainWork";
    } else if (url == "maintainsUrl") {
        src = "http://localhost:8082/guide/maintain/toMaintainConfig";
    }
    var $iframeRight = parent.$('.iframeContent');
    $iframeRight.attr("src", src);
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
function horizontal () {
    $(".pieList").css({'width':'570px','margin-top': '0px'});
    $(".left").css({'width': '370px','font-size':'14px'});
    //字体大小
    $(".warp").css({'font-size':'16px'});
    $(".myTaskDiv").css({'height':'95px'});
    $(".myTaskDiv p").css({'font-size':'20px','line-height':'30px'});
    $(".notice ul").css({'font-size':'18px','height': '95px'});
    $(".notice ul li").css({'line-height': '30px'});
    $(".yunxing .yunxing_person li").css({'font-size':'14px','padding':'5px 0','box-sizing':'border-box','width':'87px','line-height':'20px'});
    $(".jianxiu .jianxiu_person li").css({'font-size':'14px','padding':'5px 0','box-sizing':'border-box','width':'87px','line-height':'20px'});
    $(".jianxiu").css({'height':'154px'})
    $(".li_badge").css({'line-height':'18px','height':'18px','font-size':'18px'});
    $(".yunxing .yunxing_title").css({'font-size':'14px'});
    $(".jianxiu .jianxiu_title").css({'font-size':'14px'});
    $(".weaDiv").css({'height':'200px'})
    $(".weaAll").css({'height':'100px'})
    $('.allLeft').css({'line-height':'35px'})
    $(".weaList").css({'margin-top':'00px'})
    $(".allLeft p:first-child").css({'font-size':'20px'})
    $(".weaList li").css({'line-height':'30px'});
    $(".weaList li .iconfont").css({'font-size':'30px'});
}
//竖屏样式
function vertical () {
    $(".pieList").css({'width':'100%','margin-top': '15px'});
    $(".left").css({'width':'100%','font-size':'30px'});
    //字体大小
    $(".warp").css({'font-size':'20px'});
    $(".myTaskDiv").css({'height':'200px'});
    $(".myTaskDiv p").css({'font-size':'35px','line-height':'50px'});
    $(".notice ul").css({'font-size':'35px','height': '200px'});
    $(".notice ul li").css({'font-size':'35px','line-height': '50px'});
    $(".yunxing .yunxing_person li").css({'font-size':'35px','padding':'5px','box-sizing':'border-box','width':'20%'});
    $(".jianxiu .jianxiu_person li").css({'font-size':'35px','padding':'5px','box-sizing':'border-box','width':'20%'});
    $(".jianxiu").css({'height':'210px'})
    $(".li_badge").css({'line-height':'36px','height':'28px','font-size':'20px'});
    $(".yunxing .yunxing_title").css({'font-size':'20px'});
    $(".jianxiu .jianxiu_title").css({'font-size':'20px'});
    $(".weaDiv").css({'height':'315px'})
    $(".weaAll").css({'height':'120px'})
    $('.allLeft').css({'line-height':'50px'})
    $(".weaList").css({'margin-top':'20px'})
    $(".allLeft p:first-child").css({'font-size':'30px'})
    $(".weaList li").css({'line-height':'55px'});
    $(".weaList li .iconfont").css({'font-size':'45px'});
}