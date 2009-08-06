(function (u) {
/*
	example module for the Mandoo JavaScript library
*/

// you can define some variables here, to reuse in the plugin functions
var something;

u.mod(
/* info */{
	name: 'sample_plugin',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {

sampleObject: {
	// globally accessible with u.sampleObject
},

sampleFunction: function () {
	// globally callable with u.sampleFunction
}

},

/* elements methods */ {

sampleFunction: function () {
	// callable with u(<elements representation>).sampleFunction

	// 'this' refers to the current element collection
	// you can chain every mandoo method here and other plugins methods as well
	this.text('sample_plugin works!');
}

});

// you can execute some initializer here, if necessary

})(mandoo);
