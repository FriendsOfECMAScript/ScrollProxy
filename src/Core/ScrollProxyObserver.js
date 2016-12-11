/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DOMHelpers from '../Helpers/DOMHelpers';
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

    // Child has not implemented this abstract method.
    if (this.updateDOM === ScrollProxyObserver.prototype.updateDOM) {
      throw new TypeError("In order to extend ScrollProxyObserver class you must implement updateDOM method.");
    }

    this.state = ScrollProxyObserver.STATE.RUNNING;
    this.scrollPosition = DOMHelpers.getScrollPosition();
    this.viewportSize = DOMHelpers.getViewportSize();
    // Add self as observer
    this.uuid = ScrollProxy.addObserver(this);
  }

  setState(state) {
    this.state = state;
    this.onStateChanged(this.state);
  }

  onStateChanged(state) {
  }

  onScroll(scrollPosition) {
    if (this.state === ScrollProxyObserver.STATE.IDLE) return false;
    this.scrollPosition = scrollPosition;
  }

  onResize(viewportSize) {
    this.viewportSize = viewportSize;
  }

  updateDOM() {
    if (this.state === ScrollProxyObserver.STATE.IDLE) return false;
  }

  destroy() {
    // Remove self from observers
    ScrollProxy.removeObserver(this.uuid);
  }

}

export default ScrollProxyObserver;
