/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

(function(window, DomHelpers, ScrollProxyListener, $, TweenLite, undefined) {

  var IN_VIEWPORT = {
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
   * @constructor
   */
  function ScrollInViewportListener($elements, visibleFn, invisibleFn) {
    ScrollProxyListener.call(this);

    this.$elements = $elements;
    this.visibleFn = visibleFn;
    this.invisibleFn = invisibleFn;
    this.elementsViewportData = [];

    this.init = function() {
      this.onScroll();
      this.render();
    };

    this.addElements = function($elements) {
      this.$elements = this.$elements.add($elements);
    };

    this.render = function () {
      this.$elements.each((function(index, element){
        var inViewportData = this.elementsViewportData[index];
        if (inViewportData.isInViewport && !inViewportData.wasInViewport) {
          if (typeof this.visibleFn === 'function') {
            this.visibleFn(index, element, inViewportData.fromVertical, inViewportData.fromHorizontal);
          }
        } else if (!inViewportData.isInViewport && inViewportData.wasInViewport) {
          if (typeof this.invisibleFn === 'function') {
            this.invisibleFn(index, element, inViewportData.toVertical, inViewportData.toHorizontal);
          }
        }
      }).bind(this));
    };

    this.onScroll = function (latestKnownScrollPosition) {
      this.$elements.each((function(index, element){
        var inViewportData = this.elementsViewportData[index],
          newInViewportData = DomHelpers.getViewportData(element, this.viewportSize),
          elementWasVisible = false,
          elementIsVisible = false;

        if (inViewportData !== undefined) {
          // We have previous data
          elementWasVisible = inViewportData.isInViewport;
          elementIsVisible = newInViewportData.isInViewport;

          if (elementWasVisible && !elementIsVisible) {
            // Element has become invisible in viewport
            newInViewportData.toVertical = inViewportData.rect.top > newInViewportData.rect.top ? IN_VIEWPORT.TO.TOP : IN_VIEWPORT.TO.BOTTOM;
            newInViewportData.toHorizontal = inViewportData.rect.left > newInViewportData.rect.left ? IN_VIEWPORT.TO.LEFT : IN_VIEWPORT.TO.RIGHT;

          } else if (!elementWasVisible && elementIsVisible) {
            // Element has become visible in viewport
            newInViewportData.fromVertical = inViewportData.rect.top < newInViewportData.rect.top ? IN_VIEWPORT.FROM.TOP : IN_VIEWPORT.FROM.BOTTOM;
            newInViewportData.fromHorizontal = inViewportData.rect.left < newInViewportData.rect.left ? IN_VIEWPORT.FROM.LEFT : IN_VIEWPORT.FROM.RIGHT;
          }
          newInViewportData.wasInViewport = elementWasVisible;
        }
        this.elementsViewportData[index] = newInViewportData;

      }).bind(this));
    };
  }

  ScrollInViewportListener.prototype = Object.create(ScrollProxyListener.prototype);

  // Expose ScrollInViewportListener
  window.ScrollInViewportListener = ScrollInViewportListener;

})(window, window.DomHelpers, window.ScrollProxyListener, jQuery, TweenLite);
