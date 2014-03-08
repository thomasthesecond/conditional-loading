define([
    'jquery',
    'layout'
], function($, layout)
{
    return new function()
    {
        var self = this;

        /**
         * @return {void}
         */
         self.init = function()
         {
            initConditionalContent();
            $(window).resize(initConditionalContent);

            initEnhancedContent();
            $(window).resize(initEnhancedContent);

            initSearchTrigger();

            layout.init({
                'small': initSmallLayout
            });
        };

        function initSmallLayout()
        {
            $('#search').removeAttr('style');
        }

        // -- End public methods

        function initConditionalContent()
        {
            var currentLayout = layout.getCurrentLayout();
            var $placeholder = $('.module-placeholder');

            $placeholder.each(function()
            {
                var definedLayout = $(this).data('layout');
                var deferredSrc = $(this).data('defer_src');
                var layoutArray = [];

                layoutArray = definedLayout.split('|');

                for (var i = 0; i < layoutArray.length; i++) {
                    if (layoutArray[i] == currentLayout)
                        ajaxLoad($(this), deferredSrc);

                    if ($.inArray(currentLayout, layoutArray) == -1)
                        removeContent($(this), deferredSrc);
                }
            });
        }

        function initEnhancedContent()
        {
            var currentLayout = layout.getCurrentLayout();
            $placeholder = $('.enhanced-content');

            $placeholder.each(function()
            {
                var $anchor = $(this).find('a');
                var deferredSrc = $anchor.attr('href');
                var definedLayout = $(this).data('layout');
                var layoutArray = [];
                var hideText = 'Hide Images';
                var viewText = 'View Images';
                var $enhancedContentLoaded = $('.enhanced-content > .loaded');

                layoutArray = definedLayout.split('|');

                for (var i = 0; i < layoutArray.length; i++) {
                    if (!$enhancedContentLoaded.length && layoutArray[i] == currentLayout) {
                        $anchor.html(hideText);
                        $anchor.parents('.enhanced-content').append($('<div class="loaded" />').load(deferredSrc));
                    }
                }

                $anchor.on('click', function()
                {
                    var $enhancedContent = $(this).parents('.enhanced-content');

                    $(this).html(hideText);

                    if (!$('.enhanced-content').find('.loaded').length) {
                        $enhancedContent.append($('<div class="loaded" />').load(deferredSrc));
                    }
                    else if ($('.enhanced-content > .loaded').length) {
                        $enhancedContent.find('.loaded').toggle();

                        if ($enhancedContent.find('.loaded').is(':visible')) {
                            $(this).html(hideText);
                        } else {
                            $(this).html(viewText);
                        }
                    }
                    else {
                        $(this).parents('.enhanced-content').find('.loaded').hide();
                        $(this).html(viewText);
                    }

                    return false;
                });
            });
        }

        function ajaxLoad($element, deferredSrc)
        {
            if ($element.children().length === 0) {
                $element.load(deferredSrc, function()
                {
                    console.log('LOADED: [' + deferredSrc + '] has been loaded successfully!');
                });
            }
        }

        function ajaxAppend($element, deferredSrc)
        {
            $(element).parents('.enhanced-content').append($('<div class="loaded" />').load(deferredSrc));
        }

        function removeContent($element, deferredSrc)
        {
            if ($element.children().length) {
                $element.empty();

                console.log('REMOVED: [' + deferredSrc + '] has been removed successfully!');
            }
        }

        function initSearchTrigger()
        {
            $('.search-trigger').find('a').on('click', function()
            {
                var target = $(this).attr('href');

                $(target).toggle();

                if ($(target).is(':visible'))
                    $(target).find('input').focus();
                else
                    $(target).find('input').blur();

                return false;
            });
        }

        // -- End private methods
    };
});