/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Position2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Dimension2D {
  constructor(height = 0, width = 0) {
    this.height = height;
    this.width = width;
  }
}

class DOMElementRect {
  constructor(position = new Position2D(), dimension = new Dimension2D()) {
    this.position = position;
    this.dimension = dimension;
  }
}

export {Position2D, Dimension2D, DOMElementRect};
