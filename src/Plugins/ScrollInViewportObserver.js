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
import {Position2D} from '../Helpers/GeometricHelpers';

import DOMElementsCacheProvider from '../Providers/DOMElementsCacheProvider';

class ScrollInViewportObserver extends ScrollProxyObserver {

  static IN_VIEWPORT = {
    FROM: {
      TOP: 'FROM-TOP',
      BOTTOM: 'FROM-BOTTOM',
      LEFT: 'FROM-LEFT',
      RIGHT: 'FROM-RIGHT'
    },
    TO: {
      TOP: 'TO-TOP',
      BOTTOM: 'TO-BOTTOM',
      LEFT: 'TO-LEFT',
      RIGHT: 'TO-RIGHT'
    }
  };

  static UPDATE_MODE = {
    RAF: 'RAF',
    SCROLL: 'SCROLL'
  };

  constructor(
    $elements = requiredParameter(),
    {
      cache = false,
      trackDirections = false,
      visibleFn = () => {},
      invisibleFn = () => {}
    } = {}) {
    super();

    this.cache = cache;
    this.trackDirections = trackDirections;
    this.visibleFn = visibleFn;
    this.invisibleFn = invisibleFn;

    this.$elements = Array.from($elements);
    this.elementsViewportData = [];

    this.scrollOffset = new Position2D();
    this.prevScrollOffset = new Position2D();

    this.init();
  }

  init() {
    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  addElements($elements) {
    this.$elements.push(...$elements);
  };

  onScroll(scrollPosition) {
    if (!this.isRunning()) {
      return;
    }

    if (this.cache) {
      this.scrollOffset.y = -scrollPosition.y;
      this.scrollOffset.x = -scrollPosition.x;

      if (this.trackDirections) {
        this.prevScrollOffset.y = -this.scrollPosition.y;
        this.prevScrollOffset.x = -this.scrollPosition.x;
      }
    }

    this.setScrollPosition(scrollPosition);
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    this.$elements.forEach((element, index) => {
      this.updateElementViewportData(element, index);
      const updatedInViewportData = this.elementsViewportData[index];

      if (updatedInViewportData.isInViewport && !updatedInViewportData.wasInViewport) {
        this.visibleFn(index, element, updatedInViewportData.fromVertical, updatedInViewportData.fromHorizontal);
      } else if (!updatedInViewportData.isInViewport && updatedInViewportData.wasInViewport) {
        this.invisibleFn(index, element, updatedInViewportData.toVertical, updatedInViewportData.toHorizontal);
      }
    });
  }

  updateElementViewportData(element, index) {
    const previousInViewportData = this.elementsViewportData[index];
    let inViewportData;
    if (this.cache) {
      const elementRect = DOMElementsCacheProvider.getElementCacheRect(element, this.scrollOffset);
      inViewportData = {
        rect: elementRect,
        isInViewport: DomHelpers.isInViewport(elementRect, this.viewportSize, this.scrollOffset)
      };
    } else {
      inViewportData = DomHelpers.getViewportData(element, this.viewportSize);
    }

    if (previousInViewportData !== undefined) {
      inViewportData.wasInViewport = previousInViewportData.isInViewport;

      if (this.trackDirections) {
        const previousTop = previousInViewportData.rect.position.y + (this.cache ? this.prevScrollOffset.y : 0),
          top = inViewportData.rect.position.y + (this.cache ? this.scrollOffset.y : 0),
          previousLeft = previousInViewportData.rect.position.x + (this.cache ? this.prevScrollOffset.x : 0),
          left = inViewportData.rect.position.x + (this.cache ? this.scrollOffset.x : 0);

        if (previousInViewportData.isInViewport && !inViewportData.isInViewport) {
          // Element has become invisible in viewport
          inViewportData.toVertical = previousTop > top ? ScrollInViewportObserver.IN_VIEWPORT.TO.TOP : ScrollInViewportObserver.IN_VIEWPORT.TO.BOTTOM;
          inViewportData.toHorizontal = previousLeft > left ? ScrollInViewportObserver.IN_VIEWPORT.TO.LEFT : ScrollInViewportObserver.IN_VIEWPORT.TO.RIGHT;
        } else if (!previousInViewportData.isInViewport && inViewportData.isInViewport) {
          // Element has become visible in viewport
          inViewportData.fromVertical = previousTop < top ? ScrollInViewportObserver.IN_VIEWPORT.FROM.TOP : ScrollInViewportObserver.IN_VIEWPORT.FROM.BOTTOM;
          inViewportData.fromHorizontal = previousLeft < left ? ScrollInViewportObserver.IN_VIEWPORT.FROM.LEFT : ScrollInViewportObserver.IN_VIEWPORT.FROM.RIGHT;
        }
      }
    }

    this.elementsViewportData[index] = inViewportData;
  }
}

export default ScrollInViewportObserver;
