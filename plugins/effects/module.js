new u.Module("effects", { version: .1 },

// core
{/* the animation core is included on the Mandoo core. */},

// methods for elements
{
	highlight: function (color) {
		this.anim({ backgroundColor: color || "gold" }, { reverse: !0, queue: !0 });
		return this; },

	fade: function (opacity, options, callback) {
		this.anim({ opacity: opacity }, options, callback);
		return this; },

	fadeIn: function (options, callback) {
		this.anim({ opacity: { from: 0, to: 1 } }, options, callback);
		return this; },

	fadeOut: function (options, callback) {
		options = options || {};
		options.hide = !0;
		this.anim({ opacity: 0 }, options, callback);
		return this; },

	pulsate: function (times, options, callback) {
		this.anim({ opacity: { to: 0, easing: u.Anim.makeCycle(times || 3) }}, options, callback);
		return this; },

	move: function (x, y, options, callback) {
		this.anim({ left: x, top: y }, options, callback);
		return this; },

	moveBy: function (x, y, options, callback) {
		options = options || {};
		options.relative = !0;
		this.anim({ left: x, top: y }, options, callback);
		return this; },

	fall: function (height, bounces, options, callback) {
		options = options || {};
		options.relative = !0;
		for (var i = -1, el, h; this[++i];)
			el = u(this[i]),
			h = height || el.up().size().height - el.size().height - (el.pos().top - el.up().pos().top),
			el.anim({ top: { to: h, easing: u.Anim.makeBounce(bounces || ~~(h / 40)) }}, options, callback);
		return this; },

	resize: function (width, height, options, callback) {
		this.anim({ width: width, height: height }, options, callback);
		return this; },

	resizeBy: function (p, options, callback) {
		options = options || {};
		options.proportional = !0;
		this.anim({ width: p, height: p, fontSize: p }, options, callback);
		return this; },

	puff: function (options, callback) {
		options = options || {};
		options.proportional = options.hide = !0;
		options.duration = options.duration || 400;
		this.anim({ marginLeft: -100, marginTop: -100, width: 200, height: 200, fontSize: 200, opacity: 0 }, options, callback);
		return this; },

	suck: function (options, callback) {
		options = options || {};
		options.proportional = options.hide = !0;
		options.duration = options.duration || 400;
		options.easing = u.Anim.easings.IMPULSE;
		this.anim({ marginLeft: 250, marginTop: 250, width: 0, height: 0, fontSize: 0, opacity: 0 }, options, callback);
		return this; },

	slideUp: function (options, callback) {
		for (var i = -1, h; this[++i];) if (h = u(this[i]).size().height)
			(this[i].style_ = this[i].style_ || {}).height = h;
		this.anim({ height: 0 }, options, callback);
		return this; },

	slideDown: function (options, callback) {
		options = options || {};
		for (var i = -1, b, o; this[++i];) {
			b = this[i].style_ && parseInt(this[i].style_.height);
			o = u.__clone__(options); o.reverse = !b;
			u(this[i]).anim({ height: +b }, o, callback); }
		return this; }
});
