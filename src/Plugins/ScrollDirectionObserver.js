/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ScrollProxyObserver from '../Core/ScrollProxyObserver';

class ScrollDirectionObserver extends ScrollProxyObserver {

  static SCROLL_DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
  };

  constructor( onScrollDirectionChangedFn = () => {}, { minScrollYDelta = 0 } ) {
    super();

    this.latestKnownScrollY = 0;
    this.latestKnownScrollYDelta = 0;
    this.scrollDirection = null;
    this.latestScrollDirection = null;

    this.onScrollDirectionChangedFn = onScrollDirectionChangedFn;
    this.minScrollYDelta = minScrollYDelta;

    this.init();
  }

  init() {
    this.latestKnownScrollY = window.pageYOffset;

    this.onScroll(this.scrollPosition);
    this.updateDOM();
  }

  onScroll(scrollPosition) {
    this.setScrollPosition(scrollPosition);

    this.scrollDirection = this.latestKnownScrollY > this.scrollPosition.y
      ? ScrollDirectionObserver.SCROLL_DIRECTION.UP
      : ScrollDirectionObserver.SCROLL_DIRECTION.DOWN;
    this.latestKnownScrollYDelta = this.latestKnownScrollY - this.scrollPosition.y;
    this.latestKnownScrollY = this.scrollPosition.y;
  }

  updateDOM() {
    if (!this.isRunning()) {
      return;
    }

    if (this.latestScrollDirection !== this.scrollDirection && Math.abs(this.latestKnownScrollYDelta) > this.minScrollYDelta) {
      this.onScrollDirectionChangedFn(this.scrollDirection, this.latestKnownScrollYDelta);
    }
  }
}

export default ScrollDirectionObserver;
