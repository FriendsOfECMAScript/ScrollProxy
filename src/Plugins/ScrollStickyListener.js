/*
 * @author Mikel Tuesta <mikel@lin3s.com>
 */
'use strict';

/**
 * Main page parallax animation. Implements ScrollProxyListener 'Interface'
 *
 * @param $pageWrapper
 * @param $pageTitle
 * @param $pageSubTitle
 *
 * @constructor
 */
(function(window, DomHelpers, ScrollProxyListener, TweenLite) {

  function ScrollStickyListener($sticky, $container, stickyTopOffset, stickyBottomOffset, triggerOffset) {
    ScrollProxyListener.call(this);

    this.$sticky = $sticky;
    this.$container = $container;

    this.maxStickyTranslate = -1;
    this.containerHeight = -1;
    this.stickyHeight = -1;

    this.stickyTopOffset = typeof stickyTopOffset !== 'undefined' ? stickyTopOffset : 0;
    this.stickyBottomOffset = typeof stickyBottomOffset !== 'undefined' ? stickyBottomOffset : 0;
    this.containerOffsetTop = -1;
    this.stickyOffsetLeft = -1;
    this.triggerOffset = typeof triggerOffset !== 'undefined' ? triggerOffset : 0;

    this.init = function() {
      this.containerHeight = this.$container.height();
      this.stickyHeight = this.$sticky.height();

      this.maxStickyTranslate = Math.max(this.containerHeight - this.stickyHeight - this.stickyTopOffset - this.stickyBottomOffset, 0);
      this.stickyOffsetLeft = Math.floor(DomHelpers.getViewportData(this.$sticky.get(0)).rect.left);

      this.onScroll();
      this.doFrame();
    };

    this.doFrame = function () {
      var stickyTranslate = 0;
      if (this.containerOffsetTop - this.triggerOffset < 0) {
        var absContainerOffsetTop = Math.abs(this.containerOffsetTop);
        stickyTranslate = absContainerOffsetTop >= this.maxStickyTranslate ? this.maxStickyTranslate : absContainerOffsetTop;
        if (stickyTranslate === this.maxStickyTranslate) {
          TweenLite.set(this.$sticky, { position: 'absolute', top: this.maxStickyTranslate + this.stickyTopOffset, left: '' });
        } else {
          TweenLite.set(this.$sticky, { position: 'fixed', top: this.stickyTopOffset, left: this.stickyOffsetLeft });
        }
      } else {
        TweenLite.set(this.$sticky, { clearProps: 'all' });
      }
    };

    this.onScroll = function (latestKnownScrollY) {
      this.containerOffsetTop = Math.floor(DomHelpers.getViewportData(this.$container.get(0)).rect.top);
    };

    this.onResize = function(windowDimensions) {
      this.init();
    };

    this.reset = function() {
      TweenLite.killTweensOf(this.$sticky);
      TweenLite.set(this.$sticky, { clearProps: 'all' });
    };
  }

  ScrollStickyListener.prototype = Object.create(ScrollProxyListener.prototype);

  // Expose ScrollStickyListener
  window.ScrollStickyListener = ScrollStickyListener;

})(window, window.DomHelpers, window.ScrollProxyListener, TweenLite);
