import '../../scss/global.scss';
require('webpack-jquery-ui/css');
require('webpack-jquery-ui/datepicker');
require('webpack-jquery-ui/droppable');
require('jquery-ui-touch-punch');

function parallax(layers) {
    var scrolled = $(window).scrollTop();
    layers.forEach(function(layer) {
        $(layer.element).css({"transform": "translate3d(0px, " + (scrolled * layer.value) + "px, 0px)"});
    });
}

function filterItineraryItems(itineraryCategory, itinerarySearch) {
    var category = $(itineraryCategory).val();
    var items = $(".itinerary-list__main .itinerary-item");
    var searchRe = new RegExp($(itinerarySearch)
                        .val()
                        .replace(/\s+/g, '.*'),
                        "i");

    items
        .hide()
        .filter(function() {
            var categoryTest = (category === $(this).data("category") || category === "all")
            return searchRe.test($(this).data("name")) && categoryTest;
        })
        .show();
}

window.onload = function() {
    svgxuse;

    // events
    $('#profile-btn').click(function(e) {
        $('.profile-menu', this).slideToggle(240);
        return false;
    });

    // parallax effect
    var layers = [
        {
            element: $("#hero-layer-0"),
            value: 0.1
        },
        {
            element: $("#hero-layer-1"),
            value: 0.35
        },
    ];
    parallax(layers);
    $(window).scroll(function() {
        parallax(layers);
    });

    // smooth scroll
    $("body").on('click', '[href*="#"]', function(e){
        var hash = $(this.hash)
        if (hash.length > 0) {
            $('html,body').stop().animate({ scrollTop: hash.offset().top}, 1000);
            return false;
        }
    });

    // jquery ui datepicker
    var todayDate = new Date();
    $(".datepicker").datepicker({
        dateFormat: "mm/dd/yy"
    });

    // jquery ui droppable / draggable
    $(".itinerary-item").draggable({
        revert:true,
        revertDuration: 300
    });
    $(".itinerary-form__list, .itinerary-list__main").droppable({
        drop: function(e, ui) {
            $(e.target).append(ui.draggable);
        }
    });

    // itinerary filter
    var itineraryCategory = $("#itinerary-category"),
        itinerarySearch = $("#itinerary-search");
    itineraryCategory.change(function() {
        filterItineraryItems(itineraryCategory, itinerarySearch);
    });
    itinerarySearch.keyup(function() {
        filterItineraryItems(itineraryCategory, itinerarySearch);
    });

}
