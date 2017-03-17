
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
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsproduct",
            data: {
                shopid: 2,
                areaid: 2
            },
            success: function (res) {
                Data = res;
                render();
            }

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
            newData.result.push(Data.result.shift());
        }
        var html = template("tplSingle", newData);
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

    //菜单切换函数调用
    click("#shop", "#items1", "#shop>span");
    click("#address", "#items2", "#address>span");
    click("#price", "#items3", "#price>span");
    click("#content", "#items4");
    //
    //
    items("#items1>li","#items1>li>span");
    items("#items2>li","#items2>li>span");
    items("#items3>li","#items3>li>span");

})


//更多显示模块js

function items(a, b) {
    var lis = $(a);
    var spans = $(b);
    for (var i = 0; i < spans.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            console.log(1);
            var x = this.index;
            console.log(x);
            console.log($("#items1>li")[x]);
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.display = "none";
            }
            $(spans[x]).show();

        }

    }
}
//菜单切换函数封装
    function click(a, b, c) {
        $(a).click(function () {
            $(b).toggle()
            $(c).css({
                transform: "rotateZ(180deg)",
                transition: "all .5s"
            })
            return false;
        })
    }

    var tips = $("#list1>a");
    for(var i = 0;i<tips.length;i++){
        tips[i].onclick = function(){
            console.log(tips[i]);
            tips[i].className = '';
        }
        this.className = "current";
    }















