/**
 * Created by Administrator on 2017/2/17.
 */
$(function () {

    /*========方法的调用========*/
    init();
    var Data = {};
    /*========方法的定义========*/

    /*初始化*/
    function init() {
        getInlandDiscount();
    }

    /*请求国内折扣数据*/
    function getInlandDiscount() {
        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
            Data = res;
            //console.log(res.result.length)
            render();
        })
    }

    /*渲染数据*/
    function render() {
        var newData = { result: [] };
        var leng=8;
        if(Data.result.length<=8){
            leng=Data.result.length;

        }
        for (var i = 0; i < leng; i++) {
            // 需要加载data.result的第一条数据，并且，加载完了之后 要删除掉第一条数据。然后把剩下的数据都往前面移动一个位
            // shift:从集合中把第一个元素删除，并返回这个元素的值。
            newData.result.push(Data.result.shift());
        }
        var html = template("MenuTpl", newData);
        $(".contains").append(html);
        flag=false;

    }



    var flag=false;
    window.onscroll = function () {
        if(Data.result.length==0||flag){
            return;
        }
        // 多余的总高度
        var height = $(".contains").height() + $("header").height() + $("footer").height() - $(window).height();
        var disBottom = height - $(document.body).scrollTop();
        console.log($(window).height());
        if (disBottom < 50) {
            //console.log("加载数据")
            flag=true;
            render();
        }

    }

})

//
//$(function(){
//
//    getDiscountMenu();
//    function getDiscountMenu(){
//
//        $.get("http://139.199.157.195:9090/api/getinlanddiscount", {productid:22},function (res) {
//            var html = template("MenuTpl", res);
//            console.log(html);
//            $(".contains").html(html);
//
//        })
//    }
//})
