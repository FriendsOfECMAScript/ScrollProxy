/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

(function (window, DomHelpers, ScrollProxyListener, _) {

  /**
   * ParallaxController - Singleton
   *
   * @constructor
   */
  var ScrollProxy = (function () {
    var instance;

    function ScrollProxy() {
      var latestKnownScrollY = window.pageYOffset,
        animating = false,
        viewportSize = new DomHelpers.ViewportSize(-1, -1),
        listeners = [];

      var notifyListeners = function () {
        var args = Array.prototype.slice.call(arguments),
          methodName = args.splice(0, 1);
        for (var i = 0; i < listeners.length; i++) {
          listeners[i][methodName].apply(listeners[i], args);
        }
      };
      var requestFrame = function () {
        if (!animating) {
          window.requestAnimationFrame(doFrame);
        }
        animating = true;
      };
      var doFrame = function () {
        notifyListeners('doFrame');
        animating = false;
      };
      var onScroll = function () {
        latestKnownScrollY = window.pageYOffset;
        notifyListeners('onScroll', latestKnownScrollY);
        requestFrame();
      };
      var onResize = function () {
        viewportSize = DomHelpers.getViewportSize();
        notifyListeners('onResize', viewportSize);
      };
      var bindListeners = function () {
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', _.debounce(onResize, 200));
      };
      var addListener = function (listener) {
        if (!(listener instanceof ScrollProxyListener)) {
          throw 'Provided listener must be an instance of ScrollProxyListener.';
        }
        listeners.push(listener);
      };
      var removeListener = function (listener) {
        var listenerIndex = listeners.indexOf(listener);
        if (listenerIndex !== -1) {
          listeners.splice(listenerIndex, 1);
        }
      };
      var init = function () {
        viewportSize = DomHelpers.getViewportSize();
        bindListeners();
      };
      init();

      return {
        addListener: addListener,
        removeListener: removeListener
      }
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = new ScrollProxy();
        }
        return instance;
      }
    };
  })();

  // Expose ScrollProxy
  window.ScrollProxy = ScrollProxy;

})(window, window.DomHelpers, window.ScrollProxyListener, _);
