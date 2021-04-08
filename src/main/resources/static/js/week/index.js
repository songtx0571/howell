var username = "";
var timer = "";
var index = 0;
let colorLevel = "";
var liList = [];
var index = 0;
var recordCount = 0;
var totalRecordCount=6;
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
            fullUl();
            scroll("noticeUl", 3000);//(ul)
            //layIM
            layIM();
        }
    };
    //通知表格
    showTable();
};

//通知表格显示
function showTable() {
    layui.use(['table'], function () {
        var table = layui.table;
        table.render({
            elem: '#demo'
            , height: '150'
            , url: '/inform/getInformList?isactive=2' //数据接口  2收到   1发送
            , cols: [[ //表头
                {field: 'created', title: '时间', align: 'center', sort: true, width: 150}
                , {field: 'title', title: '标题', width: 200}
                , {field: 'content', title: '内容'}
                , {field: 'createdByName', title: '创建人', align: 'center', width: 100}
                , {field: 'filedir', title: '地址', align: 'center', hide: 'false'}
                , {field: 'informTypeName', title: '类别', hide: 'false', align: 'center'}
            ]]
            , done: function (res, curr, count) {
            }
        });
    });
}

//layIM
function layIM() {
    var websocket = null;
    var layimChat = "";
    layui.use('layim', function () {
        var layim = layui.layim;
        //基础配置
        layim.config({
            //初始化接口
            init: {
                url: 'message/LayIMInit'
                , data: {}
            }
            //查看群员接口
            , members: {
                url: 'message/GroupListInit'
                , data: {}
            }
            //图片上传
            , uploadImage: {
                url: ''
                , type: '' //默认post
            }
            //文件上传
            , uploadFile: {
                url: ''
                , type: '' //默认post
            }
            , title: '浩维' //自定义主面板最小化时的标题
            , brief: false //是否简约模式（若开启则不显示主面板）
            , min: false //是否始 终最小化主面板，默认false
            , initSkin: '3.jpg' //1-5 设置初始背景
            , copyright: true
            , chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可
        });
        //监听在线状态的切换事件
        layim.on('online', function (status) {
            layer.msg(status);
        });

        // 监听layim建立就绪
        layim.on('ready', function (res) {
            // 服务端WebSocket的访问路径（3.2、配置WebSocket处理器与拦截器）。（注意：路径前缀务必添加websocket的“ws://”）

            var action = 'ws://localhost:8080/socket/' + username;

            // 初始化Socket
            if ('WebSocket' in window) {
                websocket = new WebSocket(action);
            } else if ('MozWebSocket' in window) {
                websocket = new MozWebSocket(action);
            } else {
                websocket = new SockJS(action);
            }
            // 连接成功建立的回调方法
            websocket.onopen = function (event) {
                // layer.msg('WebSocket连接成功!');
            };
            // 接收服务器推送信息
            websocket.onmessage = function (event) {
                //获取返回数据
                var json = JSON.parse(event.data);
                var state = json.status;
                var type = json.type;
                //在线上线状态
                if (state == "online") {
                    layer.msg(json.mine.username + "已上线");
                    layim.setFriendStatus(json.mine.id, 'online');
                } else if (state == "offline") {
                    layer.msg(json.mine.username + "已下线");
                    layim.setFriendStatus(json.mine.id, 'offline');
                }
                //聊天类型
                if (type == "friend") {
                    var layimSendTo = json.data;
                    // 设置消息
                    var obj = {
                        username: layimSendTo.username
                        , avatar: layimSendTo.avatar
                        , id: layimSendTo.id
                        , type: layimSendTo.type
                        , content: layimSendTo.content
                        , timestamp: layimSendTo.timestamp
                    };
                    // 绑定一条消息
                    setTimeout(function () {
                        layim.getMessage(obj)
                    }, 1000);
                } else if (type == "group") {
                    var layimSendTo = json.data;
                    // 设置消息
                    var obj = {
                        username: layimSendTo.username
                        , avatar: layimSendTo.avatar
                        , id: layimSendTo.toId
                        , type: layimSendTo.type
                        , content: layimSendTo.content
                    };
                    // 绑定一条消息
                    setTimeout(function () {
                        layim.getMessage(obj)
                    }, 1000);
                }
                if (layimChat) {
                    var layimSendTo = json.data;
                    var lis = layimChat.childNodes[0].childNodes;

                    var layimChats = layimChat.childNodes[1].childNodes;
                    var layuiShow = "";
                    if (layimChats.length == 1) {
                        layuiShow = layimChats[0];
                    } else {
                        for (var i = 0; i < layimChats.length; i++) {
                            if (layimChats[i].className.indexOf("layui-show") != -1) {
                                layuiShow = layimChats[i];
                            }
                        }
                    }
                    var imgName = (layuiShow.childNodes[0].childNodes[0].childNodes[0].className).substring(0, 15);
                    if (layimSendTo != undefined) {
                        if ("layim-friend" + layimSendTo.id != imgName) {
                            for (var i = 0; i < lis.length; i++) {
                                if (lis[i].className.indexOf("layim-chatlist-friend" + layimSendTo.id) != -1) {
                                    lis[i].childNodes[1].innerHTML = layimSendTo.username + "<samp style='color:red !important;float: right;font-size:25px;'>*</samp>";
                                }
                            }
                        }
                    }
                }
            };
            //关闭连接
            websocket.onclose = function (event) {
                console.log("聊天close")
            }
        });

        // 监听发送消息
        layim.on('sendMessage', function (data) {
            //接收消息人员信息
            var To = data.to;
            var mine = data.mine;
            //添加接收消息方的id
            mine.toId = To.id;
            //添加接收方与己方的关系（Friend 或 group）
            mine.type = To.type;
            // 设置显示在接收方消息的显示位置在左
            mine["mine"] = false;
            var msg = mine;
            // 发送消息到服务器
            websocket.send(JSON.stringify({
                type: To.type // 随便定义，用于在服务端区分消息类型
                , data: msg  // 可以定义msg对象
            }));
        });

        //监听聊天窗口的切换
        layim.on('chatChange', function (res) {
            var layimChangeTo = res.data;
            var toId = layimChangeTo.id;
            var type = layimChangeTo.type;
            layimChat = document.getElementById("layui-layim-chat");
            var divId = "layim-read-" + type + toId;
            //左侧li集合
            var lis = layimChat.childNodes[0].childNodes;
            //右侧聊天窗口
            var layimChats = layimChat.childNodes[1].childNodes;
            var layuiShow = "";
            if (layimChats.length == 1) {
                layuiShow = layimChats[0];
            } else {
                for (var i = 0; i < layimChats.length; i++) {
                    if (layimChats[i].className.indexOf("layui-show") != -1) {
                        layuiShow = layimChats[i];
                    }
                }
            }
            var imgName = (layuiShow.childNodes[0].childNodes[0].childNodes[0].className).substring(0, 15);
            if (layimChangeTo != undefined) {
                if ("layim-friend" + layimChangeTo.id == imgName) {
                    for (var i = 0; i < lis.length; i++) {
                        if (lis[i].className.indexOf("layim-chatlist-friend" + layimChangeTo.id) != -1) {
                            lis[i].childNodes[1].innerHTML = layimChangeTo.username;
                        }
                    }
                }
            }

            // 去除未读消息提示
            var layimT = document.getElementsByClassName("layim-" + type + toId)[0];
            var span = layimT.childNodes[2];
            span.innerHTML = layimChangeTo.username || layimChangeTo.groupname || "";
            // 设置未读消息数量为0
            document.getElementById(divId).value = 0;
            var msg = {
                id: layimChangeTo.id,
                toId: username
            };
            websocket.send(JSON.stringify({
                type: "history" // 随便定义，用于在服务端区分消息类型
                , data: msg  // 可以定义msg对象
            }));
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
            var ajax = new XMLHttpRequest();
            ajax.open('get', '/setting/get');
            ajax.send();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    colorLevel = ajax.response;
                    colorLevel = eval("(" + colorLevel + ")").data;
                }
            };

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

function setMessageInnerHTML(data) {
    data = eval('(' + data + ')');
    console.log( typeof data)
    if (data != undefined && data.length >= 1) {
        liList = data;
    } else {
        liList.push(data)
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

//打开自定义页面
function showCustomDiv() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        index = layer.open({
            type: 1
            , id: 'customColor' //防止重复弹出
            , content: $(".customColor")
            , btnAlign: 'c' //按钮居中
            , shade: 0.4 //不显示遮罩
            , area: ['100%', '100%']
            , yes: function () {
            }
        });
    });
    //级别
    levelFun();
    var ajax = new XMLHttpRequest();
    ajax.open('get', '/setting/get');
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.response;
            data = eval("(" + data + ")").data;
            $("#idHidden").val(data.id)
            $("#guideHidden").val(data.guideLevel);
            $("#AIHidden").val(data.aiLevel);
            $("#defectHidden").val(data.defectLevel);
            $("#examHidden").val(data.examLevel);
            $("#howellHidden").val(data.howeiLevel);
            $("#waHidden").val(data.waLevel);
            $("#timeHidden").val(data.rollingTime);
            layui.use('form', function () {
                var form = layui.form;
                $("#selGuide").val(data.guideLevel);
                $("#selAI").val(data.aiLevel);
                $("#selDefect").val(data.defectLevel);
                $("#selExam").val(data.examLevel);
                $("#selHowell").val(data.howeiLevel);
                $("#selWa").val(data.waLevel);
                $("#selTime").val(data.rollingTime);
                form.render('select');
                form.render(); //更新全部
            });
        }
    };
}

//级别
function levelFun() {
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('select(selGuide)', function (data) {
            $("#guideHidden").val(data.value);
            console.log(data.value);
        });
        form.on('select(selDefect)', function (data) {
            $("#defectHidden").val(data.value);
            console.log(data.value)
        });
        form.on('select(selExam)', function (data) {
            $("#examHidden").val(data.value);
            console.log(data.value)
        });
        form.on('select(selAI)', function (data) {
            $("#AIHidden").val(data.value);
            console.log(data.value)
        });
        form.on('select(selWa)', function (data) {
            $("#waHidden").val(data.value);
            console.log(data.value)
        });
        form.on('select(selHowell)', function (data) {
            $("#howellHidden").val(data.value);
            console.log(data.value)
        });
        form.on('select(selTime)', function (data) {
            $("#timeHidden").val(data.value);
            console.log(data.value)
        });
    });
}

// 确定自定义
function customOk() {
    var userSetting = {};
    userSetting.rollingTime = $("#timeHidden").val();
    if (userSetting.rollingTime == "" || userSetting.rollingTime == null) {
        userSetting.rollingTime = "10000";
    }
    userSetting.id = $("#idHidden").val();
    userSetting.guideLevel = $("#guideHidden").val();
    userSetting.defectLevel = $("#defectHidden").val();
    userSetting.howeiLevel = $("#howellHidden").val();
    userSetting.examLevel = $("#examHidden").val();
    userSetting.waLevel = $("#waHidden").val();
    userSetting.aiLevel = $("#AIHidden").val();
    var ajax = new XMLHttpRequest();
    ajax.open('post', '/setting/save');
    ajax.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    ajax.send(JSON.stringify(userSetting));
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            clearInterval(timer);
            timer = setInterval(rollStart, userSetting.rollingTime);
            layer.close(index);
            location.replace(location.href);
        }
    };
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

    if(totalRecordCount>liList.length && index==liList.length){
    }else{
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
        index = index + 1;
        if (recordCount >= totalRecordCount ) {
            clearInterval(timer);
            timer = setInterval(rollStart, colorLevel["rollingTime"]);
            var firstNode = dom.firstElementChild;
            firstNode.parentElement.removeChild(firstNode);
        }else {
            clearInterval(timer);
            timer = setInterval(rollStart,3000);
            recordCount = recordCount + 1;
        }
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
            
        }
    };
}

//取消
function cancel() {
    layer.close(index);
}