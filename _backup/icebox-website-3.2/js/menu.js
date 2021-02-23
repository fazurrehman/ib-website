function initMenu() {
  $('#mobileNav').on('click', function (e) {
    e.preventDefault();
    $('#mobileNavClose').addClass('is-active');
    $('.hamburger-menu').addClass('is-active');
    $('.globalNav-mobile').addClass('is-active');
    $('.mobile-navbar').addClass('is-active');
    $('body').addClass('locked');
    // $("main").toggleClass("visible-no");
  });
  $('#mobileNavClose').on('click', function (e) {
    e.preventDefault();
    $('#mobileNavClose').removeClass('is-active');
    $('.hamburger-menu').removeClass('is-active');
    $('.globalNav-mobile').removeClass('is-active');
    $('.mobile-navbar').removeClass('is-active');
    $('body').removeClass('locked');
    // $("main").toggleClass("visible-no");
  });
  //trigger open the cart
  $('#js-ButtonCart').on('click', function (e) {
    e.preventDefault();
    $('.mini-cart').addClass('is-active');
    $('.mini-cart-wrapper').addClass('is-active');
  });
  $('#miniCartCloseTrigger').on('click', function (e) {
    e.preventDefault();
    $('.mini-cart').removeClass('is-active');
    $('.mini-cart-wrapper').removeClass('is-active');
  });

  $('#js-ButtonSearch').on('click', function (e) {
    e.preventDefault();
    $('.search-page').addClass('is-open');
    $('.search-wrapper').addClass('is-active');
  });
  $('#js-searchClosed').on('click', function (e) {
    e.preventDefault();
    $('.search-page').removeClass('is-open');
    $('.search-wrapper').removeClass('is-active');
  });

  $('.dropdown-hover .dropdown').mouseover(function () {
    $(this).addClass('show').attr('aria-expanded', 'true');
    $(this).find('.dropdown-menu').addClass('show');
  });

  $('.dropdown-hover .dropdown').mouseout(function () {
    $(this).removeClass('show').attr('aria-expanded', 'false');
    $(this).find('.dropdown-menu').removeClass('show');
  });

  $('.cd-nav-trigger').on('click', function (event) {
    $('.headersmall').toggleClass('nav-is-visible');
  });

  $('.cd-filter-trigger').on('click', function (e) {
    $('.circle-1').toggleClass('is-active');
    $('.circle-2').toggleClass('is-active');
    $('.line-1').toggleClass('is-active');
    $('.line-2').toggleClass('is-active');
    $(
      '.productline .pheader__wrapper-action-filter .cd-filter-trigger label'
    ).toggleClass('is-active');
    $('#filter_wrapper').toggleClass('is-active');
    $('.results--filter').toggleClass('filter-is-visible');
    if (device == 'mobile') {
      $('#filter_overlay').toggleClass('is-filter-active');
    }
  });
  $('#filter_overlay').on('click', function (e) {
    $('.cd-filter-trigger').click();
  });
}


