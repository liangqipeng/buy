/**
 * Created by Administrator on 2017/2/17.
 */
$(function () {

    /*========�����ĵ���========*/
    init();
    var Data = {};
    /*========�����Ķ���========*/

    /*��ʼ��*/
    function init() {
        getInlandDiscount();
    }

    /*��������ۿ�����*/
    function getInlandDiscount() {
        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
            Data = res;
            //console.log(res.result.length)
            render();
        })
    }

    /*��Ⱦ����*/
    function render() {
        var newData = { result: [] };
        var leng=8;
        if(Data.result.length<=8){
            leng=Data.result.length;

        }
        for (var i = 0; i < leng; i++) {
            // ��Ҫ����data.result�ĵ�һ�����ݣ����ң���������֮�� Ҫɾ������һ�����ݡ�Ȼ���ʣ�µ����ݶ���ǰ���ƶ�һ��λ
            // shift:�Ӽ����аѵ�һ��Ԫ��ɾ�������������Ԫ�ص�ֵ��
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
        // ������ܸ߶�
        var height = $(".contains").height() + $("header").height() + $("footer").height() - $(window).height();
        var disBottom = height - $(document.body).scrollTop();
        console.log($(window).height());
        if (disBottom < 50) {
            //console.log("��������")
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
