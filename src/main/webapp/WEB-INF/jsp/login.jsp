<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>--%>
<html>
<head>
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <title>浩维运行引导管理平台</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/login.css">
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/week/alert.js"></script>
    <style>

    </style>
</head>
<body>
<div class="whole">
    <div class="white_content">
        <div class="white_top">
            <p>浩瀚无涯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;维护天下</p>
        </div>
        <div style="clear: both"></div>
        <div id="tab">
            <div id="secondPage"  class="show">
                <form name="register2" action="/loginPage" method="post" enctype="multipart/form-data" id="loginList">
                    <p style="position: relative">
                        账号:<input type="text" name="userNumber" placeholder="请输入账号"
                                  id="userNumber" class="set"  onfocus="this.placeholder=''"
                                  onblur="this.placeholder='请输入账号'">
                        <span id="admin" style="color: red;line-height: 40px;font-size: 12px;position: absolute; right: -60px;top: 18px;display: none">请输入账号！</span>
                    </p>
                    <p style="position: relative">
                        密码:<input
                            type="password" name="password" placeholder="请输入密码" id="password"
                            class="set"  onfocus="this.placeholder=''"
                            onblur="this.placeholder='请输入密码'">
                        <span id="pwd" style="color: red;line-height: 40px;font-size: 12px;position: absolute; right: -60px;top: 18px;display: none;">请输入密码！</span>
                    </p>
                    <input type="submit" value="登录" class="button" style="text-align: center;" id="button02">
                </form>
                <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
            </div>
        </div>
    </div>
    <%-- 页脚 --%>
    <div class="footer">
        <ul>
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
        <p>Copyright © 2020  hopeop.com 版权所有</p>
        <div style="margin:0 auto; padding:10px 0;display:inline-block;height:20px;line-height:20px;">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011230">
                <img src="img/keeponrecord.png" style="float:left;"/>
                <span style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#333;">浙公网安备 33010602011230号</span></a>&nbsp;&nbsp;&nbsp;&nbsp;浙ICP备2020033598号-1</span>

        </div>
        <%--浙公网安备 33010602011230号--%>
        <%--<p>浙ICP备2020033598号-1</p>--%>
    </div>
    <div class="aboutDiv">
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
        function about() {
            layui.use('layer', function() { //独立版的layer无需执行这一句
                var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
                layer.open({
                    type: 1
                    , id: 'aboutDiv' //防止重复弹出
                    , content: $(".aboutDiv")
                    , btnAlign: 'c' //按钮居中
                    , shade: 0.4 //不显示遮罩
                    , area: ['100%', '100%']
                    , yes: function () {
                    }
                });
            });
        }
    </script>
</div>
</body>
</html>
