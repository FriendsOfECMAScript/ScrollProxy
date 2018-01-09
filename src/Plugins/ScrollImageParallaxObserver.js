/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {requiredParameter} from '../Helpers/ECMAScriptHelpers';
import ScrollProxyObserver from '../Core/ScrollProxyObserver';
import DomHelpers from '../Helpers/DomHelpers';

class ScrollImageParallaxObserver extends ScrollProxyObserver {

  static DIRECTION = {
    POSITIVE: 1,
    NEGATIVE: -1
  };

  constructor(
    images = requiredParameter(),
    {
      scale = 1.2,
      direction = ScrollImageParallaxObserver.DIRECTION.NEGATIVE,
      breakpoints = [640, 860, 1024, 1280]
    } = {}) {
    super();

    this.breakpoints = breakpoints;
    this.currentBreakpoint = -1;
    this.direction = direction;
    this.scale = scale;

    this.images = Array.from(images);
    this.imagesHeights = [];

    this.init();
  }

  init() {
    this.reset();

    this.images.forEach((image, index) => {
      const h = image.offsetHeight;
      this.imagesHeights[index] = h;

      DomHelpers.setTransform(image, {scale: this.scale, y: this.direction * (this.scale - 1) * h / 2});
    });

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  reset() {
    if (this.images === undefined) {
      return;
    }

    this.images.forEach(image => {
      image.style.transform = 'none';
    });
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    this.images.forEach((image, index) => {
      const inViewportData = DomHelpers.getViewportData(image.parentNode, this.viewportSize);
      if (inViewportData.isInViewport) {
        const maxTranslate = (this.scale - 1) * this.imagesHeights[index],
          percentage = (inViewportData.rect.position.y + inViewportData.rect.dimension.height) / ( this.viewportSize.height + this.imagesHeights[index] ),
          translate = (percentage - .5) * this.direction * maxTranslate;

        DomHelpers.setTransform(image, {scale: this.scale, y: Math.round(translate)});
      }
    });
  }

  onResize(viewportSize) {
    super.onResize(viewportSize);

    // Check breakpoint changed
    const breakpoint = this.getNearestBreakpoint(this.viewportSize.width);
    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
      this.init();
    }
  }

  destroy() {
    super.destroy();

    this.reset();
  }

  getNearestBreakpoint() {
    let breakpointIndex = 0;
    while (breakpointIndex < this.breakpoints.length) {
      if (this.viewportSize.width < this.breakpoints[breakpointIndex]) {
        return this.breakpoints[breakpointIndex];
      } else {
        breakpointIndex++;
      }
    }
  }
}

export default ScrollImageParallaxObserver;
