layui.use('element', function() {
    var element = layui.element;
    $("#menu_three").on("click", function() {

        $(this).next().toggle();
        var tClass= $(this).parent().attr("class");
        if(tClass=="layui-nav-item layui-nav-itemed")
        {
            $(this).children(".layui-nav-more").css({"border-color":"transparent transparent #fff","top":"14px"})
        }else{
            $(this).children(".layui-nav-more").css({'border-color':'#fff transparent transparent','top':'20px'})
        }
    })
});