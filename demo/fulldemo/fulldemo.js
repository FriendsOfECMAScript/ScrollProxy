'use strict';

(function (TimelineLite, ScrollAdvancedStickyObserver, ScrollImageParallaxObserver, ScrollInViewportObserver, ScrollDirectionObserver) {

    window.addEventListener("load", function() {

      var sections = document.querySelectorAll('.section'),
        galleryImages = document.querySelectorAll('.gallery__image'),
        header = document.querySelector('.header'),
        observers = [];

      ////// STICKY //////
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        observers[i] = new ScrollAdvancedStickyObserver(
          section.querySelector('.section__gallery'),
          section.querySelector('.section__content'),
          section,
          { triggerOffset: 30,
            stickyOffsetTop: 30, stickyOffsetBottom: 0,
            stickyInnerOffsetTop: 30, stickyInnerOffsetBottom: 30 }
        );
      }

//       setTimeout(function(){
//         for(var i = 0; i < observers.length; i++) {
//           observers[i].setState(ScrollProxyObserver.STATE.IDLE);
//         }
//       }, 5000);
//       setTimeout(function(){
//         for(var i = 0; i < observers.length; i++) {
//           observers[i].setState(ScrollProxyObserver.STATE.RUNNING);
//         }
//       }, 10000);

      ////// GALLERY IMAGES PARALLAX //////
      new ScrollImageParallaxObserver(galleryImages);

      ////// GALLERY IMAGES EFFECT //////
      new ScrollInViewportObserver(galleryImages, {
        visibleFn: function (index, element) {
          var t = new TimelineLite();
          t.to(element, 2, {opacity: 1}, 0);
          t.to(element, 8, {scale: '+='+.2, rotation: Math.random() + 1, force3D: true}, 0);
        },
        invisibleFn: function (index, element) {
          TweenLite.to(element, 1, {opacity: .6, scale: 1, rotation: 0});
        }
      });

      ////// SECTIONS INIT FOR EFFECTS //////
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i],
          textElements = section.querySelector('.section__title, p'),
          galleryImageWrappers = section.querySelector('.gallery__image-wrapper');

        for (var j = 0; j < textElements.length; j++) {
          var element = textElements[j];
          TweenLite.set(element, {x: j * 2, y: j * 3, opacity: .75 - .1 * j });
        }

        for (var k = 0; k < galleryImageWrappers.length; k++) {
          var galleryWrapper = galleryImageWrappers[k];
          TweenLite.set(galleryWrapper, {y: k * 3 });
        }
      }
      ////// TEXTS EFFECT //////
      new ScrollInViewportObserver(document.querySelectorAll('.section__title, p'), {
        visibleFn: function (index, element) {
          TweenLite.to(element, .5, {x: 0, y: 0, opacity: 1, force3D: true});
        },
        invisibleFn: function (index, element) {
          TweenLite.to(element, 1, {x: index * 2, y: index * 3, opacity: .75 - .1 * index });
        }
      });
      ////// GALLERY TRANSLATE EFFECT //////
      new ScrollInViewportObserver(document.querySelectorAll('.gallery__image-wrapper'), {
        visibleFn: function (index, element) {
          TweenLite.to(element, .5, {y: 0, force3D: true});
        },
        invisibleFn: function (index, element) {
          TweenLite.to(element, 1, {y: index * 3 });
        }
      });

      ////// HEADER //////
//       new ScrollDirectionObserver( function(scrollDirection, scrollYDelta) {
//         if (scrollDirection === ScrollDirectionObserver.SCROLL_DIRECTION.DOWN) {
//           $header.removeClass('header--visible');
//
// //           setStickyOffsets(30, 30, 0, 30, 30);
//         } else {
//           $header.addClass('header--visible');
//
// //           setStickyOffsets(90, 90, 0, 90, 30);
//         }
//       }, {
//         minScrollYDelta: 20
//       });




      function setStickyOffsets(triggerOffset, stickyOffsetTop, stickyOffsetBottom, stickyInnerOffsetTop, stickyInnerOffsetBottom ) {
        for (var i = 0; i < observers.length; i++) {
          observers[i].setOffsets({
            triggerOffset: triggerOffset,
            stickyOffsetTop: stickyOffsetTop,
            stickyOffsetBottom: stickyOffsetBottom,
            stickyInnerOffsetTop: stickyInnerOffsetTop,
            stickyInnerOffsetBottom: stickyInnerOffsetBottom
          });
        }
      }
    });

})(TimelineLite, window.ScrollAdvancedStickyObserver, window.ScrollImageParallaxObserver, window.ScrollInViewportObserver, window.ScrollDirectionObserver);
