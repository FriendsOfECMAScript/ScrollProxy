/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DOMHelpers from '../Helpers/DOMHelpers';
import ScrollProxyObserver from './ScrollProxyObserver';
import debounce from 'lodash.debounce';

let _uuid = 0;
const getNextUuid = () => {
  return _uuid++;
};

class ScrollProxy {

  constructor() {
    this.observers = new Map();
    this.isUpdatingDOM = false;

    this.onScroll = () => {
      const scrollPosition = DOMHelpers.getScrollPosition();
      this.notifyObservers('onScroll', scrollPosition);
      this.requestDOMUpdate();
    };

    this.onResize = () => {
      const viewportSize = DOMHelpers.getViewportSize();
      this.notifyObservers('onResize', viewportSize);
    };

    this.requestDOMUpdate = () => {
      if (!this.isUpdatingDOM) {
        window.requestAnimationFrame(this.updateDOM);
      }
      this.isUpdatingDOM = true;
    };

    this.updateDOM = () => {
      this.notifyObservers('updateDOM');
      this.isUpdatingDOM = false;
    };

    this.notifyObservers = (methodName, ...methodParams) => {
      this.observers.forEach((observer, uuid) => {
        observer[methodName](...methodParams);
      });
    };

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', debounce(this.onResize, 200));
  }

  addObserver(observer) {
    if (!(observer instanceof ScrollProxyObserver)) {
      throw new TypeError('Provided object must inherit from ScrollProxyObserver abstract class.');
    }

    const uuid = getNextUuid();
    this.observers.set(uuid, observer);
    return uuid;
  };

  removeObserver(uuid) {
    return this.observers.delete(uuid);
  };
}

const instance = new ScrollProxy();

export default instance;
