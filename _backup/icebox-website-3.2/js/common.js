imagesLoaded(document.querySelector('body'), function (instance) {
  $('.lazy').addClass('loaded');
  $('.product--image').addClass('image-loaded loaded');
});

function initializePromotionBanners() {
  $('#js-promotionBanners').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 24,
    items: 1,
    dots: false,
    nav: false,
    lazyLoad: true,
    autoplayHoverPause: true,
    animateOut: 'slideOutUp',
    animateIn: 'slideInUp',
    smartSpeed: 2500,
    mouseDrag: false,
    touchDrag: false,
  });
}

//function initializeAccordions() {
var accordionObj = (function () {
  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
  // default settings
  var settings = {
    // animation speed
    speed: 400,
    // close all other accordion items if true
    oneOpen: false,
  };
  return {
    // pass configurable object literal
    init: function ($settings) {
      $accordion_header.on('click', function () {
        accordionObj.toggle($(this));
      });
      $.extend(settings, $settings);
      // ensure only one accordion is active if oneOpen is true
      if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function ($this) {
      if (
        settings.oneOpen &&
        $this[0] !=
          $this
            .closest('.js-accordion')
            .find('> .js-accordion-item.active > .js-accordion-header')[0]
      ) {
        $this
          .closest('.js-accordion')
          .find('> .js-accordion-item')
          .removeClass('active')
          .find('.js-accordion-body')
          .slideUp();
      }
      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    },
  };
})();
//}

function checkValue(element) {
  // check if the input has any value (if we've typed into it)
  if ($(element).val()) $(element).addClass('has-value');
  else $(element).removeClass('has-value');
}

function checkFields() {
  $('.input__default').each(function () {
    checkValue(this);
  });
  $('.input__default').blur(function () {
    checkValue(this);
  });
}

//footer accordions
document.addEventListener('click', function (event) {
  //Bail if our clicked element doesn't have the class
  if (!event.target.classList.contains('footer-toggle')) return;
  // Get the target content
  var content = document.querySelector(event.target.hash);
  if (!content) return;
  // Prevent default link behavior
  event.preventDefault();
  // If the content is already expanded, collapse it and quit
  if (content.classList.contains('active')) {
    content.classList.remove('active');
    return;
  }
  // Get all open accordion content, loop through it, and close it
  var accordions = document.querySelectorAll('.accordion-content.active');
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].classList.remove('active');
  }
  // Toggle our content
  content.classList.toggle('active');
});

function globalComponentsInit() {
  initializePromotionBanners();
  //initializeAccordions();
  initMenu();
}
$(document).ready(function () {
  initHomepage();
});

$(document).ready(function () {
  $('.ScrollTop').hide();
  $('.ScrollTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });
});
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 2000) {
    $('.ScrollTop').fadeIn().show();
  } else {
    $('.ScrollTop').fadeOut();
  }
});

// validation
// js popups
$('.toggle-password').click(function () {
  var input = $('.js-passwordToggle');
  if (input.attr('type') === 'password') {
    input.attr('type', 'text');
    $(this).css('opacity', 1);
  } else {
    input.attr('type', 'password');
    $(this).css('opacity', 0.7);
  }
});

$('.gender-list-type').click(function () {
  $(this).addClass('selected').siblings().removeClass('selected');
});
// js
// js popups
// Login & Signup
$('.js-login-btn').click(function () {
  $('.ib-modal').addClass('active');
  $('.ib-modal-wrapper').addClass('active');
  $('#ib-login').show();
});
$('.js-signup-btn').click(function () {
  $('.ib-modal').addClass('active');
  $('.ib-modal-wrapper').addClass('active');
  $('#ib-signup').show();
});

// close popup
$('.ib-modal-btn-close').click(function () {
  $('.ib-modal').removeClass('active');
  $('.ib-modal-wrapper').removeClass('active');
  $('#ib-signup').hide();
  $('#ib-login').hide();
  $('#ib-forgetpassword').hide();
  $('#ib-forgetpassword-update').hide();
  $('#ib-phoneNumber').hide();
  $('#ib-phoneNumberConfirm').hide();
});

// create new account
$('.js-btn-signup').click(function () {
  $('#ib-signup').show();
  $('#ib-phoneNumber').hide();
  $('#ib-phoneNumberConfirm').hide();
  $('#ib-login').hide();
});

// Login
$('.js-btn-login').click(function () {
  $('#ib-login').show();
  $('#ib-phoneNumber').hide();
  $('#ib-forgetpassword').hide();
  $('#ib-phoneNumberConfirm').hide();
  $('#ib-signup').hide();
});

// login with phone
$('.js-btn-login-phone').click(function () {
  $('#ib-login').hide();
  $('#ib-phoneNumber').show();
});

// login with phone confirm
$('.js-btn-login-phoneConfirm').click(function () {
  $('#ib-phoneNumber').hide();
  $('#ib-phoneNumberConfirm').show();
});

// login with phone confirm
$('.js-btn-backToEmailLogin').click(function () {
  $('#ib-phoneNumberConfirm').hide();
  $('#ib-phoneNumber').hide();
  $('#ib-login').show();
});

// reset opt code
$('.btn-reset-codeSend').click(function () {
  $('.js-code-resend').show();
  $('.btn-reset-codeSend').hide();
});

// forget password
$('.js-btn-forgetPassword').click(function () {
  $('#ib-forgetpassword').show();
  $('#ib-login').hide();
});

// Send new password to email + Sucessful message
$('.js-btn-sendPassword').click(function () {
  $('#ib-forgetpassword').hide();
  $('#ib-forgetpassword-update').show();
});

$('.js-btn-sendPasswordSucessful').click(function () {
  $('#ib-forgetpassword-update').hide();
  $('#ib-login').show();
});

$('.js-form-item').on('click', function () {
  $(this).addClass('form-item--input-filled');
});
$('.form-item__input').on('blur', function () {
  if ($(this).val() === '') {
    $(this).parent('.js-form-item').removeClass('form-item--input-filled');
  }
});

// otp code confirm
function getCodeBoxElement(index) {
  return document.getElementById('codeBox' + index);
}
function onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getCodeBoxElement(index).value.length === 1) {
    if (index !== 4) {
      getCodeBoxElement(index + 1).focus();
    } else {
      getCodeBoxElement(index).blur();
      // Submit code
      console.log('submit code ');
    }
  }
  if (eventCode === 8 && index !== 1) {
    getCodeBoxElement(index - 1).focus();
  }
}
function onFocusEvent(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getCodeBoxElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}



const FloatLabel = (() => {
  // add active class and placeholder 
  const handleFocus = e => {
    const target = e.target;
    target.parentNode.classList.add ('field--active');
    // target.setAttribute ('placeholder', target.getAttribute ('data-placeholder'));
  };

  // remove field--active class and placeholder
  const handleBlur = e => {
    const target = e.target;
    if (! target.value) {
      target.parentNode.classList.remove ('field--active');
    }
    // target.removeAttribute ('placeholder');
  };

  // register events
  const bindEvents = element => {
    const floatField = element.querySelector ('input');
    floatField.addEventListener ('focus', handleFocus);
    floatField.addEventListener ('blur', handleBlur);
  };

  // get DOM elements
  const init = () => {
    const floatContainers = document.querySelectorAll ('.field');

    floatContainers.forEach (element => {
      if (element.querySelector ('input'). value) {
        element.classList.add('field--active');
      }

      bindEvents (element);
    });
  };

  return {
    init: init};

}) ();

$(document).ready(function () {
  FloatLabel.init ();
});




var inputSignup = document.querySelector('#phone');
window.intlTelInput(inputSignup, {});
var inputLogin = document.querySelector('#phoneLogin');
window.intlTelInput(inputLogin, {});