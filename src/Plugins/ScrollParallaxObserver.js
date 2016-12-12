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
import DOMHelpers from '../Helpers/DOMHelpers';
import TweenLite from 'TweenLite';
import CSSPlugin from 'CSSPlugin';

class ScrollParallaxObserver extends ScrollProxyObserver {

  static DIRECTION = {
    POSITIVE: 1,
    NEGATIVE: -1
  };

  constructor($elements = requiredParameter(), {direction = ScrollParallaxObserver.DIRECTION.NEGATIVE, maxTranslate = 200} = {}) {
    super();

    this.direction = direction;
    this.maxTranslate = maxTranslate;

    this.$elements = Array.from($elements);
    this.elementsHeights = [];

    this.init();
  }

  init() {
    this.reset();

    this.$elements.forEach((element, index) => {
      this.elementsHeights[index] = element.offsetHeight;
    });

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  reset() {
    TweenLite.killTweensOf(this.$elements);
    TweenLite.set(this.$elements, {clearProps: 'all'});
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    this.$elements.forEach((element, index) => {
      const inViewportData = DOMHelpers.getViewportData(element, this.viewportSize);
      if (inViewportData.isInViewport) {
        const percentage = inViewportData.rect.bottom / ( this.viewportSize.height + this.elementsHeights[index] ),
          translate = (percentage - .5) * this.direction * this.maxTranslate;

        TweenLite.to(element, .5, {y: translate});
      }
    });
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);

    this.init();
  }
}

export default ScrollParallaxObserver;
