<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<html>
    <head>
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <title>浩维运行引导管理平台</title>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <link rel="stylesheet" href="js/font/css/font-awesome.css">
        <link rel="stylesheet" href="css/home.css">
    </head>
    <body>
        <!--  页面上方区域     -->
        <div class="top">
            <a href="#"><img src="img/logo.png" alt="" style="margin-top: 5px;width: 50px;float: left;margin-right: 10px;margin-left: 50px;" onclick="showMenu()"></a>
           <ul class="top_list">
               <li><a href="#" onclick="message()"><i class="fa fa-envelope-o" style="font-size: 1.8rem;"></i></a></li>
               <li class="comprehensive">
                   <a href="#"><i class="fa fa-wrench" style="font-size: 1.8rem;"></i></a>
                   <ul class="erji">
                       <li><a href="#"><i class="fa fa-object-group"></i>&nbsp;&nbsp;动态区域</a></li>
                       <shiro:hasPermission name="通知管理">
                           <li><a href="#" onclick="noticeManagement()"><i class="fa fa-volume-up"></i>&nbsp;&nbsp;通知管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="部门管理">
                           <li><a href="#" onclick="departmentManagement()"><i class="fa fa-group"></i>&nbsp;&nbsp;部门管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="角色管理">
                           <li><a href="#" onclick="roleManagement()"><i class="fa fa-address-card"></i>&nbsp;&nbsp;角色管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="岗位管理">
                           <li><a href="#" onclick="postManagement()"><i class="fa fa-address-book"></i>&nbsp;&nbsp;岗位管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="账户管理">
                           <li><a href="#" onclick="accountManagement()"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;账户管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="权限管理">
                           <li><a href="#" onclick="authorityManagement()"><i class="fa fa-cogs"></i>&nbsp;&nbsp;权限管理</a></li>
                       </shiro:hasPermission>
                       <shiro:hasPermission name="通讯管理">
                            <li><a href="#" onclick="messageManagement()"><i class="fa fa-cogs"></i>&nbsp;&nbsp;通讯管理</a></li>
                       </shiro:hasPermission>
                   </ul>
               </li>
               <li class="personal">
                   <a href="#" id="uesrName"><i class="fa fa-user" style="font-size: 1.8rem;"></i></a>
                   <ul class="erji2">
                       <li><a href="#" onclick="homePopup('info')"><i class="fa fa-user-o"></i>&nbsp;&nbsp;个人信息</a></li>
                       <li><a href="#" onclick="homePopup('pwd')"><i class="fa fa-pencil"></i>&nbsp;&nbsp;修改密码</a></li>
                   </ul>
               </li>
               <li><a href="/logout"><i class="fa fa-sign-in" style="font-size: 1.8rem;"></i></a></li>
           </ul>
        </div>
        <div class="clear"></div>
      <%-- 页面中间部分 --%>
        <div class="center">
            <div class="center_left">
                <iframe src="leftMenu" frameborder="0" class="iframeLeft" scrolling="yes" target="middle"></iframe>
            </div>
            <div class="center_right">
                <iframe src="index" frameborder="0" class="iframeRight" scrolling="yes" target="middle"></iframe>
            </div>
        </div>
        <script type="text/javascript" src="js/week/home.js"></script>
    </body>
</html>

