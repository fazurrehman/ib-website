$(document).mouseup(function (e) {
  var container = $('.mini-cart');
  var filterContainer = $('.results--filter-wrapper');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $('.mini-cart').removeClass('is-active');
    $('.mini-cart-wrapper').removeClass('is-active');
  }
});

function removeItemFromCart(item_id) {
  $.ajax({
    url: '/json/remove-cart/item/' + item_id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('.cart__container').empty();
        $('.cart__container').html(result.items_html);
        $('.added_items').html(result.count);
        $('.cart-counter').each(function () {
          $(this).html(result.count);
        });
        $('#cart_modal_total').html(result.total);
        if (parseInt(result.count) == 0) {
          $('#checkout_cart_btns').hide();
          $('#continu_shop_btn').show();
        } else {
          $('#checkout_cart_btns').show();
          $('#continu_shop_btn').hide();
        }
      } else {
        if (parseInt(result.count) == 0) {
          $('#checkout_cart_btns').hide();
          $('#continu_shop_btn').show();
        } else {
          $('#checkout_cart_btns').show();
          $('#continu_shop_btn').hide();
        }
        swal.error(result.msg);
      }
    },
  });
}

function LogSlideClick(src, link) {
  $.ajax({
    url: '/json/gallery-view',
    type: 'POST',
    data: { img: src },
    success: function (data) {
      window.location.href = link;
    },
  });
}

function UpdateThumbnailZoom(item_id) {
  var zoom_value = $('#zoom_select_' + item_id).val();
  $.ajax({
    url: '/json/product-thumbnail-zoom',
    type: 'POST',
    data: { zoom: zoom_value, p_id: item_id },
    success: function (data) {
      var result = $.parseJSON(data);
      var images = $('#product_admin_overlay_' + item_id)
        .parent()
        .find('img')
        .map(function () {
          return $(this);
        })
        .get();
      $.each(images, function () {
        //remove any zoom class
        $(this).removeClass(function (index, className) {
          return (className.match(/(^|\s)zoom-\S+/g) || []).join(' ');
        });
        $(this).addClass(result.zoom_class);
      });
    },
  });
}

function RemoveFromHomepage(item_id) {
  if (homepage) {
    $('#product_admin_overlay_' + item_id)
      .parent()
      .remove();
  }

  $.ajax({
    url: '/json/hide-homepage',
    type: 'POST',
    data: { p_id: item_id },
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#remove_hp_btn_' + item_id).hide();
        $('#add_hp_btn_' + item_id).show();
        //$('#success_modal_msg').html('Item removed from homepage');
        //$('#success_modal').modal('show');
        showMessage('success', 'Great !', 'Item removed from homepage');
      }
    },
  });
}

function AddToHomePage(item_id) {
  $.ajax({
    url: '/json/add-to-homepage',
    type: 'POST',
    data: { p_id: item_id },
    success: function (data) {
      var result = $.parseJSON(data);
      if (!result.error) {
        $('#remove_hp_btn_' + item_id).show();
        $('#add_hp_btn_' + item_id).hide();
        showMessage('success', 'Great !', 'Item added to homepage');
      }
    },
  });
}

function MoveRight(item_id) {
  var count = $('#product_admin_overlay_' + item_id)
    .parent()
    .nextAll('.product-card:first').length;
  div1 = $('#product_admin_overlay_' + item_id).parent();
  div2 = $('#product_admin_overlay_' + item_id)
    .parent()
    .nextAll('.product-card:first');
  if (parseInt(count) != 0) {
    tdiv1 = div1.clone();
    tdiv2 = div2.clone();
    div1.replaceWith(tdiv2);
    div2.replaceWith(tdiv1);
    saveItemsOrder(item_id);
  }
}

function saveItemsOrder(item_id) {
  var count = $('#product_admin_overlay_' + item_id)
    .parent()
    .parent()
    .find('.product-card').length;
  var data = {};
  $('#product_admin_overlay_' + item_id)
    .parent()
    .parent()
    .children('.product-card')
    .each(function () {
      var item_id = $(this).attr('data-id');
      data[item_id] = count;
      count--;
    });
  $.ajax({
    url: '/json/update-homepage-position',
    type: 'POST',
    data: { ids: data },
    success: function (data) {
      console.log('done');
    },
  });
}

function MoveLeft(item_id) {
  var count = $('#product_admin_overlay_' + item_id)
    .parent()
    .prevAll('.product-card:first').length;
  div1 = $('#product_admin_overlay_' + item_id).parent();
  div2 = $('#product_admin_overlay_' + item_id)
    .parent()
    .prevAll('.product-card:first');
  console.log(count);
  if (parseInt(count) != 0) {
    tdiv1 = div1.clone();
    tdiv2 = div2.clone();
    div1.replaceWith(tdiv2);
    div2.replaceWith(tdiv1);
    saveItemsOrder(item_id);
  }
}

function loadColorImage(color, id) {
  $.ajax({
    url: '/json/load-color-image',
    type: 'POST',
    data: { p_id: id, color_name: color },
    success: function (data) {
      var r = $.parseJSON(data);
      if (!r.error) {
        //

        $('#src_set_1_' + id).attr('srcset', r.images[0]);
        $('#src_set_2_' + id).attr('srcset', r.images[1]);
        $('#img_' + id).attr('srcset', r.images[2]);
        $('#title_' + id).html(r.title);
      } else {
        console.log('could not find color image');
      }
    },
  });
}

function loadColorImageCollection(color, id) {
  $.ajax({
    url: '/json/load-color-image',
    type: 'POST',
    data: { p_id: id, color_name: color },
    success: function (data) {
      var r = $.parseJSON(data);
      if (!r.error) {
        $('#src_set_collection_' + id).attr('srcset', r.image);
        $('#img_collection_' + id).attr('srcset', r.image);
      } else {
        console.log('could not find color image');
      }
    },
  });
}

function enableDisableAdmin() {
  var checked = $('#clSwitch').is(':checked');
  if (checked) {
    window.location.href = '/overlay/on';
  } else {
    window.location.href = '/overlay/off';
  }
}

function hideMessage() {
  var height = $('#error_msg').outerHeight();
  $('#error_msg').css('top', -height);
}
function showMessage(type, title, msg) {
  hideMessage();
  $('#error_msg_title').html(title);
  $('#error_msg_body').html(msg);
  $('#error_msg').removeClass('error-info');
  $('#error_msg').removeClass('error-success');
  $('#error_msg').removeClass('error-danger');
  $('#error_msg').removeClass('error-warning');
  $('#error_msg').addClass('error-' + type);
  $('#error_msg').animate({ top: '0' }, 500);
}
