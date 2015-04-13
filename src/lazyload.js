'use strict';

var glob = require('glob');
var path = require('path');

function lazyload(dir) {
	// handle when an array is passed (array of globs)
	if (Array.isArray(dir)) {
		dir.forEach(lazyload);
		return;
	} else if (typeof dir !== 'string') {
		throw new TypeError('argument to lazyload must be either string or Array');
	}

	var files = glob.sync(dir);

	// for every file, we go
	files.forEach(function(exactFilename) {
		var basename = path.basename(exactFilename, '.js'); // supply .js to remove it from name

		// replace dashes with underscores
		basename = basename.replace(/-/g, '_');

		Object.defineProperty(global, basename, {
			configurable: true,
			get: function() {
				var filename = path.resolve(process.cwd(), exactFilename);
				return require(filename);
			}
		});
	});
};

module.exports = lazyload;
