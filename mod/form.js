/*
	Form helper for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try { utm.mod(

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

	// a set of masks that will be used for parsing mask strings
	masks: {
		'#': '\\d', 'a': '[a-z]', 'A': '[A-Z]', '*': '.',
		'(': '\\(', ')': '\\)', '[': '\\[', ']': '\\]', '^': '\\^', '$': '\\$', '.': '\\.'
	},

	parseRule: function (rule) {
	//>> return a regexp object from a string
		return (
			// try to get a preset rule
			utm.formHelper.validationRules[rule] ||
			
			// if the rule we got is a regexp, return it
			(rule.constructor == RegExp? rule :
			
			// or generate a regexp from a mask string
			new RegExp(
				rule.replace(/(.)/g, function (a, ch) {
					return utm.formHelper.masks[ch] || ch;
				})
			))
		);
	}
},

validate: function (form, rules) {
//>> performs a validation on a form
	form = utm(form);
	
	// at the beggining, we have valid data.
	var validForm = true;
	// now, we'll loop through each field and compare them to the rules
	utm(form).filter('input[type=text],input[type=password],select,textarea')
	.each(function (el) {
		el = utm(el);
		var valid = true,
		    id = el.attr('id') || el.attr('name'),
		    // get the rule for this field
		    rule = rules[id];
		
		if (rule) {
		// checks if it has a valid value
		if (rule.valid && !utm.formHelper.parseRule(rule.valid).test(el.val())) {
			valid = validForm = false;
		}
		
		// get the field position, if needed
		if (rule.error || rule.success || rule.tip) {
			var pos = el.pos();
		}
		
		// shows the error info (if provided)
		if (!valid && rule.error) {
			// remove some success message (if there was one)
			utm('#utm_formsuccess_' + id).puff(true);
			
			var errContainer = !utm('#utm_formerror_' + id).length?
				utm.append('div[id=utm_formerror_' + id + '].utm_formerror').front().fadeIn('faster') :
				utm('#utm_formerror_' + id).pulsate(2);
			
			errContainer.text(rule.error).css({ left: pos.right, top: pos.top });
		
		// handles success messages
		} else {
			// removes some error message (if there was one)
			utm('#utm_formerror_' + id).puff(true);
			if (rule.success && !utm('#utm_formsuccess_' + id).length) {
				utm.append('div[id=utm_formsuccess_' + id + '].utm_formsuccess')
				.text(rule.success).css({ left: pos.right, top: pos.top }).front().fadeIn();
			}
		}
		}
	});
	
	return validForm;
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
