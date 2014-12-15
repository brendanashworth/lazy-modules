# Lazy load for Node.js modules

> This package implements a slightly hacky but easy way to lazy load Node.js modules. It uses `__defineGetter__` with `global` variables to lazy load specific packages that you tell it to.

## Why?
lazy-modules was designed especially for Gulp; in standard Gulpfiles, imports are stated at the top of the Gulpfile and *every single* import is loaded even when you do one of the smaller tasks. lazy-modules fixes this by lazy loading the specified modules and dynamically loading them when you use them, decreasing the time spent running.

Yes, I know that it uses horrible practices (`global`) and deprecated Object properties (`__defineGetter__`). I wrote this because it can speed up Gulpfiles so much, as shown in this REPL example:

```
> var lazy = require('./');
> console.time('no-load'); lazy('./node_modules/*'); console.timeEnd('no-load');
no-load: 6ms
> console.time('load'); gulp_util; console.timeEnd('load');
load: 787ms
```

If you don't actually use `gulp_util` in your Gulpfile, it'll take 6ms to lazy load it. If you do use it, it'll take 787ms to load it - a massive decrease especially when you your task might only take ~100ms.

## Example
There are three modules in the `example` directory: `a.js`, `b.js`, `c.js`. In this example, we'll lazy load them all but only actually run two of them:

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
This function is ran to bind all modules that match the given [glob](https://github.com/isaacs/node-glob) via `__defineGetter__` to `global`.

## Todo
- [ ] If no glob is passed, lazy load *all* available modules
- [ ] Better documentation

## License
[MIT license](./LICENSE)