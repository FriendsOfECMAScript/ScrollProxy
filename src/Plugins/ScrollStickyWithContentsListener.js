/*
 * @author Mikel Tuesta <mikel@lin3s.com>
 */
'use strict';

/**
 * Sticky generic listener. Implements ScrollProxyListener 'Interface'
 * If the sticky element exceeds viewport's height, it will scroll until sticky's top/bottom is reached.
 *
 * @param $sticky
 * @param $container
 * @param stickyTopOffset
 * @param stickyBottomOffset
 *
 * @constructor
 */
(function(window, DomHelpers, ScrollProxyListener, TweenLite) {

  var SCROLL_DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
  };

  function ScrollStickyWithContentsListener($sticky, $container, stickyTopOffset, stickyBottomOffset, triggerOffset) {
    ScrollProxyListener.call(this);

    this.latestKnownScrollY = 0;
    this.latestKnownScrollYDelta = 0;
    this.scrollDirection = null;

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

    this.stickyRect = {};

    this.init = function() {
      this.latestKnownScrollY = window.pageYOffset;

      this.containerHeight = this.$container.height();
      this.stickyHeight = this.$sticky.height();
      this.stickyWidth = this.$sticky.parent().outerWidth();

      this.maxStickyTranslate = Math.max(this.containerHeight - this.stickyHeight - this.stickyTopOffset - this.stickyBottomOffset, 0);
      this.stickyOffsetLeft = Math.floor(DomHelpers.getViewportData(this.$sticky.get(0)).rect.left);

      this.onScroll();
      this.doFrame();
    };

    this.doFrame = function () {
      var stickyTranslate = 0,
        stickyExceedsViewport = this.stickyHeight > this.windowDimensions.height;

      if (this.containerOffsetTop - this.triggerOffset < 0) {
        var absContainerOffsetTop = Math.abs(this.containerOffsetTop),
          maxStickyInnerTranslateY = this.stickyHeight - this.windowDimensions.height + this.stickyTopOffset + this.stickyBottomOffset,
          currentStickyTop = this.stickyRect.top;
        stickyTranslate = absContainerOffsetTop >= this.maxStickyTranslate ? this.maxStickyTranslate : absContainerOffsetTop;

        if (stickyTranslate === this.maxStickyTranslate) {
          TweenLite.set(this.$sticky, { position: 'absolute', top: this.maxStickyTranslate, left: '' });
        } else {
          var top = 0;
          if (stickyExceedsViewport) {
            if (isNaN(this.latestKnownScrollYDelta)) {
              if (this.scrollDirection === SCROLL_DIRECTION.UP) {
                this.latestKnownScrollYDelta = 0;
              } else {
                this.latestKnownScrollYDelta = - maxStickyInnerTranslateY;
              }
            }
            top = Math.floor(Math.min(Math.max(currentStickyTop + this.latestKnownScrollYDelta, - maxStickyInnerTranslateY), this.stickyTopOffset));
          } else {
            top = this.stickyTopOffset;
          }
          TweenLite.set(this.$sticky, { position: 'fixed', top: 0, y: top, left: this.stickyOffsetLeft, width: this.stickyWidth });
        }
      } else {
        TweenLite.set(this.$sticky, { clearProps: 'all' });
      }
    };

    this.onScroll = function (latestKnownScrollY) {
      this.scrollDirection = this.latestKnownScrollY > latestKnownScrollY ? SCROLL_DIRECTION.UP : SCROLL_DIRECTION.DOWN;
      this.latestKnownScrollYDelta = this.latestKnownScrollY - latestKnownScrollY;
      this.latestKnownScrollY = latestKnownScrollY;

      this.stickyRect = DomHelpers.getViewportData(this.$sticky.get(0)).rect;
      this.containerOffsetTop = Math.floor(DomHelpers.getViewportData(this.$container.get(0)).rect.top);
    };

    this.onResize = function(windowDimensions) {
      this.windowDimensions = windowDimensions;
      this.init();
    };

    this.reset = function() {
//       TweenLite.killTweensOf(this.$sticky);
      TweenLite.set(this.$sticky, { clearProps: 'all' });
    };
  }

  ScrollStickyWithContentsListener.prototype = Object.create(ScrollProxyListener.prototype);

  // Expose ScrollStickyListener
  window.ScrollStickyWithContentsListener = ScrollStickyWithContentsListener;

})(window, window.DomHelpers, window.ScrollProxyListener, TweenLite);
