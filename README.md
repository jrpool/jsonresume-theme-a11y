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

This theme gives you additional control over your résumé, beyond what the basic usage offers. You can exercise this control by modifying:

- The source file
- The command that invokes the application

### Language

You can declare what language your résumé is in. Do this by including a `lang` property in your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this. For English, the `lang` property would be:

```json
"lang": {
  "format": "hide",
  "data": "en"
}
```

This is not only a localization feature, but also an accessibility feature. Declaring the language can be particularly helpful to a reader who has an assistive device convert the text to speech. By declaring the language, you may make it possible for the device to render the content with correct pronunciation.

### Legend

You can decide how headings and titles are rendered.

Headings and titles can appear in the following ways:

- Heading of a list
- Heading of a headed string
- Metafact (fact revealed to a parser or conditionally displayed)

Examples:

<blockquote>
**Languages known**<br>
Cobol<br>
Go<br><br>

**Languages known**: Cobol, Go<br><br>

`<h2 title="Languages known">Cobol, Go</h2>`
</blockquote>

Strings that can become headings and titles are present in your source file either as property names or as values of properties, as specified below. You can decide to convert them, when rendered, to strings of your own choosing.

If your source file complies with the project standard described above under “Basic usage”, the only strings affected by a legend will be property names in your source file, plus `creditTo`, which appears in the credit attribution at the end of the output file.

If you extend the project standard by using options described in this “Advanced usage” section, the following property values, too, may become headings or titles:

- The value of any `tableLeftHead` property is an array of arrays. Each inner array represents a table row. The **first** element of each inner array is a string that represent the content of the first cell of its row, which is a heading for the row. You can decide how that string is converted.
- The value of any `tableTopHead` property is an array of arrays. Each inner array represents a table row. The **first** inner array represents the first (top) row of the table. That row contains strings that represent the headings of all the columns. You can decide how those strings are converted.

To convert any string that is eligible for conversion, include a `legend` property at the root level of your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an object. The `data` object should have a property for each heading or title that you want converted. The property name is the property name or value you want to use in your source file. Its value is the string you want it converted to when rendered.

Strings eligible for conversion but missing from the `legend` property (if any) are rendered without conversion.

Property names, converted if possible, are included in the output document content in basic usage. In advanced usage, they are included in the output document for `boxedBulletList` properties. For other properties, they are rendered as metafacts the values of `title` attributes, with the result that they appear as tooltips for those hovering a pointer on `boxedBulletList` sections, and they are also accessible to assistive technologies.

The `docs/resume-sample-1.json` file in this theme’s repository contains a `legend` object whose `data` object includes a conversion of each property name that appears in the `jsonresume` project’s sample `resume.json` file. It begins:

```json
"legend": {
  "format": "hide",
  "data": {
    "address": "Address",
    "area": "Area",
    "awarder": "Awarded by",
    "awards": "Awards, grants, and prizes",
    "...": "..."
  }
}
```

### Order

You can decide which properties of the objects in your source file will be rendered at all. For those that you choose to render, you can specify what order they appear in.

Do this by adding an `order` property to each object you want to control. Make the value of the `order` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an array of strings. Each string should be one of the property names in your source file. Only those properties will be rendered, and they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file.

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

### Section content

You can decide what sections exist in your résumé, what they contain, and how they are formatted.

Think of each top-level property in your source file as a section. You can choose any property name for it (`work`, `references`, etc.), and that name, or if possible its legend conversion, will become the heading or title-attribute value of the section.

You can give each top-level property a format, if you wish. Do that by making the value of the property an object and then giving that object at least 2 properties, named `format` and `data`. Some formats will require other properties, as described below.

The `format` property should have a string value chosen from this list:

- boxedBulletList
- head
- pic1
- rowTables
- rowTablesCircled
- tableLeftHead
- tableTopHead

The format you choose constrains other properties of the object, as follows:

#### Boxed bullet list (`boxedBulletList`)

The `data` value must be an array of what we can call “stringables”. For now, assume that they are strings.

There may be a `level` property, with an integer value from 1 through 3. If there is none, the application will set `level` to 1. The value should depend on the degree of nesting of the list within other lists: 1 if it’s a top-level list, 2 if nested within another one, or 3 if nested even deeper.

Example:

```json
"hobbies": {
  "format": "boxedBulletList",
  "level": 2,
  "data": [
    "philately",
    "hang gliding"
  ]
}
```

The property will be rendered as a bulleted list, with a heading, enclosed in a box. Each stringable in the `data` array will be an item in the list. The property name, or its conversion, will be the heading.

#### Heading (`head`)

The `data` value must be a stringable.

There may be a `level` property, indicating how prominent you want the heading to be, from 1 (most) to 7 (least). If there isn’t one, the application will set `level` to 1.

The property will be rendered as a centered line of bold text.

#### Portrait ('pic1')

The `data` value must be an object with 2 properties: `src` and `alt`. The value of `src` should be the URL of an image. The value of `alt` should be a string describing the image.

The property will be rendered as an image in the upper-right corner of the document, not displacing any other content.

#### One-row tables (`rowTables`)

The `data` value must be an array of arrays of strings. Each inner array represents a one-row table whose cells are populated by the strings in that array.

The property will be rendered as a set of one-row tables, each centered, one below the other.

#### One-row tables with heading and border (`rowTablesCircled`)

The `data` value must be an object with `head` and `tables` properties. The `head` value must be a string. The `tables` value must be an array of arrays, as specified above under “One-row tables”.

There may be a `level` property, indicating how prominent you want the heading to be, from 1 (most) to 7 (least). If there isn’t one, the application will set `level` to 1.

The property will be rendered as a set of one-row tables, as with “One-row tables”, but with two additional features: a heading and an oval border.

#### Left-headed table (`tableLeftHead`)

The `data` value must be an array of arrays. Each inner array must contain at least 2 elements, the first being a string and the others being stringables.

The property will be rendered as a table whose leftmost column contains headings, right-justified and not bordered. The headings will be the first elements of the inner arrays, or, if possible, their legend conversions.

#### Top-headed table (`tableTopHead`)

The `data` value must be an array of arrays. The first inner array must be an array of strings, and any and all subsequent inner arrays must be arrays of stringables.

The property will be rendered as a table whose top row contains headings, centered and not bordered. The headings will be the elements of the first inner array or, if possible, their legend conversion.

### Stringables

Wherever a stringable is specified above, you can choose to provide it as a string. If you do, it will be rendered as it is.

Alternatively, you can provide it as an object with `format` and `data` properties. The format you choose determines the constraints on the value of `data`. The allowed values of `format` are:

#### Address (`address`)

The `data` value must be an object with `address`, `city, `region`, `postalCode`, and `countryCode` properties, where each of those properties has a string value.

It will be rendered as a 2-line string, with a line break after the (street) address.

#### Code (`code`)

The `data` value must be a stringable.

It will be rendered as a string whose typography indicates it is a segment of code.

#### Education (`ed`)

The `data` value must be an object with `head`, (optionally) `url`, `startDate`, `endDate`, and `area` (i.e. subject) properties.

It will be rendered as a single-line string. If a URL is provided, it will be the destination but not the content of a link. The link’s content will be the educational institution (`head`).

#### Headed string (`headedString`)

The `data` value must be an object with `head`, `tail`, and (optionally) `delimiter` properties. If you provide no `delimiter` property, the application sets the delimiter to `: `. The `head` and `tail` must each be stringables.

It will be rendered as a single-line string starting with the rendering of `head`, in bold, with the delimiter after that and, at the end, the rendering of `tail`.

#### Hyperlink (`hLink`)

The `data` value must be an object with (optionally) `label` and `href` properties, each having a string value, where the `href` string is a URL.

It will be rendered as a single-line hyperlink. If you provide a `label` property, its value will be shown as the link content. If you don’t, the displayed link content will be the URL that you provide as the `href` value.

#### Email link (`mailLink`)

The requirements and rendering are the same as with a hyperlink, except that the URL you provide as the `href` value is an email address. The application prefixes it with `mailto:` so that the link triggers the preparation of an email message.

#### Work (`work`)

The requirements and rendering are the same as with education, except that `duties` replaces `area`.

### Invocation

You can exercise additional control over the execution of the application, beyond what the `resume` command allows.

For this additional control, clone the application’s repository into a local directory and execute the application as follows:

`node index [source file] [output file]`

This command will use this theme to render the specified source file and will output the rendering to the specified output file.
