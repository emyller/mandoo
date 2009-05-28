(function (u) {
/*
	widgets module for the utm JavaScript library
	Copyright (c) 2009 Renan Fernandes
*/
u.mod(
/* info */{
	name: 'ui_widget',
	version: 0.1,
	author: 'ShadowBelmolve <renan@kauamanga.com.br>'
},

/* dependencies */[
	/* none */
],

/* core */{

Widget: {
	TaskManager: u.Class({
		__construct: function (options) {
			// task manager will handle u.Window instances
			u.require('ui_window');

			var dom = this.DOMElements = {
				main: u.create('div.utm_widget_taskmanager_container'),
				list: u.create('table.utm_widget_taskmanager').append('tr').up()
			};
		},

		update: function () {

			return this;
		}
	}),

	DigitalClock: u.Class({

	})
}

}
);


})(utm);