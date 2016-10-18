/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

/**
 * Generic parallax animation. Implements ScrollProxyListener 'Interface'
 * @param $images
 * @constructor
 */
(function(window, DomHelpers, ScrollProxyListener, $, TweenLite){

  function ScrollParallaxListener ($texts, maxTranslate) {
    ScrollProxyListener.call(this);

    this.direction = -1;
    this.maxTranslate = maxTranslate;

    this.$texts = $texts;

    this.doFrame = function() {
      this.$texts.each((function (index, el) {
        var $el = $(el);
        var inViewportData = DomHelpers.getViewportData($el[0], this.viewportSize);
        if (inViewportData.isInViewport) {
          var translate = this.direction * inViewportData.rect.top / this.viewportSize.height * this.maxTranslate;
          TweenLite.to($el, .5, { y: translate });
        }
      }).bind(this))
    };
  }
  ScrollParallaxListener.prototype = Object.create( ScrollProxyListener.prototype );


  // Expose ScrollParallaxListener
  window.ScrollParallaxListener = ScrollParallaxListener;

})(window, window.DomHelpers, window.ScrollProxyListener, jQuery, TweenLite);