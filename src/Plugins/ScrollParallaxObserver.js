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
import DomHelpers from '../Helpers/DomHelpers';

class ScrollParallaxObserver extends ScrollProxyObserver {

  static DIRECTION = {
    POSITIVE: 1,
    NEGATIVE: -1
  };

  constructor(
    $elements = requiredParameter(),
    {
      direction = ScrollParallaxObserver.DIRECTION.NEGATIVE,
      maxTranslate = 200
    } = {}) {
    super();

    this.direction = direction;
    this.maxTranslate = maxTranslate;

    this.elements = Array.from($elements);
    this.elementsHeights = [];

    this.init();
  }

  init() {
    this.reset();

    this.elements.forEach((element, index) => {
      this.elementsHeights[index] = element.offsetHeight;
    });

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  reset() {
    this.elements.forEach(element => {
      element.style.transform = 'none';
    });
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    this.elements.forEach((element, index) => {
      const inViewportData = DomHelpers.getViewportData(element, this.viewportSize);
      if (inViewportData.isInViewport) {
        const percentage = (inViewportData.rect.position.y + inViewportData.rect.dimension.height) / ( this.viewportSize.height + this.elementsHeights[index] ),
          translate = (percentage - .5) * this.direction * this.maxTranslate;

        DomHelpers.setTransform(element, {y: translate});
      }
    });
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);

    this.init();
  }
}

export default ScrollParallaxObserver;
