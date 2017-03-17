//======================= 函数调用 =============
$(function() {
    getRes();
})

var page = 1,
    pageAll = null,
    productCount = null;
var flag = true;

var slectorText = null;

function getRes(page) {
    template.helper("getNum", getNum);
    flag = false;
    $.ajax({
        url: "http://139.199.157.195:9090/api/getmoneyctrl",
        data: { pageid: page },
        success: function(res) {
            var html = template('save_list', res);
            productCount = res.totalCount;
            pageAll = Math.floor(productCount / res.pagesize);
            $(".content").html(html);

            $(".form-control").html('');
            for (var i = 0; i < pageAll; i++) {
                var option = document.createElement('option');
                $(option).text(i + 1);
                $(".form-control").append(option);
            }
            // $(".form-control>option").eq(page).css("selected", "selected");

            $(".form-control>option").eq(page - 1).attr("selected", true)
            flag = true;
        }
    });


    function getNum(str) {
        return str.replace(/[^0-9]+/g, '')
    }

}

$(".form-control").change(function() {
    if (flag) {
        page = $(".form-control option:selected").text();
        getRes(page);
    }

})
$(".up").on("click", function() {
    if (flag) {
        page--;
        if (page == 1) return;
        getRes(page);
    }
});
$(".next").on("click", function() {
    if (flag) {
        page++;
        if (page > pageAll) return;
        getRes(page);
    }

});

$(".toTop").on("click", function() {
    window.scrollTo(0, 0);
})


$(".back").on("click", function() {
    javascript: history.back(-1);
})