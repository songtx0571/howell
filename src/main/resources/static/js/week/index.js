var username = "";//当前登陆人
var timer = "";//定时器
let colorLevel = "";//用户设置的颜色等级
var liList = [];
var index = 0;
var recordCount = 0;
var totalRecordCount = 6;

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

$(function (){
    $.ajax({
        type: 'get',
        url: "/getUserInfo",
        data: {},
        dataType: "json",
        success: function (data) {
            username = data;
            getUserSetting();
            fullUl();
        }
    })

    //颜色选择
    colorFun();
    //拼接
    pinjie();
})

//拼接
function pinjie() {
    $.ajax({
        type: 'get',
        url: "/getIndexData",
        data: {},
        async: false, // 同步
        dataType: "json",
        success: function (data) {
            data1 = data.data;
            for (var z = 0; z < data1.length; z ++) {
                data = data1[z];
                var div = "<div class=\"warp1\"><div class=\"title\"><i class=\"title_quote\"></i><span class=\"title_name\">"+data.departmentName+"</span></div><div class=\"clear\"></div>" +
                    "<div class=\"weatherBox\"><p><span class=\"iconfont icon-dizhi\" style=\"margin-right: 11px;color: #0000FF;\"></span><span class=\"weather_address weather_address1\">"+data.cityName+"</span></p><p class=\"weather_toDay\"></p><div class=\"weather_carousel weather_carousel1\"></div><div class=\"clear\"></div></div><div class=\"functionDivDown\"><ul>";
                pieJson = data.staticsData;
                for (let i = 0; i < data.staticsData.length; i++) {
                    div += "<li><p><span class=\"iconfont icon-triangle-right\" style=\"margin-right: 8px;color: #0000FF;\"></span><span class=\"functionUp_title\">"+data.staticsData[i].name+"</span></p><div id='main"+z+""+i+"' style=\"width: 64px;height:64px;margin: 10px auto 0;\"></div></li>";
                }
                div += "</ul></div><div class=\"clear\"></div><div class=\"functionDivUp\"><p><span class=\"iconfont icon-peoples\" style=\"margin-right: 11px;color: #0000FF;\"></span><span class=\"functionUp_title\">运行人员名单</span></p><i class=\"functionUp_line\"></i><ul class=\"functionUp_person functionUp_person0\">"
                for (var i = 0; i < data.departmentYXData.length; i++) {
                    div += "<li>" + data.departmentYXData[i] + "</li>"
                }
                div += "</ul></div><div class=\"overhaulBox\"><p><span class=\"iconfont icon-peoples\" style=\"margin-right: 11px;color: #0000FF;\"></span><span class=\"overhaul_title\">检修人员名单</span></p><i class=\"overhaul_line\"></i><ul class=\"overhaul_person overhaul_person0\">"
                for (var i = 0; i < data.departmentJXData.length; i++) {
                    div += "<li><span>" + data.departmentJXData[i].name + "</span><span class=\"layui-badge li_badge\">" + data.departmentJXData[i].taskNum + "</span></li>"
                }
                div += "</ul></div><div class=\"clear\"></div></div>";
                var pinjie = $(".pinjie");
                pinjie.append(div);
                for (let j = 1; j < 5; j++) {
                    fullWeather(data.cityCode, j);
                }
                for (let i = 0; i < data.staticsData.length; i++) {
                    pieChart('main',i,data.staticsData[i].name,z);
                }
            }
        }
    });
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    week = arr[week];
    var weather_toDay = $(".weather_toDay");
    weather_toDay.html(month + "月" + day + "日&nbsp;周" + week);
}

//饼状图
function pieChart(id,i,name,z) {
    id = id+z+i;
    var dom = document.getElementById(id);
    var data = pieJson[i].data;
    if (data == "") {
        dom.innerHTML = "<p style=\"line-height: 60px;color: red;\">无数据</p>";
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
                    radius: ['60%', '90%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: '#fff',
                        borderWidth: 1
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

//填充天气
function fullWeather(citykey, num) {
    var ajax = new XMLHttpRequest();
    ajax.open('get', 'http://wthrcdn.etouch.cn/weather_mini?citykey=' + citykey);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.response
            data = JSON.parse(data)
            var json = data.data.forecast;
            json[0].fengli = json[0].fengli.replace(/[^0-9]/ig, "");
            json[0].date = json[0].date.replace('星期', '周');
            json[0].high = json[0].high.substr(3, 2)
            json[0].low = json[0].low.substr(3, 4)
            var div = "";
            div += '<div class="left"><p class="left_toDay">' + json[0].date +
                '</p><p class="left_font"><span class="iconfont icon-' + replaceWeather(json[0].type) +
                '" style="margin-right: 11px;"></span></p><p class="left_type">' + json[0].type +
                '</p><p class="left_temperature">' + json[0].high + '/' + json[0].low +
                '</p><p class="left_fengxiang">' + json[0].fengxiang + '' + json[0].fengli +
                '级</p></div>';
            for (var i = 1; i < json.length; i++) {
                json[i].fengli = json[i].fengli.replace(/[^0-9]/ig, "");
                json[i].date = json[i].date.replace('星期', '周')
                json[i].high = json[i].high.substr(3, 2)
                json[i].low = json[i].low.substr(3, 4)
                div += '<div class="left right"><p class="left_toDay">' + json[i].date +
                    '</p><p class="left_font"><span class="iconfont icon-' + replaceWeather(json[i]
                        .type) + '" style="margin-right: 11px;"></span></p><p class="left_type">' + json[
                        i]
                        .type + '</p><p class="left_temperature">' + json[i].high + '/' + json[i].low +
                    '</p><p class="left_fengxiang">' + json[i].fengxiang + '' + json[i].fengli +
                    '级</p></div>';
            }
            var weather_carousel = $(".weather_carousel" + num);
            weather_carousel.html(div);
        }
    };
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
            //console.log(event.data)
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
    //页面加载，显示为6条，第七条开始定时
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
        if (index >= 6) {
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

//滚动事件
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

//定时事件
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
            console.log(colorLevel)
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