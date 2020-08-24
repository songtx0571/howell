function loginPage(){
    $.ajax({
        type: "GET",
        url: "http://192.168.1.26:8080/loginPage",
        data: {userNumber:$("#UserNumber").val(), password:$("#Password").val()},
        dataType: "json",
        success: function(data){
            // console.log(data)
            $('#UserNumber').empty();//清空UserNumber里面的所有内容
            $('#Password').empty();//清空Password里面的所有内容
            if (data != "") {
                location.href = data;
            }else {
                alert("用户名或密码输入错误")
            }
        },
        error : function (err) {
            console.log(err)
        }
    });
}

