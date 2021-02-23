var getUrl = window.location;
var baseUrl =
  getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1];
var websiteUrl = getUrl.protocol + '//' + getUrl.host;
console.log(baseUrl);
function removeBlogComment(id) {
  $.ajax({
    url: websiteUrl + '/json/remove-comment/' + id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#comment_box_' + id).remove();
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function removeBlogReplyComment(id, reply_key) {
  $.ajax({
    url: websiteUrl + '/json/remove-reply-comment/' + id + '/' + reply_key,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#reply_box_' + id + '_' + reply_key).remove();
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}

function publishBlogComment(id) {
  $.ajax({
    url: websiteUrl + '/json/publish-comment/' + id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#publish_btn_' + id).hide();
        $('#unpublish_btn_' + id).show();
        $('#publish_badge_' + id).remove();
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function unpublishBlogComment(id) {
  $.ajax({
    url: websiteUrl + '/json/unpublish-comment/' + id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#unpublish_btn_' + id).hide();
        $('#publish_btn_' + id).show();
        $('#comment_box_' + id).prepend(
          '<span class="badge badge-warning" id="publish_badge_' +
            id +
            '" style="margin-bottom:10px;">NOT PUBLISHED</span>'
        );
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function likeComment(comment_id) {
  $.ajax({
    url: websiteUrl + '/json/like-comment',
    type: 'POST',
    data: { id: comment_id },
    success: function (data) {
      var result = $.parseJSON(data);
      if (result.error) {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      } else {
        $('#comment_likes_' + comment_id).html(result.likes);
      }
    },
  });
}

function likeReplyComment(comment_id, reply_key) {
  $.ajax({
    url: websiteUrl + '/json/like-reply-comment',
    type: 'POST',
    data: { id: comment_id, key: reply_key },
    success: function (data) {
      var result = $.parseJSON(data);
      if (result.error) {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      } else {
        $('#reply_likes_' + comment_id + '_' + reply_key).html(result.likes);
      }
    },
  });
}
function submitComment(blog_id) {
  var comment_text = $('#new_comment_text').val();
  if (comment_text != '') {
    $.ajax({
      url: websiteUrl + '/json/blog-comment',
      type: 'POST',
      data: { id: blog_id, comment: comment_text },
      success: function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
          $('#error_modal_msg').html(result.msg);
          $('#error_modal').modal('show');
        } else {
          $('#blog_comments > div:last').before(result.html);
          $('#new_comment_text' + blog_id).val('');
        }
      },
    });
  }
}
function submitReplyComment(comment_id) {
  var comment = $('#new_reply_text_' + comment_id).val();
  if (comment != '') {
    $.ajax({
      url: websiteUrl + '/json/reply-blog-comment',
      type: 'POST',
      data: { id: comment_id, reply: comment },
      success: function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
          $('#error_modal_msg').html(result.msg);
          $('#error_modal').modal('show');
        } else {
          $('#replies_comments_' + comment_id).append(result.html);
          $('#new_reply_text_' + comment_id).val('');
        }
      },
    });
  }
}

function submitReview(id) {
  var product_id = id;
  var review = $('#review_textarea').val();
  if (review != '') {
    $.ajax({
      url: websiteUrl + '/json/submit-product-review',
      type: 'POST',
      data: { id: product_id, comment: review },
      success: function (data) {
        var result = $.parseJSON(data);
        $('#review_textarea').val('');
        if (!result.error) {
          $('#success_modal_msg').text(
            'Thank you, Your comment has been submitted, it wil be published as soon as the admin review it.'
          );
          $('#success_modal').modal('show');
        } else {
          $('#error_modal_msg').text(result.msg);
          $('#error_modal').modal('show');
        }
      },
    });
  } else {
    toastr.error('Please write your review first !');
  }
}

function publishReview(id) {
  $.ajax({
    url: websiteUrl + '/json/publish-product-review/' + id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#publish_btn_' + id).hide();
        $('#unpublish_btn_' + id).show();
        $('#publish_badge_' + id).remove();
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function unpublishReview(id) {
  $.ajax({
    url: websiteUrl + '/json/unpublish-product-review/' + id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#unpublish_btn_' + id).hide();
        $('#publish_btn_' + id).show();
        $('#comment_box_' + id).prepend(
          '<span class="badge badge-warning" id="publish_badge_' +
            id +
            '" style="margin-bottom:10px;">NOT PUBLISHED</span>'
        );
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function likeReview(comment_id) {
  $.ajax({
    url: websiteUrl + '/json/like-product-review',
    type: 'POST',
    data: { id: comment_id },
    success: function (data) {
      var result = $.parseJSON(data);
      if (result.error) {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      } else {
        $('#comment_likes_' + comment_id).html(result.likes);
      }
    },
  });
}
function likeReviewComment(comment_id, reply_key) {
  $.ajax({
    url: websiteUrl + '/json/like-product-review-reply',
    type: 'POST',
    data: { id: comment_id, key: reply_key },
    success: function (data) {
      var result = $.parseJSON(data);
      if (result.error) {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      } else {
        $('#reply_likes_' + comment_id + '_' + reply_key).html(result.likes);
      }
    },
  });
}
function removeReviewReplyComment(id, reply_key) {
  $.ajax({
    url:
      websiteUrl + '/json/remove-product-review-reply/' + id + '/' + reply_key,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#reply_box_' + id + '_' + reply_key).remove();
      } else {
        $('#error_modal_msg').html(result.msg);
        $('#error_modal').modal('show');
      }
    },
  });
}
function submitReviewComment(comment_id) {
  var comment = $('#new_reply_text_' + comment_id).val();
  if (comment != '') {
    $.ajax({
      url: websiteUrl + '/json/reply-product-review',
      type: 'POST',
      data: { id: comment_id, reply: comment },
      success: function (data) {
        var result = $.parseJSON(data);
        if (result.error) {
          $('#error_modal_msg').html(result.msg);
          $('#error_modal').modal('show');
        } else {
          $('#replies_comments_' + comment_id).append(result.html);
          $('#new_reply_text_' + comment_id).val('');
        }
      },
    });
  }
}
function logPhotoView(id, key) {
  $.ajax({
    url: websiteUrl + '/gallery-view',
    type: 'POST',
    data: { gallery: id, item: key },
    success: function (data) {
      console.log(data);
    },
  });
}
function getSearchParams(k) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams;
}

function updateURL(param, value) {
  var current_params = getSearchParams();
  var page_url =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname;
  current_params.set(param, value);
  var query_string = current_params.toString();
  var new_url = page_url + '?' + query_string;
  console.log(new_url);
  if (history.pushState) {
    window.history.pushState({ path: new_url }, '', new_url);
  }
}
function closeNotice(id) {
  $('#notice_' + id).alert('close');
  $.ajax({
    url: websiteUrl + '/close-notice/' + id,
    type: 'GET',
    success: function (data) {
      console.log(data);
    },
  });
}
function slideClick(type, key) {
  $.ajax({
    url: websiteUrl + '/get-slide-url',
    type: 'POST',
    data: { version: type, slide_key: key },
    success: function (data) {
      var result = $.parseJSON(data);
      console.log(result);
      if (!result.error) {
        window.location.href = result.link;
      }
    },
  });
}
(function ($) {
  'use strict';

  $('body').removeClass('animsition');

  /*[ Load page ]

    ===========================================================*/

  /*$(".animsition").animsition({

        inClass: 'fade-in',

        outClass: 'fade-out',

        inDuration: 1500,

        outDuration: 800,

        linkElement: '.animsition-link',

        loading: true,

        loadingParentElement: 'html',

        loadingClass: 'animsition-loading-1',

        loadingInner: '<div data-loader="ball-scale"></div>',

        timeout: false,

        timeoutCountdown: 5000,

        onLoadEvent: true,

        browser: [ 'animation-duration', '-webkit-animation-duration'],

        overlay : false,

        overlayClass : 'animsition-overlay-slide',

        overlayParentElement : 'html',

        transition: function(url){ window.location.href = url; }

    });*/

  /*[ Back to top ]

    ===========================================================*/

  var windowH = $(window).height() / 2;

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > windowH) {
      $('#myBtn').css('display', 'flex');
    } else {
      $('#myBtn').css('display', 'none');
    }
  });

  $('#myBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  /*[ Show header dropdown ]

    ===========================================================*/

  $('.js-show-header-dropdown').on('click', function () {
    $(this).parent().find('.header-dropdown');
  });

  var menu = $('.js-show-header-dropdown');

  var sub_menu_is_showed = -1;

  for (var i = 0; i < menu.length; i++) {
    $(menu[i]).on('click', function () {
      if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
        $(this)
          .parent()
          .find('.header-dropdown')
          .toggleClass('show-header-dropdown');

        sub_menu_is_showed = -1;
      } else {
        for (var i = 0; i < menu.length; i++) {
          $(menu[i])
            .parent()
            .find('.header-dropdown')
            .removeClass('show-header-dropdown');
        }

        $(this)
          .parent()
          .find('.header-dropdown')
          .toggleClass('show-header-dropdown');

        sub_menu_is_showed = jQuery.inArray(this, menu);
      }
    });
  }

  $('.js-show-header-dropdown, .header-dropdown').click(function (event) {
    event.stopPropagation();
  });

  $(window).on('click', function () {
    for (var i = 0; i < menu.length; i++) {
      $(menu[i])
        .parent()
        .find('.header-dropdown')
        .removeClass('show-header-dropdown');
    }

    sub_menu_is_showed = -1;
  });

  /*[ Fixed Header ]

    ===========================================================*/

  // var posWrapHeader = $('.topbar').height();

  // var header = $('.container-menu-header');

  //

  // $(window).on('scroll',function(){

  //

  //     if($(this).scrollTop() >= posWrapHeader) {

  //         $('.header1').addClass('fixed-header');

  //         $(header).css('top',-posWrapHeader);

  //

  //     }

  //     else {

  //         var x = - $(this).scrollTop();

  //         $(header).css('top',x);

  //         $('.header1').removeClass('fixed-header');

  //     }

  //

  //     if($(this).scrollTop() >= 200 && $(window).width() > 992) {

  //         $('.fixed-header2').addClass('show-fixed-header2');

  //         $('.header2').css('visibility','hidden');

  //         $('.header2').find('.header-dropdown').removeClass("show-header-dropdown");

  //

  //     }

  //     else {

  //         $('.fixed-header2').removeClass('show-fixed-header2');

  //         $('.header2').css('visibility','visible');

  //         $('.fixed-header2').find('.header-dropdown').removeClass("show-header-dropdown");

  //     }

  //

  // });

  /*[ Show menu mobile ]

    ===========================================================*/

  /*$('.btn-show-menu-mobile').on('click', function(e){
        $(this).toggleClass('is-active');

        $('.wrap-side-menu').slideToggle();

    });*/

  var mobileMenu = $('.item-menu-mobile');
  for (var i = 0; i < mobileMenu.length; i++) {
    $(mobileMenu[i]).on('click', function () {
      $(this).find('.sub-menu').slideToggle();

      $(this).find('.arrow-main-menu').toggleClass('turn-arrow');
    });
  }

  $(window).resize(function () {
    if ($(window).width() >= 992) {
      if ($('.wrap-side-menu').css('display') == 'block') {
        $('.wrap-side-menu').css('display', 'none');

        $('.btn-show-menu-mobile').toggleClass('is-active');
      }

      if ($('.sub-menu').css('display') == 'block') {
        $('.sub-menu').css('display', 'none');

        $('.arrow-main-menu').removeClass('turn-arrow');
      }
    }
  });

  /*[ remove top noti ]

    ===========================================================*/

  $('.btn-romove-top-noti').on('click', function () {
    $(this).parent().remove();
  });

  /*[ Block2 button wishlist ]

    ===========================================================*/

  $('.block2-btn-addwishlist').on('click', function (e) {
    e.preventDefault();

    $(this).addClass('block2-btn-towishlist');

    $(this).removeClass('block2-btn-addwishlist');

    $(this).off('click');
  });

  /*[ +/- num product ]

    ===========================================================*/

  $('.btn-num-product-down').on('click', function (e) {
    e.preventDefault();

    var numProduct = Number($(this).next().val());

    if (numProduct > 1)
      $(this)
        .next()
        .val(numProduct - 1);
    $('#updateCartFrm').submit();
  });

  $('.btn-num-product-up').on('click', function (e) {
    e.preventDefault();

    var numProduct = Number($(this).prev().val());

    $(this)
      .prev()
      .val(numProduct + 1);
    $('#updateCartFrm').submit();
  });

  /*[ Show content Product detail ]

    ===========================================================*/

  $('.active-dropdown-content .js-toggle-dropdown-content').toggleClass(
    'show-dropdown-content'
  );

  $('.active-dropdown-content .dropdown-content').slideToggle('fast');

  $('.js-toggle-dropdown-content').on('click', function () {
    $(this).toggleClass('show-dropdown-content');

    $(this).parent().find('.dropdown-content').slideToggle('fast');
  });

  //$("input[name='phoneNumber']").keyup(function() {

  //	var curchr = this.value.length;

  //	if(curchr>14){

  //		$(this).val(this.value.substring(0,curchr-1));

  //		return;

  //	}

  //	var textNum = this.value.replace('(','').replace(') ','').replace('-','');

  //	if (!$.isNumeric( textNum )){

  //		$(this).val(this.value.substring(0,curchr-1));

  //		return;

  //	}

  //	var curval = $(this).val();

  //	if (curchr == 3) {

  //		$(this).val("(" + curval + ") ");

  //		// $(this).length

  //	} else if (curchr == 9) {

  //		$(this).val(curval + "-");

  //	}

  //});

  /*$(".dropdown").hover(

		function() {

			$('.dropdown-menu', this).not('.in .dropdown-menu',this).stop( true, true ).slideDown(400);

			$(this).toggleClass('open');

		},

		function() {

			$('.dropdown-menu', this).not('.in .dropdown-menu',this).stop( true, true ).fadeOut(600);

			$(this).toggleClass('open');

		}

	);*/

  $(document).ready(function () {
    $('#chatHead').click(function () {
      $('#chatContent').slideToggle(300);
    });

    $('#chatHead1').click(function () {
      $('#chatContent').slideToggle(300);
    });

    $('#startButton').click(function () {
      $('#chatDiv').slideToggle(300);

      $('#chatEnter').slideToggle(300);

      $('#startChat').slideToggle(300);
    });
  });
})(jQuery);

function sendToken() {
  var email = $('#reset_pwd_email').val();

  if (isEmail(email)) {
    var query = 'email=' + email;

    $.ajax({
      url: resetPwdUrl,

      type: 'POST',

      data: query,

      success: function (data) {
        var result = $.parseJSON(data);

        if (result.error) {
          $('#error_modal_msg').text(result.msg);
          $('#error_modal').modal('show');
        } else {
          $('#success_modal_msg').text(
            'An email was sent to you with instructions on how to reset your password.'
          );
          $('#forgot').modal('hide');
          $('#success_modal').modal('show');
        }
      },
    });
  } else {
    $('#error_modal_msg').text('Please enter a valid email address !');
    $('#error_modal').modal('show');
  }
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return regex.test(email);
}

function processForm(formId) {
  var form = $('#' + formId);
  if (form.validator('validate').has('.has-error').length === 0) {
    $('#' + formId + '_text').hide();
    $('#' + formId + '_loading').show();
    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: form.serialize(),
      success: function (data) {
        var result = $.parseJSON(data);
        if (!result.error) {
          if (result.redirect == '' || result.redirect === undefined) {
            location.reload();
          } else {
            window.location = result.redirect;
          }
        } else {
          $('#error_modal_msg').text(result.msg);
          $('#error_modal').modal('show');
          $('#' + formId + '_loading').hide();
          $('#' + formId + '_text').show();
        }
      },
    });
  }
}

function AddToViews(burl, id, index) {
  var query = 'id=' + id + '&index=' + index;
  $.ajax({
    url: burl + '/faq-view',
    type: 'POST',
    data: query,
    success: function (data) {
      console.log(data);
    },
  });
}
