/**
 * Created by RedSpite on 2016/9/12.
 */

$(function() {
    var errors = ' <!--[if lte IE 9]> '
        +'  <script type="text/javascript">'
        +'      window.location = "http://www.xiaoyuezhang.com/error.html"'
        +'  </script>'
        +'<![endif]-->';
    $("head").append(errors);
    $(".code li.up,.code li.ttb").show();
    $("#choose li").click(function() {
        var cla = $(this).attr("class");
        $("#text").attr("class", cla);
        $(this).addClass("current").siblings().removeClass("current");
        $(".code").find("." + cla).stop().slideDown().siblings().stop().slideUp()
    });

    $(".title").each(function () {
        var text = $(this).attr("text");
        var title = $(this).attr("title");
        title = text;
    })
});

$(function() {
    var options = {};
    $('.codebox').syntaxy(options);

    showScroll();
    $("#top").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
    var min_height = document.documentElement.clientHeight /2;
    function showScroll() {
        $(window).scroll(function() {
            var s = $(window).scrollTop();
            s > min_height ? $('#top').fadeIn() : $('#top').fadeOut();
            //console.log(s,min_height);
        });
    }
});