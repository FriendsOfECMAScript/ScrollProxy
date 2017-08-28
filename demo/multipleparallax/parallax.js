'use strict';

(function($, ScrollImageParallaxObserver, ScrollParallaxObserver){

  $(function(){

    new ScrollImageParallaxObserver($('.image-parallax'), {scale: 1.4});
    new ScrollParallaxObserver($('.image-title'), { direction: ScrollImageParallaxObserver.DIRECTION.POSITIVE, maxTranslate: 100 });

  });

})(jQuery, window.ScrollImageParallaxObserver, window.ScrollParallaxObserver);
