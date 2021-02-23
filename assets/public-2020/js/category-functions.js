

$('.color_radio').on("change",function(){  
	var selected_color = $('.color_radio:checked').val();
	setGold(selected_color);
});

function setGrillzType(type){
	updateURL("p",1);
	updateURL("type",type);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
	console.log(new_url);
}
function setCaseSize(size){
	updateURL("p",1);
	updateURL("case_size",size);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
	console.log(new_url);
}
function setSortBy(sortby){
	updateURL("p",1);
	updateURL("sort",sortby);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
	console.log(new_url);
}

function setPerPage(number){
	updateURL("p",1);
	updateURL("show",number);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
	console.log(new_url);
}
function setType(type){
	updateURL("p",1);
	updateURL("type",type);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
	console.log(new_url);
}
function setGender(gender){
	updateURL("p",1);
	updateURL("gender",gender);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
}

function setGold(color){
	updateURL("p",1);
	updateURL("color",color);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
}

function updateInStock(){
	var checked = $('#stock_checkbox').is(":checked");
	if(checked){
		updateURL("p",1);
		updateURL("instock",'true');
		var current_params = getSearchParams();
		var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
		var query_string = current_params.toString();
		var new_url = page_url + '?' + query_string;
		window.location.href=new_url;
	}else{
		updateURL("p",1);
		var current_params = getSearchParams();
		current_params.delete('instock');
		var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
		var query_string = current_params.toString();
		var new_url = page_url + '?' + query_string;
		window.location.href=new_url;
	}
}
function loadMore(){
	clamp();
	if(!loading){
				if(current_page < pages){
					current_page++;
				}else{
					return false;
				}


	loading = true;
	$('#load_more_btn').hide();

	
	var query = 'p=' + current_page+'&cat='+category_slug+'&sub_cat='+l_filter;
	 	$.ajax({
	 		url:baseurl+'/json/paginate-category-products',
	 		type:'POST',
	 		data:query,
	 		success:function(data){
	 			var result = $.parseJSON(data);
	 			var addedItems = '';
	 			if(!result.error){
	 				$.each(result.items,function(index){
	 					var product = result.items[index];
	 					var item = '';
						itemsLoaded++;
						//last_item_filters += ' ' + product.filter;
						item =' <div class="product all '+product.filter+'" data-price="'+product.price+'" data-date="'+product.created_at+'" data-popularity="'+product.popularity+'">';
						
						if(product.tag != ''){
							item += '<label class="bannerLabel '+product.tag_class+'">'+product.tag+'</label>';
						}
						item += '<figure class="product-image">';
						item += '<picture class="aspect-ratio-square">';
						item += '<source srcset="'+product.cover_image+'" media="(min-width: 800px)">';
						item += '<img srcset="'+product.cover_image+'" alt="…">';
						item += '</picture></figure>';
						item += '<figcaption class="product-info"><p class="product-info--title clampThis">'+product.name+'</p>';
						item += '<p class="product-info--price">';
						if(product.call_for_price == '0'){
							item += product.currency+' '+product.formated_price;
						}else{
							item += product.call_for_price_text;
						}
						item += '</p></figcaption>';
						item += ' <a href="'+product.link+'" class="link--overlap" title="'+product.name+'">View link</a></div>';

        				var $newEls = $(item);
        				//$('#itemsGrid').append(item);
        				$('#itemsGrid').append( $newEls ).isotope( 'appended', $newEls );
        				//$('[data-toggle="tooltip"]').tooltip();
						clamp();
						 
	 				});

						loading = false;
						if(totalItems == 0){
							totalItems = parseInt(result.total);
						}
						if(current_page < pages){
							loadMore();
						}
	 			}else{
	 				$('#error_modal_msg').text(result.msg);
	 				$('#error_modal').modal('show');
	 				$('#loading_div').hide();
	 				loading = false;
	 			}
	 		}
	 	})
	}

}


function clamp(){
        $('.clampThis').each(function(index, element) {
        $clamp(element, { clamp: 2, useNativeClamp: true });
    });
}


function SortBy(variable){
	var sortByValue = '';
	var ascending = true;
	if(variable != '*'){
		switch(variable){
			case 'High':
				ascending = false;
				sortByValue = 'price';
			break;

			case 'Low':
				ascending = true;
				sortByValue = 'price';
			break;

			case 'Newest':
				ascending = false;
				sortByValue = 'date';

			break;
			case 'Popular':
				ascending = false;
				sortByValue = 'popularity';
			break;

		}
		updateURL('sortBy',variable);
		$grid.isotope({ sortBy: sortByValue,sortAscending:ascending});
	}
}


function setPostsSortBy(){
	var sortby = $('#post_sort_by').val();
	//updateURL("p",1);
	updateURL("sort_p",sortby);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
}

function setVideoSortBy(){
	var sortby = $('#vid_sort_by').val();
	//updateURL("p",1);
	updateURL("sort_v",sortby);
	var current_params = getSearchParams();
	var page_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	var query_string = current_params.toString();
	var new_url = page_url + '?' + query_string;
	window.location.href=new_url;
}