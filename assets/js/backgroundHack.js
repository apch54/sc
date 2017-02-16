jQuery(document).bind('DOMNodeInserted', function(e) {
    if(jQuery(e.target).is('canvas')) {
    	jQuery('.backgroundGame').remove();
    }
});


var onClickBackgroundHack = function() {
  topGame = $("#game-container").offset().top;
  $(window).scrollTop(topGame);
};
