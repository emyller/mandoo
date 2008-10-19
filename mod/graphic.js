/*
	Graphic/drawing tools for Ultimate JavaScript Library
	Author: Rafael Lúcio (poste9 at gmail dot com)
*/
(function () { try { utm.mod(

/* info */{
	name: 'graphic',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
rgbToHex: function () {
//>> parse rgb color to hex format
	for (var hex = '#', i = 0; arguments[i] >= 0;
	hex += (arguments[i] < 16? 0 : '') + arguments[i].toString(16), i++);
	return hex;
},

hsvToHex: function () {
//>> parse hsv color to hex format
	
},

randomColor: function () {
//>> generates a random color
	var random = Math.floor(Math.random() * 16777215).toString(16);
	return '#' + utm.mult(0, 6 - random.length) + random;
},

Graphic: u.Class({
	__extends: utm,
	__construct: function (data) {
		this[0] = utm.create('svg' + (data || ''), '', {
			ns: 'http://www.w3.org/2000/svg'
		})[0];
		this.length = 1;
	},
	
	draw: function (shape, opt) {
	//>> shape drawing shortcut
		return utm(this[0]).append(new utm.Graphic.shape(shape, opt));
	},
	addDraw: function (shape, opt) {
	//>> inserts a shape and returns the container
		return this.draw(shape, opt).parent();
	},
	
	__shape: function (shape, opt) {
		return utm.create(shape, '', {
			ns: 'http://www.w3.org/2000/svg'
		}).attr(opt);
	}
})

});}
catch (e) { throw new Error(
	'utm error: module broken, core not found or dependencies unsatisfied'
); } })();