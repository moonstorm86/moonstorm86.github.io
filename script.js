$(document).ready(function() {

    const mq = window.matchMedia("(min-width: 991px)");
    const funFacts = [
        "I have an insatiable desire to learn new things.",
        "I am an excellent cook.",
        "I built a mini bike out of a lawn mower engine when I was 12.",
        "I love hacking IOT products.",
        "I love abstract thinking.",
        "I love techno.",
        "I am learning how to use analog synthesizers to make drone music.",
        "I'm a huge fan of horror movies.",
        "I lived in Nepal for four months.",
        "I lived in Europe for three years",
        "I hiked to Mt. Everest Base Camp.",
        "I hitchhiked in Morocco, Czech Republic and Upstate New York.",
        "I was detained at the border of Turkey and Bulgaria on suspicion of having a stolen passport.",
        "I am interested in Buddhism.",
        "I practice yoga 4-6 days a week."
    ];

    var randomFactIndex = Math.floor(Math.random() * funFacts.length);
    $('#preloader-title').text("Chris's Fun Fact #" + (randomFactIndex + 1));
    $('#preloader-content').html(funFacts[randomFactIndex]);

    // $('#template-to-top').setAttribute("data-aos","fade-up");
    // $('#template-to-top').setAttribute("data-aos-duration","600");


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
            // $('#template-to-top').attr("data-aos","fade-up");
            // $('#template-to-top').attr("data-aos-duration","600");



            // data-aos="fade-up" data-aos-duration="600"
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

        // if (checkVisible(testPic)) {
        //   $(".bs-docs-sidebar").fadeOut("slow");
        // } else {
        //   $(".bs-docs-sidebar").fadeIn('slow');
        // }


        // if (mq.matches) {
        //   if (window.location.pathname === '/html/home.html'){
        //     console.log('yes');
        //     if ($(this).scrollTop() > ($(window).height()*0.87-65)) {
        //       $('.navbar-nav-white').removeClass('navbar-nav-white');
        //       $('.navbar-brand-white').removeClass('navbar-brand-white');
        //       $('.hvr-underline-from-left-white').removeClass('hvr-underline-from-left-white');
        //     } else {
        //       $('.navbar-nav').addClass('navbar-nav-white');
        //       $('.navbar-brand').addClass('navbar-brand-white');
        //       $('.hvr-underline-from-left').addClass('hvr-underline-from-left-white');
        //     }
        //   }
        // }
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

    // var fix = parseInt($(".navbar").css("height"));
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