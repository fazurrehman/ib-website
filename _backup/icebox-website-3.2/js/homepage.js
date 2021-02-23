// js-storyCarousel
function initializeStoryCarousel() {
  $('#js-storyCarousel')
    .on(
      'initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel',
      function (event) {
        var carousel = event.relatedTarget,
          element = event.target,
          current = carousel.current();
        $('.owl-prev', element).toggleClass(
          'disabled',
          current === carousel.maximum()
        );
        $('.owl-next', element).toggleClass(
          'disabled',
          current === carousel.minimum()
        );
      }
    )
    .owlCarousel({
      dots: false,
      navText: [
        '<span aria-label="Previous"><svg class="svgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 9 14"><path fill-rule="evenodd" d="M2.591 7l5.47-5.47L7 .47.47 7 7 13.53l1.06-1.06L2.592 7z" clip-rule="evenodd"></path></svg></span>',
        '<span aria-label="Next"><svg class="svgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 9 14"><path fill-rule="evenodd" d="M5.94 7L.47 1.53 1.53.47 8.06 7l-6.53 6.53-1.06-1.06L5.94 7z" clip-rule="evenodd"></path></svg></span>',
      ],
      responsive: {
        0: {
          margin: 12,
          items: 4.2,
          nav: false,
        },
        720: {
          items: 2.8,
          slideBy: 2,
          margin: 12,
        },
        1024: {
          items: 3.8,
          slideBy: 3,
          margin: 12,
          nav: true,
        },
        1200: {
          items: 5.1,
          slideBy: 2,
          margin: 12,
          nav: true,
        },
        1400: {
          items: 6.2,
          slideBy: 2,
          margin: 12,
          nav: true,
        },
      },
    });
}

function initializeHomepageProductSliders() {
  $(
    '#js-products-1, #js-products-2, #js-products-3, #js-products-4, #js-products-5, #js-products-6'
  )
    .on(
      'initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel',
      function (event) {
        var carousel = event.relatedTarget,
          element = event.target,
          current = carousel.current();
        $('.owl-prev', element).toggleClass(
          'disabled',
          current === carousel.maximum()
        );
        $('.owl-next', element).toggleClass(
          'disabled',
          current === carousel.minimum()
        );
      }
    )
    .owlCarousel({
      dots: false,
      loop: true,
      navText: [
        '<span aria-label="Previous"><svg class="svgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 9 14"><path fill-rule="evenodd" d="M2.591 7l5.47-5.47L7 .47.47 7 7 13.53l1.06-1.06L2.592 7z" clip-rule="evenodd"></path></svg></span>',
        '<span aria-label="Next"><svg class="svgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 9 14"><path fill-rule="evenodd" d="M5.94 7L.47 1.53 1.53.47 8.06 7l-6.53 6.53-1.06-1.06L5.94 7z" clip-rule="evenodd"></path></svg></span>',
      ],
      responsive: {
        0: {
          margin: 12,
          items: 2.1,
          nav: false,
        },
        520: {
          items: 2.8,
          slideBy: 2,
          margin: 12,
        },
        720: {
          items: 3.8,
          slideBy: 3,
          margin: 12,
          nav: true,
        },
        1080: {
          items: 4.2,
          slideBy: 2,
          margin: 12,
          nav: true,
        },
        1400: {
          items: 4.2,
          slideBy: 2,
          margin: 12,
          nav: true,
        },
      },
    });
}

function stopCarousel() {
  var owl = $('.owl-carousel-products');
  owl.trigger('destroy.owl.carousel');
  owl.addClass('off');
}

function initializeHomepageCelebritySlider() {
  $('#celebrites').owlCarousel({
    loop: true,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 12000,
    smartSpeed: 600,
    touchDrag: false,
    mouseDrag: false,
    margin: 16,
    dots: false,
    nav: false,
    lazyLoad: true,
    navText: [
      '<svg width="24px" height="24px" viewBox="0 0 12 21"><path fill="#ffffff" d="M11.904898 2.714694l-8.190204 8.190204 8.190204 8.190204-1.809796 1.809796-10-10 10-10z" fill-rule="evenodd"/></svg>',
      '<svg width="24px" height="24px"  viewBox="0 0 12 21"><path fill="#ffffff" d="M.095102 2.714694l8.190204 8.190204-8.190204 8.190204 1.809796 1.809796 10-10-10-10z" fill-rule="evenodd"/></svg>' /* icons from https://iconmonstr.com */,
    ],
    responsive: {
      0: {
        items: 3.1,
        nav: true,
        margin: 16,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 6,
        nav: true,
        loop: false,
      },
      1600: {
        items: 8,
        nav: true,
        loop: false,
      },
    },
  });
}

function initHomepage() {
  globalComponentsInit();
  accordionObj.init({
    speed: 300,
    oneOpen: true,
  });
  initializePromotionBanners();
  initializeStoryCarousel();
  // initializeHomepageProductSliders();
  initializeHomepageCelebritySlider();
}


$(document).ready(function() {
  if ( $(window).width() >= 1024 ) {
    initializeHomepageProductSliders();
  } else {
    $('.owl-carousel-products').addClass('off');
  }
});

$(window).resize(function() {
    if ( $(window).width() >= 1024 ) {
      initializeHomepageProductSliders();
    } else {
      stopCarousel();
    }
});