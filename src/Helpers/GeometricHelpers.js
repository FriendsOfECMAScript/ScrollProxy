/*
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
'use strict';

(function () {

  var GeometricHelpers = Object.create({});

  GeometricHelpers.Position2D = function(x, y) {
    this.x = x;
    this.y = y;
  };

  GeometricHelpers.Dimension2D = function(height, width) {
    this.height = height;
    this.width = width;
  };

  window.GeometricHelpers = GeometricHelpers;

})();
