/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

/**
 * Generic Sticky element listener. Implements ScrollProxyListener 'Interface'
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
      this.reset();

      this.containerHeight = this.$container.height();
      this.stickyHeight = this.$sticky.outerHeight();
      this.stickyWidth = this.$sticky.outerWidth();

      this.maxStickyTranslate = Math.max(this.containerHeight - this.stickyHeight - this.stickyTopOffset - this.stickyBottomOffset, 0);
      this.stickyOffsetLeft = Math.floor(DomHelpers.getViewportData(this.$sticky.get(0), this.viewportSize).rect.left);

      this.onScroll();
      this.render();
    };

    this.render = function () {
      var stickyTranslate = 0;
      if (this.containerOffsetTop - this.triggerOffset < 0) {
        var absContainerOffsetTop = Math.abs(this.containerOffsetTop);
        stickyTranslate = absContainerOffsetTop >= this.maxStickyTranslate ? this.maxStickyTranslate : absContainerOffsetTop;
        if (stickyTranslate === this.maxStickyTranslate) {
          TweenLite.set(this.$sticky, { position: 'absolute', top: this.maxStickyTranslate + this.stickyTopOffset, left: '' });
        } else {
          TweenLite.set(this.$sticky, { position: 'fixed', top: this.stickyTopOffset, left: this.stickyOffsetLeft, width: this.stickyWidth });
        }
      } else {
        TweenLite.set(this.$sticky, { clearProps: 'all' });
      }
    };

    this.onScroll = function (latestKnownScrollPosition) {
      this.containerOffsetTop = Math.floor(DomHelpers.getViewportData(this.$container.get(0), this.viewportSize).rect.top);
    };

    this.onResize = function(viewportSize) {
      this.viewportSize = viewportSize;
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
