// diamond select
function diamondSelect() {
  $('.diamond .diamond__choose li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
}

function productsModal() {
  $('#product-modal').owlCarousel({
    loop: true,
    margin: 8,
    dots: false,
    nav: false,
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

function initProductPage() {
  globalComponentsInit();
  accordionObj.init({
    speed: 300,
    oneOpen: true,
  });
  diamondSelect();
  productsModal();
}

$('.product--card').on('click', function () {
  $('.product-info--wrapper').addClass('active--options');
  $('.product-info--close').addClass('active--options');
});

$('.product-info--close').click(function () {
  $('.product--card .product-info--wrapper').removeClass('active--options');
});

$(document).ready(function () {
  initProductPage();
});
