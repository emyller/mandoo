(function (u) {
/*
    UI Notifications module for the mandoo JavaScript library
    Copyright (c) 2009 inimino
*/
u.mod(
/* info */
{name: 'ui_notification'
,version: 0.1
},
/* deps */
['ui_basics'
],
/* core */
{Notification: u.Class({
    __construct: function (text, options) {
        // here the magic happens
        this.options = options = u.extend(
            {timeout: 10000
            ,position: ['right', 'bottom']
            ,closeButton: !(options || {}).action
            ,modal: false
            }, options || {})

        // a reference to the instance, so that we can use it on internal scopes
        var _this = this,

        // create the used elements
        dom = this.DOMElements = {
            main: u.create('div.mandoo_notification'),
            icon: options.icon ? u.create('img.mandoo_notification_icon[src='+options.icon+']') : undefined,
            text: u.create('div.mandoo_notification_text', text),
            close: options.closeButton ? u.create('button.mandoo_notification_close') : undefined}

        // build the elements
        dom.main.add(dom.text)
		if(dom.icon) dom.main.add(dom.icon)
        if(dom.close) dom.main.add(dom.close)

        // callbacks
        if(options.action) dom.main.onclick(options.action)
        if(options.closeButton) dom.close.onclick(function(){_this.close()})

        // put the notification on the screen
        if(options.modal) u.modal(true)
        u.append(dom.main).front().pos(options.position).fadeIn({ speed: 'fast' })

        // set a timeout to close
        if(options.timeout)
            this.closeTimeout = setTimeout(function(){_this.close()}, options.timeout)},

    close: function () {
        if(this.options.modal) u.modal(false)
        this.DOMElements.main.fadeOut({ destroy: true })}

})});

})(mandoo);
