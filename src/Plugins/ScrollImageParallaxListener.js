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

  var defaultBreakpoints = [640, 860, 1024, 1280];

  function ScrollImageParallaxListener ($images, breakpoints) {
    ScrollProxyListener.call(this);

    this.breakpoints = typeof breakpoints !== 'undefined' ? breakpoints : defaultBreakpoints;
    this.currentBreakpoint = -1;
    this.windowWidth = -1;

    this.direction = -1;
    this.scale = 1.2;

    this.$images = $images;
    this.imagesHeights = [];

    this.init = function() {
      this.$images.each((function(index, el){
        var $el = $(el),
          h = $el.height(),
          w = $el.width();
        this.imagesHeights[index] = h;
        TweenLite.set($el, { scale: this.scale, y: this.direction * (this.scale - 1) * h / 2, x: -(this.scale - 1) * w / 2} );
      }).bind(this));
    };

    this.doFrame = function() {
      this.$images.each((function (index, el) {
        var $el = $(el);
        var inViewportData = DomHelpers.getViewportData($el[0], this.windowDimensions.height);
        if (inViewportData.isInViewport) {
          var maxTranslate = (this.scale - 1) * this.imagesHeights[index],
            translate = this.direction * inViewportData.rect.top / this.windowDimensions.height * maxTranslate;
          TweenLite.to($el, .5, { y: Math.floor(translate) });
        }
      }).bind(this));
    };

    this.onResize = function(windowDimensions) {
      this.windowDimensions = windowDimensions;
      // Check breakpoint changed
      var breakpoint = this.getNearestBreakpoint(this.windowDimensions.width);
      if (this.currentBreakpoint !== breakpoint) {
        this.currentBreakpoint = breakpoint;
        this.init();
        this.doFrame();
      }
    };

    this.getNearestBreakpoint = function(width) {
      var breakpointIndex = 0;
      while (breakpointIndex < this.breakpoints.length) {
        if (width < this.breakpoints[breakpointIndex]) {
          return this.breakpoints[breakpointIndex];
        } else {
          breakpointIndex++;
        }
      }
    };

    this.reset = function() {
      TweenLite.killTweensOf(this.$images);
      TweenLite.set(this.$images, { clearProps: 'all' });
    };

    this.init();
  }
  ScrollImageParallaxListener.prototype = Object.create( ScrollProxyListener.prototype );

  // Expose ScrollImageParallaxListener
  window.ScrollImageParallaxListener = ScrollImageParallaxListener;

})(window, window.DomHelpers, window.ScrollProxyListener, jQuery, TweenLite);
