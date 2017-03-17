/**
 * Created by Gillbert on 2017/2/14.
 */

$(function () {
    var r = window.location.search;
    console.log(getNum(r));
    getBrandName();
    getProductlist()
    //getProductcom()

    function getBrandName() {
        $.get("http://139.199.157.195:9090/api/getbrand?brandtitleid=" + getNum(r), function (res) {
            var html = template("getBrandName", res);
            $(".category_detail").html(html);
        })
    }

    function getProductlist() {
        data = null;
        $.get("	http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=" + getNum(r) + "&pagesize=4", function (res) {
            var html = template("getProductlist", res);
            $(".product_detail").html(html);
            if(res.result[0]) {
                getProductcom(res.result[0]);
            }
        })
    }

    function getProductcom(data) {
        $.get("	http://139.199.157.195:9090/api/getproductcom?productid=" + getNum(r), function (res) {
            res.result.data = data;
            console.log(res);
            console.log(res.result);
            console.log(res.result.data)
            var html = template("getproductcom", res);
            $(".comment_detail").html(html);
        })
    }

    template.helper("getNum", getNum);


    function getNum(str) {
        if (typeof  str == "number") {
            return str;
        }
        if(str.replace(/[^0-9]+/g, '') < 10) {
            return str.replace(/[^0-9]+/g, '') ;
        } else if(str.replace(/[^0-9]+/g, '') >= 10 && str.replace(/[^0-9]+/g, '') < 100) {

            return str.replace(/[^0-9]+/g, '') % 10;
        }
            return str.replace(/[^0-9]+/g, '') % 100;
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $(".productlist").on('click','li',function(){
        var distance = $("#sign").offset().top;
        //$("body").style.position('relative');
        //console.log(distance);
        //window.scrollTo(0,distance);
        //$('body').animate({top:-distance},1000);
        $("body,html").animate({scrollTop:distance},1000);
    })
    //console.log()
});


