/**
 * Created by asus on 2017/2/15.
 */
$(function () {
    //功能选择模块调用
    getItem();
    //超值推荐模块调用
    getRes();
    $(".section").on("click", ">div:nth-of-type(8)", function () {
        $(".section>div:nth-last-child(-n+4)").slideToggle(0);
        return false;
    })
    $(".section").on("click", ">div:nth-of-type(7)", function () {
        location.href="checkPprice.html";
        return false;
    })
    $(".section").on("click", ">div:nth-of-type(10)", function () {
        location.href="rated.html";
        return false;
    })

})


//功能选择模块
function getItem() {

    $.ajax({
        url: "http://139.199.157.195:9090/api/getindexmenu",
        success: function (item) {
            var html = template("select", item);
            $(".section").html(html);
        }
    });
}

//超值推荐模块
function getRes() {
    template.helper("getNum", getNum);//添加方法helper 1参 函数名 2参函数体（也可以是函数名!!需要调用时就写，不需要就不用写
    $.ajax({
        url: "http://139.199.157.195:9090/api/getmoneyctrl",
        data: {pageid: 1},    //传参 请求页面数或者商品ID
        success: function (res) {
            var html = template('save_list', res);//转换模板为Html标签
            $(".content").html(html);
        }
    });

    function getNum(str) {
        return str.replace(/[^0-9]+/g, '')
    }
}









