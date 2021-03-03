// image loader
imagesLoaded(document.querySelector('body'), function (instance) {
    $('.lazy').addClass('loaded');
    $('.product--image').addClass('image-loaded loaded');
});

// Accordion
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

function initLazyLoad(){
    var myLazyLoad = new LazyLoad();
    myLazyLoad.update()
}

function initProductSliderMobile(){
    // 1st carousel, main
    $('.carousel-main').flickity({
        imagesLoaded: true,
        fullscreen: true,
        pageDots: true,
    });
    // 2nd carousel, navigation
    $('.carousel-nav').flickity({
        asNavFor: '.carousel-main',
        contain: true,
        cellAlign: 'left',
    });
}

function initProductCarousel(){
    $('.js-products-carousel').flickity({
        imagesLoaded: true,
        pageDots: true,
    });
    
    // use x and y mousewheel event data to navigate flickity
    function flickity_handle_wheel_event(e, flickity_instance, flickity_is_animating) {
        // do not trigger a slide change if another is being animated
        if (!flickity_is_animating) {
            // pick the larger of the two delta magnitudes (x or y) to determine nav direction
            var direction = (Math.abs(e.deltaX) > Math.abs(e.deltaY)) ? e.deltaX : e.deltaY;
            
            console.log("wheel scroll ", e.deltaX, e.deltaY, direction);
            
            if (direction > 0) {
                // next slide
                flickity_instance.next();
            } else {
                // prev slide
                flickity_instance.previous();
            }
        }
    }


// first carousel
    var carousel_1 = document.querySelector(".js-products-carousel");
    var flickity_1 = new Flickity(".js-products-carousel");
    var flickity_1_is_animating = false;
    
    flickity_1.on("settle", function(index) {
        console.log("Slide settle " + index);
        flickity_1_is_animating = false;
    });
    
    flickity_1.on("select", function(index) {
        console.log("Slide selected " + index);
        flickity_1_is_animating = true;
    });

// detect mousewheel event within carousel element
    carousel_1.onwheel = function(e) {
        flickity_handle_wheel_event(e, flickity_1, flickity_1_is_animating);
    }
    
}


// loading elements
$(document).ready(function () {
    initAccodion();
    initProductColorsSwitches();
    initProductSizes();
    initProductDiamondQuality();
    initLazyLoad()
    initProductSliderMobile();
    initProductCarousel();
});



