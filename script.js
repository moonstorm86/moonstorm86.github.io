$(document).ready(function() {

    const mq = window.matchMedia("(min-width: 991px)");
    const funFacts = [
        "I love to cook.",
        "I built a mini bike out of a lawn mower engine when I was 12.",
        "I love hacking IOT products.",
        "I love techno.",
        "I am learning how to use analog synthesizers to make drone music.",
        "I'm a love horror movies.",
        "I lived in Nepal for four months.",
        "I lived in Europe for three years.",
        "I hiked to Mt. Everest Base Camp.",
        "I hitchhiked in Morocco, Czech Republic and Upstate New York.",
        "I was detained at the border of Turkey and Bulgaria on suspicion of having a stolen passport. It was my passport; I was just very tan.",
        "I practice yoga 4-6 days a week."
    ];

    var randomFactIndex = Math.floor(Math.random() * funFacts.length);
    $('#preloader-title').text("Chris's Fun Fact #" + (randomFactIndex + 1));
    $('#preloader-content').html(funFacts[randomFactIndex]);

    $(window).on("load", function() {
        preloaderFadeOutTime = 500;
        var preloader = $('.spinner-wrapper');
        preloader.animate({
            up: '40px',
            opacity: 0
        }, preloaderFadeOutTime);
        preloader.css("visibility", "hidden");
        // fadeOut(preloaderFadeOutTime);
        AOS.init();
    });

    $(".highlight-link").each(function() {
        if ($(this).isOnScreenHighlight()) {
            $(this).addClass('shown');
        } else {
            $(this).removeClass('shown');
        }
    });

    var jumboHeight = $('.jumbotron').outerHeight();

    $(window).scroll(function() {

        $(".scroll-disappear").css("opacity", 1 - $(window).scrollTop() / 500);
        $(".arrow").css("opacity", 1 - $(window).scrollTop() / 20);

        $(".highlight").each(function() {
            if ($(this).isOnScreenHighlight()) {
                $(this).addClass('shown');
            } else {
                $(this).removeClass('shown');
            }
        });

        $(".highlight-link").each(function() {
            if ($(this).isOnScreenHighlight()) {
                $(this).css("animation-delay", "0s");
                $(this).addClass('shown');
            } else {
                $(this).removeClass('shown');
            }
        });
    });

    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 160
    });

    localStorage
    $('#template-to-top').hide();
    $(".bs-docs-sidebar").hide();

    function checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    var allLargeImgs = document.getElementsByClassName('full-screen-img');

    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('#template-to-top').fadeIn();
        } else {
            $('#template-to-top').fadeOut();
        }

        if ($(this).scrollTop() > 600) {

            var hasLargeImg = false;

            Array.prototype.forEach.call(allLargeImgs, function(el) {
                // console.log(el);
                if (checkVisible(el)) {
                    hasLargeImg = true;
                }
            });

            if (hasLargeImg) {
                $(".bs-docs-sidebar").fadeOut('slow');
            } else {
                $(".bs-docs-sidebar").fadeIn('slow');
            }
        } else {
            $(".bs-docs-sidebar").fadeOut("slow");
        }


    });

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 700, 'swing', function() {
            window.location.hash = target;
        });
    });

    //Click event to scroll to top
    $('#template-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // $('.').addClass('load');

    $(".p-center-wrapper button[data-toggle='collapse']").click(function() {
        $(this).text(function(i, old) {
            var newString = "";
            if (old.startsWith("See")) {
                newString = old.replace("See", "Hide");
            } else if (old.startsWith("Hide")) {
                newString = old.replace("Hide", "See");
            } else {
                newString = old;
            }
            return newString;
        });
    })
});

$.fn.isOnScreenHighlight = function() {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.bottom || viewport.top > bounds.bottom));

};