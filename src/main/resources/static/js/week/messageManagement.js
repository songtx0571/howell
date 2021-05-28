$(function () {
    
});

//打开群组页面
function showGroup() {
    var $iframeRight =  parent.$(".iframeContent");
    $iframeRight.attr("src", "groupManagement");
}
//打开部门页面
function showDepart() {
    var $iframeRight =  parent.$(".iframeContent");
    $iframeRight.attr("src", "LayIMManagement");
}