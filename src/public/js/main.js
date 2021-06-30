(function ($) {
  // meanmenu
  $('#mobile-menu').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: '992'
  });

  // One Page Nav
  let topOffset = $('.header-area').height() - 10;
  $('.main-menu nav ul').onePageNav({
    currentClass: 'active',
    scrollOffset: topOffset
  });

  // data - background
  $('[data-background]').each(function () {
    $(this).css('background-image', `url(${$(this).attr('data-background')})`);
  });

  // mainSlider
  function mainSlider() {
    let BasicSlider = $('.slider-active');

    function doAnimations(elements) {
      let animationEndEvents =
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

      elements.each(function () {
        let $this = $(this);
        let $animationDelay = $this.data('delay');
        let $animationType = `animated ${$this.data('animation')}`;

        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });

        $this.addClass($animationType).one(animationEndEvents, () => {
          $this.removeClass($animationType);
        });
      });
    };

    BasicSlider.on('init', (e, slick) => {
      let $firstAnimatingElements = $('.single-slider:first-child').find(
        '[data-animation]'
      );

      doAnimations($firstAnimatingElements);
    });

    BasicSlider.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
      let $animatingElements = $(
        `.single-slider[data-slick-index="${nextSlide}"]`
      ).find('[data-animation]');

      doAnimations($animatingElements);
    });

    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: false,
      fade: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="icofont-swoosh-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="icofont-swoosh-right"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    });
  };

  mainSlider();

  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // isotop
  $('.row-portfolio').imagesLoaded(() => {
    let $grid = $('.row-portfolio').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $('.portfolio-filter').on('click', 'button', function () {
      let filterValue = $(this).attr('data-filter');

      $grid.isotope({
        filter: filterValue
      });
    });
  });

  //for menu active class
  $('.portfolio-filter button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active');

    $(this).addClass('active');

    event.preventDefault();
  });

  // isotop
  $('.gallery-portfolio').imagesLoaded(() => {
    let $grid = $('.gallery-portfolio').isotope({
      itemSelector: '.grid-gallery',
      percentPosition: true
    });

    $('.gallery-filter').on('click', 'button', function () {
      let filterValue = $(this).attr('data-filter');

      $grid.isotope({
        filter: filterValue
      });
    });

    $('.gallery-filter button').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');

      $(this).addClass('active');

      event.preventDefault();
    });
  });

  // counterUP
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  // testimonials-active
  $('.testimonials-activation').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // scrollToTop
  $.scrollUp({
    scrollName: 'scrollUp',
    topDistance: '300',
    topSpeed: 300,
    animation: 'fade',
    animationInSpeed: 200,
    animationOutSpeed: 200,
    scrollText: '<i class="icofont-swoosh-up"></i>',
    activeOverlay: false
  });

  // nice-slector
  $(document).ready(() => {
    $('select').niceSelect();
  });

  // WOW active
  new WOW().init();
})(jQuery);
