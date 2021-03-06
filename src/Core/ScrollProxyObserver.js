/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DomHelpers from '../Helpers/DomHelpers';
import ScrollProxy from './ScrollProxy';

class ScrollProxyObserver {

  static STATE = {
    IDLE: 'IDLE',
    RUNNING: 'RUNNING'
  };

  constructor() {
    // Abstract class
    if (this.constructor === ScrollProxyObserver) {
      throw new TypeError("Abstract class ScrollProxyObserver cannot be instantiated directly.");
    }

    this.state = ScrollProxyObserver.STATE.RUNNING;
    this.scrollPosition = DomHelpers.getScrollPosition();
    this.viewportSize = DomHelpers.getViewportSize();
    // Add self as observer
    this.uuid = ScrollProxy.addObserver(this);

    this.setScrollPosition = (scrollPosition) => {
      this.scrollPosition = scrollPosition;
    };
  }

  setState(state) {
    this.state = state;
    this.onStateChanged(this.state);
  }

  onStateChanged(state) {
  }

  isRunning() {
    return this.state !== ScrollProxyObserver.STATE.IDLE;
  }

  onScroll(scrollPosition) {
    if (!this.isRunning()) {
      return;
    }

    this.setScrollPosition(scrollPosition);
  }

  updateDOM() {
    throw new TypeError("In order to extend ScrollProxyObserver class you must implement updateDOM method.");
  }

  onResize(viewportSize) {
    this.viewportSize = viewportSize;
  }

  destroy() {
    // Remove self from observers
    ScrollProxy.removeObserver(this.uuid);
  }

}

export default ScrollProxyObserver;
