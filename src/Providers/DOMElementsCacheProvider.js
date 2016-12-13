/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {requiredParameter} from '../Helpers/ECMAScriptHelpers';
import {Position2D, Dimension2D, DOMElementRect} from '../Helpers/GeometricHelpers';

class DOMElementsCacheProvider {
  constructor() {
    this.elements = new Map();

    this.addElement = (element, elementRect) => {
      if (!(elementRect instanceof DOMElementRect)) {
        throw new TypeError('Provided object must be an instance of DOMElementRect class.');
      }

      this.elements.set(element, elementRect);
    };

    this.removeElement = (element) => {
      return this.elements.delete(element);
    };
  }

  getElementCacheRect(element = requiredParameter(), scrollOffset) {
    if (element === undefined) {
      return;
    }

    if (this.elements.get(element) === undefined) {
      const elementRect = element.getBoundingClientRect();
      // Normalize top/left with current scroll position
      this.addElement(element, new DOMElementRect(
        new Position2D(elementRect.left - scrollOffset.x, elementRect.top - scrollOffset.y),
        new Dimension2D(elementRect.height, elementRect.width)
      ));
    }
    return this.elements.get(element);
  }
}

const instance = new DOMElementsCacheProvider();

export default instance;
