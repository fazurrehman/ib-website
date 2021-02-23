var currentIndex = 0;
var getUrl = window.location;
var baseUrl =
  getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1];
var websiteUrl = getUrl.protocol + '//' + getUrl.host;
var normalizedHeight = 0;
var use_imgs_tags = false;
var mainSlides = {};
var thumbSlides = {};
var videoPlaying = false;
var player;
var ytloadedLink = '';
var slider;

function getSlidesArray() {
  var all = [];
  var colors = [];

  $('#lightSlider > li').each(function (index, obj) {
    //all.push($(obj).html());
    if ($.inArray($(obj).attr('data-color'), colors) == -1) {
      colors.push($(obj).attr('data-color'));
    }
  });

  $.each(colors, function (index, color_name) {
    var tmp = [];
    //console.log('current color + ' + color_name);
    $('#lightSlider > li').each(function (index, obj) {
      //console.log(obj);
      if ($(obj).attr('data-color') == color_name) {
        tmp.push($(obj).get(0).outerHTML);
        //console.log($(obj).get(0).outerHTML);
      }
    });
    mainSlides[color_name] = tmp;
  });
  initSlider();
}

/*function filterSlides(color){
  var found = false;

  $('#lightSlider > li').each(function(index,obj){
      if($(obj).attr('data-color') == color && !found){
        //console.log('go to slider => ' + index);
          slider.goToSlide(index);
          found = true;
      }
  });
}*/
function filterSlides(color) {
  currentIndex = 0;
  if (color == 'Steel') {
    $('.color-selected').text(color);
  } else {
    $('.color-selected').text(color + ' Gold');
  }

  if (mainSlides[color] === undefined) {
    color = 'all';
    //console.log('cannot find color images');
  }
  var newMainSlides = mainSlides[color];
  //var newThumbSlides = thumbSlides[color];
  if (newMainSlides.length) {
    //console.log(newMainSlides);
    $('.lSSlideOuter').remove();
    var html = '<ul id="lightSlider">';

    $.each(newMainSlides, function (index) {
      html += newMainSlides[index];
    });
    html += '</ul>';
    $('#slider_container').prepend(html);

    resetSlider();
  } else {
    //console.log('no color slides')
  }
}

function resetSlider() {
  //slider.refresh();
  slider.destroy();
  if (device == 'desktop') {
    slider = $('#lightSlider').lightSlider({
      verticalHeight: 600,
      gallery: true,
      autoWidth: false,
      item: 1,
      galleryMargin: 0,
      currentPagerPosition: 'left',
      vertical: true,
      vThumbWidth: 100,
      adaptiveHeight: false,
      thumbItem: 6,
      thumbMargin: 0,
      slideMargin: 0,
      controls: true,
      onSliderLoad: function (e) {
        $('.lSPager').wrapAll('<div class="lSPager-wrapper"></div>');
        $('.lSGallery').css('position', 'relative !important');
        $('#lightSlider').css('opacity', 1);
      },
    });
  } else {
    slider = $('#lightSlider').lightSlider({
      gallery: true,
      autoWidth: false,
      item: 1,
      vertical: false,
      slideMargin: 0,
      controls: true,
      thumbItem: 4,
      onSliderLoad: function (e) {
        $('#lightSlider').css('opacity', 1);
      },
    });
  }
}
function initSlider() {
  if (device == 'desktop') {
    slider = $('#lightSlider').lightSlider({
      verticalHeight: 600,
      gallery: true,
      autoWidth: false,
      item: 1,
      galleryMargin: 0,
      currentPagerPosition: 'left',
      vertical: true,
      vThumbWidth: 100,
      adaptiveHeight: false,
      thumbItem: 6,
      thumbMargin: 0,
      slideMargin: 0,
      controls: true,
      onSliderLoad: function (el) {
        copyAttributes();
      },
    });
  } else {
    slider = $('#lightSlider').lightSlider({
      gallery: true,
      autoWidth: false,
      item: 1,
      vertical: false,
      slideMargin: 0,
      controls: true,
      thumbItem: 4,
    });
  }
}
$(document).ready(function () {
  //$('#lightSlider').css('opacity',0);
  getSlidesArray();
});
function copyAttributes() {
  $('#lightSlider > li').each(function (index, obj) {
    var color_attr = $(obj).attr('data-color');
    $('.lSPager li:nth-child(' + index + ')').attr('data-color', color_attr);
    $('.lSPager li:nth-child(' + index + ')')
      .find('img')
      .addClass('lazyload');
  });
}
