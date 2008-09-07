/*
	User interface module for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () {

try {

utm // default stylesheet
.css('#utm_modal', {
	font: '.9em "Sans","Trebuchet MS"',
	position: 'fixed',
	border: '1px solid #000',
	background: '#ADD8E6'
})

utm.module(

/* info */{
	name: 'ui',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
	modal: function () {
	//>> blocks the viewport usage by creating a modal
		
	},

	draggable: function (el, options) {
	//>> makes an element draggable
		
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
