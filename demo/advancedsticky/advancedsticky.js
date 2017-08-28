'use strict';

(function (ScrollAdvancedStickyObserver) {

  window.addEventListener("load", function() {

    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i],
        content = section.querySelector('.section__content'),
        gallery = section.querySelector('.section__gallery');

      new ScrollAdvancedStickyObserver(content, gallery, section, {
        triggerOffset: 30,
        stickyOffsetTop: 30,
        stickyOffsetBottom: 30,
        stickyInnerOffsetTop: 30,
        stickyInnerOffsetBottom: 30
      });
    }

  });

})(window.ScrollAdvancedStickyObserver);
