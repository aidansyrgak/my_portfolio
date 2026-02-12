(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // WOW disabled to prevent scroll jitter
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 50,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    // Portfolio filter
    var $portfolioContainer = $('.portfolio-container');
    var portfolioIsotope = $portfolioContainer.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    var layoutPortfolio = function () {
        if (portfolioIsotope) {
            portfolioIsotope.isotope('layout');
        }
    };

    var bindPortfolioImages = function () {
        var $images = $portfolioContainer.find('img');
        if ($images.length === 0) {
            layoutPortfolio();
            return;
        }

        var remaining = $images.length;
        $images.each(function () {
            if (this.complete) {
                remaining -= 1;
                if (remaining === 0) {
                    layoutPortfolio();
                }
                return;
            }

            $(this).one('load error', function () {
                remaining -= 1;
                if (remaining === 0) {
                    layoutPortfolio();
                }
            });
        });
    };

    var ensurePortfolioVisible = function () {
        $portfolioContainer.find('.portfolio-item').css('visibility', 'visible');
    };

    bindPortfolioImages();
    ensurePortfolioVisible();

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
        ensurePortfolioVisible();
        setTimeout(layoutPortfolio, 0);
    });



    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('.collapse.show').collapse('hide');
    });

    $(document).on('click', '.modal-media-btn', function () {
        var $track = $(this).closest('.modal-media').find('.modal-media-track');
        var direction = $(this).hasClass('modal-media-prev') ? -1 : 1;
        var scrollAmount = $track.outerWidth();

        $track.stop().animate({
            scrollLeft: $track.scrollLeft() + (direction * scrollAmount)
        }, 250);
    });

    var updateModalDots = function ($track) {
        var $dots = $track.closest('.modal-media').find('.modal-media-dot');
        var slideWidth = $track.outerWidth();
        var index = slideWidth ? Math.round($track.scrollLeft() / slideWidth) : 0;

        $dots.removeClass('is-active').eq(index).addClass('is-active');
    };

    $('.modal-media').each(function () {
        var $media = $(this);
        var $track = $media.find('.modal-media-track');
        var $slides = $track.find('.modal-media-slide');
        var $dots = $media.find('.modal-media-dots');

        $dots.empty();
        $slides.each(function (idx) {
            var $dot = $('<button type="button" class="modal-media-dot" aria-label="Go to image ' + (idx + 1) + '"></button>');
            $dot.on('click', function () {
                var slideWidth = $track.outerWidth();
                $track.stop().animate({scrollLeft: idx * slideWidth}, 250);
            });
            $dots.append($dot);
        });

        updateModalDots($track);
        $track.on('scroll', function () {
            updateModalDots($track);
        });
    });

    
})(jQuery);

