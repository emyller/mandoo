(function (u) {
/*
	Photo effect module for the mandoo JavaScript library
	* based on lightbox *
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'photo',
	version: .1
},

/* dependencies */
[
	'ui_basics'
],

/* core */
{

photo:
{
	open: function (link)
	{
		link = u(link);
		if (u.photo.current == link[0])
			return;

		u.overlay(true);
		dom.container.all().hide();

		dom.throbber.show();

		var href = link.attr('href'),
			title = link.attr('title'),
			o = { duration: 300 },

		all = u.photo.all = u('a[href][rel~=photo]'),
		current = u.photo.current = u.index(all, u.photo.current = link[0]);

		// preload neighbor images
		all[current - 1] && u.create('img[src='+u(all[current - 1]).attr('href')+']')
		all[current + 1] && u.create('img[src='+u(all[current + 1]).attr('href')+']')

		u.create('img').onload(function ()
		{
			dom.throbber.fadeOut({ hide: true });

			dom.container.anim({ width: +this.width }, o);

			dom.container.anim({ height: +this.height },
			{
				duration: 300,
				queue: true,
				callback: function ()
				{
					dom.img.attr('src', href)
					.show().fadeIn({
						duration: 300,
						callback: function ()
						{
							dom.close.show().css({ opacity: 0, top: -20 }).anim({ opacity: 1, top: 0 }, o);
							current > 0 && dom.prev.show().css({ opacity: 0, marginLeft: 0 }).anim({ opacity: 1, marginLeft: -20 }, o);
							current < all.length - 1 && dom.next.show().css({ opacity: 0, marginRight: 0 }).anim({ opacity: 1, marginRight: -20 }, o);
						}
					});
				}
			});
		}).attr('src', href);

		// shows the element
		u.append(dom.main)
		.css('top', (u('html')[0].scrollTop || u('body')[0].scrollTop) + u.size().height / 20)
		.front();
	},

	close: function ()
	{
		dom.main.remove();
		u.overlay(false);
		delete u.photo.current;
	},

	prev: function ()
	{
		u.photo.open(u.photo.all[u.photo.current - 1])
	},

	next: function ()
	{
		u.photo.open(u.photo.all[u.photo.current + 1])
	}
}

},

/* elements methods */
{}
);

var dom = {},
m = dom.main = u.create('div#u-photo');
	d = dom.container = m.append('div#u-photo-container');
		dom.close    = d.append('button#u-photo-close');
		dom.prev     = d.append('button#u-photo-prev');
		dom.next     = d.append('button#u-photo-next');
		dom.img      = d.append('img#u-photo-img');
		dom.throbber = d.append('div#u-photo-throbber');
		dom.caption  = d.append('div#u-photo-caption');
		dom.counter  = d.append('div#u-photo-counter');

// tracks the mouse
dom.container.listen('mouseenter,mouseleave', function (e) {
	u.photo.hovering = e.type == 'mouseenter';
});

// navigation events
dom.close.onclick(u.photo.close);
dom.prev.onclick(u.photo.prev);
dom.next.onclick(u.photo.next);

// listen for clicks on photo links
u(document).onclick(function (e)
{
	var link = u(e.target).up('a[href][rel~=photo]')[0] || u(e.target).is('a[href][rel~=photo]') && e.target;

	if (link) {
		e.preventDefault(); u.photo.open(link);
	}
	else
		(typeof u.photo.current != 'undefined') && (u(e.target).attr('id') == 'u-overlay' || u(e.target).attr('id') == 'u-photo') && u.photo.close();
})

})(mandoo);