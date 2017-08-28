'use strict';

(function ($, ScrollInViewportObserver, ScrollProxyObserver) {

  $(function () {

    var $demoButtons = $('.button'),
      squareSide = 60,
      observer = null;

    function destroySquares() {
      $('.square').remove();
    }
    function dropSquares(total) {
      var perRow = Math.floor($('body').width() / (squareSide + 1)),
        rows = Math.floor(total / perRow);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < perRow; j++) {
//           var rndBlue = 'hsl(180, ' + Math.floor(Math.random() * 10 + 90) + '%, ' + Math.floor(Math.random() * 10 + 40) + '%)';
          var square = $('<div>', {class: 'square'})
            .css({
              'left': (squareSide + 1) * j,
              'top': (squareSide + 1) * i,
              'height': squareSide,
              'width': squareSide,
              'transform': 'scale(.0001)'
//               'backgroundColor': rndBlue
            })
            .appendTo('body');
        }
      }
    }
    function initInViewport() {
      if (observer !== null) {
        observer.destroy();
      }
      observer = new ScrollInViewportObserver($('.square'), {
        cache: true,
        trackDirections: true,
        visibleFn: function(index, element, fromVertical, fromHorizontal) {
          // Visible callback
          var rnd = Math.random();
          TweenLite.to(element, .75, {
            scale: 1,
            y: 0,
            force3D: true,
            delay: rnd * .4,
            ease: Back.easeOut.config(2)
          });
        },
        invisibleFn: function(index, element, toVertical, toHorizontal) {
          // Invisible callback
          TweenLite.to(element, .2, {
            scale: .0001,
            y: toVertical === ScrollInViewportObserver.IN_VIEWPORT.TO.BOTTOM ? 100 : - 100,
            force3D: true
          });
        }
      });
    }

    function initDemo(numberOfSquares) {
      destroySquares();
      dropSquares(numberOfSquares);
      initInViewport();
    }

    $demoButtons.on('click', function() {
      initDemo($(this).attr('data-squares'));
    });

  });

})(jQuery, window.ScrollInViewportObserver, window.ScrollProxyObserver);
