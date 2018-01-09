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
    this.stickyElement.style.width = `${this.stickyRect.width}px`;

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  };

  reset() {
    this.stickyElement.style.width = 'auto';
    this.stickyElement.style.position = 'relative';
    this.stickyElement.style.left = 'auto';
    this.stickyElement.style.top = '0px';
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
        this.stickyElement.style.position = 'absolute';
        this.stickyElement.style.top = `${this.maxStickyTranslate + this.stickyTopOffset}px`;
        this.stickyElement.style.left = 'auto';
      } else {
        this.stickyElement.style.position = 'fixed';
        this.stickyElement.style.top = `${this.stickyTopOffset}px`;
        this.stickyElement.style.left = `${this.stickyRect.left}px`;
      }
    } else {
      this.stickyElement.style.position = 'relative';
      this.stickyElement.style.top = '0px';
      this.stickyElement.style.left = 'auto';
    }
  }

  onScroll(scrollPosition) {
    this.setScrollPosition(scrollPosition);

    this.containerRect = this.containerElement.getBoundingClientRect();
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);
    this.reset();
    this.init();
  }

  destroy() {
    super.destroy();

    this.reset();
  }

}

export default ScrollBasicStickyObserver;
