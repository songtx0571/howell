var path = "";
var third = "";
var type = "";
$(document).ready(function () {
    layui.use('element', function(){
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(demo)', function(elem){
        });
    });
});
//左侧菜单点击事件
function showcontent(typeHtml) {
    type = typeHtml;
    $.ajax({
        type: "POST",
        url: path + '/getMenuTree',
        data: {rootMenuId: typeHtml},
        dataType: "json",
        success: function(data){
            //二级菜单，三级菜单
            $(".erji"+typeHtml).html("");
            var two = "";
            for (var i = 0; i < data.length; i ++){
                third = data[i].children;
                two += "<dd class='sanji"+data[i].id+"'>" +
                    "<a href='#void();' style='position:relative;color: #000;'>"+data[i].text+"" +
                    "<span class='open"+data[i].id+"' onclick='open1("+data[i].id+")' style='position: absolute;top: 12px;right: 0px;width: 100%;display: block;text-align: right;padding-right: 10px;'><i class=\"fa fa-caret-up\"></i></span>" +
                    "<span class='close"+data[i].id+"' onclick='close1("+data[i].id+")' style='position: absolute;top: 12px;right: 0px;width: 100%;display: block;text-align: right;padding-right: 10px;display: none'><i class=\"fa fa-caret-down\"></i></span>" +
                    "</a><dl class='close layui-nav-child-child sanjiBox"+data[i].id+"'>";
                for (var k = 0; k < third.length; k ++){
                    third[k].url = "'"+third[k].url+"'";
                    two += '<dd class="ddClass" style="background: #f2f2f2;"><a href="#" onclick="jump('+third[k].url+')" style="padding-left: 40px;box-sizing: border-box;color: #000">'+third[k].text+'</a></dd>';
                }
                two+="</dl></dd>";
            }
            $(".erji"+typeHtml).append(two);
        }
    });
}
//跳转
function jump(url) {
    var src = "http://localhost:8081" + url;
    var $iframeRight = parent.$('.iframeRight');
    $iframeRight.attr("src",src);
}
//打开
function open1(id) {
    var dd = $(".open"+id).parent().first().next();
    dd.css("display","none");
    $(".close"+id).css("display","block");
    $(".open"+id).css("display","none");
}
//收起
function close1(id) {
    var dd = $(".close"+id).parent().first().next();
    dd.css("display","block");
    $(".close"+id).css("display","none");
    $(".open"+id).css("display","block");
}
