$(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {

        
        console.log('After 100')
    } else {
        console.log('Before 100')
    }

}).scroll();​