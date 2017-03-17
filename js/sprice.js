/**
 * Created by Administrator on 2017/2/14.
 */
//白菜价格的js
(function () {
    //调用
    init();

    function init() {
        getNum();
        getfirst();
        getOpen();
    }
    var all = {}
    var flag = false;


    // var value=window.location.search.replace('?productid=','');
    //    获取菜单页面上的数据
    function getNum() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiatitle',
            success: function (ces) {
                var html = template('getIp', ces);
                $('#menu > .product > ul').html(html);
                getproduct();
                getClick();
            }
        });
    }


    function getfirst(){
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
            data: {titleid: 0},
            success: function (ces) {
                all = ces;
                judge();
            }
        })
    }

    //菜单栏的点击开效果
    function getOpen() {
        var isclick = false;
        $('#menu > .product > .open > p').on('click', function () {
            $('#menu > .search').slideToggle();
            if(isclick){
                isclick = false;
                $(this).removeClass('glyphicon glyphicon-remove');
                $(this).addClass('glyphicon glyphicon-list');
            }else{
                isclick= true;
            $(this).removeClass('glyphicon glyphicon-list');
            $(this).addClass('glyphicon glyphicon-remove');
            }
        });
    }


    //获取商品栏的数据
    function getproduct() {
        $("#menu >.product > ul > li> a").click(function () {
            var value = $('#menu > .product > ul > li > a');
            for (var i = 0; i < value.length; i++) {
                var va = $(this).attr('data_a');
                $.ajax({
                    url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
                    data: {titleid: va},
                    success: function (ces) {
                        var html = template('setIp',ces);
                        $('#main > ul').html(html);
                    }
                })
                return;
            }
            //console.log(index);
        })
    }

    //绑定点击事件
    function getClick() {
        //设置一个变量。用来接收当前的位置
        var currentX = 0;
        //开始的位置
        var startX = 0;
        var wp = document.getElementById("wp")
        //当前位置
        var moveX = 0;
        //华东距离
        var distence = 0;
        //滑动的最小距离
        var movemin = 0;
        //判断是否滑动
        var ismove = false;
        //    获取li的宽度
        var lis = document.querySelectorAll("#menu >.product > ul > li");
        var li = 0;
        for (var i = 0; i < lis.length; i++) {
            li += lis[i].offsetWidth;
        }
        wp.style.width = li + "px";
        var ulWidth = li;
        var product = document.getElementById("product")
        //封装缓动事件、
        var movemax = product.offsetWidth - ulWidth;
        //移动的最大距离、
        var x = 100;
        var maxWidth = 0;

        var minWidth = movemax - 100;

        function setTransition() {
            //实现左边的滑动。添加事件监听器
            //开始的位置
            wp.style.transition = 'all  0.2s';
        }

        function removeTransition() {
            wp.style.transition = 'none';
        }

        function setTranslate(y) {
            wp.style.transform = 'translateX(' + (y) + 'px)'
        }

        wp.addEventListener('touchstart', function (event) {
            //    获取当前的位置
            startX = event.touches[0].pageX;
        })

        //移动的距离
        wp.addEventListener('touchmove', function (evnet) {
            ismove = true;
            moveX = event.touches[0].pageX;
            distence = moveX - startX;
            if ((distence + currentX) < maxWidth + x && (distence + currentX) > minWidth) {
                setTranslate(distence + currentX);
            }
            //    获取移动后的位置
        })
        window.addEventListener('touchend', function (event) {
            currentX = distence + currentX;
            if ((distence + currentX) > maxWidth + x) {
                currentX = maxWidth;
                setTransition();
                setTranslate(maxWidth);
            } else if ((distence + currentX) < minWidth) {
                currentX = movemax;
                setTransition();
                setTranslate(movemax);
            } else {
                currentX = distence + currentX;
            }
            //开始的位置
            startX = 0;
            //当前位置
            moveX = 0;
            //华东距离
            distence = 0;
            //滑动的最小距离
            movemin = 0;
            //判断是否滑动
            ismove = false;
        })
    }

//    懒加载

    function judge(){
        var  newAll = {
            result:[]
        }
        var leng = 6;
        if(all.result.length <= 6){
            leng = all.result.length;
        }
        for(var i =0; i< leng; i++){
            newAll.result.push(all.result.shift());
        }
        var html = template('setIp', newAll);
        $('#main > ul').append(html);
        flag = false;
        getlong();
    }



    //判断条件
    function getlong() {
        window.onscroll = function () {
            var seeHeight = $(this).height();//可见高度
            var contentHeight = document.body.scrollHeight;// 内容高度
            var haiTop = $(this).scrollTop();//滚动高度
            if ((contentHeight - seeHeight - haiTop) <= 100) {
               flag = true;
                judge();
            }
        }
    }

})();

