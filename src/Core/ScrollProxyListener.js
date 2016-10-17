/*
 * @author Mikel Tuesta <mikel@lin3s.com>
 */
'use strict';

/**
 * ScrollProxyListener Base Class
 *
 * usage
 *
 * function SampleParallaxListener () {
   *   ScrollProxyListener.call(this);
   *   // Implement base class methods (doFrame, onScroll, onResize)
   * }
 * SampleParallaxListener.prototype = Object.create( ScrollProxyListener.prototype );
 *
 * @constructor
 */
(function(window, DomHelpers, undefined) {

  function ScrollProxyListener() {
    this.windowDimensions = DomHelpers.getWindowDimensions();
    this.latestKnownScrollY = undefined;
    this.doFrame = function () {

    };
    this.onScroll = function (latestKnownScrollY) {
      this.latestKnownScrollY = latestKnownScrollY;
    };
    this.onResize = function (windowDimensions) {
      this.windowDimensions = windowDimensions;
    };
  }

  // Expose ScrollProxyListener
  window.ScrollProxyListener = ScrollProxyListener;

})(window, window.DomHelpers);
