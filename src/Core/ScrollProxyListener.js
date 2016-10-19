/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
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
    this.viewportSize = DomHelpers.getViewportSize();
    this.latestKnownScrollPosition = undefined;

    this.render = function () {

    };
    /**
     * @param latestKnownScrollPosition {GeometricHelpers.Position2D}
     */
    this.onScroll = function (latestKnownScrollPosition) {
      this.latestKnownScrollPosition = latestKnownScrollPosition;
    };
    /**
     * @param viewportSize {GeometricHelpers.Dimension2D}
     */
    this.onResize = function (viewportSize) {
      this.viewportSize = viewportSize;
    };
  }

  // Expose ScrollProxyListener
  window.ScrollProxyListener = ScrollProxyListener;

})(window, window.DomHelpers);
