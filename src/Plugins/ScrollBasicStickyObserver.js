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
import TweenLite from 'TweenLite';
import CSSPlugin from 'CSSPlugin';

class ScrollBasicStickyObserver extends ScrollProxyObserver {

  constructor(
    stickyElement = requiredParameter(),
    containerElement = requiredParameter(),
    {
      stickyTopOffset = 0,
      stickyBottomOffset = 0,
      triggerOffset = 0
    } = {}) {
    super();

    this.stickyElement = stickyElement;
    this.containerElement = containerElement;

    this.triggerOffset = triggerOffset;
    this.stickyTopOffset = stickyTopOffset;
    this.stickyBottomOffset = stickyBottomOffset;

    this.maxStickyTranslate = -1;

    this.stickyRect = {};
    this.containerRect = {};

    this.init();
  }

  init() {
    this.reset();

    this.stickyRect = this.stickyElement.getBoundingClientRect();
    this.containerRect = this.containerElement.getBoundingClientRect();

    this.maxStickyTranslate = Math.max(this.containerRect.height - this.stickyRect.height - this.stickyTopOffset - this.stickyBottomOffset, 0);

    // Set width (for fixed state)
    console.log(this.stickyRect.width);
    TweenLite.set(this.stickyElement, {width: this.stickyRect.width, immediateRender: true});

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  };

  reset() {
    TweenLite.killTweensOf(this.stickyElement);
    TweenLite.set(this.stickyElement, {clearProps: 'all', immediateRender: true});
  };

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    let stickyTranslate = 0;

    if (this.containerRect.top - this.triggerOffset < 0) {
      let absContainerOffsetTop = Math.abs(this.containerRect.top);
      stickyTranslate = absContainerOffsetTop >= this.maxStickyTranslate ? this.maxStickyTranslate : absContainerOffsetTop;
      if (stickyTranslate === this.maxStickyTranslate) {
        TweenLite.set(this.stickyElement, {
          position: 'absolute',
          top: this.maxStickyTranslate + this.stickyTopOffset,
          left: ''
        });
      } else {
        TweenLite.set(this.stickyElement, {
          position: 'fixed',
          top: this.stickyTopOffset,
          left: this.stickyRect.left
        });
      }
    } else {
      TweenLite.set(this.stickyElement, {clearProps: 'position, top, left'});
    }
  }

  onScroll(scrollPosition) {
    this.setScrollPosition(scrollPosition);

    this.containerRect = this.containerElement.getBoundingClientRect();
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

export default ScrollBasicStickyObserver;
