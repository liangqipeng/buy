/**
 * Created by Administrator on 2017/2/18.
 */
//�ײ˼۸��js
(function () {
    //����
    init();

    function init() {
        getNum();
        getfirst();
        //getlong();
        //getOpen();
    }

    // var value=window.location.search.replace('?productid=','');
    //    ��ȡ�˵�ҳ���ϵ�����
    function getNum() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiatitle',
            success: function (ces) {
                var html = template('getIp', ces);
                $('#menu > .product > ul').html(html);
                getproduct();
                //getClick();
            }
        });
    }

    function getfirst() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
            data: {titleid: 0},
            success: function (ces) {
                var html = template('setIp', ces);
                $('#main > ul').html(html);
            }
        })
    }

    //�˵����ĵ����Ч��
    //function getOpen() {
    //    var isclick = false;
    //    $('#menu > .product > .open > p').on('click', function () {
    //        $('#menu > .search').slideToggle();
    //        if (isclick) {
    //            isclick = false;
    //            $(this).removeClass('glyphicon glyphicon-remove');
    //            $(this).addClass('glyphicon glyphicon-list');
    //        } else {
    //            isclick = true;
    //            $(this).removeClass('glyphicon glyphicon-list');
    //            $(this).addClass('glyphicon glyphicon-remove');
    //        }
    //    });
    //}

    var all={};
    var flag = false;
    //��ȡ��Ʒ��������
    function getproduct() {
        $("#menu >.product > ul > li> a").click(function () {
            var value = $('#menu > .product > ul > li > a');
            for (var i = 0; i < value.length; i++) {
                var va = $(this).attr('data_a');
                $.ajax({
                    url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
                    data: {titleid: va},
                    success: function (ces) {
                        all = ces;
                        the();
                    }
                })
                return;
            }
        })
    }

    function the() {
        var arr = {
            result:[]
        };
        //console.log(arr)
        var leng = 8;
        if( all.result.length <= 8){
            leng = all.result.length
        }
        for (var i = 0; i < leng; i++) {
            arr.result.push(all.result.shift());

        }
        var html = template('setIp', arr);
        $('#main > ul').append(html);
        flag = false;
        getlong()
    }



    //�󶨵���¼�
    //function getClick() {
    //    //����һ���������������յ�ǰ��λ��
    //    var currentX = 0;
    //    //��ʼ��λ��
    //    var startX = 0;
    //    var wp = document.getElementById("wp")
    //    //��ǰλ��
    //    var moveX = 0;
    //    //��������
    //    var distence = 0;
    //    //��������С����
    //    var movemin = 0;
    //    //�ж��Ƿ񻬶�
    //    var ismove = false;
    //    //    ��ȡli�Ŀ��
    //    var lis = document.querySelectorAll("#menu >.product > ul > li");
    //    var li = 0;
    //    for (var i = 0; i < lis.length; i++) {
    //        li += lis[i].offsetWidth;
    //    }
    //    wp.style.width = li + "px";
    //    var ulWidth = li;
    //    var product = document.getElementById("product")
    //    //��װ�����¼���
    //    var movemax = product.offsetWidth - ulWidth;
    //    //�ƶ��������롢
    //    var x = 100;
    //    var maxWidth = 0;
    //
    //    var minWidth = movemax - 100;
    //
    //    function setTransition() {
    //        //ʵ����ߵĻ���������¼�������
    //        //��ʼ��λ��
    //        wp.style.transition = 'all  0.2s';
    //    }
    //
    //    function removeTransition() {
    //        wp.style.transition = 'none';
    //    }
    //
    //    function setTranslate(y) {
    //        wp.style.transform = 'translateX(' + (y) + 'px)'
    //    }
    //
    //    wp.addEventListener('touchstart', function (event) {
    //        //    ��ȡ��ǰ��λ��
    //        startX = event.touches[0].pageX;
    //    })
    //
    //    //�ƶ��ľ���
    //    wp.addEventListener('touchmove', function (evnet) {
    //        ismove = true;
    //        moveX = event.touches[0].pageX;
    //        distence = moveX - startX;
    //        console.log("(distence + currentX)" + (distence + currentX));
    //        if ((distence + currentX) < maxWidth + x && (distence + currentX) > minWidth) {
    //            setTranslate(distence + currentX);
    //        }
    //        //    ��ȡ�ƶ����λ��
    //    })
    //    window.addEventListener('touchend', function (event) {
    //        currentX = distence + currentX;
    //        if ((distence + currentX) > maxWidth + x) {
    //            currentX = maxWidth;
    //            setTransition();
    //            setTranslate(maxWidth);
    //        } else if ((distence + currentX) < minWidth) {
    //            currentX = movemax;
    //            setTransition();
    //            setTranslate(movemax);
    //        } else {
    //            currentX = distence + currentX;
    //        }
    //        //��ʼ��λ��
    //        startX = 0;
    //        //��ǰλ��
    //        moveX = 0;
    //        //��������
    //        distence = 0;
    //        //��������С����
    //        movemin = 0;
    //        //�ж��Ƿ񻬶�
    //        ismove = false;
    //    })
    //}

    //�жϲ�ͣ�ļ���
    function getlong() {
        if( flag || all.result.length == 0){
            return;
        }
        window.onscroll = function () {
            var seeHeight = $(this).height();//�ɼ��߶�
            var contentHeight = document.body.scrollHeight;// ���ݸ߶�
            var haiTop = $(this).scrollTop();//�����߶�
            if ((contentHeight - seeHeight - haiTop) <= 50) {
                flag = true;
                the();
            }
        }
    }

})();

