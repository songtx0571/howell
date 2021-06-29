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
            for (let z = 0; z < data1.length; z++) {
                data = data1[z];
                var div = "<div class=\"warp1\"><div class='left'>" +
                    "<div class='weaDiv weaDiv"+z+"'><div class='weaAll weaAll"+z+"'></div><div class='clear'></div><ul class='weaList weaList"+z+"'></ul></div>" +
                    "<div class=\"yunxing\">" +
                    "<p>" +
                    "<span class=\"iconfont icon-peoples\" style=\"margin-right: 11px;color: #0000FF;\"></span>" +
                    "<span class=\"yunxing_title\">运行人员动态</span>" +
                    "</p>" +
                    "<i class=\"yunxing_line\"></i>" +
                    "<ul class=\"yunxing_person yunxing_person0\">";
                for (var i = 0; i < data.departmentYXData.length; i++) {
                    div += "<li>" + data.departmentYXData[i] + "</li>"
                    // div += "<li><span>" + data.departmentYXData[i] + "</span><span class=\"layui-badge li_badge\">2</span></li>"
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
                for (let i = 0; i < data.staticsData.length; i++) {
                    div += "<li><p class='pieTitle'><span class=\"iconfont icon-triangle-right\" style=\"margin-right: 8px;color: #0000FF;\"></span><span>" + data.staticsData[i].name + "</span></p>" +
                        "<div id='main"+z+""+i+"' style=\"width: 235px;height:175px;margin: 5px auto 0;\"></div></li>"
                }
                div += "</ul><div class=\"clear\"></div>"

                var pinjie = $(".pinjie");
                pinjie.append(div);
                fullWeather(z, data.cityCode,data.departmentName)
                for (let i = 0; i < data.staticsData.length; i++) {
                    pieChart('main', i, data.staticsData[i].name, z);
                }
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
                    radius: ['20%', '40%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: (params) => {
                                return '{c|' + params.value + '}\n{a|' + params.name + '}';
                            }, rich: {
                                c: {
                                    fontSize: 18,
                                    lineHeight: 30,
                                    width: "16",
                                    align: 'center',
                                    backgroundColor: "white"
                                },
                                a: {
                                    color: '#999',
                                    fontSize: 14,
                                    lineHeight: 30,
                                    align: 'center'
                                }
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: data
                }
            ]
        };
        option && myChart.setOption(option);
    }
}

//填充天气
function fullWeather(num,cityCode,departmentName) {
    var ajax = new XMLHttpRequest();
    ajax.open('get', 'https://v0.yiketianqi.com/api?version=v62&appid=93825797&appsecret=wugk17qm&cityid='+cityCode);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            $(".weaDiv"+num).css("background","linear-gradient(#afb6c1, #fff)");
            if (JSON.parse(ajax.response).wea_day == "阴") {
                $(".weaDiv"+num).css("background","linear-gradient(#afb6c1, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "多云") {
                $(".weaDiv"+num).css("background","linear-gradient(#3f78d2, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "中雨") {
                $(".weaDiv"+num).css("background","linear-gradient(#1e2735, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "大雨") {
                $(".weaDiv"+num).css("background","linear-gradient(#1a1e25, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "晴") {
                $(".weaDiv"+num).css("background","linear-gradient(orange, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "小雨") {
                $(".weaDiv"+num).css("background","linear-gradient(#767a82, #fff)");
            } else if (JSON.parse(ajax.response).wea_day == "阴转多云") {
                $(".weaDiv"+num).css("background","linear-gradient(#3f78d2, #fff)");
            } else {
                $(".weaDiv"+num).css("background","linear-gradient(#005dff, #fff)");
            }
            var div = "";

            div += "<div class='allLeft'><p>" + departmentName + "</p><p>" + JSON.parse(ajax
                    .response).tem + "</p></div><div class='allRight'><p><span class='iconfont icon-" +
                replaceWeather(JSON.parse(ajax.response).wea_day) + "' style='font-size:30px;'></span></p><p>" + JSON
                    .parse(ajax.response).win + " " + JSON.parse(ajax.response).win_speed + "<br>最高" + JSON.parse(ajax
                    .response).tem1 + "最低" + JSON.parse(ajax.response).tem2 + "</p></div>";
            $('.weaAll'+num).html(div);

            var date = new Date();
            var data = JSON.parse(ajax.response).hours;
            var ul = "";
            for (var i = 0; i < 6; i++) {
                if (data[i].hours == "现在") {
                    data[i].hours = date.getHours() + ":00";
                }
                ul += "<li><p>" + data[i].hours + "</p><p><span class='iconfont icon-" + replaceWeather(data[i]
                        .wea) + "' style='font-size:30px;'></span></p><p>" + data[i].tem +
                    "℃</p></li>";
            }
            $('.weaList'+num).html(ul);
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
    } else if (type == "阴转多云") {
        icon = "duoyun";
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