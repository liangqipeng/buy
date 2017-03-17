/**
 * Created by asus on 2017/2/16.
 */

$(function () {

    $('#close').on('click', function () {
        $('.install').remove();
    })

    $("#gclose").on('click',function(){
        $('.manapp').fadeOut(600);
    })




//分类模块调用

    getSort();

    var timer = null;
    var that;
    $(".rank_detail").on('click', 'a', function () {
        clearTimeout(timer);
        timer = setTimeout(responsive, 500);
        that = $(this);
    })
    function responsive() {
        console.log(1);
        if (that.next('.box').children().hasClass("cas")) {
            $(".box").children().remove();
            that.removeClass("up").addClass("down");
        } else {
            $(".box").children().remove();
            $(".item>a").removeClass("up").addClass("down");
            var _this = that.next('.box');
            var va = $(_this).attr('data_item');
            that.removeClass("down").addClass("up");
            $.ajax({
                url: "http://139.199.157.195:9090/api/getcategory",
                data: {titleid: va},
                success: function (b) {
                    var html = template("details", b);
                    _this.html(html);
                }
            })
            return false;
        }

    }


//分类模块
    function getSort() {
        va = $(this).attr("data_a");
        $.ajax({
            url: "http://139.199.157.195:9090/api/getcategorytitle",
            success: function (sort) {
                var html = template("sort", sort);
                $(".rank_detail").html(html);
                $('.install').remove();
            }
        });
    }
})







