$(function () {
    var touchEvent= {

        /*单次触摸事件*/
        tap: function (element, fn) {
            var startTx, startTy;
            element.addEventListener('touchstart', function (e) {
                var touches = e.touches[0];
                startTx = touches.clientX;
                startTy = touches.clientY;
            }, false);

            element.addEventListener('touchend', function (e) {
                var touches = e.changedTouches[0],
                    endTx = touches.clientX,
                    endTy = touches.clientY;
                // 在部分设备上 touch 事件比较灵敏，导致按下和松开手指时的事件坐标会出现一点点变化
                if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
                    fn();
                }
            }, false);
        }
    }

    touchEvent.tap($('#close')[0],function(){
        $('#close').parent('footer').remove();
    })
    touchEvent.tap($('.area')[0],function(){
        $('.area').html('');
    })
    touchEvent.tap($('#search_price')[0],function(){
        $('#search_price').val('查询中...').addClass('running');
        alert("请通过天猫，京东等APP分享商品链接到输入框。");
        window.location.reload();
    })

})