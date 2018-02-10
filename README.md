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

If you wish, you can use this application as a theme for a document complying with the [`jsonresume` schema](https://jsonresume.org/schema/). That schema requires a JSON-compliant source file whose property names and value types are drawn from a permitted set.

- Install [resume-cli](https://github.com/jsonresume/resume-cli).
- Install this theme: `npm install jsonresume-theme-a11y`.
- Create your JSON source file. You can use the `resume init` command to start that file.
- Name your source file `resume.json` and put it into the `resume-cli` directory where this README file is located.
- Generate an HTML, markdown, or PDF file: `resume export --theme a11y --format {html|markdown|pdf} [outputfilename]`.

## Advanced usage

This theme gives you additional control over your résumé, beyond what the basic usage offers. You can exercise this control by modifying:

- The source file
- The command that invokes the application

Your options and the methods for selecting them are described below.

### Language (`lang`)

You can declare what language your résumé is in. This makes your résumé localized and also more accessible. With the language declared, an assistive device that is converting the text to speech may be better able to render the content with correct pronunciation.

Do this by including a `lang` property at the root level of your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this. For English, the `lang` property would be:

```json
"lang": {
  "format": "hide",
  "data": "en"
}
```

### Headings and titles (`legend`)

#### Introduction

You can decide how headings and titles are rendered.

Headings and titles can appear in the following ways:

- Heading of a list
- Heading of a headed string
- Metafact (fact revealed to a parser or conditionally displayed)

Under various conditions, a string may be rendered as one or another of these headings or titles. When they are rendered as titles, they appear as tooltips for those hovering a pointer, and they are also accessible to assistive technologies.

#### Examples

<blockquote>
**Languages known**<br>
Cobol<br>
Go<br><br>

**Languages known**: Cobol, Go<br><br>

`<h2 title="Languages known">Cobol, Go</h2>`
</blockquote>

In these examples, “Languages known” may be the rendered form of `languages`, `langs`, or some other string in your source file.

#### Eligible strings

Some property names and other strings in your source file are eligible for conversion into headings and titles.

If your source file complies with the project standard described above under “Basic usage”, the property names in your source file and one additional name specific to this application, namely `creditTo`, are used as headings or titles.

If you extend the project standard by using other options described in this “Advanced usage” section, the following string-type property values, too, are used as headings:

- The value of any `tableLeftHead` property is an array of arrays. Each inner array represents a table row. The **first** element of each inner array is a string that represent the content of the first cell of its row, which is a heading for the row.
- The value of any `tableTopHead` property is an array of arrays. Each inner array represents a table row. The **first** inner array represents the first (top) row of the table. That row contains strings that represent the headings of all the columns.
- The value of the `title` property of any object in your source file is rendered as a metafact about that object as rendered.

#### Method

To convert any string that is eligible for conversion, include a `legend` property at the root level of your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an object. The `data` object should have a property for each string that you want converted. That property’s name is the string, and its value is the string you want rendered.

Example:

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

Strings eligible for conversion but missing from the `legend` property (if any) are rendered without conversion.

The `docs/resume-sample-1.json` file in this theme’s repository is identical to the `jsonresume` project’s sample source file, except that a `legend` property is added. It converts each property name that appears in the source file to a human-intelligible string in English.

### Order

You can decide what things appear in your output file, and in what order.

Some objects in your source file are rendered in a particular order, as specified below. Otherwise, however, the properties of an object are rendered as a list, and in an arbitrary order.

To dictate the order rather than leave it to chance, you can give such an object an additional `order` property. Make its value an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an array of strings. Each string should be one of the property names in the object. **Only** those properties will be rendered, and they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file.

An example of an `order` property that might appear in the root-level object is:

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

### Sectioning

Your résumé will be partitioned into sections, sections may be in turn partitioned into subsections, subsections may be further partitioned into subsubsections, and so on.

Each section will have a format. You can let the application determine each section’s format, or you can choose it yourself.

Each section will also have a title. Together with headings in some sections, the titles ensure that users of assistive devices can perceive the document structure.

The application implements the following 7 section types. To give a type to a section, represent that section in your source file as an object with properties `format`, `title`, and `data`.

- Give its `format` property the name of one of the 7 section types (shown in parentheses below).
- Give its `data` property a value that complies with the specifications of that format.
- Give its `type` property a string value describing the nature of the section. If this value is found among the property names in a root-level `legend` object, it will converted accordingly before being rendered.

The `format` property should have a string value chosen from this list:

The 7 supported section formats (with the values to be given to their `format` properties) are:

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
