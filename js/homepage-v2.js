// accordion
import './vendor/accordionjs';
//lazy loader for images
import LazyLoad from 'vanilla-lazyload';
jQueryBridget('vanilla-lazyload', LazyLoad, $);

function initProductColorsSwitches(){
    $('.js-colornav .ib-colornav-item').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        $('js-colornav .ib-colornav-item.selected .ib-colornav-value').attr("checked", "true").siblings().removeAttr('checked',false);
    });
}
function initProductSizes(){
    $('.js-product-size .product-size__option').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
}

function initProductDiamondQuality(){
    $('.js-select-quality .content-box__row').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
}

function initAccodion(){
    $("#js-ib-accordion").accordionjs({
        // Allow self close.(data-close-able)
        closeAble   : true,
        // Close other sections.(data-close-other)
        closeOther  : true,
        // Animation Speed.(data-slide-speed)
        slideSpeed  : 150,
        // The section open on first init. A number from 1 to X or false.(data-active-index)
        activeIndex : [1, 2, 3],
    });
}

// loading elements
$(document).ready(function () {
    initProductColorsSwitches();
    initProductSizes();
    initProductDiamondQuality();
    initAccodion();
});
