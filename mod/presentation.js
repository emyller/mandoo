/*
	Slides presentation plug-in for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try { utm.mod(

/* info */{
	name: 'presentation',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
Presentation: u.Class({
	__construct: function (slides, opt) {
	//>> constructs the presentation from json
		this.slides = typeof slides == 'string'?
			eval(utm.file(slides).text) :
			slides;
		
		// set default options
		var opt = this.options = utm.ext({
			container: 'body',
			width: utm.size().width,
			height: utm.size().height,
			absolute: true,
			pos: 'left top',
			arrows: true
		}, opt || {}),
		
		presentation = this;
		
		// inserts the presentation in the page
		this.body = utm(opt.container).append('div.utm_presentation')
			.css({
				width: opt.width,
				height: opt.height,
				position: opt.absolute? 'absolute' : 'static'
			})
			.pos(opt.pos)
			.click(function () {
				presentation.next();
			});
		
		// enables navigation by arrows
		if (opt.arrows) {
			utm(document).bind('keypress', function (e) {
				e.keyCode == 37? presentation.prev() : // left
				e.keyCode == 39? presentation.next() : // right
				false;
			});
		}
		
		// loads the stylesheet, if one was set
		if (opt.css) {
			utm('head').add('link[rel=stylesheet][href='+opt.css+']');
		}
		
		this.render(0);
	},
	
	current: 0,
	
	render: function (n) {
	//>> renders the slide
		var slide = this.slides[n],
		    content = utm.create('div.utm_presentation_content');
		
		if (slide.section) {
			content.attr('class', 'utm_presentation_section')
				.add('h1.utm_presentation_section_title', slide.title || '')
				.add('h3.utm_presentation_section_sub', slide.sub || '');
		} else {
			content.attr('class', 'utm_presentation_page')
				.add('h1.utm_presentation_page_title', slide.title || '');
			var textContainer = content.append('ul.utm_presentation_page_text');
			
			utm.each(slide.content, function (item) {
				typeof item == 'string'?
					textContainer.add('li', item) :
					textContainer.add(presentation.media(item));
			});
		}
		this.body
			.empty()
			.add(content);
		
		if (slide.transition) {
			content[slide.transition]();
		}
		
		return this;
	},
	
	goTo: function (n) {
	//>> goes to a specified slide
		if (+n || +n === 0)
			n = +n < 0? 0 : +n >= this.slides.length? this.slides.length -1 : +n;
		else
			for (var i = -1; this.slides[++i];)
			if (
				this.slides[i].title && this.slides[i].title.indexOf(n.toLowerCase()) >= 0 ||
				this.slides[i].content && String(this.slides[i].content).indexOf(n.toLowerCase()) >= 0
			) { n = i; break; }
		if (typeof n == 'string') throw 'utm error: slide not found.';
		return this.render(this.current = n);
	},
	
	prev: function (n) {
	//>> goes to the previous slide, if there is one
		this.goTo(n? this.current - n : --this.current);
		return this;
	},
	
	next: function (n) {
	//>> goes to the next slide, if there is one
		if (this.current >= this.slides.length -1) { return this.end(); }
		else {
			this.goTo(n? this.current + n : ++this.current);
			return this;
		}
	},
	
	first: function () {
	//>> goes to the first slide
		return this.goTo(0);
	},
	
	last: function () {
	//>> goes to the last slide
		return this.goTo(this.slides.length - 1);
	},
	
	end: function () {
	//>> ends the presentation
		this.current = this.slides.length;
		this.body
			.empty()
			.add('p', 'End of presentation.');
		
		return this;
	},
	
	media: function (data) {
	//>> adds some types of media on the slide
		return utm.create(data.type)
			.css(data.style || {})
			.attr(data.attrs || {});
	}
})

});}
catch (e) { throw new Error(
	'utm error: module broken, core not found or dependencies unsatisfied'
); } })();