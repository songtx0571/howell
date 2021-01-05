<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>Title</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="layui/layui.js"></script>
    <script type="text/javascript" src="js/week/sockjs.min.js"></script>
    <style>
        .layui-layim-tool .layui-icon, .layui-layim-search .layui-icon{
            font-size: 30px;
        }
        #layui-layer1{
            height: 450px !important;
        }
        #layui-layer1 .layui-layim-main .layui-layim-info{
            height: 35px;
        }
        #layui-layer1 .layim-tab-content{
            height: 295px;
        }
        .layui-layim-tool .layim-tool-skin{
            display: none;
        }
        .layui-layim-status .layui-anim-upbit li:last-of-type{
            display: none;
        }
        #layui-layim-close span{
            font-size: 30px;
        }
    </style>
</head>
<body>
<script>
    var websocket = null;
    var username = "";
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open('get','/getUserInfo');
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4 &&ajax.status==200) {
            //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
            username = ajax.responseText;
        }
    };
    layui.use('layim', function(){
        var layim = layui.layim;

        //基础配置
        layim.config({
            //初始化接口
            init: {
                url: 'message/LayIMInit'
                ,data: {}
            }
            //查看群员接口
            ,members: {
                url: 'message/GroupListInit'
                ,data: {}
            }
            //图片上传
            ,uploadImage: {
                url: ''
                ,type: '' //默认post
            }
            //文件上传
            ,uploadFile: {
                url: ''
                ,type: '' //默认post
            }

            ,title: '浩维' //自定义主面板最小化时的标题
            ,brief: false //是否简约模式（若开启则不显示主面板）
            ,min: false //是否始 终最小化主面板，默认false
            ,initSkin: '3.jpg' //1-5 设置初始背景
            ,copyright:true

             ,chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可


        });
        //监听在线状态的切换事件
        layim.on('online', function(status){
            layer.msg(status);
        });

        //监听签名修改

        layim.on('sign', function(value){
            layer.msg(value);
        });

        // 监听layim建立就绪
        layim.on('ready', function(res){
            // 服务端WebSocket的访问路径（3.2、配置WebSocket处理器与拦截器）。（注意：路径前缀务必添加websocket的“ws://”）
            var action = 'ws://192.168.1.89:8080/socket/'+username;

            // 初始化Socket
            if('WebSocket' in window) {
                websocket = new WebSocket(action);
            } else if('MozWebSocket' in window) {
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
                    layer.msg(json.mine.username+"已上线");
                    layim.setFriendStatus(json.mine.id, 'online');
                } else if(state == "offline"){
                    layer.msg(json.mine.username+"已下线");
                    layim.setFriendStatus(json.mine.id, 'offline');

                }
                //聊天类型
                if(type == "friend"){
                    var layimSendTo = json.data;
                    // 设置消息
                    var obj = {
                        username: layimSendTo.username
                        , avatar: layimSendTo.avatar
                        , id: layimSendTo.id
                        , type: layimSendTo.type
                        , content: layimSendTo.content
                    };
                    setTimeout(function () {
                        // 绑定一条消息
                        layim.getMessage(obj);
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
                    setTimeout(function () {
                        // 绑定一条消息
                        layim.getMessage(obj);
                    }, 1000);
                }

            };
            //关闭连接
            websocket.onclose = function (event) {
                // console.log('close');
            }
            // layim.msgbox(5); //模拟消息盒子有新消息，实际使用时，一般是动态获得
        });

        // 监听发送消息
        layim.on('sendMessage', function(data){
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
                type:  To.type // 随便定义，用于在服务端区分消息类型
                ,data: msg  // 可以定义msg对象
            }));
        });

        //监听查看群员
        layim.on('members', function(data){
            // console.log(data);
        });

        //监听聊天窗口的切换
        layim.on('chatChange', function(res){

        });
    });
</script>
</body>
</html>
