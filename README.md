# jsonresume-theme-a11y <!--[![](https://badge.fury.io/js/jsonresume-theme-a11y.svg)](https://www.npmjs.org/package/jsonresume-theme-a11y)-->

This is an accessible theme for [JSON Resume](http://jsonresume.org/). It produces a résumé or curriculum vitae that satisfies some of the standards of accessibility set forth by the Accessibility Guidelines Working Group and the Accessible Rich Internet Applications (ARIA) Working Group.

## Status

This application is still under development and has not yet been published for use as a theme in the `jsonresume` project.

## Philosophy

This theme will differ from other `jsonresume` themes by:

- Including accessible metadata: The purposes and meanings of items are described by semantic tag names and `title` attributes. Semantically distinct sections are identified as `section` elements. You may also include a `legend` property in your JSON file that maps property names to `title` attributes, so that assistive technologies and tooltips will show (or translate) understandable captions.
- Prioritizing accessibility over visual appeal. For different visual effects, you can revise the `style.css` file.
- Being more generic and permissive: You may use more than the standard property names.
- Being more configurable: You may create an alternate `basicstemplate.html` file to reformat the specially formatted `basics` section. Alternatively, you may simply rename the section containing the basic information to something other than `basics`, and then it will be treated like any other section.
- Respecting your choices: Some other `jsonresume` themes make decisions for you on inclusions, exclusions, and labels. With the exception of the `basics` section, as described above, this theme displays all the data in your JSON file.

## License

Available under [the MIT license](http://mths.be/mit).
