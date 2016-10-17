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

export default (options) => {
  return {
    entry: './src/index',
    output: {
      path: join(__dirname, 'dist'),
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include
        }
      ]
    }
  }
};