'use strict';

(function(ScrollImageParallaxObserver){

  document.addEventListener("DOMContentLoaded", function() {

    new ScrollImageParallaxObserver(document.querySelectorAll('.image-parallax'), {scale: 1.4});

  });

})(window.ScrollImageParallaxObserver);
