/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import {join} from 'path';

const include = join(__dirname, 'src');

const isUmd = (options) => {
  return typeof options !== 'undefined'
    && typeof options.libraryTarget !== 'undefined'
    && options.libraryTarget === 'umd';
};

export default (options) => {
  return {
    entry: './src/index',
    output: {
      path: join(__dirname, 'dist'),
      libraryTarget: isUmd(options) ? 'window' : 'commonjs'
    },
    resolve: {
      alias: {
        TweenLite: join(__dirname, 'node_modules/gsap/src/uncompressed/TweenLite.js')
      }
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: include
        }
      ]
    }
  }
};
