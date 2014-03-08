define(['jquery'], function($)
{
    return new function()
    {
        var self = this;

        // -- End properties

        /**
         * Initalizes layout method to run scripts at specified breakpoints.
         * @param  {object} callbacks This object should accept three options: desktop, tablet and mobile.
         * @return {void}
         */
        self.init = function(callbacks)
        {
            var resizeTimer;
            var layouts;
            var layoutsArray = [];

            for(var layout in callbacks) {
                if (callbacks.hasOwnProperty(layout))
                    layoutsArray.push(layout);

                layouts = layoutsArray.toString().replace(/[, ]+/g, ' ');
            }

            updateLayout(callbacks, self.getCurrentLayout(), layouts);

            $(window).resize(function()
            {
                if(resizeTimer !== null)
                    window.clearTimeout(resizeTimer);

                resizeTimer = window.setTimeout(function()
                {
                    updateLayout(callbacks, self.getCurrentLayout(), layouts);
                }, 250);
            });
        };

        /**
         * Sets up backwards compatibility for init.
         * @deprecated
         * @param  {object} callbacks
         * @return {void}
         */
        self.initResponsiveLayout = function(callbacks)
        {
            self.init(callbacks);
        };

        self.getCurrentLayout = function()
        {
            var currentLayout;

            if (window.opera) { // Fix for Opera issue when using font-family to store value
                currentLayout = window.getComputedStyle(document.body,':after').getPropertyValue('content');
            }
            else if (window.getComputedStyle) { // For all other modern browsers
                currentLayout = window.getComputedStyle(document.head,null).getPropertyValue('font-family');
            }
            else { // For old IE
                currentLayout = 'large';
            }

            return currentLayout.replace(/["']/g, "");
        };

        // -- End public methods

        function setLayout(layout, callback, layouts)
        {
            var el = $('html');

            if (!el.hasClass(layout))
                el
                    .removeClass(layouts)
                    .addClass(layout);

            if (typeof callback == 'object' && callback[layout] !== null)
                callback[layout]();
        }

        function updateLayout(callbacks, currentLayout, layouts)
        {
            for(var layout in callbacks) {
                if (callbacks.hasOwnProperty(layout) && currentLayout == layout)
                    setLayout(layout, callbacks, layouts);
            }
        }

        // -- End private methods
    };
});