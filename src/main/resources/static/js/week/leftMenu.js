var path = "";
$(document).ready(function () {
    for(var i=23;i<27;i++){
        showContent(i);
    }
    layui.use('element', function(){
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(demo)', function(elem){
        });
    });
});
//左侧菜单点击事件
function showContent(typeHtml) {
    $.ajax({
        type: "POST",
        url: path + '/getMenuTree',
        sync:true,
        data: {rootMenuId: typeHtml},
        dataType: "json",
        success: function(data){
            var two = "";
            for (var i = 0; i < data.length; i ++){
                var third = data[i].children;
                two += "<dd class='sanji"+data[i].id+"'>" +
                    "<a href='#void();' style='position:relative;color: #000;background: gainsboro;'>"+data[i].text+"" +
                    "<spam class='open"+data[i].id+"' onclick='open1("+data[i].id+")' style='position: absolute;top: 0px;right: 0px;width: 100%;height:100%;display: block;text-align: right;padding-right: 10px;padding-top: 12px;box-sizing: border-box;'><i class=\"fa fa-caret-up\"></i></spam>" +
                    "<spam class='close"+data[i].id+"' onclick='close1("+data[i].id+")' style='position: absolute;top: 0px;right: 0px;width: 100%;height:100%;display: block;text-align: right;padding-right: 10px;padding-top: 12px;box-sizing: border-box;display: none'><i class=\"fa fa-caret-down\"></i></spam>" +
                    "</a><dl class='close layui-nav-child-child sanjiBox"+data[i].id+"'>";
                for (var k = 0; k < third.length; k ++){
                    third[k].url = "'"+third[k].url+"'";
                    two += '<dd style="background: #f2f2f2;"><a href="#" onclick="jump('+typeHtml+','+third[k].url+')" style="padding-left: 40px;box-sizing: border-box;color: #000">'+third[k].text+'</a></dd>';
                }
                two += "</dl></dd>";
            }
            $(".erji" + typeHtml).append(two);
        }
    });
}
//收缩打开
function showDown(num) {
    var children = $(".layui-nav-item").children();
    if ($(".first"+num).children().last().css("display") == "block"){
        for (var i = 0; i < children.length; i ++) {
            if (i % 2 != 0) {
                $(".layui-nav-item").children().eq(i).css("display","none");
            }
        }
    }else{
        for (var i = 0; i < children.length; i ++) {
            if (i % 2 != 0) {
                $(".layui-nav-item").children().eq(i).css("display","none");
            }
        }
        $(".first"+num).children().last().css("display","block");
    }
}
//跳转
function jump(project,url) {
    var src = "";
    if (project == "25") {//wa
        src = "http://localhost:8081" + url;
    } else if (project == "23"){//guide
        src = "http://localhost:8082" + url;
    } else if (project == "24"){//ai
        src = "http://localhost:8084" + url;
    } else if (project == "26"){//exam
        src = "http://localhost:8083" + url;
    }
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
