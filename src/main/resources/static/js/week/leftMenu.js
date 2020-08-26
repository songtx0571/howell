//var path = "http://192.168.1.26:8080/"
var path = "";
$(document).ready(function(){
    //获取菜单数据
    $.ajax({
        type : "get",
        async: false,
        url : path + "getMenu",
        dataType: "json",
        data: {"parent": "0"},
        jsonp:"callback", //请求php的参数名
        jsonpCallback: "jsonhandle",//要执行的回调函数
        success : function(data) {
            var $leftList = $("#leftList");
            var leftList = "";
            for (var i = 0; i < data.length; i ++) {
                leftList += "<li class='left"+data[i].id+"' onclick='showcontent("+data[i].id+")'>"
                leftList += "<a href='javascript:void(0)\'>"+data[i].name+"</a>"
                leftList += "<i class='fa fa-angle-double-right fa-lg left_listIcon'></i>"
                leftList += "</li>"
            }
            // console.log(leftList);
            $leftList.append(leftList)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
});
//左侧菜单点击事件
function showcontent(typeHtml) {
    var $leftIndex = $("#leftIndex");
    var $leftGuide = $(".left23");
    var $leftAi = $(".left24");
    var $leftWa = $(".left25");
    var $leftExam = $(".left26");

    var count1 = 0;
    var center_left = parent.$(".center_left")[0];
    var center_right = parent.$(".center_right")[0];
    if (count1 % 2 != 0){
        center_left.style.display = "inline-block"
        center_right.style.width =  "calc(100% - 201px)"
        count1 ++;
    }else{
        center_left.style.display = "none"
        center_right.style.width =  "100%"
        count1 --;
    }
    // console.log(count1)

    //父页面的iframe
    var $iframeRight = parent.$('.iframeRight');
    //判断传入的值
    if(typeHtml == "23") {// guide
        $iframeRight.attr("src", "guide")
    } else if(typeHtml == "24") { // ai
    } else if(typeHtml == "25") { // wa
    } else { // examination
    }
}