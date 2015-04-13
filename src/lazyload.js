// lazy load the entire path
var glob = require('glob');
var path = require('path');

function lazyload(dir) {
	// handle when an array is passed (array of globs)
	if (Array.isArray(dir)) {
		dir.forEach(lazyload);
		return;
	}

	var files = glob.sync(dir);

	// for every file, we go
	files.forEach(function(exactFilename) {
		var basename = path.basename(exactFilename, '.js'); // supply .js to remove it from name
		var exact = path.resolve(exactFilename);

		// replace dashes with underscores
		basename = basename.replace(/-/g, '_');

		// deprecated magic + global variables = horrific yet helpful madness
		global.__defineGetter__(basename, function() {
			return require(exact);
		});
	});
};

module.exports = lazyload;
