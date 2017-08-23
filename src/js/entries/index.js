import '../../scss/global.scss';
import $ from 'jquery';

function parallax(layers) {
    var scrolled = $(window).scrollTop();
    layers.forEach(function(layer) {
        $(layer.element).css({"transform": "translate3d(0px, " + (scrolled * layer.value) + "px, 0px)"});
    });
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
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top}, 1000);
        e.preventDefault();
    });

}
