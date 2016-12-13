/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {requiredParameter} from '../Helpers/ECMAScriptHelpers';
import ScrollProxyObserver from '../Core/ScrollProxyObserver';

import TweenLite from 'gsap/src/uncompressed/TweenLite';
import CSSPlugin from 'gsap/src/uncompressed/plugins/CSSPlugin';

class ScrollAdvancedStickyObserver extends ScrollProxyObserver {

  static SCROLL_DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
  };

  constructor(
    stickyCandidateElementA = requiredParameter(),
    stickyCandidateElementB = requiredParameter(),
    container = requiredParameter(),
    {
      triggerOffset = 0,
      stickyOffsetTop = 0,
      stickyOffsetBottom = 0,
      stickyInnerOffsetTop = 0,
      stickyInnerOffsetBottom = 0
    } = {}) {
    super();

    this.stickyIsNeeded = false;

    // Sticky, candidates, and container
    this.stickyElement = null;
    this.stickyCandidateElementA = stickyCandidateElementA;
    this.stickyCandidateElementB = stickyCandidateElementB;
    this.containerElement = container;

    // Sticky and container boundaries
    this.triggerOffset = triggerOffset;
    this.stickyOffsetTop = stickyOffsetTop;
    this.stickyOffsetBottom = stickyOffsetBottom;
    this.stickyInnerOffsetTop = stickyInnerOffsetTop;
    this.stickyInnerOffsetBottom = stickyInnerOffsetBottom;

    // Cached values
    this.maxStickyTranslate = -1;
    this.maxStickyInnerTranslateY = 0;
    this.stickyExceedsViewport = false;
    this.stickyRect = {};
    this.containerRect = {};

    // Inner translation
    this.latestKnownScrollY = 0;
    this.latestKnownScrollYDelta = 0;
    this.scrollDirection = null;

    this.init();
  }

  init() {
    this.reset();

    // Set if sticky is needed and if so, which stickySubject will play as the sticky element
    const stickyCandidateElementARect = this.stickyCandidateElementA.getBoundingClientRect(),
      stickyCandidateElementBRect = this.stickyCandidateElementB.getBoundingClientRect();

    if (stickyCandidateElementARect.height > stickyCandidateElementBRect.height) {
      this.stickyElement = this.stickyCandidateElementB;
      this.stickyRect = stickyCandidateElementBRect;
    } else {
      this.stickyElement = this.stickyCandidateElementA;
      this.stickyRect = stickyCandidateElementARect;
    }
    this.containerRect = this.containerElement.getBoundingClientRect();

    this.stickyIsNeeded = this.stickyRect.height + this.stickyOffsetBottom < this.containerRect.height;

    if (!this.stickyIsNeeded) {
      return;
    }

    this.latestKnownScrollY = window.pageYOffset;

    this.stickyExceedsViewport = this.stickyRect.height + this.stickyInnerOffsetTop + this.stickyInnerOffsetBottom > this.viewportSize.height;
    this.maxStickyTranslate = this.containerRect.height - (this.stickyRect.height + this.stickyOffsetBottom);
    this.maxStickyInnerTranslateY = this.stickyRect.height + this.stickyInnerOffsetBottom - this.viewportSize.height;

    // sticky break limit
    this.maxST = this.stickyExceedsViewport
      ? this.containerRect.height - this.viewportSize.height + this.triggerOffset + (this.stickyInnerOffsetBottom - this.stickyOffsetBottom)
      : this.maxStickyTranslate - this.stickyOffsetTop + this.triggerOffset;

    // Set width (for fixed state)
    this.stickyElement.style.width = this.stickyRect.width + 'px';

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  setOffsets({
    triggerOffset = 0,
    stickyOffsetTop = 0,
    stickyOffsetBottom = 0,
    stickyInnerOffsetTop = 0,
    stickyInnerOffsetBottom = 0
  } = {}) {
    this.triggerOffset = triggerOffset;
    this.stickyOffsetTop = stickyOffsetTop;
    this.stickyOffsetBottom = stickyOffsetBottom;
    this.stickyInnerOffsetTop = stickyInnerOffsetTop;
    this.stickyInnerOffsetBottom = stickyInnerOffsetBottom;
    this.init();
  }

  reset() {
    if (this.stickyElement !== null) {
      TweenLite.killTweensOf(this.stickyElement);
      TweenLite.set(this.stickyElement, {clearProps: 'all', immediateRender: true});
    }
  }

  isRunning() {
    return super.isRunning() && this.stickyIsNeeded;
  }

  onScroll(scrollPosition) {
    if (!this.isRunning()) {
      return;
    }

    this.setScrollPosition(scrollPosition);

    this.stickyRect = this.stickyElement.getBoundingClientRect();
    this.containerRect = this.containerElement.getBoundingClientRect();

    if (this.stickyExceedsViewport) {
      this.scrollDirection = this.latestKnownScrollY > this.scrollPosition.y
        ? ScrollAdvancedStickyObserver.SCROLL_DIRECTION.UP
        : ScrollAdvancedStickyObserver.SCROLL_DIRECTION.DOWN;
      this.latestKnownScrollYDelta = this.latestKnownScrollY - this.scrollPosition.y;
      this.latestKnownScrollY = this.scrollPosition.y;
    }
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    const stickyCondition = this.stickyExceedsViewport
      ? this.containerRect.top - this.triggerOffset + (this.stickyOffsetTop - this.stickyInnerOffsetTop) < 0
      : this.containerRect.top - this.triggerOffset < 0;

    if (stickyCondition) {
      const absContainerOffsetTop = Math.abs(this.containerRect.top - this.triggerOffset),
        stickyTranslate = absContainerOffsetTop >= this.maxST ? this.maxST : absContainerOffsetTop;

      if (stickyTranslate === this.maxST) {
        TweenLite.set(this.stickyElement, {position: 'absolute', top: this.maxStickyTranslate, y: '', left: ''});
      } else {
        const top = this.stickyExceedsViewport
          ? Math.floor(
          Math.min(
            Math.max(
              this.stickyRect.top + this.latestKnownScrollYDelta,
              -this.maxStickyInnerTranslateY
            ),
            this.stickyInnerOffsetTop
          ))
          : this.stickyOffsetTop;
        TweenLite.set(this.stickyElement, {position: 'fixed', top: 0, y: top, left: this.stickyRect.left});
      }
    } else {
      TweenLite.set(this.stickyElement, {clearProps: 'position, top, y, left'});
    }
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);

    TweenLite.set(this.stickyElement, {clearProps: 'width', immediateRender: true});
    this.init();
  }

  destroy() {
    super.destroy();

    this.reset();
  }
}

export default ScrollAdvancedStickyObserver;
