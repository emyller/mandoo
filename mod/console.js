u.mod(
// info
{
	name: 'console',
	version: 0.1
},

// dependencies
[
'scroll'
],

// core
{
Console: u.Class({
	history: [],

	__construct: function (options)
	{
		var dom = this.DOMElements = {
			main: u.create('div.utm_console')
		};

		this.ready();
	},

	ready: function ()
	{
		var _this = this;

		this.currentInput =
		this.DOMElements.main.append('input.utm_console_input')
		.focus()
		.onkeydown(function (e) {
			e.keyCode == 13 && _this.run();
		});

		this.DOMElements.main.scrollBottom({ speed: 'fast' });
	},

	run: function () {
		var cmd = this.currentInput.val();
		this.history.push(cmd);

		this.DOMElements.main.append('div.utm_console_output', eval(cmd));

		this.ready();
	},

	clear: function () {
		this.DOMElements.main.empty();

		this.ready();
	}
})
}
);