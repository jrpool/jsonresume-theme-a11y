# jsonresume-theme-a11y

This is an accessible theme for [JSON Resume](http://jsonresume.org/). It produces a résumé or curriculum vitae (or any other document!) that satisfies some of the standards of accessibility set forth by the Accessibility Guidelines Working Group and the Accessible Rich Internet Applications (ARIA) Working Group.

## Status

This application is still under development and has not yet been published for use as a theme in the `jsonresume` project.

## Philosophy

This theme differs from other `jsonresume` themes by:

- Complying with accessibility standards.
- Including accessible metadata (for assistive technologies) in the output.
- Giving you granular control over content and format.
- Prioritizing accessibility over visual appeal.

## License

Available under [the MIT license](http://mths.be/mit).

## Basic usage

The standard instructions for using `jsonresume` themes can apply to this theme:

- Install [resume-cli](https://github.com/jsonresume/resume-cli).
- Install this theme: `npm install jsonresume-theme-a11y`.
- Create your JSON source file per the `resume-cli` instructions.
- Generate an HTML, markdown, or PDF file: `resume export --theme a11y --format html [outputfilename]`.

## Advanced usage

This theme gives you additional control over your résumé, beyond what the basic usage offers.

### Language

You can declare what language your résumé is in. Do this by including a `lang` property in your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this. For English, the `lang` property would be:

```json
"lang": {
  "format": "hide",
  "data": "en"
}
```

This is not only a localization feature, but also an accessibility feature. Declaring the language can be particularly helpful to a reader who has an assistive device convert the text to speech. By declaring the language, you may make it possible for the device to render the content with correct pronunciation.

### Order

You can decide which properties in your source file will be rendered at all. For those that you choose to render, you can specify what order they appear in.

Do this by including an `order` property in your source file. Make the value of the `order` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an array of strings. Each string should be one of the property names in your source file. Only those properties will be rendered, and they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file.

If you choose not to include an `order` property, the application does not promise to render the properties in a particular order. Typically the rendering order will be the same as the order in which the properties appear in the source file, but that is not guaranteed.

An example of an `order` property is:

```json
"order": {
  "format": "hide",
  "data": [
    "name",
    "contacts",
    "skills",
    "projects"
    "references"
  ]
}
```

### Legend

You can decide how headings and titles are rendered. Some property names and some values are rendered as parts of your résumé. You may choose to convert them, when rendered, to strings of your own choosing.

If your source file complies with the project standard described above under “Basic usage”, the only strings affected by a legend will be the property names in your source file, plus `creditTo`, which appears in the credit attribution at the end of the output file.

If you extend the project standard by using options described in this “Advanced usage” section, some property values, too, may be affected by a legend, specifically:

- The value of any `tableLeftHead` property is an array of arrays. Each inner array represents a table row. The **first** element of each inner array is a string that represent the content of the first cell of its row, which is a heading for the row. The legend can convert that string.
- The value of any `tableTopHead` property is an array of arrays. Each inner array represents a table row. The **first** inner array represents the first (top) row of the table. That row contains strings that represent the headings of all the columns. The legend can convert those strings.

To convert any string that is eligible for conversion, include a `legend` property in your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an object. The `data` object should have a property for each heading or title that you want to convert. The property name is the heading or title. Its value is the string you want it converted to.

Strings eligible for conversion but missing from the `legend` property (if any) are output without conversion.

Not all property names are included in the output document content. 

The `docs/resume-sample-1.json` file in this theme’s repository contains a `legend` object whose `data` object includes a conversion of each property name that appears in the `jsonresume` project’s sample `resume.json` file. It begins:

```json
"legend": {
  "format": "hide",
  "data": {
    "address": "Address",
    "area": "Area",
    "awarder": "Awarder",
    "awards": "Awards",
    "...": "..."
  }
}
```

 whose array of strings.
: The purposes and meanings of items are described by semantic tag names and `title` attributes. Semantically distinct sections are identified as `section` elements
 choose the values of the `title` attributes.: The default nclude a `legend` property in your JSON file that maps property names to , so that assistive technologies and tooltips will show (or translate) understandable captions.
 For different visual effects, you can revise the `style.css` file.
 Being more generic and permissive: You may use more than the standard property names.
 - Being more configurable: You may create an alternate `basicstemplate.html` file to reformat the specially formatted `basics` section. Alternatively, you may simply rename the section containing the basic information to something other than `basics`, and then it will be treated like any other section.
 - Respecting your choices: Some other `jsonresume` themes make decisions for you on inclusions, exclusions, and labels. With the exception of the `basics` section, as described above, this theme displays all the data in your JSON file.
