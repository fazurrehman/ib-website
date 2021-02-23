/*=============================================
=            Result Page             =
=============================================*/
// filter button
function initMobileFilterTrigger() {
  $('#mobile-filter-trigger').on('click', function (event) {
    event.preventDefault();
    $('.filter-mobile-wraper').toggleClass('is-active');
    $('.filter-mobile').toggleClass('is-active');
    $('.filter-close').toggleClass('is-active');
    $('.circle-1').toggleClass('is-active');
    $('.circle-2').toggleClass('is-active');
    $('.line-1').toggleClass('is-active');
    $('.line-2').toggleClass('is-active');
  });

  // filter close
  $('#filter-close-trigger').on('click', function (event) {
    $('.filter-mobile-wraper').removeClass('is-active');
    $('.filter-mobile').removeClass('is-active');
    $('.filter-close').removeClass('is-active');
  });
}

/*=============================================
=            Product Page             =
=============================================*/
// diamond select
function initializeDiamondSelectOption() {
  $('.js-diamondQuality, .js-lengthSelect, .js-selectOption').click(
    function () {
      $(this).addClass('active').siblings().removeClass('active');
    }
  );
}

// add to cart
function addSpinner(el, static_pos) {
  var spinner = el.children('.spinner');
  if (spinner.length && !spinner.hasClass('spinner-remove')) return null;
  !spinner.length &&
    (spinner = $(
      '<div class="spinner' + (static_pos ? '' : ' spinner-absolute') + '"/>'
    ).appendTo(el));
  animateSpinner(spinner, 'add');
}

function removeSpinner(el, complete) {
  var spinner = el.children('.spinner');
  spinner.length && animateSpinner(spinner, 'remove', complete);
}

function animateSpinner(el, animation, complete) {
  if (el.data('animating')) {
    el.removeClass(el.data('animating')).data('animating', null);
    el.data('animationTimeout') && clearTimeout(el.data('animationTimeout'));
  }
  el.addClass('spinner-' + animation).data('animating', 'spinner-' + animation);
  el.data(
    'animationTimeout',
    setTimeout(function () {
      animation == 'remove' && el.remove();
      complete && complete();
    }, parseFloat(el.css('animation-duration')) * 1000)
  );
}
function loadAjax() {
  $.ajax({
    url: 'https://reqres.in/api/?delay=2',
    beforeSend: function () {
      $('#ajax-button').attr('disabled', true);
      $('#ajax-button').css('pointer-events', 'none');
      $('#js-cartBtn-animated').css('padding-right', '32px');

      addSpinner($('#ajax-cardBtn-loading'));
    },
    complete: function (response) {
      $('#ajax-button').attr('disabled', false);
      $('#ajax-button').css('pointer-events', 'all');
      $('#js-cartBtn-animated').css('padding-right', 0);
      removeSpinner($('#ajax-cardBtn-loading'), function () {
        $('#ajax-cardBtn-loading').html('');
      });
    },
  });
}

function initializeCarouselReview() {
  $('#js-productCustomerReviews').owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    lazyLoad: true,
    navText: [
      '<svg width="24px" height="24px" viewBox="0 0 12 21"><path fill="#101E5A" d="M11.904898 2.714694l-8.190204 8.190204 8.190204 8.190204-1.809796 1.809796-10-10 10-10z" fill-rule="evenodd"/></svg>',
      '<svg width="24px" height="24px"  viewBox="0 0 12 21"><path fill="#101E5A" d="M.095102 2.714694l8.190204 8.190204-8.190204 8.190204 1.809796 1.809796 10-10-10-10z" fill-rule="evenodd"/></svg>' /* icons from https://iconmonstr.com */,
    ],
    responsive: {
      0: {
        items: 1.2,
        nav: true,
      },
      768: {
        items: 2,
        nav: false,
      },
    },
  });
}

function initializeCarouselRecommendation() {
  $('#js-RecommendationSlider').owlCarousel({
    loop: true,
    margin: 4,
    dots: false,
    nav: false,
    lazyLoad: true,
    navText: [
      '<svg width="24px" height="24px" viewBox="0 0 12 21"><path fill="#101E5A" d="M11.904898 2.714694l-8.190204 8.190204 8.190204 8.190204-1.809796 1.809796-10-10 10-10z" fill-rule="evenodd"/></svg>',
      '<svg width="24px" height="24px"  viewBox="0 0 12 21"><path fill="#101E5A" d="M.095102 2.714694l8.190204 8.190204-8.190204 8.190204 1.809796 1.809796 10-10-10-10z" fill-rule="evenodd"/></svg>' /* icons from https://iconmonstr.com */,
    ],
    responsive: {
      0: {
        items: 2.2,
      },
      720: {
        items: 4.1,
      },
      960: {
        items: 2.1,
      },
      1400: {
        items: 2.6,
      },
    },
  });
}

function initializeSuggestionProducts() {
  $('#product-wrapper').owlCarousel({
    loop: true,
    margin: 8,
    dots: false,
    nav: true,
    lazyLoad: true,
    navText: [
      '<svg width="24px" height="24px" viewBox="0 0 12 21"><path fill="#101E5A" d="M11.904898 2.714694l-8.190204 8.190204 8.190204 8.190204-1.809796 1.809796-10-10 10-10z" fill-rule="evenodd"/></svg>',
      '<svg width="24px" height="24px"  viewBox="0 0 12 21"><path fill="#101E5A" d="M.095102 2.714694l8.190204 8.190204-8.190204 8.190204 1.809796 1.809796 10-10-10-10z" fill-rule="evenodd"/></svg>' /* icons from https://iconmonstr.com */,
    ],
    responsive: {
      0: {
        items: 2.1,
        nav: true,
      },
      768: {
        items: 3,
        nav: false,
      },
      992: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
  });
}

// ask question popup
function initialAskQuestionModal() {
  $('#jsProductPageAskQuestionTrigger').click(function () {
    $('#productPageAskQuestion').modal('show');
  });
}

// sidebar faq
function initialSidebarFaq() {
  $('#jsSlidebarContentTrigger').on('click', function (e) {
    e.preventDefault();
    $('#jsSidebarContent').addClass('is-active');
    $('#jsSidebarContentContainer').addClass('is-active');
    e.stopPropagation();
  });
  $('#sidebarCloseTrigger').on('click', function (e) {
    e.preventDefault();
    $('#jsSidebarContent').removeClass('is-active');
    $('#jsSidebarContentContainer').removeClass('is-active');
  });
}

// sidebar diamondquality
function initialSidebarDiamondQuality() {
  $('#jsSlidebarDiamondQualityTrigger').on('click', function (e) {
    e.preventDefault();
    $('#sidebarDiamond').addClass('is-active');
    $('#sidebarDiamondContainer').addClass('is-active');
    e.stopPropagation();
  });
  $('#sidebarCloseTrigger2').on('click', function (e) {
    e.preventDefault();
    $('#sidebarDiamond').removeClass('is-active');
    $('#sidebarDiamondContainer').removeClass('is-active');
  });
}

// productbar
function initalizeProductBottomBar() {
  $('body').css('height', 'auto');
  $(window).scroll(function () {
    if ($(document).scrollTop() > 500) {
      $('.productBottomBarWrapper').addClass('show');
    } else {
      $('.productBottomBarWrapper').removeClass('show');
    }
  });
}


$(document).ready(function () {
  initMobileFilterTrigger();
  initializeCarouselReview();
  initializeCarouselRecommendation();
  initializeSuggestionProducts();
  initializeDiamondSelectOption();
  initialAskQuestionModal();
  initalizeProductBottomBar();
  // initNewsletterWelcome();

  // sidebars
  initialSidebarFaq();
  initialSidebarDiamondQuality();
});
