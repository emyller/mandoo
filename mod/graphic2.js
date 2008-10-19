/*
	Graphic/drawing tools for Ultimate JavaScript Library
	Author: Rafael Lucio (poste9 at gmail dot com)
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

Graphic: function (data) {
	this[0] = utm.create('svg' + (data || ''), '', { ns: 'http://www.w3.org/2000/svg' })[0];
	this.length = 1;
	this.definitions  = null; // tag def
	this.defInstances = []; // array of tags id inside of def tag
	
	utm.ext(this, {
	draw: function (shape, opt) {
	//>> shape drawing shortcut
		return utm(this[0]).append(
			utm.Graphic.Shape[utm.caps(shape)]?
				new utm.Graphic.Shape[utm.caps(shape)](opt) :
				new utm.Graphic.Shape(shape, opt)
		);
	},
	add: function (shape, opt) {
	//>> inserts a shape and returns the container
		return this.draw(shape, opt).parent();
	}, 
	createGradient: function(fillType,colors,alphas,matrix) {
		if (fillType == utm.Graphic.GradientType.LINEAR) {
			var attrs = {
				id:"instance_"+this.defInstances.length,
				x1:matrix.x1,
				y1:matrix.y1, // This points (x1, y1) determine the start point of gradient line direction
				x2:matrix.x2,
				y2:matrix.y2, // This points (x2, y2) determine the end point of gradient line direction
			};
			var gradient = this.draw('linearGradient',attrs);
			
			for(var i=0;i<colors.length;i++){
				gradient.append(this.draw('stop',{
					offset:matrix.offsets[i],
					style:'stop-color:'+colors[i]+';stop-opacity:'+alphas[i]
				}));
			}
		}
		
		this.defInstances.push(attrs.id);
		return gradient;
	},	
	gradientFill: function(fillType, // GradientType.LINEAR or GradientType.RADIAL
								colors,   // Array of colors in hex format #(\d{6}|\d{3})
								alphas,	  // Array of alphas with values 0 to 1
								matrix	  // Matrix Class setting up the offsets of colors and angle 
								) {
		if (!this.definitions) this.definitions = this.draw("def");
		return "url(#"+this.definitions
		.append(this.createGradient(fillType,colors,alphas,matrix))
		.parent().children()[0].getAttribute("id")+")";
	}
	});
}
}

);

/* extends the utm.Graphic */
utm.Graphic.prototype = utm.prototype;

utm.ext(utm.Graphic, {
	/* shape classes */
	Shape: function (shape, opt) {
		return u.create(shape, '', { ns: 'http://www.w3.org/2000/svg' }).attr(opt);
	},
	Matrix: function(offsets, // Array of offset list, you must to specify one offset for each color in the gradient. RANGE VALUE = 0 to 1
					 rotation // The amount to rotate, in angle. RANGE VALUE  0 to 360
					 ) {
		var objOffset = [],positions=[],boxWidth=boxHeight=1;
					
		for(var i=0;i<offsets.length;i++)
		objOffset.push(offsets[i] * 100 + "%");
	
		var SIDE = 100,ANGLE = rotation % 45,TAN = Math.tan(ANGLE*Math.PI/180),
		VALUES = [Math.floor(TAN*SIDE),Math.floor(SIDE/TAN)],CHANGES = [[2,3],[3,2]],actualPosition = 0;
        for(var i=0;++i<=rotation;) actualPosition = (!(i % 91)) ? (actualPosition) ? 0 : 1 : actualPosition;
		var index = (rotation) ? CHANGES[actualPosition][((rotation / 45) % 2) ? 1 : 0] : 3,
		POSITIONS_MATRIX = [[  '0%','0%','100%','100%'],['100%','0%',  '0%','100%'],
							['100%','100%','0%',  '0%'],[  '0%','100%','100%','0%']];
        if (!Math.floor(rotation % 45)) {
            positions = (!rotation) ? POSITIONS_MATRIX[0] : POSITIONS_MATRIX[Math.round(rotation / 90)-1];
            positions[index] = (rotation % 90 && !actualPosition) ? "100%" : "0%"
			if (Math.floor(rotation / 90) > 1) positions[index] = (positions[index]=="100%") ? "0%":"100%" ;
        } else {
			// dev
            var pct = (Math.floor(rotation / 45) % 2) ? VALUES[0] : VALUES[1];
        }
		
		return {offsets:objOffset, x1:positions[0],	y1:positions[1], x2:positions[2],y2:positions[3]};
	},	
	// Static Class
	GradientType: {	LINEAR:"linear", RADIAL:"radial" }
});
utm.ext(utm.Graphic.Shape, {
	Rect: function (opt) {
	//>> draws a rectangle
		return new utm.Graphic.Shape('rect', opt);
	},
	
	Square: function (opt) {
	//>> draws a square
		opt.width = opt.height = opt.size; delete opt.size;
		return new utm.Graphic.Shape('rect', opt);
	},
	
	Line: function (opt) {
	//>> draws a simple line
		return new utm.Graphic.Shape('line', opt);
	}
});


}
catch (e) { throw new Error('utm error: module broken, core not found or dependencies unsatisfied'); } })();




