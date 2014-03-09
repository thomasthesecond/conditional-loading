# Conditional Loading for Responsive Web Design

Demonstrating loading content conditionally via AJAX (`jQuery.load`) for mobile-first respsonsive web design.

<a name="demo"></a>
## Demo

[View the demo](http://thomasthesecond.github.io/conditional-loading/) or read on and inspect the source code to see what's going on.

<a name="purpose"></a>
## Purpose

The purpose of this demo is to experiment with loading content conditionally for mobile-first respsonsive web design. With a mobile-first approach, you should not be writing markup and hiding it via CSS. Using a conditional loading method, you can wait to load the content only when's it's needed. The notion of conditional loading isn't new; for more information on why this is a good idea, please see [Inspiration](#inspiration) below.

## How it Works

In the demo, content can be loaded in two ways; [automatically](#load-automatically) (based on breakpoint) or via [user interaction](#load-by-user) (click event).

<a name="load-automatically"></a>
### Loading Content Automatically

To load content automatically, the markup looks similar to this:
	
	<div class="module-placeholder" data-defer_src="includes/sidebar.html" data-layout="medium"></div>

An empty `div` with the `module-placeholder` class is required; this `div` should be placed where you want to load the content. AJAX will be used to load the content from the template defined in the `defer_src` data attribute. The `layout` data attribute is used to defined the breakpoint(s) at which the content should be loaded. You can add multiple breakpoints separated by a pipe, like so: `xlarge|large|medium`.

<a name="load-by-user"></a>
### Loading Content by User Interaction

The second method demonstrated is loading content by a click event initiated by the user. On less capable devices, or devices with smaller screens, the content is not loaded until the user clicks a button to load it. However, on devices with larger screens, the content will be loaded automatically.

The markup looks similar to this:

	<div class="enhanced-content" data-layout="xlarge|large">
		<p>
			<a class="button button-primary toggle toggle-images" href="includes/images.html">View Images</a>
		</p>
	</div><!-- .enhanced-content -->

Here we have a `div` with the class `enhanced-content` (to differentiate from the automatic method above) in which the content will be loaded. Again, the `layout` data attribute is utilized to define when the content should be loaded automatically. If none of the defined breakpoints match the current breakpoint on load, then the content is not loaded until the `button` element is clicked.

## File Size Comparison

Out of curiosity, here are the differences in file sizes between HTML documents:

* 4 KB: Mobile-first (only necessary content loaded)
* 7 KB: Desktop-first (all content loaded at once)

But as we know, making our files smaller, while always important, is only a small part of creating high-performance website. [Reducing HTTP requests](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html) is top priority. See [Issues](#issues) below.

<a name="issues"></a>
## Issues

Please report any issues or questions you may have. I'm sure that this method is far from perfect and can be improved upon. The goal is to create a solution that can safely and effectively be used on production-ready websites.

### HTTP Requests

The additional HTTP requests added by the AJAX includes could keep this from being a viable solution on larger websites. In the demo, the number of requests more than double on larger screens. While these extra requests only occur on larger screens, it's possible that a larger screen could be an iPad using a 3G network.

* [Filament Group](http://filamentgroup.com/lab/ajax_includes_modular_content/) created a nice workaround by concatenating the embeds into a single file, thus a single request.
* On ExpressionEngine websites, I had a crazy thought to use one or a few embeds for all content. Basically, manually concatenating what would be many separate files and then writing some extra JavaScript to pull in the specific section of content where it's needed. Probably not a good idea for long term maintenance.

<a name="inspiration"></a>
## Inspiration

* [http://24ways.org/2011/conditional-loading-for-responsive-designs/](http://24ways.org/2011/conditional-loading-for-responsive-designs/)
* [http://filamentgroup.com/lab/ajax_includes_modular_content/](http://filamentgroup.com/lab/ajax_includes_modular_content/)
* [http://www.html5rocks.com/en/mobile/responsivedesign/](http://www.html5rocks.com/en/mobile/responsivedesign/)