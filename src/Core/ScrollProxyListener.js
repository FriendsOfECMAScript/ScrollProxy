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
   *   // Implement base class methods (render, onScroll, onResize, setState, onStateChanged)
   * }
 * SampleParallaxListener.prototype = Object.create( ScrollProxyListener.prototype );
 *
 * @constructor
 */
(function(window, DomHelpers, undefined) {

  function ScrollProxyListener() {
    this.state = undefined;
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
    /**
     * @param state
     */
    this.setState = function(state) {
      this.state = state;
      this.onStateChanged(this.state);
    };

    /**
     * @param state
     */
    this.onStateChanged = function(state) {

    };
  }

  ScrollProxyListener.STATE = {
    IDLE: 'IDLE',
    RUNNING: 'RUNNING'
  };

  // Expose ScrollProxyListener
  window.ScrollProxyListener = ScrollProxyListener;

})(window, window.DomHelpers);
