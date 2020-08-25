<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
           <a href="#"><img src="img/logo.png" alt="" style="margin-top: 10px;width: 50px;float: left;" onclick="showMenu()"></a>
            杭州浩维管理平台
           <ul class="top_list">
               <li class="comprehensive">
                   <a href="#">综合管理</a>
                   <ul class="erji">
                       <li><a href="#">动态区域</a></li>
                       <li><a href="#" onclick="noticeManagement()">通知管理</a></li>
                       <li><a href="#" onclick="departmentManagement()">部门管理</a></li>
                       <li><a href="#" onclick="roleManagement()">角色管理</a></li>
                       <li><a href="#" onclick="postManagement()">岗位管理</a></li>
                       <li><a href="#" onclick="accountManagement()">账户管理</a></li>
                   </ul>
               </li>
               <li class="headPortrait"><a href="#"><img src="img/h6.png" alt=""></a></li>
               <li><a href="#" id="uesrName">admin</a></li>
               <li><a href="#">注销</a></li>
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
        <script>
            // $(document).ready(function(){
            // });
            // //点击logo显示和隐藏左侧菜单
            // var count = 0;
            // function showMenu() {
            //     var center_left = $(".center_left")[0];
            //     var center_right = $(".center_right")[0];
            //     if (count % 2 == 1){
            //         center_left.style.display = "none";
            //         center_right.style.width =  "100%";
            //         count ++;
            //     }else{
            //         center_left.style.display = "inline-block";
            //         center_right.style.width =  "calc(100% - 201px)";
            //         count --;
            //     }
            // }
            //
            // var $iframeRight =  $(".iframeRight");
            // // 角色管理
            // function  roleManagement() {
            //     $iframeRight.attr("src", "roleManagement");
            // }
            // // 部门管理
            // function departmentManagement() {
            //     $iframeRight.attr("src", "departmentManagement");
            // }
            // // 账户管理
            // function accountManagement() {
            //     $iframeRight.attr("src", "accountManagement");
            // }
            // // 岗位管理
            // function postManagement() {
            //     $iframeRight.attr("src", "postManagement");
            // }
            // //通知管理
            // function noticeManagement() {
            //     $iframeRight.attr("src", "noticeManagement");
            // }
        </script>
    </body>
</html>
