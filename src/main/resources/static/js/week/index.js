var username = "";
var timer = "";
let colorLevel = "";
var liList = [];
var index = 0;
var recordCount = 0;
var totalRecordCount = 6;

var date = new Date();
var month = date.getMonth() + 1;
var day = date.getDate();
var week = date.getDay();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

window.onload = function () {
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open('get', '/getUserInfo');
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
            username = ajax.responseText;
            getUserSetting();
            fullUl();
        }
    };
    //颜色选择
    colorFun();


    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    week = arr[week];
    var weather_toDay = document.getElementsByClassName("weather_toDay");
    for(var j = 0; j < weather_toDay.length; j ++) {
        weather_toDay[j].innerHTML = month + "月" + day + "日&nbsp;周" + week;
    }

    for (var i = 1; i < 6; i++) {
        fullWeather('101210101', i);
        weather_pointLi(i)
    }
    drawCircleFun();
}

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


//切换按钮
function weatherSwitch(type) {
    document.getElementsByClassName('weather_select'+type)[0].style.display = "revert";
    console.log(document.getElementsByClassName('weather_select'+type)[0])
}

//切换地点查询天气
function weather_sel(type, val) {
    fullWeather(val, type);
    // $(".weather_select" + type).css("display", "none");
    //得到当前选中的文本值
    var options = $(".weather_select" + type + " option:selected"); //获取当前选择项.
    options.text(); //获取当前选择项的文本.
    $(".weather_address" + type).html(options.text());
}
//鼠标悬停切换天气
function weather_pointLi(num) {
    var weather_pointLi = document.getElementsByClassName("weather_point"+num)[0].getElementsByTagName("li");
    for (let i = 0; i < weather_pointLi.length; i ++) {
        weather_pointLi[i].onclick = function () {
            weather_pointLi[0].style.background = "";
            weather_pointLi[1].style.background = "";
            weather_pointLi[2].style.background = "";
            this.style.background = "rgb(0, 86, 255)";
            var weather_carousel = document.getElementsByClassName("weather_carousel"+num)[0].getElementsByTagName("div");
            if (i == 0) {
                weather_carousel[0].style.display = "block";
                weather_carousel[1].style.display = "block";
                weather_carousel[2].style.display = "none";
                weather_carousel[3].style.display = "none";
                weather_carousel[4].style.display = "none";
            }else if (i == 1) {
                weather_carousel[4].style.display = "none";
                weather_carousel[0].style.display = "none";
                weather_carousel[1].style.display = "none";
                weather_carousel[2].style.display = "block";
                weather_carousel[3].style.display = "block";
            } else if (i == 2) {
                weather_carousel[0].style.display = "none";
                weather_carousel[1].style.display = "none";
                weather_carousel[2].style.display = "none";
                weather_carousel[3].style.display = "none";
                weather_carousel[4].style.display = "block";
            }
        }
    }
}
//填充天气
function fullWeather(citykey, num) {
    var ajax = new XMLHttpRequest();
    ajax.open('get', 'http://wthrcdn.etouch.cn/weather_mini?citykey='+citykey);
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
            var weather_carousel = document.getElementsByClassName("weather_carousel"+num)[0];
            weather_carousel.innerHTML = div;
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

//绘制百分比
function drawCircle(_options, id) {
    var options = _options || {}; //获取或定义options对象;
    options.angle = options.angle || 1; //定义默认角度1为360度(角度范围 0-1);
    options.color = options.color || '#fff'; //定义默认颜色（包括字体和边框颜色）;
    options.lineWidth = options.lineWidth || 10; //定义默认圆描边的宽度;
    options.lineCap = options.lineCap || 'round'; //定义描边的样式，默认为直角边，round 为圆角

    var oBoxOne = document.getElementById(options.id); //获取canvas元素
    var sCenter = oBoxOne.width / 2; //获取canvas元素的中心点;
    var ctx = oBoxOne.getContext('2d'); //创建一个context对象
    var nBegin = Math.PI / 2; //定义起始角度;
    var nEnd = Math.PI * 2; //定义结束角度;

    ctx.textAlign = 'center'; //定义字体居中;
    ctx.font = 'normal  400 14px  DINCond-Medium'; //定义字体加粗大小字体样式;
    ctx.fillStyle = options.color == 'grd' ? grd : options.color; //判断文字填充样式为颜色，还是渐变色;
    var lineHight = sCenter * 2 * 0.6; //设置文字行高
    ctx.fillText((options.angle * 100), sCenter, lineHight); //设置填充文字;

    ctx.lineCap = options.lineCap;
    ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
    ctx.lineWidth = options.lineWidth;

    ctx.beginPath(); //设置起始路径，这段绘制360度背景;
    if (id == "one") {
        ctx.strokeStyle = '#F3F6FB';
    } else {
        ctx.strokeStyle = '#F7D643';
    }
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();

    var imd = ctx.getImageData(0, 0, 240, 240);

    function draw(current) { //该函数实现角度绘制;
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
        ctx.stroke();
    }

    var t = 0;
    var timer = null;

    function loadCanvas(angle) { //该函数循环绘制指定角度，实现加载动画;
        timer = setInterval(function () {
            if (t > angle) {
                draw(options.angle);
                clearInterval(timer);
            } else {
                draw(t);
                t += 0.02;
            }
        }, 20);
    }
    loadCanvas(options.angle); //载入百度比角度  0-1 范围;
    timer = null;
}
//百分比
function drawCircleFun () {
    drawCircle({
        id: 'one',
        color: '#0000ff',
        angle: 0.37,
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'two',
        angle: 0.45,
        color: '#FFB000',
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'three',
        angle: 0.86,
        lineWidth: 8,
        color: '#0000ff'
    }, 'two');
    drawCircle({
        id: 'four',
        angle: 0.48,
        lineWidth: 8,
        color: '#FF0000'
    }, 'one');

    drawCircle({
        id: 'five',
        color: '#0000ff',
        angle: 0.77,
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'six',
        angle: 0.75,
        color: '#FFB000',
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'seven',
        angle: 0.33,
        lineWidth: 8,
        color: '#0000ff'
    }, 'two');
    drawCircle({
        id: 'eight',
        angle: 0.52,
        lineWidth: 8,
        color: '#FF0000'
    }, 'one');

    drawCircle({
        id: 'nine',
        color: '#0000ff',
        angle: 0.17,
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'ten',
        angle: 0.2,
        color: '#FFB000',
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'eleven',
        angle: 0.88,
        lineWidth: 8,
        color: '#0000ff'
    }, 'two');
    drawCircle({
        id: 'twelve',
        angle: 0.15,
        lineWidth: 8,
        color: '#FF0000'
    }, 'one');

    drawCircle({
        id: 'thirteen',
        color: '#0000ff',
        angle: 0.37,
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'fourteen',
        angle: 0.45,
        color: '#FFB000',
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'fifteen',
        angle: 0.86,
        lineWidth: 8,
        color: '#0000ff'
    }, 'two');
    drawCircle({
        id: 'sixteen',
        angle: 0.48,
        lineWidth: 8,
        color: '#FF0000'
    }, 'one');

    drawCircle({
        id: 'seventeen',
        color: '#0000ff',
        angle: 0.77,
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'eighteen',
        angle: 0.75,
        color: '#FFB000',
        lineWidth: 8
    }, 'one');

    drawCircle({
        id: 'nineteen',
        angle: 0.33,
        lineWidth: 8,
        color: '#0000ff'
    }, 'two');
    drawCircle({
        id: 'twenty',
        angle: 0.52,
        lineWidth: 8,
        color: '#FF0000'
    }, 'one');
}