var path = "";
$(function () {
    var data = $("#dataHidden").val();
    // 个人信息
    if (data == "info"){
        $.ajax({
            type:'POST',
            dataType: "json",//数据格式
            url:path + "/employee/getLoginEmployee",
            // data:{"userId": userId},
            success:function(data){
                $("#employeeId").val(data.id);
                $("#uUserName").val(data.userNumber);
                $("#uName").val(data.name);
                $("#uIdnumber").val(data.idNumber);
                $("#uCard").val(data.card);
                $("#uPhone").val(data.phone);
                $("#uEmail").val(data.email);
                $("#uEducation").val(data.education);
                $("#uCloshe").val(data.closhe);
                $("#uHat").val(data.hat);
                $("#uEmergency").val(data.emergency);
                $("#uEmergencyTel").val(data.emergencyTel);
                $("#uBank").val(data.bank);
                $("#uAddress").val(data.address);
            }
        });
        layui.use('layer', function() { //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            layer.open({
                type: 1
                , id: 'infoDiv' //防止重复弹出
                , content: $(".infoDiv")
                , btnAlign: 'c' //按钮居中
                , shade: 0.4 //不显示遮罩
                , area: ['100%', '100%']
                , yes: function () {
                }
            });
        });
    }
    // 修改密码
    if (data == "pwd") {
        $("#pwd1").val("");
        $("#pwd2").val("");
        layui.use('layer', function() { //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            layer.open({
                type: 1
                , id: 'updPwd' //防止重复弹出
                , content: $(".updPwd")
                , btnAlign: 'c' //按钮居中
                , shade: 0.4 //不显示遮罩
                , area: ['500px', '360px']
                , yes: function () {
                }
            });
        });
    }
});
//修改个人信息
function updateInfo() {
    var employee = {};
    employee.id = $("#employeeId").val();
    employee.userNumber = $("#uUserName").val();
    employee.name = $("#uName").val();
    employee.idNumber = $("#uIdnumber").val();
    employee.card = $("#uCard").val();
    employee.phone = $("#uPhone").val();
    employee.email = $("#uEmail").val();
    employee.education = $("#uEducation").val();
    employee.closhe = $("#uCloshe").val();
    employee.hat = $("#uHat").val();
    employee.emergency = $("#uEmergency").val();
    employee.emergencyTel = $("#uEmergencyTel").val();
    employee.bank = $("#uBank").val();
    employee.address = $("#uAddress").val();
    console.log(employee);
    $.ajax({
        url:path + "/employee/homeUpdEmployee",
        dataType: "json",//数据格式
        type: "post",//请求方式
        data: JSON.stringify(employee),
        contentType: "application/json; charset=utf-8",
        success:function(data){
            layer.alert("修改成功")
        }
    });
}
//修改密码
function updatePwd() {
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    if (pwd1 != pwd2) {
        $(".tips").css("display","contents");
        return;
    } else{
        $(".tips").css("display","none");
    }
    $.ajax({
        type:'GET',
        dataType: "json",//数据格式
        url:path + "/user/updPassword",
        data:{"password": pwd2},
        crossDomain: true,
        xhrFields: {withCredentials: true},
        success:function(data){
            layer.alert("修改成功");
        }
    });
}

//取消
function cancel() {
    layer.closeAll();
}

