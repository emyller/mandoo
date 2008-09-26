/*
	Form helper for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () {

try { utm.module(

/* info */{
	name: 'form',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {

formHelper: {
	// a set of preset rules
	validationRules: {
		'filled': /./,
		'digits': /^\d+$/,
		'chars': /^[a-z]+$/i,
		'email': /^[\w+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i,
		'url': /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/i,
		'date': /^\d{2,4}\W\d{2}\W\d{2,4}$/
	},

	parseRule: function (rule) {
	//>> return a regexp object from a string
		return utm.formHelper.validationRules[rule];
	}
},

validate: function (form, rules) {
//>> performs a validation on a form
	form = utm(form);
	
	// at the beggining, we have valid data.
	var valid = true;
	// now, we'll loop through each field and compare them to the rules
	utm(form).filter('input[type=text],input[type=password],select,textarea')
	.each(function (el) {
		el = utm(el);

		// get the rule for this field
		var rule = rules[el.attr('id')] || rules[el.attr('name')];
		
		// checks if it has a valid value
		if (rule && rule.valid && !utm.formHelper.parseRule(rule.valid).test(el.val())) {
			valid = false;
		}
	});
	u.append('p', valid);
	return valid;
}

},

/* elements methods */ {

validate: function (rules) {
	return utm.validate(this, rules);
},

validable: function (rules) {
	this.submit(function (e) {
		if (!utm.validate(this, rules)) {
			e.preventDefault();
		}
	});
}

}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
