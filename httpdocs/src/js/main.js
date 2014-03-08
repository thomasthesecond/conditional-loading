require.config({
    baseUrl: 'src/js',
    paths: {
        // Libraries
        jquery             : 'lib/jquery/jquery-1.10.2',

        // Utils
        layout             : 'utils/layout',

        // Controllers
        content            : 'controllers/content'
    }
});

define('modernizr', [], Modernizr);

require([
    'jquery',
    'modernizr',
    'content'
], function($, Modernizr, content)
{
    $(function()
    {
        content.init();
    });
});