// test for the default mode
var lazy = require('../');
var assert = require('chai').assert;

describe('lazy-modules', function() {
	// this is the default mode
	describe('lazy loading via global', function() {
		it('should add appropriate modules to global variable', function() {
			lazy('../example/*');

			assert.property(global, 'a');
			assert.property(global, 'b');
			assert.property(global, 'c');

			delete global['a'];
			delete global['b'];
			delete global['c'];
		});

		it('should match appropriately per glob', function() {
			lazy('../example/{a,c}');

			assert.property(global, 'a');
			assert.notProperty(global, 'b');
			assert.property(global, 'c');

			delete global['a'];
			delete global['c'];
		});

		it('should work with array notation', function() {
			lazy(['../example/a', '../example/b']);

			assert.property(global, 'a');
			assert.property(global, 'b');
			assert.notProperty(global, 'c');

			delete global['a'];
			delete global['b'];
		})
	});
});