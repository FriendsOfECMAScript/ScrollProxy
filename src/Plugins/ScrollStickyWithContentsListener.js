/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
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
(function(window, DomHelpers, ScrollProxyListener, TweenLite, undefined) {

  var SCROLL_DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
  };

  function ScrollStickyWithContentsListener($sticky, $container, stickyOffsetTop, stickyOffsetBottom, triggerOffset) {
    ScrollProxyListener.call(this);

    this.latestKnownScrollY = 0;
    this.latestKnownScrollYDelta = 0;
    this.scrollDirection = null;

    this.$sticky = $sticky;
    this.$container = $container;

    this.triggerOffset = triggerOffset !== undefined ? triggerOffset : 0;
    this.stickyOffsetTop = stickyOffsetTop !== undefined ? stickyOffsetTop : 0;
    this.stickyOffsetBottom = stickyOffsetBottom !== undefined ? stickyOffsetBottom : 0;
    this.stickyOffsetLeft = -1;
    this.containerOffsetTop = -1;

    this.maxStickyTranslate = -1;
    this.maxStickyInnerTranslateY = 0;
    this.containerHeight = -1;
    this.stickyHeight = -1;
    this.stickyExceedsViewport = false;

    this.stickyRect = {};

    this.init = function () {
      this.setState(ScrollProxyListener.STATE.RUNNING);
      this.reset();

      this.latestKnownScrollY = window.pageYOffset;

      this.containerHeight = this.$container.outerHeight(true);
      this.stickyHeight = this.$sticky.outerHeight(true);
      this.stickyWidth = this.$sticky.outerWidth(true);
      this.stickyOffsetLeft = Math.floor(DomHelpers.getViewportData(this.$sticky.get(0), this.viewportSize).rect.left);

      this.stickyFullHeight = this.stickyHeight + this.stickyOffsetTop + this.stickyOffsetBottom;

      this.stickyExceedsViewport = this.stickyFullHeight > this.viewportSize.height;
      this.maxStickyTranslate = Math.max(this.containerHeight - this.stickyHeight - this.stickyOffsetTop);
      this.maxStickyInnerTranslateY = (this.stickyHeight + this.stickyOffsetBottom) - this.viewportSize.height;

      // sticky break limit
      this.maxST = this.stickyExceedsViewport ? this.maxStickyTranslate + this.maxStickyInnerTranslateY + this.stickyOffsetTop : this.maxStickyTranslate;

      this.onScroll();
      this.render();
    };

    this.onStateChanged = function(state) {
      switch (state) {
        case ScrollProxyListener.STATE.IDLE:
          this.setScrollObserve(false);
          this.setRenderNeeded(false);
          break;
        case ScrollProxyListener.STATE.RUNNING:
          this.setScrollObserve(true);
          this.setRenderNeeded(true);
      }
    };

    this.setScrollObserve = function(observeScroll) {
      this.observeScroll = observeScroll;
    };

    this.setRenderNeeded = function(needsRender) {
      this.needsRender = needsRender;
    };

    this.render = function () {
      if (!this.needsRender) return;

      if (this.containerOffsetTop - this.triggerOffset < 0) {


        var absContainerOffsetTop = Math.abs(this.containerOffsetTop),
          stickyTranslate = absContainerOffsetTop >= this.maxST ? this.maxST : absContainerOffsetTop;

        if (stickyTranslate === this.maxST) {
          TweenLite.set(this.$sticky, { position: 'absolute', top: this.maxStickyTranslate + this.stickyOffsetTop, y: '', left: '' });
        } else {
          var top = 0;
          if (this.stickyExceedsViewport) {
            if (isNaN(this.latestKnownScrollYDelta)) {
              if (this.scrollDirection === SCROLL_DIRECTION.UP) {
                this.latestKnownScrollYDelta = 0;
              } else {
                this.latestKnownScrollYDelta = -this.maxStickyInnerTranslateY;
              }
            }

            top = Math.floor(Math.min(Math.max(this.stickyRect.top + this.latestKnownScrollYDelta, - this.maxStickyInnerTranslateY), this.stickyOffsetTop));
          } else {
            top = this.stickyOffsetTop;
          }
          TweenLite.set(this.$sticky, { position: 'fixed', top: 0, y: top, left: this.stickyOffsetLeft, width: this.stickyWidth });
        }
      } else {
        TweenLite.set(this.$sticky, {clearProps: 'all'});
      }
    };

    this.onScroll = function (latestKnownScrollPosition) {
      if (!this.observeScroll) return;


      if (latestKnownScrollPosition === undefined) {
        latestKnownScrollPosition = DomHelpers.getScrollPosition();
      }

      this.scrollDirection = this.latestKnownScrollY > latestKnownScrollPosition.y ? SCROLL_DIRECTION.UP : SCROLL_DIRECTION.DOWN;
      this.latestKnownScrollYDelta = this.latestKnownScrollY - latestKnownScrollPosition.y;
      this.latestKnownScrollY = latestKnownScrollPosition.y;

      this.stickyRect = DomHelpers.getViewportData(this.$sticky.get(0), this.viewportSize).rect;
      this.containerOffsetTop = DomHelpers.getViewportData(this.$container.get(0), this.viewportSize).rect.top;
    };

    this.onResize = function (viewportSize) {
      this.viewportSize = viewportSize;
      this.init();
    };

    this.reset = function () {
      TweenLite.set(this.$container, {position: 'relative'});
      TweenLite.set(this.$sticky, {clearProps: 'all'});
    };
  }

  ScrollStickyWithContentsListener.prototype = Object.create(ScrollProxyListener.prototype);

  // Expose ScrollStickyListener
  window.ScrollStickyWithContentsListener = ScrollStickyWithContentsListener;

})(window, window.DomHelpers, window.ScrollProxyListener, TweenLite);
