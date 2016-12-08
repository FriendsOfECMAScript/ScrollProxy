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

  /**
   *
   * @param $elements | Dom Elements array
   * @param visibleFn | callback function that will be executed once an element has become visible
   * @param invisibleFn | callback function that will be executed once an element has become invisible
   */
  constructor($elements = requiredParameter(), {visibleFn = () => {}, invisibleFn = () => {}} = {}) {
    super();

    this.visibleFn = visibleFn;
    this.invisibleFn = invisibleFn;

    this.$elements = Array.from($elements);
    this.elementsViewportData = [];

    this.init();
  }

  init() {
    this.onScroll();
    this.updateDOM();
  }

  addElements($elements) {
    this.$elements.push(...$elements);
  };

  refreshElementsViewportData() {
    this.$elements.forEach((element, index) => {
      let inViewportData = this.elementsViewportData[index],
        newInViewportData = DOMHelpers.getViewportData(element, this.viewportSize),
        elementWasVisible = false,
        elementIsVisible = false;

      if (inViewportData !== undefined) {
        // We have previous data
        elementWasVisible = inViewportData.isInViewport;
        elementIsVisible = newInViewportData.isInViewport;

        if (elementWasVisible && !elementIsVisible) {
          // Element has become invisible in viewport
          newInViewportData.toVertical = inViewportData.rect.top > newInViewportData.rect.top ? ScrollInViewportObserver.IN_VIEWPORT.TO.TOP : ScrollInViewportObserver.IN_VIEWPORT.TO.BOTTOM;
          newInViewportData.toHorizontal = inViewportData.rect.left > newInViewportData.rect.left ? ScrollInViewportObserver.IN_VIEWPORT.TO.LEFT : ScrollInViewportObserver.IN_VIEWPORT.TO.RIGHT;

        } else if (!elementWasVisible && elementIsVisible) {
          // Element has become visible in viewport
          newInViewportData.fromVertical = inViewportData.rect.top < newInViewportData.rect.top ? ScrollInViewportObserver.IN_VIEWPORT.FROM.TOP : ScrollInViewportObserver.IN_VIEWPORT.FROM.BOTTOM;
          newInViewportData.fromHorizontal = inViewportData.rect.left < newInViewportData.rect.left ? ScrollInViewportObserver.IN_VIEWPORT.FROM.LEFT : ScrollInViewportObserver.IN_VIEWPORT.FROM.RIGHT;
        }
        newInViewportData.wasInViewport = elementWasVisible;
      }
      this.elementsViewportData[index] = newInViewportData;
    });
  }

  updateDOM() {
    super.updateDOM();

    this.refreshElementsViewportData();

    this.$elements.forEach((element, index) => {
      const inViewportData = this.elementsViewportData[index];
      if (inViewportData.isInViewport && !inViewportData.wasInViewport) {
        this.visibleFn(index, element, inViewportData.fromVertical, inViewportData.fromHorizontal);
      } else if (!inViewportData.isInViewport && inViewportData.wasInViewport) {
        this.invisibleFn(index, element, inViewportData.toVertical, inViewportData.toHorizontal);
      }
    });
  }
}

export default ScrollInViewportObserver;
