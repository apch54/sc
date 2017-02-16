var pGame = {};

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};

var detectmob = function() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

var callback = function(url, nb_points, nb_replay, nb_life, nb_time, nb_cvr, win) {

	if(!Number.isInteger(nb_points)) {
		console.warn("Callback : Le nb_points doit etre une valeur entiere");
	}

	if(!Number.isInteger(nb_replay)) {
		console.warn("Callback : Le nb_replay doit etre une valeur entiere");
	}

	if(!Number.isInteger(nb_life)) {
		console.warn("Callback : Le nb_life doit etre une valeur entiere");
	}

	if(!Number.isInteger(nb_time)) {
		console.warn("Callback : Le nb_time doit etre une valeur entiere");
	}

	if(!Number.isInteger(nb_cvr)) {
		console.warn("Callback : Le nb_cvr doit etre une valeur entiere");
	}

	if(typeof(win) !== "boolean") {
		console.warn("Callback: Le win doit être un boolean");
	}

	if(typeof(url) !== "string") {
		console.warn("Callback: L'url doit être un string");
	}

	jQuery.ajax({
		url: url,
		data: {
			nb_points: nb_points,
			nb_replay: nb_replay,
			nb_life: nb_life,
			nb_time: nb_time,
			nb_cvr: nb_cvr
		}
	});
};

var openIntersticiel = function(duration, isTouch, url) {

	if( !(!detectmob() && isTouch) ) {
		jQuery('#intersticiel').width(jQuery(document).innerWidth());
		jQuery('#intersticiel').height(jQuery(document).innerHeight());
		jQuery('#intersticiel').html('<div class="headerIntersticiel"><div class="counter"></div><div class="closeIntersticiel"></div></div><iframe src="' + url + '" width="' + jQuery(document).innerWidth() + '" height="'+ jQuery(document).innerHeight() +'" />');

		for(var i=0; i <= duration; i++) {
			setTimeout(function(i) {
				jQuery('.headerIntersticiel .counter').html(duration-i + " sec");

				if(duration-i == 0) {
					jQuery('.headerIntersticiel .counter').html("");
					jQuery('.headerIntersticiel .closeIntersticiel').html('close');
					jQuery('.headerIntersticiel .closeIntersticiel').click(function() {
						closeIntersticiel();
					});
				}
			}, i * 1000, i);
		}
	}
};

var closeIntersticiel = function() {
	jQuery('#intersticiel').width(0);
	jQuery('#intersticiel').height(0);
	jQuery('#intersticiel').html("");
};


