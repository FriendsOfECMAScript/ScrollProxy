#FoesScrollProxy
> 

[![npm version](https://img.shields.io/npm/v/foes-scrollproxy.svg?style=flat-square)](https://www.npmjs.com/package/foes-scrollproxy)
[![Build Status](http://img.shields.io/travis/FriendsOfECMAScript/ScrollProxy/master.svg?style=flat-square)](https://travis-ci.org/FriendsOfECMAScript/ScrollProxy)
[![NPM Status](http://img.shields.io/npm/dm/foes-scrollproxy.svg?style=flat-square)](https://www.npmjs.org/package/foes-scrollproxy)
[![devDependency Status](https://img.shields.io/david/FriendsOfECMAScript/ScrollProxy.svg?style=flat-square)](https://david-dm.org/FriendsOfECMAScript/ScrollProxy#info=dependencies)

##Installation
The recommended and the most suitable way to install is through *NPM*.
```shell
$ npm install --save foes-scrollproxy
```

Also, you can install through *Bower*.
```shell
$ bower install --save foes-scrollproxy
```


Standalone
```html
<script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
<script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
<script type="text/javascript" src="../../dist/foes-scrollproxy.umd.js"></script>
```
Gulp
```javascript
// ...
browserify('./entry.js')
    .require('./node_modules/gsap/src/uncompressed/TweenLite.js', {expose: '../TweenLite.js'})
// ...
```

Webpack
```js
// ...
resolve: {
  alias: {
    'TweenLite': 'gsap/TweenLite'
  }
}
// ...
```






After installation process, you have to include the js files in your html.
```html
<script src="/your/path/foes-scrollproxy/dist/foes-scrollproxy.umd.min.js"></script>
```

Also, it supports ES2015 modules so, you can easily import the library in your js instead loading the UMD version in the DOM.
```js
import 'foes-scrollproxy';
```

The following code is a fully initialization example code:
```js

```


##Credits
This library is created by:
>
**@mktoast** - [mikeltuesta@gmail.com](mailto:mikeltuesta@gmail.com)

##Licensing Options
[![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg?style=flat-square)](https://github.com/FriendsOfECMAScript/ScrollProxy/blob/master/LICENSE)
