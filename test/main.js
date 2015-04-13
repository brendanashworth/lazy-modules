// test for the default mode
var lazy = require('../');
var assert = require('chai').assert;

function undoGlobal(obj, name) {
	Object.defineProperty(obj, name, {
		configurable: true,
		value: undefined
	});
}

describe('lazy-modules', function() {
	// this is the default mode
	describe('lazy loading via global', function() {
		it('should add appropriate modules to global variable', function() {
			lazy('example/*');

			assert.isDefined(global.a);
			assert.isDefined(global.b);
			assert.isDefined(global.c);

			undoGlobal(global, 'a');
			undoGlobal(global, 'b');
			undoGlobal(global, 'c');
		});

		it('should match appropriately per glob', function() {
			lazy('example/{a,c}.js');

			assert.isDefined(global.a);
			assert.isUndefined(global.b);
			assert.isDefined(global.c);

			undoGlobal(global, 'a');
			undoGlobal(global, 'c');
		});

		it('should work with array notation', function() {
			lazy(['example/a.js', 'example/b.js']);

			assert.isDefined(global.a);
			assert.isDefined(global.b);
			assert.isUndefined(global.c);

			undoGlobal(global, 'a');
			undoGlobal(global, 'b');
		});

		it('should error on non-string', function() {
			assert.throw(function() {
				lazy({regex: /abc/g});
			}, TypeError);

			assert.throw(function() {
				lazy(42);
			}, TypeError);
		});
	});
});
