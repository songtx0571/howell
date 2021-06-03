<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=1920">
    <script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="css/login.css"/>
    <%--竖版本使用的样式:portrait--%>
    <style media="all and (orientation:portrait)"  type="text/css" >
        .warp {
            width: 100%;
            background-color: #F3F6FB;
        }
        .left{
            float: none;
            width: 100%;
            height: auto;
            padding-top: 102px;
            background-color: #F3F6FB;
        }
        .right{
            float: none;
            width: 100%;
            height: auto;
            padding-bottom: 130px;
            box-sizing: border-box;
            background-color: #F3F6FB;
        }
        .left_top,.left_top2,.left_login img,.left_titleE,.left_title,.left_logo .logo {
            display: none;
        }
        .left_logo{
            width: 770px;
            margin: 0 auto;
        }
        .left_logo span {
            width: 100%;
            height: 75px;
            display: inline-block;
            font-family: PingFangSC-Semibold;
            font-size: 3vw;
            color: #252631;
            text-align: center;
            font-weight: 600;
            line-height: 87px;
            margin: 0 auto;
        }
        .left_title {
            width: 22vw;
            height: 2.5vw;
            font-family: PingFangSC-Medium;
            font-size: 2.5vw;
            color: #778CA2;
            font-weight: 500;
            margin: 10px auto 10px auto;
        }
        .left_titleE {
            width: 26vw;
            height: 5vw;
            font-family: PingFangSC-Regular;
            font-size: 2.4vw;
            color: #A6B6C6;
            line-height: 2.5vw;
            font-weight: 400;
            margin: 0px auto 0px auto;
        }
        .right_loginBox {
            margin: 0px auto;
            width: 770px;
            padding: 40px 70px 40px 70px;
            box-sizing: border-box;
            height: auto;
            background: #FFFFFF;
            box-shadow: 0px 2px 20px 10px rgba(121, 127, 249, 0.2);
            border-radius: 8px;
        }
        .right_loginTitle {
            width: 243px;
            height: 120px;
            font-family: PingFangSC-Semibold;
            font-size: 2.5vw;
            color: #252631;
            text-align: left;
            font-weight: 600;
        }
        .right_loginType {
            height: auto;
            margin: 20px 0px 10px 0px;
        }
        .right_loginType span {
            width: 49%;
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 1.8vw;
            color: #4A4A4A;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            transition: color 1s;
        }
        .right_loginI .i {
            width: 49%;
            height: 4px;
            background: #0056FF;
            border-radius: 2px;
            display: inline-block;
            float: left;
            transition: background 0.5s;
        }
        .right_admin,
        .right_pwd,
        .right_btn,
        .right_check {
            margin-top: 25px;
        }
        .right_admin embed,
        .right_pwd embed {
            width: 38px;
            height: 50px;
            margin-right: 10px;
            float: left;
            margin-top: 20px;
        }
        .right_admin .adminInp,
        .right_pwd .adminInp {
            width: 575px;
            height: 100px;
            border: 1.5px solid #DDE3E9;
            border-radius: 4px;
            float: left;
            font-family: PingFangSC-Regular;
            font-size: 2vw;
            color: #9B9B9B;
            text-align: left;
            font-weight: 400;
            text-indent: 10px;
            outline: none;
        }
        .right_check .right_checkP {
            width: 40px;
            height: 50px;
            position: relative;
            float: left;
            margin-right: 10px;
        }
        .right_check .right_checkBox {
            width: 38px;
            height: 38px;
            border: 1px solid #E6E6E6;
            border-radius: 2px;
            float: left;
            margin-right: 10px;
            display: inline-block;
            cursor: pointer;
            z-index: 999;
        }
        .right_check .right_checkBoxOk {
            width: 32px;
            height: 27px;
            position: absolute;
            top: 8px;
            left: 6px;
        }
        .right_check span {
            width: 420px;
            height: 50px;
            font-family: PingFangSC-Regular;
            font-size: 1.8vw;
            color: #9B9B9B;
            text-align: left;
            font-weight: 400;
            float: left;
            line-height: 2vw;
        }
        .right_btn .btnOk {
            width: 620px;
            height: 100px;
            font-family: PingFangSC-Regular;
            font-size: 1.8vw;
            color: #FFFFFF;
            font-weight: 400;
            margin: 0 auto;
            border: none;
            border-radius: 4px;
            background: #E6E6E6;
            outline: none;
        }
        .foot {
            position: fixed;
            width: 100%;
            bottom: 70px;
            text-align: center;
        }
        .foot_li {
            width: 1150px;
            margin: 0 auto;
            height: 24px;
        }
        .foot_li li {
            width: 124px;
            font-size: 1.5vw;
            margin-right: 61px;
            height: 1.5vw;
            font-family: PingFangSC-Semibold;
            letter-spacing: 2px;
            text-align: center;
            line-height: 1.5vw;
            font-weight: 600;
            float: left;
        }
        .foot_li li a:hover,.foot_p a span:hover{
            color: #0056FF;
        }
        .foot_li li a {
            color: #4A4A4A;
        }
        .foot_li li:last-child {
            margin-right: 0;
        }
        .foot_li li:nth-child(2),
        .foot_li li:nth-child(4),
        .foot_li li:nth-child(6),
        .foot_li li:nth-child(8) {
            width: 1px;
        }
        .foot_p span:first-child {
            margin-right: 29.5px;
        }
        .foot_p span:nth-child(2) {
            width: 280px;
            margin-right: 21.5px;
        }
        .foot_p span:nth-child(4) {
            width: 275px;
            margin-right: 29px;
        }
        .foot_p span:nth-child(5) {
            width: 226px;
        }
        .foot_p img {
            width: 17.73px;
            height: 16px;
            margin-right: 3.77px;
            visibility: midden;
            vertical-align: middle;
        }
        .foot_p span {
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 1.5vw;
            color: #4A4A4A;
            letter-spacing: 2px;
            text-align: center;
            line-height: 3.5vw;
            font-weight: 600;
        }
        .foot_p a span{
            color: #4A4A4A;
        }
    </style>
</head>
<body>
<div class="warp">
    <div class="left">
        <ul class="left_top">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <ul class="left_top2">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="clear"></div>
        <div class="left_logo">
            <a href="#">
                <img src="img/logo.png" class="logo" >
            </a>
            <span>浩维运行引导管理平台</span>
        </div>
        <div class="clear"></div>
        <div class="left_title">
            浩瀚无涯    维护天下
        </div>
        <div class="left_titleE">
            The endless vastness ,
            maintain the world .
        </div>
        <div class="left_login">
            <img src="img/logoin.png" >
        </div>
    </div>
    <div class="right">
        <form name="register2" action="/loginPage" method="post" style="height: 100%;" enctype="multipart/form-data" id="loginList">
            <div style="font-size: 13px;height: 20px;width: 90%;padding: 0;margin: 0;color: #c62828">${requestScope.no_user}${requestScope.no_status}${requestScope.no_permission}</div>
            <div class="right_loginBox">
            <div class="right_loginTitle">
                您好，<br>
                欢迎登录！
            </div>
            <div class="right_loginType">
                <span id="userLogin">用户登录</span>
            </div>
            <div class="right_loginI">
                <i class="i noCheckT1"></i>
            </div>
            <div class="clear"></div>
            <div class="right_admin">
                <embed src="img/admin.svg" width="300" height="100"
                       type="image/svg+xml"
                       pluginspage="http://www.adobe.com/svg/viewer/install/" />
                <input type="text" class="adminInp" id="userNumber" name="userNumber" placeholder="请输入账号" onfocus="dian('userNumber')" onblur="quxiao('userNumber')">
            </div>
            <div class="clear"></div>
            <div class="right_pwd">
                <embed src="img/pwd.svg" width="300" height="100"
                       type="image/svg+xml"
                       pluginspage="http://www.adobe.com/svg/viewer/install/" />
                <input type="password" class="adminInp" id="password" name="password" placeholder="请输入密码" onfocus="dian('password')" onblur="quxiao('password')">
            </div>
            <div class="clear"></div>
            <div class="right_btn">
                <input type="submit" value="登录" class="btnOk">
            </div>
            <div class="right_check">
                <p class="right_checkP" onclick="remeberPwd()">
                    <i class="right_checkBox"></i>
                    <embed  onclick="remeberPwd()" src="img/yes.svg" width="300" height="100"
                            type="image/svg+xml"
                            pluginspage="http://www.adobe.com/svg/viewer/install/" class="right_checkBoxOk" />
                </p>
                <span>记住密码，下次自动登录</span>
            </div>
           <div class="clear"></div>
        </div>
        </form>
        <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
    </div>
    <div class="foot">
        <ul class="foot_li">
            <li onclick="about()"><a href="#">关于我们</a></li>
            <li>|</li>
            <li class="contact">
                <a href="#">联系我们</a>
                <p>13867129833@139.com</p>
            </li>
            <li>|</li>
            <li><a target="_blank" href="https://company.zhaopin.com/CZ618264020.htm">人才招聘</a></li>
            <li>|</li>
            <li><a target="_blank" href="http://www.hopezn.com/">浩普智能</a></li>
            <li>|</li>
            <li><a target="_blank" href="http://www.hopeepe.com">浙江浩普</a></li>
        </ul>
        <div class="clear"></div>
        <p class="foot_p">
            <span>Copyright&nbsp;©&nbsp;2020 howellop.com</span>
            <span>2.1.1.210121版本</span>
            <img src="img/keeponrecord.png" alt="">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011394">
					<span>
						浙公网安备 33010602011394号
					</span>
            </a>
            <a target="_blank" href="http://beian.miit.gov.cn/">
                <span>浙ICP备2020033598号-2</span>
            </a>
        </p>
    </div>
    <div class="aboutDiv">
        <span class="closeAbout" onclick="closeAboutFun()">❌</span>
        <p>
            杭州浩维环境科技有限公司成立于国家系统化、精细化推进大气污染治理之时，集研究开发、设计、技术咨询、操作培训、运行维护为一体，专业从事节能减排工程全流程运行维护。
            公司现已成为浙江省乃至全国节能减排工程运维领域的排头兵。
            公司坚持走技术创新之路，紧紧围绕国家重大需求与“节能减排”重大战略，瞄准环境治理工程运行维护工作操作难度大、专业要求高、突发性强等问题，打造了一个结构合理、专业多样、技术过硬、能力互补的创新团队，
            率先为电力行业的污染物控制工程提供了个性定制、经济合理、先进可靠的运行、检修、日常维护、大小修等一站式服务，保障了脱硫、脱硝、除尘、气力输送、烟气-蒸汽加热器等全套环保装备运行的可靠性、稳定性、精准性、可调性与经济性。
            公司依托母公司浙江浩普环保工程有限公司的资源优势，导入“互联网+”的创新思维，打通了污染物控制装备的物联网搭建、数据挖掘、运行工况数据库建立与系统设备评价等智能化系统环节，
            全面提升了环境治理工程的自动化、智能化水平，可使污染物控制系统各运行参数长期保持在最佳数值，最大限度地降低物耗及设备故障率，助力业主在“环境友好”的发展道路上实现综合效益的行业领先。
        </p>
    </div>
    <script>
        var index = 0;
        //记住密码
        function remeberPwd () {
            var right_checkBoxOk = document.getElementsByClassName("right_checkBoxOk")[0];
            if (index % 2 == 0) {
                right_checkBoxOk.style.display = "block";
            } else {
                right_checkBoxOk.style.display = "none";
            }
            index ++;
        }

        //关于我们
        function about() {
            var aboutDiv = document.getElementsByClassName("aboutDiv")[0];
            aboutDiv.style.display = "block";
        }
        //关闭关于我们
        function closeAboutFun () {
            var aboutDiv = document.getElementsByClassName("aboutDiv")[0];
            aboutDiv.style.display = "none";
        }
        //  文本框鼠标点击事件
        function dian(id){
            var input = document.getElementById(id);
            input.style.border = '1.5px solid #BACEFD';
        }

        // 文本框鼠标移开事件
        function quxiao(id){
            var input = document.getElementById(id);
            input.style.border = '1.5px solid #DDE3E9';
        }

        //按钮鼠标移入移出事件
        var btnOk = document.getElementsByClassName("btnOk")[0];
        btnOk.onmouseover = function(){
            btnOk.style.backgroundColor = '#0056FF';
        };
        btnOk.onmouseout = function(){
            btnOk.style.backgroundColor = '#E6E6E6';
        };


        var winHeight = $(window).height(); //获取当前页面高度
        $(window).resize(function() {
            //当窗体大小变化时
            var thisHeight = $(this).height();  //窗体变化后的高度
            if (winHeight - thisHeight > 50) {
                /*
                软键盘弹出
                50是设置的阈值，用来排除其他影响窗体大小变化的因素，比如有的浏览器的工具栏的显示和隐藏
                */
                $('.warp').css('height', winHeight + 'px');
                $(".foot").css("z-index","-1");
            } else {
                /*
                软键盘关闭
                */
                $('.warp').css('height', '100%');
                $(".foot").css("z-index","999");
            }
        });
    </script>
</div>
</body>
</html>
