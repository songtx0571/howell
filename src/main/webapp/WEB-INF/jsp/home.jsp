<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="js/font1/iconfont.css">
    <link rel="stylesheet" type="text/css" href="css/home.css"/>

</head>
<body>
<div class="warp">
    <div class="top">
        <div class="logo">
            <img src="img/logo.png" onclick="administration('message')">
            <%--            <span>浩维运行引导管理平台</span>--%>
        </div>
        <ul class="top_list1">
            <li class="top_list1Two0 top_list1Li" onclick="mouseFun(0)">
                <span class="iconfont icon-fenlei1 iconfont0" style="margin-right: 8px;"></span>工作引导
                <div class="top_list1_chide0 top_list1_chide">
                    <div>
                        <div><strong><span>运行引导</span></strong></div><div><span>模板配置 </span></div>
                    </div>
                </div>
            </li>
            <li class="top_list1Two1 top_list1Li" onclick="mouseFun(1)">
                <span class="iconfont icon-jiqiren iconfont1" style="margin-right: 8px;"></span>AI管理
                <div class="top_list1_chide1 top_list1_chide"></div>
            </li>
            <li class="top_list1Two2 top_list1Li" onclick="mouseFun(2)">
                <span class="iconfont icon-wendang iconfont2" style="margin-right: 8px;"></span>员工管理
                <div class="top_list1_chide2 top_list1_chide"></div>
            </li>
            <li class="top_list1Two3 top_list1Li" onclick="mouseFun(3)">
                <span class="iconfont icon-kaoshi1 iconfont3" style="margin-right: 8px;"></span>考试管理
                <div class="top_list1_chide3 top_list1_chide"></div>
            </li>
        </ul>
        <ul class="top_list2">
            <li class="top_list2_setUp" onclick="mouseFun2(1)">
                <span class="iconfont icon-shezhi" style="margin-right: 8px;"></span>
                <ul class="top_list2_chide1">
                    <li><span onclick="administration('dynamicRegion')" style="margin-right: 8px;">动态区域</span></li>
                    <shiro:hasPermission name="通知管理">
                        <li><span onclick="administration('noticeManagement')" style="margin-right: 8px;">通知管理</span>
                        </li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="部门管理">
                        <li><span onclick="administration('departmentManagement')"
                                  style="margin-right: 8px;">部门管理</span></li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="角色管理">
                        <li><span onclick="administration('roleManagement')" style="margin-right: 8px;">角色管理</span></li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="岗位管理">
                        <li><span onclick="administration('postManagement')" style="margin-right: 8px;">岗位管理</span></li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="账户管理">
                        <li><span onclick="administration('accountManagement')" style="margin-right: 8px;">账户管理</span>
                        </li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="权限管理">
                        <li><span onclick="administration('authorityManagement')" style="margin-right: 8px;">权限管理</span>
                        </li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="通讯管理">
                        <li><span onclick="administration('messageManagement')" style="margin-right: 8px;">通讯管理</span>
                        </li>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="通讯管理">
                        <li><span onclick="administration('menuManagement')" style="margin-right: 8px;">菜单管理</span>
                        </li>
                    </shiro:hasPermission>
                </ul>
            </li>
            <li><span class="iconfont icon-xiaoxi" style="margin-right: 8px;"
                      onclick="administration('message')"></span></li>
            <li class="top_list2_information" onclick="mouseFun2(2)">
                <samp id="userName"></samp>
                <ul class="top_list2_chide2">
                    <li><span onclick="homePopup('info')">个人信息</span></li>
                    <li><span href="#" onclick="homePopup('pwd')">修改密码</span></li>
                    <li><span href="#" onclick="version()">版本号</span></li>
                    <li><a href="/logout">退出</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="content">
        <iframe src="index" frameborder="0" class="iframeContent" scrolling="yes" target="middle"></iframe>
    </div>
    <script type="text/javascript" src="js/week/home.js"></script>
</div>
</body>
</html>