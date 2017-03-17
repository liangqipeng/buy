$(function () {
    var r = window.location.search;

    $.get("http://139.199.157.195:9090/api/getcouponproduct?couponid=" + getNum(r), function (res) {
        var html = template("food", res);
        $("#kfcFood").html(html);


        $("#kfcFood").on('click', 'li', function () {

            $('body').append('<div class="cover-box"></div>');
            var picBox = template("pic", res);
            $('.cover-box').html(picBox);
            //轮播图中所有的div 包裹着img
            var len = $(this).parent('ul').parent('.food').parent('.one').siblings('.cover-box').find('.item');
            //页面中包裹着a>img的li标签 与div的item序号对应
            for (var i = 0; i < len.length; i++) {
                for (var j = 0; j < len.length; j++) {
                    $(len[j]).removeClass('active');
                }
                $(this).parent('ul').parent('.food').parent('.one').siblings('.cover-box').find('.item' + getNum(this.className)).addClass("active");
            }
            $(document).on('mouseup', function (event) {
                if ($(event.target).parent('.carousel-control').length == 0 &&
                    $(event.target).parent('.active').length == 0) {
                    //$('#carousel-example-generic').parent(".cover-box").hide();
                    $('.cover-box').remove();
                }
            })
        })

    });

    template.helper("getNum", getNum);

    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }

    $('#goback').on('click',function () {
        window.history.go(-1);
    })
})
