// lazy load the entire path
var glob = require('glob');
var path = require('path');

module.exports = function(dir) {
	var files = glob.sync(dir);

	// for every file, we go
	files.forEach(function(exactFilename) {
		var basename = path.basename(exactFilename);
		var exact = path.resolve(exactFilename);

		// replace dashes with underscores
		basename = basename.replace(/-/g, '_');

		// deprecated magic + global variables = horrific yet helpful madness
		global.__defineGetter__(basename, function() {
			return require(exact);
		});
	});
};