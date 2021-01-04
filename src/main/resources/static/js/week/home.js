function showMenu() {
    //点击logo显示和隐藏左侧菜单
    var count = "";
    var center_left = $(".center_left")[0];
    var center_right = $(".center_right")[0];
    if (center_left.style.display == "none"){
        count = 0;
    } else {
        count = 1;
    }
    if (count % 2 == 1){
        center_left.style.display = "none";
        center_right.style.width =  "100%";
        count ++;
    }else{
        center_left.style.display = "inline-block";
        center_right.style.width =  "calc(100% - 201px)";
        count --;
    }
}
var $iframeRight =  $(".iframeRight");
// 角色管理
function  roleManagement() {
    $iframeRight.attr("src", "roleManagement");
}
// 部门管理
function departmentManagement() {
    $iframeRight.attr("src", "departmentManagement");
}
// 账户管理
function accountManagement() {
    $iframeRight.attr("src", "accountManagement");
}
// 岗位管理
function postManagement() {
    $iframeRight.attr("src", "postManagement");
}
//通知管理
function noticeManagement() {
    $iframeRight.attr("src", "noticeManagement");
}
//权限管理
function authorityManagement(){
    $iframeRight.attr("src", "authorityManagement");
}
//弹窗界面
function homePopup(data) {
    $iframeRight.attr("src", "homePopup?data=" + data);
}
//通讯
function message() {
    $iframeRight.attr("src", "index");
}
//通讯管理
function messageManagement() {
    $iframeRight.attr("src", "messageManagement");
}