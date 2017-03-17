//======================= 函数调用 =============



var getMsg = window.location.search.slice(1);
var match = getNum(getMsg);

getRes(match);

function getRes(productid) {
    template.helper("getNum", getNum);
    $.ajax({
        url: "http://139.199.157.195:9090/api/getmoneyctrlproduct",
        data: { productid: productid },
        success: function(res) {
            var html = template('details_city', res);
            $(".details").html(html);
            var footnav = template("foot_nav", res);
            $(".foot-nav").html(footnav);
        }
    });

    function getNum(str) {
        return str.replace(/[^0-9]+/g, '')
    }
}

function getNum(str) {
    return str.replace(/[^0-9]+/g, '')
}

$(".toTop").on("click", function() {
    window.scrollTo(0, 0);
})

$(".back").on("click", function() {
    javascript: history.back(-1);
})