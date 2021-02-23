// we buy pages reviews carousel
$('#buyer-review').owlCarousel({
  loop: true,
  autoplay: true,
  margin: 24,
  dots: false,
  nav: false,
  lazyLoad: true,
  responsive: {
    0: {
      items: 1.2,
    },
    800: {
      items: 2.1,
    },
    1080: {
      items: 3.1,
    },
  },
});
