/*
 * This file is part of the FoesScrollProxy library.
 *
 * (c) Mikel Tuesta <mikeltuesta@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {join} from 'path';

export default (options) => {
  return {
    entry: './src/app.js',
    output: {
      path: join(__dirname, 'dist'),
      libraryTarget: 'window'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            join(__dirname, 'src'),
            join(__dirname, 'node_modules/foes-scrollproxy')
          ]
        }
      ]
    }
  }
};
