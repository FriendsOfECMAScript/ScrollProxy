/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

(function (window, GeometricHelpers) {

  var DomHelpers = Object.create({});

  DomHelpers.getDocumentHeight = function () {
    var body = document.body,
      html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  };

  /**
   *
   * @returns {GeometricHelpers.Dimension2D}
   */
  DomHelpers.getViewportSize = function () {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];

    return new GeometricHelpers.Dimension2D(
      w.innerHeight || e.clientHeight || g.clientHeight,
      w.innerWidth || e.clientWidth || g.clientWidth
    );
  };

  /**
   *
   * @param element
   * @param viewportSize {GeometricHelpers.Dimension2D}
   * @returns {{isInViewport: boolean, rect: ClientRect}}
   */

  DomHelpers.getViewportData = function (element, viewportSize) {
    var rect = element.getBoundingClientRect();
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

  /**
   * @returns {GeometricHelpers.Position2D}
   */
  DomHelpers.getScrollPosition = function () {
    return new GeometricHelpers.Position2D(window.pageXOffset, window.pageYOffset);
  };

  // Expose DomHelpers
  window.DomHelpers = DomHelpers;

})(window, window.GeometricHelpers);
