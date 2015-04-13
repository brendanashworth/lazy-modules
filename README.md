# lazy-modules [![Build Status](https://travis-ci.org/brendanashworth/lazy-modules.svg)](https://travis-ci.org/brendanashworth/lazy-modules)

> lazy-modules implements an easy way to bulk lazy-load Node.js/io.js modules, perfect for implementing in a build system with many imports such as [gulp](http://gulpjs.com/) or [grunt](http://gruntjs.com/).

## Why?
v8's `Script::Compile`, called when `require()` is used, usually takes a relatively long time. Multiply this by the 20 packages your `Gulpfile.js` imports, times the 10 each of those imports, times 5... you get the point. Just running a linter forces v8 to compile everything, sometimes taking ~5 seconds or worse. If you're impatient like me, this is perfect for you.

This is the time it takes to load and not use vs lazy-load [gulpjs/gulp-util](https://github.com/gulpjs/gulp-util):
```
> var lazy = require('lazy-modules');
> console.time('lazy-load'); lazy('node_modules/gulp-util'); console.timeEnd('lazy-load');
lazy-load: 6ms
> console.time('load'); gulp_util; console.timeEnd('load');
load: 787ms
```

If you don't actually use `gulp_util` in your Gulpfile, it'll take 6ms to lazy load it. If you do use it, it'll take 787ms to load it - a massive decrease especially when you your task might only take ~100ms.

## Install
```sh
$ npm i lazy-modules --save
```

## Example
There are three modules in the [`example`](./example) directory: `a.js`, `b.js`, `c.js`. In this example, we'll lazy load them all but only actually run two of them:

```javascript
var lazy = require('lazy-modules');
lazy('./example/*');

// we now have access to a, b, and c
console.log(a == 1, b == 2);

// we didn't use c, so it was never loaded
```

In the same way, it can be used with Gulp packages like so:

```javascript
var lazy = require('lazy-modules');
lazy('./node_modules/gulp-*');

// if a module has a dash, it is changed to an underscore
gulp_util.log('gulp-util was lazily loaded!');
```

## API
### `lazy(glob)`

- `glob`: either a `String` or `Array`

When a string is passed, all modules will be lazy-loaded that match the given [glob](https://github.com/isaacs/node-glob). If `glob` is an Array, they will be mapped over the `lazy` function individually.

## License
[MIT license](./LICENSE)