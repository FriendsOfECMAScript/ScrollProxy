/*
 * @author Mikel Tuesta <mikel@lin3s.com>
 */
'use strict';

(function () {

  var DomHelpers = Object.create({});

  DomHelpers.getDocumentHeight = function () {
    var body = document.body,
      html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  };

  DomHelpers.getWindowDimensions = function () {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];

    return {
      height: w.innerHeight || e.clientHeight || g.clientHeight,
      width: w.innerWidth || e.clientWidth || g.clientWidth
    }
  };

  DomHelpers.getViewportData = function (element, windowHeight) {
    var rect = element.getBoundingClientRect();
    return {
      isInViewport: ((rect.top >= 0 && rect.top <= windowHeight) || (rect.bottom >= 0 && rect.bottom <= windowHeight)),
      rect: rect
    };
  };

  // Expose DomHelpers
  window.DomHelpers = DomHelpers;

})();
