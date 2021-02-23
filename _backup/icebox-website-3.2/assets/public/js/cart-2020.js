var checkout_page = false;
$('#countries_list').change(function () {
  CheckShippingOptions();
});
function slugify(string) {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

var set_attributes = [];

function updateRolexField(field_id, value, obj) {
  $('#custom_form_input_' + field_id)
    .val(value)
    .change();
  $('.rolex_dial_check').hide();
  $(obj).find('.rolex_dial_check').show();
}
function repriceDiamond(quality, obj) {
  var name = 'diamond_qualiy';
  $(obj).parent().find('a').removeClass('active');
  $(obj).addClass('active');
  switch (quality) {
    case 0:
      /*var difference = parseFloat($('#cart_price_increases').val()) - parseFloat(set_attributes[name]);
			$('#cart_price_increases').val(difference);
			set_attributes[name] = 0;*/
      $('#attribute_input_diamond_quality').val('Standard');
      $('#diamond_quality_mags').val('SI').change();
      $('.diamond-quality-notification').hide();
      break;

    case 1:
      /*var price = DIAMOND_QUALITY_VS * CARATS;
			if(price < 150){
				price = 150;
			}
			//uncomment the line bellow to change the repricing from 750 * CARTS to +750
			//var price = DIAMOND_QUALITY_VS;
			/*var price_increases = parseFloat($('#cart_price_increases').val()) + parseFloat(price);
			var new_base_price = parseFloat($('#cart_base_price').val()) + parseFloat(price_increases);
			set_attributes[name] = price;

			$('#masked_price').val(convertToCurrency(new_base_price));
			$('#masked_price').parseNumber({format:"#,###.00", locale:"us"});
			$('#current_base_price').html(currency_symbol+' '+ $('#masked_price').val());
			$('#cart_price_increases').val(price_increases);*/
      $('#attribute_input_diamond_quality').val('VS');
      $('#diamond_quality_mags').val('VS').change();
      $('.diamond-quality-notification').show();

      break;

    case 2:
      /*var price = DIAMOND_QUALITY_VVS * CARATS;
			if(price < 300){
				price = 300;
			}
			//uncomment the line bellow to change the repricing from 750 * CARTS to +750
			//var price = DIAMOND_QUALITY_VVS;
			var price_increases = parseFloat($('#cart_price_increases').val()) + parseFloat(price);
			var new_base_price = parseFloat($('#cart_base_price').val()) + parseFloat(price_increases);
			set_attributes[name] = price;
			$('#attribute_input_diamond_quality').val('VVS');
			$('#masked_price').val(convertToCurrency(new_base_price));
			$('#masked_price').parseNumber({format:"#,###.00", locale:"us"});
			$('#current_base_price').html(currency_symbol+' '+ $('#masked_price').val());
			$('#cart_price_increases').val(price_increases);*/
      $('#attribute_input_diamond_quality').val('VVS');
      $('#diamond_quality_mags').val('VVS').change();
      $('.diamond-quality-notification').show();

      break;
  }
  /*var pos = $.inArray('diamond_quality',price_increases_indexes);
	if(pos != -1){
		price_increases_amounts[pos] = set_attributes[name];
	}else{
		price_increases_indexes.push('diamond_quality');
		price_increases_amounts.push(set_attributes[name]);
	}
	totalPriceIncreases();*/
  recalculatePrice();
  $(obj).parent().find('a').removeClass('active');
  $(obj).addClass('active');
}
function RepriceAllByLength() {
  var length = $('#length_select').val();
  console.log('length = > ' + length);
  if (length == 'default') {
    $('.price_holder').each(function () {
      var price = parseFloat($(this).attr('data-price'));
      var show_price = price * currency_rate;
      show_price = currency_symbol + ' ' + addCommas(show_price.toFixed(2));
      $(this).html(show_price);
    });
  } else {
    $('.price_holder').each(function () {
      var price = parseFloat($(this).attr('data-price'));
      console.log('price = > ' + price);
      var default_length = parseInt($(this).attr('data-length'));
      var in_price = price / default_length;
      console.log('in price => ' + in_price);
      var new_price = in_price * parseFloat(length);
      console.log('new price => ' + new_price);
      console.log('currency_rate => ' + currency_rate);
      var show_price = new_price * currency_rate;
      console.log('new price => ' + show_price);
      show_price = currency_symbol + ' ' + addCommas(show_price.toFixed(2));
      console.log('show price => ' + show_price);
      $(this).html(show_price);
    });
  }
}
function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function sendItemQuestion() {
  var email = $('#question_email').val();
  var phone = $('#question_phone').val();
  var msg = $('#question_msg').val();
  var item_link = $('#question_item').val();
  if (email == '' || phone == '' || msg == '') {
    showMessage('error', 'Error', 'Please fill in all the fields');
    /*$('#error_modal_msg').html('Please fill in all the fields !');
		$('#error_modal').modal('show');*/
  } else {
    if (isEmail(email)) {
      $('#questionModal').modal('hide');
      showMessage(
        'success',
        'Great !',
        'Your question was successfuly submitted.<br />We will contact you ASAP.'
      );
      /*$('#success_modal_msg').html('Your question was successfuly submitted.<br />We will contact you ASAP.');
			$('#success_modal').modal('show');*/
      $.ajax({
        url: '/json/ask-question',
        type: 'POST',
        data: {
          user_email: email,
          user_phone: phone,
          question: msg,
          item: item_link,
        },
        success: function (data) {
          $('#question_msg').val('');
        },
      });
    } else {
      showMessage('error', 'Error', 'Please provide a valid email address');
      //$('#error_modal_msg').html('Please provide a valid email address !');
      //$('#error_modal').modal('show');
    }
  }
}

function setVariantOption(variant, value, obj) {
  $('input[data-name="' + variant + '"]').val(value);
  $(obj).parent().find('.variant_a').removeClass('active');
  $(obj).addClass('active');
  var selected_variants = {};
  $('.variant_input').each(function () {
    selected_variants[$(this).attr('data-name')] = $(this).val();
  });
  /*$.ajax({
		url:'/get-variant-price',
		type:'POST',
		data:{id:$('#cart_product_id').val(),variants:selected_variants},
		success:function(data){
			var result = $.parseJSON(data);
			if(!result.error){
				$('#cart_default_base_price').val(result.price);
				$('#cart_base_price').val(result.price);
			}else{
				$('#cart_default_base_price').val(result.default_price);
				$('#cart_base_price').val(result.default_price);
			}
			totalPriceIncreases();

		}
	});*/
  recalculatePrice();
}

function setDropdownOption(value, id, obj) {
  $(obj).parent().children().removeClass('seleted');
  $(obj).addClass('seleted');
  $('#custom_field_' + id)
    .val(value)
    .change();
  $('#dropdown_selected_value_' + id).html(
    value + '<i class="icon--arrowdown"></i>'
  );
}
function refactorOptionPrice(id, value, obj) {
  $('.option_a_' + id).each(function () {
    $(this).removeClass('seleted');
  });
  $(obj).addClass('seleted');
  $('#custom_field_' + id)
    .val(value)
    .change();
  $('#custom_field_selected_' + id).html(
    ucwords(value) + '<i class="icon--arrowdown"></i>'
  );
}

function refactorOptionPriceNP(id, factor, obj) {
  $('.option_a_' + id).each(function () {
    $(this).removeClass('active');
  });
  $(obj).addClass('active');

  var baseprice = parseFloat($('#cart_base_price').val());
  var price = baseprice - (baseprice * 25) / 100;
  $('.mp-notification').hide();
  if (factor == '10') {
    $('.mp-notification').show();
  }

  //var difference = price - baseprice;
  //var pos = $.inArray(id,price_increases_indexes);
  $('#custom_form_input_' + id).val(factor);
  /*if(pos != -1){
		price_increases_amounts[pos] = difference;
	}else{
		price_increases_indexes.push(id);
		price_increases_amounts.push(difference);
	}
	totalPriceIncreases();*/
  recalculatePrice();
}

function refactorPairPrice(id, factor, obj) {
  $('.pair_a_' + id).each(function () {
    $(this).removeClass('active');
  });
  $(obj).addClass('active');
  if (factor == 1) {
    $('#custom_field_' + id).val('pair');
  } else {
    $('#custom_field_' + id).val('single');
  }
}
function updateLetterCount(field_id) {
  var letters = $('#custom_tags_' + field_id).val();
  if (letters.length) {
    for (var i = 0; i < letters.length; i++) {
      var letter = letters.charAt(i).toUpperCase();
      var regEx = new RegExp(letters.charAt(i), 'gi');
      var num_matches = letters.match(regEx).length;
      $("[data-letter='" + letter + "'] > span").html(num_matches);
      if (num_matches > 0) {
        $("[data-letter='" + letter + "'] > span").show();
      } else {
        $("[data-letter='" + letter + "'] > span").hide();
      }
    }
  } else {
    $('.letter_count').each(function () {
      $(this).html('');
      $(this).hide();
    });
  }
}
function updateTagsField(field_id, letter) {
  var letters = $('#custom_tags_' + field_id).val();
  letters = letters + letter;
  $('#custom_tags_' + field_id)
    .val(letters)
    .change();
}
function applyCoupon() {
  var coupon = $('#coupon_code').val();
  if (coupon != '') {
    $.ajax({
      url: websiteUrl + '/json/check-coupon',
      type: 'POST',
      data: { coupon_code: coupon },
      success: function (data) {
        var r = $.parseJSON(data);
        if (r.error) {
          showMessage('error', 'Error', r.msg);
          //$('#error_modal_msg').html(r.msg);
          //$('#error_modal').modal('show');
        } else {
          $('#coupon_field').hide();
          $('#cart_grand_total').html(r.new_total_cart);
          $('#discount_value').html(r.coupon_value);
          $('#discount_row').show();
          $('#coupon_field').hide();
          //$('#success_modal_msg').html(r.coupon_value + ' discount was applied to cart.');
          //$('#success_modal').modal('show');
          showMessage(
            'success',
            'Great !',
            r.coupon_value + ' discount was applied to cart.'
          );
        }
      },
    });
  }
}

function setCurrency() {
  var currency = $('#currency_select').val();
  $.ajax({
    url: '/set-currency/' + currency,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      console.log(result);
      if (!result.error) {
        currency_rate = result.rate;
        currency_symbol = result.symbol;
        window.location.reload();
      }
    },
  });
}

function convertToCurrency(value) {
  var converted = value * currency_rate;
  return converted;
}
function addToCart() {
  /* HotJar Tag Recording */
  hj('tagRecording', ['AddToCart']);

  var query = '';
  var required_actions = [];
  $('#addToCartFrm input').each(function (index) {
    var element = $(this);
    var value = element.val();
    if (value == '') {
      var elem_name = element.attr('data-name');
      var action = element.attr('data-action');
      var full_action = action + ' ' + elem_name;
      required_actions.push(full_action);
    }
    query += element.attr('name') + '=' + element.val() + '&';
  });
  if (!required_actions.length) {
    $.ajax({
      url: addToCartUrl,

      type: 'POST',

      data: query,

      success: function (response) {
        var result = $.parseJSON(response);

        if (!result.error) {
          var items = result.items;

          var total = 0;

          $('#desktop_bag_items').html('');

          $('#mobile_bag_items').html('');

          $.each(items, function (index) {
            item = items[index];

            total += item.total;

            var new_bag_item = '<li class="header-cart-item">';

            new_bag_item +=
              '<div class="header-cart-item-img"> <img src="' +
              item.preview +
              '" alt="IMG"> </div>';

            new_bag_item +=
              '<div class="header-cart-item-txt"> <a href="#" class="header-cart-item-name">' +
              item.title;

            if (item.qty > 1) {
              $('#format_input').val(convertToCurrency(item.total));
              $('#format_input').formatNumber({
                format: '#,###.00',
                locale: 'us',
              });
              new_bag_item +=
                '&nbsp;&nbsp;<span class="badge badge-inverse">x' +
                item.qty +
                '</span></a> <span class="header-cart-item-info"> ' +
                currency_symbol +
                ' ' +
                $('#format_input').val() +
                ' </span> </div></li>';
            } else {
              $('#format_input').val(convertToCurrency(item.total));
              $('#format_input').formatNumber({
                format: '#,###.00',
                locale: 'us',
              });
              new_bag_item +=
                '</a> <span class="header-cart-item-info"> ' +
                currency_symbol +
                ' ' +
                $('#format_input').val() +
                ' </span> </div></li>';
            }

            $('#desktop_bag_items').append(new_bag_item);

            $('#mobile_bag_items').append(new_bag_item);
          });
          $('#format_input').val(convertToCurrency(total));
          $('#format_input').formatNumber({ format: '#,###.00', locale: 'us' });
          $('#desktop_bag_total').html(
            'Total:&nbsp;&nbsp;' +
              currency_symbol +
              ' ' +
              $('#format_input').val()
          );

          $('#mobile_bag_total').html(
            'Total:&nbsp;&nbsp;' +
              currency_symbol +
              ' ' +
              $('#format_input').val()
          );

          $('#desktop_bag_items_count').text(items.length);
          $('#popupSlider').modal('hide');
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          $('.checkout_cart_btn').each(function () {
            $(this).show();
          });
          $('#desktop_bag').addClass('show-header-dropdown');
          $('#mobile_bag').addClass('show-header-dropdown');
        } else {
          swal.error(result.msg);
        }
      },
    });
  } else {
    var steps = required_actions.length > 1 ? 'steps' : 'step';
    var error_msg =
      'You need to perform the following ' +
      steps +
      ' before adding this item to your cart : <br />';
    var count = 1;
    $.each(required_actions, function (i, action) {
      error_msg += count + ' - ' + action + '<br />';
      count++;
    });
    showMessage('error', 'Error', error_msg);
    //$('#error_modal_msg').html(error_msg);
    //$('#error_modal').modal('show');
  }
}

function addDefaultToCart(product_id) {
  var query = 'product_id=' + product_id;
  $.ajax({
    url: addToCartUrl,

    type: 'POST',

    data: query,

    success: function (response) {
      var result = $.parseJSON(response);

      if (!result.error) {
        var items = result.items;

        var total = 0;

        $('#desktop_bag_items').html('');

        $('#mobile_bag_items').html('');

        $.each(items, function (index) {
          item = items[index];

          total += item.total;

          var new_bag_item = '<li class="header-cart-item">';

          new_bag_item +=
            '<div class="header-cart-item-img"> <img src="' +
            item.preview +
            '" alt="IMG"> </div>';

          new_bag_item +=
            '<div class="header-cart-item-txt"> <a href="#" class="header-cart-item-name">' +
            item.title;

          if (item.qty > 1) {
            $('#format_input').val(convertToCurrency(item.total));
            $('#format_input').formatNumber({
              format: '#,###.00',
              locale: 'us',
            });
            new_bag_item +=
              '&nbsp;&nbsp;<span class="badge badge-inverse">x' +
              item.qty +
              '</span></a> <span class="header-cart-item-info"> ' +
              currency_symbol +
              ' ' +
              $('#format_input').val() +
              ' </span> </div></li>';
          } else {
            $('#format_input').val(convertToCurrency(item.total));
            $('#format_input').formatNumber({
              format: '#,###.00',
              locale: 'us',
            });
            new_bag_item +=
              '</a> <span class="header-cart-item-info"> ' +
              currency_symbol +
              ' ' +
              $('#format_input').val() +
              ' </span> </div></li>';
          }

          $('#desktop_bag_items').append(new_bag_item);

          $('#mobile_bag_items').append(new_bag_item);
        });
        $('#format_input').val(convertToCurrency(total));
        $('#format_input').formatNumber({ format: '#,###.00', locale: 'us' });
        $('#desktop_bag_total').html(
          'Total:&nbsp;&nbsp;' +
            currency_symbol +
            ' ' +
            $('#format_input').val()
        );

        $('#mobile_bag_total').html(
          'Total:&nbsp;&nbsp;' +
            currency_symbol +
            ' ' +
            $('#format_input').val()
        );

        $('#desktop_bag_items_count').text(items.length);
        $('#popupSlider').modal('hide');
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        $('.checkout_cart_btn').each(function () {
          $(this).show();
        });
        $('#desktop_bag').addClass('show-header-dropdown');
        $('#mobile_bag').addClass('show-header-dropdown');
      } else {
        swal.error(result.msg);
      }
    },
  });
}
function uploadCustomPhoto2(field_id) {
  var data = new FormData();
  if ($('#custom_photo_upload_2').get(0).files.length != 0) {
    console.log('upload image...');
    data.append('custom_photo', $('#custom_photo_upload_2').prop('files')[0]);
    $.ajax({
      type: 'POST',
      processData: false,
      contentType: false,
      data: data,
      url: '/upload_custom_photo',
      success: function (data) {
        var result = $.parseJSON(data);
        if (!result.error) {
          //$('#success_modal_msg').text('File successfully uploaded !');
          showMessage('success', 'Great', 'File successfully uploaded !');
          //$('#success_modal_msg').html('File successfully uploaded !<br /><br /> ' + result.img_html);
          //$('#success_modal').modal('show');
          $('#custom_form_input_' + field_id).val(result.file);
        } else {
          //$('#error_modal_msg').text('Error uploading your photo , only png,jpeg and gif files are allowed !');
          //$('#error_modal').modal('show');
          showMessage(
            'error',
            'Error',
            'Error uploading your photo , only png,jpeg and gif files are allowed !'
          );
        }
      },
    });
  }
}

function uploadCustomPhoto(field_id) {
  var data = new FormData();
  if ($('#custom_photo_upload').get(0).files.length != 0) {
    console.log('upload image...');
    data.append('custom_photo', $('#custom_photo_upload').prop('files')[0]);
    $.ajax({
      type: 'POST',
      processData: false,
      contentType: false,
      data: data,
      url: '/upload_custom_photo',
      success: function (data) {
        var result = $.parseJSON(data);
        if (!result.error) {
          //$('#success_modal_msg').text('File successfully uploaded !');
          showMessage('success', 'Great', 'File successfully uploaded !');
          //$('#success_modal_msg').html('File successfully uploaded !<br /><br /> ' + result.img_html);
          //$('#success_modal').modal('show');
          $('#custom_form_input_' + field_id).val(result.file);
        } else {
          //$('#error_modal_msg').text('Error uploading your photo , only png,jpeg and gif files are allowed !');
          //$('#error_modal').modal('show');
          showMessage(
            'error',
            'Error',
            'Error uploading your photo , only png,jpeg and gif files are allowed !'
          );
        }
      },
    });
  }
}

function UpdatePriceAndAttribute(select_id, name) {
  var value = $('#attribute_select_' + select_id).val();

  if (value != '') {
    var price = parseFloat(
      $('#attribute_select_' + select_id)
        .find(':selected')
        .attr('data-price')
    );

    var price_increases =
      parseFloat($('#cart_price_increases').val()) + parseFloat(price);

    var new_base_price =
      parseFloat($('#cart_base_price').val()) + parseFloat(price_increases);

    set_attributes[name] = price;

    $('#attribute_input_' + select_id).val(value);
    $('#masked_price').val(convertToCurrency(new_base_price));
    $('#masked_price').parseNumber({ format: '#,###.00', locale: 'us' });
    $('#current_base_price').html(
      currency_symbol + ' ' + '#masked_price'.val()
    );
    $('#cart_price_increases').val(price_increases);
  } else {
    var difference =
      parseFloat($('#cart_price_increases').val()) -
      parseFloat(set_attributes[name]);

    $('#cart_price_increases').val(difference);

    $('#attribute_input_' + select_id).val('');

    set_attributes[name] = '';

    recalculatePrice();
  }
}

$('#popupSlider').on('shown.bs.modal', function () {
  var color_name = $('#radio_btns input[type=radio]:checked').attr(
    'data-color'
  );
  if (color_name == undefined) {
    color_name = 'original';
  }
  $('.slick7').slick('slickUnfilter');
  $('.slick7-dots').slick('slickUnfilter');
  $('.slick7').slick('slickFilter', '.filter-' + color_name);
});
function fillCustomInput2(id) {
  $('#custom_dropdown_' + id)
    .val($('#custom_dropdown_' + id + '_2').val())
    .change();
  var dropdown_value = $('#custom_dropdown_' + id).val();
  $('#custom_form_input_' + id).val(dropdown_value);
}
function colorChange2() {
  $('#color_select_dropdown').val($('#color_select_dropdown_2').val()).change();
}

function preSelectColor(color) {
  var colorclass = color.toLowerCase();
  console.log('select ' + colorclass);
  $('.' + color + '-but').click();
}

function ucwords(str) {
  str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  return str;
}
function checkboxChangeColor(color) {
  var selected_color = $('#current_selected_color').val();
  var currentColor = selected_color + ' Gold';
  var newName = color + ' gold';
  var name = $.trim($('#item_name').text().toLowerCase());
  var description = $('#description_p').text();
  if (description != undefined) {
    description = description.replace(selected_color, color);
  }

  name = name.replace(currentColor.toLowerCase(), newName.toLowerCase());
  $('#item_name').text(ucwords(name));
  $('#description_p').html(description);
  $('#breadcrumbs_name').text(ucwords(name));
  $('#current_selected_color').val(color).change();
  updateURL('color', color);
  $('.variant_a.active').trigger('click');
}
function colorChange() {
  var color_base_price = parseFloat(
    $('#color_select_dropdown option:selected').attr('data-price')
  );
  var color_name = $('#color_select_dropdown option:selected').attr(
    'data-color'
  );
  var is_out_stock = $('#color_select_dropdown option:selected').attr(
    'data-stock'
  );
  var filterable_items = $('.filter-' + color_name).length;
  if (is_out_stock == 'true') {
    $('#out_of_stock_color').text(color_name + ' Gold');
    $('#outofStockModal').modal('show');
    $('.instockbox').hide();
  } else {
    $('.instockbox').show();
  }
  if (color_name == '' || color_name == undefined) {
    color_name = 'all';
  }
  filterSlides(color_name);
  /*if(filterable_items > 0){
		$('.slick3').slick('slickUnfilter');
		$('.slick3').slick('slickFilter', '.filter-' + color_name);
	}*/

  if (color_base_price != undefined) {
    $('#cart_product_color').val(color_name);
    $('#cart_base_price').val(color_base_price);
  } else {
    $('#cart_base_price').val($('#cart_default_base_price').val());
  }

  recalculatePrice();
}

function resetBasePrice() {
  var color_base_price = parseFloat(
    $('#radio_btns input[type=radio]:checked').attr('data-price')
  );
  var color_name = $('#radio_btns input[type=radio]:checked').attr(
    'data-color'
  );
  var is_out_stock = $('#radio_btns input[type=radio]:checked').attr(
    'data-stock'
  );
  var filterable_items = $('.filter-' + color_name).length;

  //console.log(is_out_stock);
  if (is_out_stock == 'true') {
    console.log('true');
    $('#out_of_stock_color').text(color_name + ' Gold');
    $('#outofStockModal').modal('show');
  }
  if (filterable_items > 0) {
    $('.slick3').slick('slickUnfilter');
    $('.slick3').slick('slickFilter', '.filter-' + color_name);
  }

  if (color_base_price != undefined) {
    $('#cart_product_color').val(color_name);
    $('#cart_base_price').val(color_base_price);
  } else {
    $('#cart_base_price').val($('#cart_default_base_price').val());
  }

  recalculatePrice();
}

var price_increases_indexes = [];
var price_increases_amounts = [];

function refactorPriceDropdown2(id, factor) {
  console.log('refactor price 2 ');
  $('#custom_dropdown_' + id)
    .val($('#custom_dropdown_' + id + '_2').val())
    .change();
}
function refactorPriceDropdown(id, factor) {
  var baseprice = parseFloat($('#cart_base_price').val());
  var dropdown_value = $('#custom_dropdown_' + id).val();
  var property = $('#custom_dropdown_' + id).attr('data-property-name');
  if (property == 'length_') {
    property = 'length_inches';
    var weight = $('#proptery_li_weight').attr('data-value');
    var length = $('#proptery_li_length_inches').attr('data-value');
    console.log(weight);
    console.log(length);
    if (weight != undefined && length != undefined) {
      var weight_per_inch = weight / length;
      console.log('per inch :' + weight_per_inch);
      var new_weight = weight_per_inch * dropdown_value;
      console.log('new weight:' + new_weight);
      $('#proptery_li_weight').text(new_weight.toFixed(2) + 'g');
    } else {
      console.log('undefined');
    }
  }
  console.log('#proptery_li_' + property);
  $('#proptery_li_' + property).text(dropdown_value);
  var price = dropdown_value * factor;
  var difference = price - baseprice;
  $('#custom_form_input_' + id).val(dropdown_value);
  /*var pos = $.inArray(id,price_increases_indexes);
	if(pos != -1){
		price_increases_amounts[pos] = difference;
	}else{
		price_increases_indexes.push(id);
		price_increases_amounts.push(difference);
	}
	//totalPriceIncreases();*/
  recalculatePrice(dropdown_value + ' INCHES');
  //$('#current_base_price').html($('#current_base_price').html() + ' - ' + )
}

function fillCustomInput(id) {
  var dropdown_value = $('#custom_dropdown_' + id).val();
  $('#custom_form_input_' + id).val(dropdown_value);
}

function refactorPriceTags2(id) {
  $('#custom_tags_' + id)
    .val($('#custom_tags_' + id + '_2').val())
    .change();
}

function refactorPriceTags(id) {
  var baseprice = parseFloat($('#cart_base_price').val());
  var letters = $('#custom_tags_' + id)
    .val()
    .split('');
  var qty = 0;
  if (letters.length != 0) {
    qty = letters.length - 1;
  }

  $('#custom_form_input_' + id).val($('#custom_tags_' + id).val());
  /*var pos = $.inArray(id,price_increases_indexes);
	if(pos != -1){
		price_increases_amounts[pos] = (qty * baseprice);
	}else{
		price_increases_indexes.push(id);
		price_increases_amounts.push((qty * baseprice));
	}
	totalPriceIncreases();*/
  if (letters.length != 0) {
    $('#base_price_extra').html();
    recalculatePrice(letters.length + ' LETTERS');
  } else {
    $('#base_price_extra').html('');
  }

  updateLetterCount(id);
}
function totalPriceIncreases() {
  var total = 0;
  $.each(price_increases_amounts, function (index, value) {
    total += value;
  });
  return total;
}

function recalculatePrice(extra = '') {
  /*
	var baseprice = parseFloat($('#cart_base_price').val());//default baseprice
	var new_base_price = 0;
	var form = $('#addToCartFrm');
	$.ajax({
		url:websiteUrl +'/json/calculate_price',
		type:'POST',
		data:form.serialize(),
		success:function(data){
			var result = $.parseJSON(data);
			console.log(result);
			if(!result.error){
				new_base_price = result.unit_price;
			}else{
				toastr.error(result.error);
			}
			if(!callForPrice){
				if(new_base_price != 0){
					$('#masked_price').val(convertToCurrency(new_base_price));
					$('#masked_price').formatNumber({format:"#,###", locale:"us"});
					$('#current_base_price').html(currency_symbol+' ' + $('#masked_price').val());
					$('#popup_price').html(currency_symbol+' ' + $('#masked_price').val());
				}else{
					$('#masked_price').val(convertToCurrency(baseprice));
					$('#masked_price').formatNumber({format:"#,###", locale:"us"});
					$('#current_base_price').html(currency_symbol+' ' + $('#masked_price').val());
					$('#popup_price').html(currency_symbol+' ' + $('#masked_price').val());
				}
			}
			if(extra != ''){
				$('#base_price_extra').html(' - '+extra);
			}else{
				$('#base_price_extra').html('');
			}
			$('#current_base_price').show();
		}

	})

	*/
}

function confirmRemove(id) {
  $('#cart_item_row_' + id).remove();

  $('#updateCartFrm').submit();
}

function RemoveCartItem(id) {
  $('#removeCartItemModal').modal('hide');

  $('#cart_item_row_' + id).remove();

  $('#updateCartFrm').submit();
}

function Compare(product_id) {
  $.ajax({
    url: websiteUrl + '/comparator/add/' + product_id,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);

      if (!result.error) {
        showMessage(
          'success',
          'Great !',
          'Item added to the items comparator, use the blue floating button to open the items comparator.'
        );
        //$('#success_modal_msg').text('Item added to the items comparator, use the blue floating button to open the items comparator.');
        //$('#success_modal').modal('show');
        if (result.items == 1) {
          $('#btncollapzion').Collapzion({
            _child_attribute: [
              {
                label: 'Open Items Comparator',
                url: '/Comparator',
                icon: 'assessment',
              },
            ],
            _main_btn_color: '#101e5a;',
            _child_btn_color: '#101e5a;',
          });
        }
      } else {
        //$('#error_modal_msg').text(result.msg);
        //$('#error_modal').modal('show');
        showMessage('error', 'Error', result.msg);
      }
    },
  });
}

function addToWishlist(product_id) {
  var query = 'product_id=' + product_id;

  $.ajax({
    url: addToWishlistUrl,

    type: 'POST',

    data: query,

    success: function (data) {
      var result = $.parseJSON(data);

      if (!result.error) {
        //$('#success_modal_msg').text('Item added to your Wishlist');
        //$('#success_modal').modal('show');
        showMessage('success', 'Great !', 'Item added to your Wishlist');
      } else {
        //$('#error_modal_msg').text(result.msg);
        //$('#error_modal').modal('show');
        showMessage('error', 'Error', result.msg);
      }
    },
  });
}

if (checkout_page) {
  $(window).bind('load', function () {
    UpdateShippingOption();
    $('#countries_list').change(function () {
      CheckShippingOptions();
    });
  });
}

function CheckShippingOptions() {
  var country = $('#countries_list').val();
  var type = country == 'United States' ? 'local' : 'International';
  console.log('shipping type =>' + type);
  $.ajax({
    url: '/ajax/shipping_options/' + type,
    type: 'GET',
    success: function (data) {
      var result = $.parseJSON(data);
      $('#shipping_options').empty();
      $('#shipping_options').html(result.html);
      $('#grand_total').attr('data-price', result.grand_total);
      checkState();
      UpdateShippingOption();
    },
  });
}

function UpdateShippingOption() {
  var shipping_option = $('input[name=shipping_radio]:checked').attr(
    'data-option'
  );
  var shipping_type = $('input[name=shipping_radio]:checked').attr('data-type');
  $.ajax({
    url: '/ajax/update-cart-shipping',
    type: 'POST',
    data: { option: shipping_option, type: shipping_type },
    success: function (data) {
      var result = $.parseJSON(data);
      $('#grand_total').attr('data-price', result.grand_total);
      $('.shipping_display').empty();
      $('.shipping_display').html(result.shipping_cost);
      checkState();
    },
  });
}

/* Maggy new Cart Scripts */
$(document).on('click', '.customInputChangeRadio', function () {
  var input = $(this).find('input');
  var inputName = input.attr('name');
  $('input[name="' + inputName + '"]').prop('checked', false);
  $('input[name="' + inputName + '"]')
    .closest('.customInputChangeRadio')
    .removeClass('active');
  $(this).addClass('active');
  input.prop('checked', true);
  input.trigger('change');
});

$(document).on('change', '.custom-fields-fetch', function () {
  var value = $(this).val();
  var name = $(this).attr('data-name');
  var title = $.trim($('#item_name').text().toLowerCase());
  var description = $('#description_p').text();
  var matches = [];
  var weight = $('#proptery_li_weight').attr('data-value');
  var length = $('#proptery_li_length_inches').attr('data-value');
  var ctw = $('#proptery_li_total_diamond_weight').attr('data-value');
  var new_ctw = 0;
  var dropdown_value = $(this).val();
  if (name) {
    var nameslug = slugify(name);
    console.log(nameslug);
    if (nameslug == 'length') {
      property = 'length_inches';
      new_ctw = (ctw / length) * value;
      new_ctw = new_ctw.toFixed(2);
      if (length != undefined) {
        $('#proptery_li_total_diamond_weight').text(new_ctw + 'ctw');
        matches = title.match(/-?(?:\d+(?:\.\d*)?|\.\d+)ctw/);
        if (matches != null) {
          $('#item_name').text(title.replace(matches[0], new_ctw + 'ctw'));
        }
        matches = description.match(/-?(?:\d+(?:\.\d*)?|\.\d+)ctw/);
        if (matches != null) {
          $('#description_p').text(
            description.replace(matches[0], new_ctw + 'ctw')
          );
        }
      }
      if (weight != undefined && length != undefined) {
        var weight_per_inch = weight / length;
        var new_weight = weight_per_inch * dropdown_value;
        $('#proptery_li_weight').text(new_weight.toFixed(2) + 'g');
      }
    }

    if (nameslug == 'earring-options') {
      var factor = value.toLowerCase() == 'single' ? 0.5 : 1;
      if (ctw != undefined) {
        new_ctw = ctw * factor;
        $('#proptery_li_total_diamond_weight').text(new_ctw + 'ctw');
        matches = title.match(/-?(?:\d+(?:\.\d*)?|\.\d+)ctw/);
        if (matches != null) {
          $('#item_name').text(title.replace(matches[0], new_ctw + 'ctw'));
        }
        matches = description.match(/-?(?:\d+(?:\.\d*)?|\.\d+)ctw/);
        if (matches != null) {
          $('#description_p').text(
            description.replace(matches[0], new_ctw + 'ctw')
          );
        }
      }
    }
    if (nameslug == 'metal-purity') {
      matches = title.match(/-?(?:\d+(?:\.\d*)?|\.\d+)k/);
      if (matches != null) {
        $('#item_name').text(title.replace(matches[0], value));
      }
      matches = description.match(/-?(?:\d+(?:\.\d*)?|\.\d+)K/);
      if (matches != null) {
        $('#description_p').text(description.replace(matches[0], value));
      }
    }
    if (nameslug == 'diamond-quality') {
      $('#proptery_li_diamond_quality').text(value);
    }

    $('.item-details-' + nameslug).html(value);
  }

  ///$('#current_base_price').html('<span class="price-loading"></span>');
  $('#current_base_price').css('opacity', '0.3');
  $('#add_cart_btn_price').css('opacity', '0.3');
  var inputArray = $('.custom-fields-fetch').serializeArray();
  $.post('/json/calculate-price-mags', inputArray, function (data) {
    ////data = $.parseJSON(data);
    var new_base_price = data.unit_price;
    var images = data.images;
    var thumbs = data.thumbs;
    var stock = data.stock;
    if (images.length && thumbs.length) {
      $('#main_slides').empty();
      $('#unique-pager').empty();
      $('#secondary_slides').empty();
      $.each(images, function (index) {
        var main_slide_li =
          '<li><img  src="' +
          images[index] +
          '" class="main-slide-img zoomImg"></li>';
        var thumb_slide_li =
          '<li class="rslides_tab" data-index="' +
          index +
          '" style="border:1px #eee solid"><a href="#" ><img src="' +
          thumbs[index] +
          '"></a></li>';
        $('#main_slides').append(main_slide_li);
        $('#secondary_slides').append(main_slide_li);
        $('#unique-pager').append(thumb_slide_li);
      });
      resetSlider();
    } else {
      filterSlides(data.color);
    }
    if (stock != '' && stock != '-') {
      var stock_int = parseInt(stock);
      if (stock_int <= 3) {
        $('#stock_msg').html('Only ' + stock_int + ' left in stock.');
        $('#stock_msg').show();
      } else {
        $('#stock_msg').hide();
      }
    } else {
      $('#stock_msg').hide();
    }
    console.log('converted  => ' + convertToCurrency(new_base_price));
    $('#masked_price').val(convertToCurrency(new_base_price));
    $('#masked_price').formatNumber({ format: '#,###', locale: 'us' });
    console.log('masked => ' + $('#masked_price').val());
    $('#current_base_price').html(
      currency_symbol + ' ' + $('#masked_price').val()
    );
    $('#add_cart_btn_price').html(
      currency_symbol + ' ' + $('#masked_price').val()
    );
    $('#popup_price').html(currency_symbol + ' ' + $('#masked_price').val());
    $('#current_base_price').css('opacity', '1');
    $('#add_cart_btn_price').css('opacity', '1');
  });
});

$(document).ready(function () {
  console.log('trigger change');
  $('.custom-fields-fetch').first().trigger('change');
});

/* Add To Cart New */
addToCartNew = function () {
  var query = '';
  var required_actions = [];
  var alreadyChecked = [];
  $('.custom-fields-fetch').each(function (index) {
    var element = $(this);
    var value = element.val();
    var elemName = $(this).attr('name');

    if ($(this).attr('type') == 'radio') {
      var radioElement = $('[name="' + elemName + '"]');
      if (radioElement.is(':checked')) {
      } else {
        value = '';
      }
    }
    if (
      $(this).attr('data-min') != undefined &&
      $(this).attr('data-min') != 0
    ) {
      var min_length = $(this).attr('data-min');
      if (value.length < min_length) {
        required_actions.push(
          'Minimum ' + min_length + ' letters required to purchase this item'
        );
      }
    }
    if (value == '') {
      var elem_name = element.attr('data-name');
      var action = element.attr('data-action');
      var full_action = action + ' ' + elem_name;

      if (jQuery.inArray(elem_name, alreadyChecked) == -1) {
        required_actions.push(full_action);
        alreadyChecked.push(elem_name);
      }
    }
    query += element.attr('name') + '=' + element.val() + '&';
    //console.log(alreadyChecked);
  });
  if (!required_actions.length) {
    console.log('no required_actions');
    var inputArray = $('.custom-fields-fetch').serializeArray();
    $.get('/add-to-cart-mags', inputArray, function (response) {
      var result = $.parseJSON(response);
      if (!result.error) {
        $('.cart__container').empty();
        $('.cart__container').html(result.items_html);
        $('.added_items').html(result.count);
        $('.cart-counter').each(function () {
          $(this).html(result.count);
        });
        $('#cart_modal_total').html(result.total);
        $('#checkout_cart_btns').show();
        $('#continu_shop_btn').hide();
        $('.cd-cart-trigger').click();
      } else {
        if (parseInt(result.count) == 0) {
          $('#checkout_cart_btns').hide();
          $('#continu_shop_btn').show();
        } else {
          $('#checkout_cart_btns').show();
          $('#continu_shop_btn').hide();
        }

        showMessage('error', 'Error', result.msg);
      }
    });
  } else {
    var steps = required_actions.length > 1 ? 'steps' : 'step';
    var error_msg =
      'You need to perform the following ' +
      steps +
      ' before adding this item to your cart : <br />';
    var count = 1;
    $.each(required_actions, function (i, action) {
      error_msg += count + ' - ' + action + '<br />';
      count++;
    });
    showMessage('error', 'Error', error_msg);
  }
};

/* Update Tags Count */
function updateTagsCount($this) {
  var value = $($this).val();
  var length = value.length;
  var populate = $($this).attr('data-populate');
  console.log(populate);
  $(populate).val(length);
}

$(document).on('change', '.old-diamond-quality', function () {
  var cval = $(this).val();
  if (cval == 'SI') {
    $('.diamond-quality-notification').hide();
  } else {
    $('.diamond-quality-notification').show();
  }
});
