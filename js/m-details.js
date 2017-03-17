
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

    /*��Ⱦ����*/
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

    //�˵��л���������
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


//������ʾģ��js

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
//�˵��л�������װ
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















