$(function () {
    $.get("http://139.199.157.195:9090/api/getcoupon",function(res){
        var html=template("shop",res);
        $("#list").html(html);
    })
    $('#update').on('touchend',function(){
        window.location.reload();
    })
})