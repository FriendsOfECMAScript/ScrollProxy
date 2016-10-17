/*
 * @author Mikel Tuesta <mikel@lin3s.com>
 */
'use strict';

/**
 * Generic image parallax animation. Implements ScrollProxyListener 'Interface'
 * @param $images
 * @constructor
 */
(function(window, DomHelpers, ScrollProxyListener, $, TweenLite){

  function ScrollTextParallaxListener ($texts, maxTranslate) {
    ScrollProxyListener.call(this);

    this.direction = -1;
    this.maxTranslate = maxTranslate;

    this.$texts = $texts;

    this.doFrame = function() {
      this.$texts.each((function (index, el) {
        var $el = $(el);
        var inViewportData = DomHelpers.getViewportData($el[0], this.windowDimensions.height);
        if (inViewportData.isInViewport) {
          var translate = this.direction * inViewportData.rect.top / this.windowDimensions.height * this.maxTranslate;
          TweenLite.to($el, .5, { y: translate });
        }
      }).bind(this))
    };
  }
  ScrollTextParallaxListener.prototype = Object.create( ScrollProxyListener.prototype );


  // Expose ScrollTextParallaxListener
  window.ScrollTextParallaxListener = ScrollTextParallaxListener;

})(window, window.DomHelpers, window.ScrollProxyListener, jQuery, TweenLite);
