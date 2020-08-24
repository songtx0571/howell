<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <title>浩维运行引导管理平台</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/week/login.js?version=1.04"></script>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/week/alert.js"></script>
</head>
<body>
<div class="whole">
    <div class="white_content">
        <div class="white_top">
            <p>浩瀚无涯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;维护天下</p>
        </div>
        <div style="clear: both"></div>
        <div id="tab">
            <div id="secondPage" class="show">
                <form action="" name="register2" method="post"
                      id="loginlist">
                    账号:<input type="text" name="UserName" placeholder="请输入账号"
                              id="UserNumber" class="set"  onfocus="this.placeholder=''"
                              onblur="this.placeholder='请输入账号'"><br>
                    密码:<input
                        type="password" name="Password" placeholder="请输入密码" id="Password"
                        class="set"  onfocus="this.placeholder=''"
                        onblur="this.placeholder='请输入密码'"><br>
                    <input type="button" value="登录" onClick="loginPage();" class="button" style="text-align: center;" id="button02">
                </form>
            </div>
        </div>
    </div>
    <%-- 页脚 --%>
    <div class="footer">
        <ul>
            <li><a href="#">关于我们 </a></li>
            <li>|</li>
            <li><a href="#">联系我们 </a></li>
            <li>|</li>
            <li><a href="#">人才招聘 </a></li>
            <li>|</li>
            <li><a href="#">广告服务 </a></li>
            <li>|</li>
            <li><a href="#">友情链接 </a></li>
            <li>|</li>
            <li><a href="#">销售联盟 </a></li>
            <li>|</li>
            <li><a href="#">浩维社区 </a></li>
            <li>|</li>
            <li><a href="#">浩维公益 </a></li>
            <li>|</li>
            <li><a href="#">手机浩维 </a></li>
        </ul>
        <p>Copyright © 2004-2020  浩维HW.com 版权所有</p>
    </div>
</div>
</body>
</html>
