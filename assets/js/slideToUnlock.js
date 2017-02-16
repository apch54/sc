

(function(){


  // variable declarations
  var slider, sliderInput, sliderButton, sliderText, sliderTimeout, sliderOnchange, unlockCheck;
  
  // cache our DOM elements in variables
  slider = document.querySelector('.iphone-slider');
  sliderInput = slider.querySelector('input');
  //sliderButton = sliderInput.querySelector('::-webkit-slider-thumb');
  sliderText = slider.querySelector('span');
  
  /*
      Check if it's been unlocked, else return the
      button back to the left side (default position).
  */

  goAction = function() {
      if(typeof afg == 'function') {
        console.log('afg');
        afgFor = 'fullscreen';

        afg();
      }
      else {
      insertParam('fullscreen', true);
      }    
  }

  unlockCheck = function() {
    if(sliderInput.value == 100) {

      goAction();

      sliderInput.value = 10;
      sliderText.style.opacity = 1;
    } else {
      setTimeout(function(){
        sliderInput.value = 10;
        sliderText.style.opacity = 1;
      }, 1000);
    }
  };
  
  sliderOnchange = function() {
    /*
        Set the opacity of the text relative to the value
        on the input range.
    */
    sliderText.style.opacity = ((100 - sliderInput.value) / 200);
    
    /*
        Add a timeout to prevent the function from being called
        on EVERY onchange event.
    */
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(unlockCheck, 300);
  }
  
  slider.onchange = sliderOnchange;
  slider.onclick = goAction;
})();

