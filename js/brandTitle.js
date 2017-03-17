/**
 * Created by Gillbert on 2017/2/14.
 */

$(function(){
    getBrandTitle();



    function getBrandTitle() {
        $.get("http://139.199.157.195:9090/api/getbrandtitle",function(res){
            var html = template("getBrandTitle",res);
            $(".rank_detail").html(html);
        })
    }
});


