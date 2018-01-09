/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {Position2D, Dimension2D, DOMElementRect} from './GeometricHelpers';

class DomHelpers {

  static getDocumentHeight() {
    const body = document.body,
      html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }

  static getViewportSize() {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];

    return new Dimension2D(
      w.innerHeight || e.clientHeight || g.clientHeight,
      w.innerWidth || e.clientWidth || g.clientWidth
    );
  };

  static getViewportData(element, viewportSize) {
    const rect = element.getBoundingClientRect(),
      elementRect = new DOMElementRect(new Position2D(rect.left, rect.top), new Dimension2D(rect.height, rect.width));
    return {
      isInViewport: DomHelpers.isInViewport(elementRect, viewportSize),
      rect: elementRect
    };
  }

  static isInViewport(elementRect, viewportSize, offset = new Position2D()) {
    return (
      // Vertically
      (elementRect.position.y + offset.y >= 0 && elementRect.position.y + offset.y <= viewportSize.height) ||
      (elementRect.position.y + offset.y + elementRect.dimension.height >= 0 && elementRect.position.y + offset.y + elementRect.dimension.height <= viewportSize.height) ||
      (elementRect.position.y + offset.y < 0 && elementRect.position.y + offset.y + elementRect.dimension.height > viewportSize.height)
    ) && (
      // Horizontally
      (elementRect.position.x + offset.x >= 0 && elementRect.position.x + offset.x <= viewportSize.width) ||
      (elementRect.position.x + offset.x + elementRect.dimension.width >= 0 && elementRect.position.x + offset.x + elementRect.dimension.width <= viewportSize.width) ||
      (elementRect.position.x + offset.x < 0 && elementRect.position.x + offset.x + elementRect.dimension.width > viewportSize.width)
    );
  }

  static getScrollPosition() {
    return new Position2D(window.pageXOffset, window.pageYOffset);
  }

  static getTransformPropertyName = () => {
    if (DomHelpers.transformPropertyName === undefined) {
      const testEl = document.createElement('div');

      if (testEl.style.transform === null) {
        const vendors = ['Webkit', 'Moz', 'ms'];

        for (let vendor in vendors) {
          if(testEl.style[`${vendors[vendor]}Transform`] !== undefined) {
            return `${vendors[vendor]}Transform`;
          }
        }
      }

      DomHelpers.transformPropertyName = 'transform';
    }

    return DomHelpers.transformPropertyName;
  };

  static setTransform(domNode, {scale = 1, x = 0, y = 0}) {
    domNode.style[DomHelpers.getTransformPropertyName()] = `scale(${scale}) translateX(${x}px)  translateY(${y}px)`;
  }
}

export default DomHelpers;
