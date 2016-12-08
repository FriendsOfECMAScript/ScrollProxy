/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {Position2D, Dimension2D} from './GeometricHelpers';

class DOMHelpers {

  static getDocumentHeight = () => {
    let body = document.body,
      html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  };

  static getViewportSize = () => {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];

    return new Dimension2D(
      w.innerHeight || e.clientHeight || g.clientHeight,
      w.innerWidth || e.clientWidth || g.clientWidth
    );
  };

  static getViewportData = (element, viewportSize) => {
    let rect = element.getBoundingClientRect();
    return {
      isInViewport: (
        // Vertically
        (rect.top >= 0 && rect.top <= viewportSize.height) ||
        (rect.bottom >= 0 && rect.bottom <= viewportSize.height)
      ) && (
        // Horizontally
        (rect.left >= 0 && rect.left <= viewportSize.width) ||
        (rect.right >= 0 && rect.right <= viewportSize.width)
      ),
      rect: rect
    };
  };

  static getScrollPosition = () => {
    return new Position2D(window.pageXOffset, window.pageYOffset);
  };
}

export default DOMHelpers;
