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

  constructor($sticky = requiredParameter(), $container = requiredParameter(), {stickyTopOffset = 0, stickyBottomOffset = 0, triggerOffset = 0} = {}) {
    super();

    this.$sticky = $sticky;
    this.$container = $container;
    this.stickyTopOffset = stickyTopOffset;
    this.stickyBottomOffset = stickyBottomOffset;
    this.triggerOffset = triggerOffset;

    this.maxStickyTranslate = -1;
    this.containerHeight = -1;
    this.stickyHeight = -1;

    this.containerOffsetTop = -1;
    this.stickyOffsetLeft = -1;

    this.init();
  }

  init() {
    this.reset();

    this.containerHeight = this.$container[0].getBoundingClientRect().height;
    this.stickyHeight = this.$sticky[0].getBoundingClientRect().height;
    this.stickyWidth = this.$sticky[0].getBoundingClientRect().width;

    this.maxStickyTranslate = Math.max(this.containerHeight - this.stickyHeight - this.stickyTopOffset - this.stickyBottomOffset, 0);
    this.stickyOffsetLeft = this.$sticky[0].getBoundingClientRect().left;

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  };

  reset() {
    TweenLite.killTweensOf(this.$sticky);
    TweenLite.set(this.$sticky, {clearProps: 'all', immediateRender: true});
  };

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    let stickyTranslate = 0;

    if (this.triggerOffset + this.containerOffsetTop < 0) {
      let absContainerOffsetTop = Math.abs(this.containerOffsetTop);
      stickyTranslate = absContainerOffsetTop >= this.maxStickyTranslate ? this.maxStickyTranslate : absContainerOffsetTop;
      if (stickyTranslate === this.maxStickyTranslate) {
        TweenLite.set(this.$sticky, {
          position: 'absolute',
          top: this.maxStickyTranslate + this.stickyTopOffset,
          left: ''
        });
      } else {
        TweenLite.set(this.$sticky, {
          position: 'fixed',
          top: this.stickyTopOffset,
          left: this.stickyOffsetLeft,
          width: this.stickyWidth
        });
      }
    } else {
      TweenLite.set(this.$sticky, {clearProps: 'all'});
    }
  }

  onScroll(scrollPosition) {
    this.setScrollPosition(scrollPosition);

    this.containerOffsetTop = Math.floor(this.$container[0].getBoundingClientRect().top);
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);

    this.init();
  }

  destroy() {
    super.destroy();

    this.reset();
  }

}

export default ScrollBasicStickyObserver;
