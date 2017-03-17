/**
 * Created by asus on 2017/2/18.
 */
$(function(){


    $("#gclose").on('click',function(){
        $('.manapp').fadeOut(600);
    })


    var message=window.location.search.slice(1);//获取跳转前页面的数据并删除 ?(符号)
    var mes=getMun(message);                    //获取数字id
    getOne(mes);
    getTwo(mes);
    function getMun(str){
        return str.replace(/[^0-9]+/g,'');
    }

    function getOne(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproduct",
            data:{productid:mes},
            success:function(one){
                var html=template("first",one);
                $(".one").html(html);
            }
        });
    }

    function getTwo(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getproductcom",
            data:{productid:mes},
            success:function(two){
                var html=template("second",two);
                $(".two").html(html);
            }
        });

    }





















})




































