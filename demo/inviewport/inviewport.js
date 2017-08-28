'use strict';

(function ($, ScrollInViewportObserver, ScrollProxyObserver) {

  $(function () {

    var $demoButtons = $('.button'),
      observer = null;

    function destroyBubbles() {
      $('.bubble').remove();
    }
    function dropBubbles(total) {
      var index = total;
      while (index--) {
        var bubble = $('<div>', {class: 'bubble'})
          .css({
            'left': Math.floor(Math.random() * $('body').width()),
            'top': Math.floor(Math.random() * $('body').height())
          })
          .appendTo('body');
      }
    }
    function initInViewport() {
      if (observer !== null) {
        observer.destroy();
      }
      observer = new ScrollInViewportObserver($('.bubble'), {
        visibleFn: function(index, element) {
          // Visible callback
          var rnd = Math.random();
          var rndBlue = 'hsl(180, ' + Math.floor(Math.random() * 50 + 50) + '%, ' + Math.floor(Math.random() * 50) + '%)';
          TweenLite.to(element, .75, {
            scale: (rnd * 2 + 1),
            backgroundColor: rndBlue,
            force3D: true,
            delay: rnd * .4,
            ease: Back.easeOut.config(7.5)
          });
        },
        invisibleFn: function(index, element) {
          // Invisible callback
          TweenLite.to(element, .2, {
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            force3D: true
          });
        }
      });
    }

    function initDemo(numberOfBubbles) {
      destroyBubbles();
      dropBubbles(numberOfBubbles);
      initInViewport();
    }

    $demoButtons.on('click', function() {
      initDemo($(this).attr('data-bubbles'));
    });

  });

})(jQuery, window.ScrollInViewportObserver, window.ScrollProxyObserver);
