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

  static UPDATE_MODE = {
    RAF: 'RAF',
    SCROLL: 'SCROLL'
  };

  constructor($elements = requiredParameter(), {updateMode = ScrollInViewportObserver.UPDATE_MODE.RAF, trackDirections = false, visibleFn = () => {}, invisibleFn = () => {}} = {}) {
    super();

    this.updateMode = updateMode;
    this.trackDirections = trackDirections;
    this.visibleFn = visibleFn;
    this.invisibleFn = invisibleFn;

    this.$elements = Array.from($elements);
    this.elementsViewportData = [];

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
    this.setScrollPosition(scrollPosition);

    if (this.updateMode === ScrollInViewportObserver.UPDATE_MODE.SCROLL) {
      this.$elements.forEach((element, index) => {
        this.updateElementViewportData(element, index);
      });
    }
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    this.$elements.forEach((element, index) => {
      if (this.updateMode === ScrollInViewportObserver.UPDATE_MODE.RAF) {
        this.updateElementViewportData(element, index);
      }

      const updatedInViewportData = this.elementsViewportData[index];
      if (updatedInViewportData.isInViewport && !updatedInViewportData.wasInViewport) {
        this.visibleFn(index, element, updatedInViewportData.fromVertical, updatedInViewportData.fromHorizontal);
      } else if (!updatedInViewportData.isInViewport && updatedInViewportData.wasInViewport) {
        this.invisibleFn(index, element, updatedInViewportData.toVertical, updatedInViewportData.toHorizontal);
      }
    });
  }

  updateElementViewportData(element, index) {
    let inViewportData = this.elementsViewportData[index],
      newInViewportData = DOMHelpers.getViewportData(element, this.viewportSize);

    if (inViewportData !== undefined) {
      newInViewportData.wasInViewport = inViewportData.isInViewport;

      if (this.trackDirections) {
        if (inViewportData.isInViewport && !newInViewportData.isInViewport) {
          // Element has become invisible in viewport
          newInViewportData.toVertical = inViewportData.rect.top > newInViewportData.rect.top ? ScrollInViewportObserver.IN_VIEWPORT.TO.TOP : ScrollInViewportObserver.IN_VIEWPORT.TO.BOTTOM;
          newInViewportData.toHorizontal = inViewportData.rect.left > newInViewportData.rect.left ? ScrollInViewportObserver.IN_VIEWPORT.TO.LEFT : ScrollInViewportObserver.IN_VIEWPORT.TO.RIGHT;
        } else if (!inViewportData.isInViewport && newInViewportData.isInViewport) {
          // Element has become visible in viewport
          newInViewportData.fromVertical = inViewportData.rect.top < newInViewportData.rect.top ? ScrollInViewportObserver.IN_VIEWPORT.FROM.TOP : ScrollInViewportObserver.IN_VIEWPORT.FROM.BOTTOM;
          newInViewportData.fromHorizontal = inViewportData.rect.left < newInViewportData.rect.left ? ScrollInViewportObserver.IN_VIEWPORT.FROM.LEFT : ScrollInViewportObserver.IN_VIEWPORT.FROM.RIGHT;
        }
      }
    }
    this.elementsViewportData[index] = newInViewportData;
  }
}

export default ScrollInViewportObserver;
