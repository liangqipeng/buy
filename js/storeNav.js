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
    template.helper("getNum", getNum);
    $.get("http://139.199.157.195:9090/api/getsitenav", function (res) {
        var html = template("shop", res);
        $("#one").html(html);
    });
    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }
    //$('#update').on('click',function(){
    //    //window.location.reload();
    //    window.history.go(0)
    //})
    touchEvent.tap($('#update')[0],function(){
        window.location.reload(true);
    })
})
