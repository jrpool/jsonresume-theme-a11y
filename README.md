# jsonresume-theme-a11y

This is an accessible theme for [JSON Resume](http://jsonresume.org/). It produces a résumé or curriculum vitae (or any other document!) that satisfies some of the standards of accessibility set forth by the [Accessibility Guidelines Working Group](https://www.w3.org/TR/WCAG21/) and the [Accessible Rich Internet Applications (ARIA) Working Group](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

Accessibility, in the sense of usability for a wide range of abilities and disabilities, is abbreviated `a11y`, and that explains the name of this theme.

## Accessibility metrics

The HTML files produced from one of the sample source files (`pool-medium-std.json`) by this theme and some other themes obtain the following accessibility scores (+) or error counts (–) when audited with some publicly available tools:

Theme | [ADT](https://chrome.google.com/webstore/detail/fpkknkljclfencbdbgkenhalefipecmb) (+) | [aXe](https://chrome.google.com/webstore/detail/lhdoppojpmngadmnindnejefpokejbdd) (–) | [WAA](https://chrome.google.com/webstore/detail/kpfleokokmllclahndmochhenmhncoej) (–) | [WAVE](https://chrome.google.com/webstore/detail/jbbplnpkjmmeebjpijfedlgcdilocofh) (–) | [SAC](https://siteimprove.com/)/AAA (–) | [HCS](http://pauljadam.com/extension.html)/AAA (–)
--- | ---: | ---: | ---: | ---: | ---: | ---:
a11y | 100 | 0 | 0 | 0 | 15 | 0
crisp | 94 | 22 | 15 | 2 | 62 | 2
eloquent | 97 | 211 | 184 | 8 | 590 | 328
flat | 89 | 44 | 42 | 7 | 83 | 42
modern | 97 | 3 | 0 | 2 | 8 | 2
stackoverflow | 89 | 35 | 40 | 16 | 316 | 143

## Philosophy

This theme differs from other `jsonresume` themes by:

- Prioritizing accessibility over visual appeal.
- Giving you granular control over content and format.

## License

Available under [the MIT license](http://mths.be/mit).

## Status

The current version of this theme is released as a minimum viable product. Contributions of, or suggestions for, enhancements and repairs are welcome. Feel free to make pull requests or open issues at [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y).

Contemplated future work includes:

- Investigating accessibility flaws reported by the Siteimprove Accessibility Checker (see above table).
- Performing human accessibility tests.
- Extending the theme’s functionality to cover compatibility with commonly used résumé parsers.

## Usage

### Introduction

The `jsonresume` project lets you create a JSON-format source file and automatically generate HTML and PDF from it, with any of [over 200 themes](https://www.npmjs.com/search?q=jsonresume-theme). Each theme determines what parts of your document will appear in the output, and how the output will be formatted.

This theme, `jsonresume-theme-a11y`, gives you more control over your résumé than other themes do. In order to enable that control, this theme defines a new standard for the JSON source file. The standard is more liberal: It gives you more flexibility. But it also imposes some requirements that you must satisfy in order to exercise your additional power.

For interoperability with other `jsonresume` themes, this theme contains a module that converts a file from the `jsonresume` standard format to the theme format. If you already have a résumé in the `jsonresume` format, the converter can create a version in this theme’s format. Thereafter you can edit that version as you choose, to change the information in your résumé and how it appears.

The three workflows for producing an HTML résumé with this theme, described in detail below, are illustrated here (`JR` = `jsonresume` format):

<img alt="A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML" src="https://jpdev.pro/jsonresume-theme-a11y/workflows.png" width="500">

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

### Installation

- Install [resume-cli](https://github.com/jsonresume/resume-cli).
- Install this theme: `npm install -g jsonresume-theme-a11y`. (The `jsonresume` project’s commands require that each theme you want to use be installed globally.)

### Authoring

You can create a source file in either of two formats.

#### `jsonresume` format

To create a résumé in the `jsonresume` format, you can:

- Use the `resume init` command to generate a starter source file.
- Edit the source file so it contains the information you want.

Alternatively, you can use any editor to create a source file in the format dictated by the [`jsonresume` schema](https://jsonresume.org/schema/).

#### Theme format

You can create a résumé in this theme’s format by complying with the specification below. If you prefer, you can copy and edit one of the sample source files with `a11y` in their names, located in the `docs/samples` directory of [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y).

### Conversion and generation

#### With the `resume` command

If you have a source file named `resume.json` in the `jsonresume` format in your current directory, you can generate an output with this theme by using the `resume export` command:

`resume export --theme a11y --format {html|pdf} <outputfilename>`

That command will generate the output in two steps:

- It will convert your source file (in memory, not as a file) to this theme’s format.
- It will then generate an output file from the latter format.

#### With `jsonresume-theme-a11y` commands

##### Introduction

By using this theme’s commands instead of the `resume` command, you can choose different options. Specifically:

- You can choose between a terse and a verbose format.
- You can get the input from any file, not only a file named `resume.json`.
- You can generate an intermediate source file, i.e. a file in this theme’s JSON format, and then perform edits on that file before rendering it in HTML. Those edits can make use of options that are not available under the `resume` command.

However, this theme’s commands do not render a file in PDF.

##### Installation

In order to use this theme’s commands, fork [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y) and clone your fork into a local directory. Then make that directory your current directory.

##### From a `jsonresume`-format source file

If you have a source file in the `jsonresume` format, you can convert it to this theme’s format with the following command:

```bash
node convert [-v (--verbose)] [-i (--input) oldsourcefile] [-o (--output) newsourcefile]
```

- If not specified, `oldsourcefile` defaults to `resume.json` in the current directory.
- If not specified, `newsourcefile` defaults to `resume-a11y.json` in the current directory.
- If specified, `-v` causes array values of object properties other than those in the `basics` object to be converted to bullet sublists. Otherwise, such values are converted into concatenations of their elements, with delimiters.

Once you have converted your `jsonresume`-format source file to the theme format, you can further edit the latter file to take advantage of this theme’s options.

Then follow the instruction below, using `newsourcefile` as your input.

##### From a source file in this theme’s format

If you have a source file in this theme’s format, you can generate an HTML file from it with the following command:

```bash
node parse [-i (--input) newsourcefile] [-o (--output) htmlfile]
```

- If not specified, `newsourcefile` defaults to `resume-a11y.json`.
- If not specified, `htmlfile` defaults to `resume-a11y.html`.

## Theme format

The rest of this README file is a specification of the theme’s JSON source-file format. To understand it more easily, you can look at the sample source files with names that include `a11y` in the `docs/samples` directory.

### Language (`lang`)

You can declare what language your résumé is in. This makes your résumé localized and also more accessible. With the language declared, an assistive device (such as a screen reader used by a blind user) that is converting the text to speech may be better able to choose the proper language-specific algorithm and thus render the content with correct pronunciation.

Do this by including a `lang` property at the root level of your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this.

If no language is declared in your source file, the HTML language declaration defaults to `en` (English).

### Page title (`title`)

You can determine the title of the document that will contain your résumé. Do this by including a `title` property at the root level of your source file. Make the value of the `title` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is the title, as a string.

If no `title` property is included, the document title defaults to “Résumé”.

### Translation (`legend`)

#### Introduction

You can make the theme translate some strings into other strings when it renders your document.

Wherever there is a `title` or `label` property in your source file and the value of that property is a string (or an array of strings), that string is (or the strings in that array are) translatable. Before rendering such a string, the theme checks whether you want it translated. If so, the theme renders its translation. If not, the theme renders the string as it appears in your source file.

#### Method

To tell the theme to translate a `title` or `label` string, include a `legend` property at the root level of your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an object. The `data` object has a property for each string that you want translated. The property’s name is the original text, and its value is the translation that you want.

### Order (`order`)

You can decide what root-level sections appear in your output file, and in what order.

The root-level properties in your source file, unless they are hidden or omitted, represent sections of your résumé. To decide which sections to include or omit, and what order the included ones will appear in, include an `order` property at the root level of your source file. Make its value an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an array of strings. Each string is one of the root-level property names. **Only** those properties can be rendered, and if rendered they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file. But, even if they appear in the `order` array, they will not be rendered if their `format` value is `hide`. So, to make an abbreviated version of your résumé, you can simply change to `hide` the `format` values of the sections you want to omit; you don’t need to remove their properties from the `order` object.

If your source file does not contain a root-level `order` property, then all of the sections without `hide` formats will be rendered, and there is **no guarantee** as to the order they will appear in.

### Stringables

You can choose how inline text in your résumé is formatted. You will see below that the theme format requires some items to be “stringables”. A stringable is a string, array, or object. If it is an array, then each of its elements is a stringable. If it is an object, then it has `format` and `data` properties. The format property has one of the values listed below (`address`, etc.), and the `data` property complies with the specifications of that value. The theme converts the object to a string. Wherever a specification requires a stringable, if an array of stringables is provided, the theme renders each element of the array and then concatenates the renderings into a string, without any delimiter.

#### Address (`address`)

The `data` value is an object with `point`, `city`, `region`, `postalCode`, and `countryCode` properties, where each of those properties has a string value.

It will be rendered as a 2-line string, with a line break after the `point` string (which is typically a street address or postal box identifier).

#### Bullet list (`bulletList`)

The `data` value is an array of stringables.

It will be rendered as a list of strings, each prefixed with a bullet.

#### Code (`code`)

The `data` value is a stringable.

It will be rendered as a string whose typography indicates it is a segment of code.

#### Education or work (`edWork`)

The `data` value is an object with `location`, (optionally) `url`, `startDate`, `endDate`, and `subject` properties.

It will be rendered as a single-line string. If a URL is provided, it will be the destination but not the content of a link. The link’s content will be the value of the `location` property (typically the name of a school or other organization).

#### Headed string (`headedString`)

The `data` value is an object with `head`, `tail`, and (optionally) `delimiter` properties. If you provide no `delimiter` property, the application sets the delimiter to `: `. The `head` and `tail` are stringables.

It will be rendered as a single-line string starting with the rendering of `head`, in bold, with the delimiter after that and, at the end, the rendering of `tail`.

#### Hyperlink (`hLink`)

The `data` value is an object with (optionally) `label` and `href` properties, each having a string value, where the `href` string is a URL.

It will be rendered as a single-line hyperlink. If you provide a `label` property, its value will be shown as the link content. If you don’t, the displayed link content will be the URL that you provide as the `href` value.

#### Email link (`mailLink`)

The requirements and rendering are the same as with a hyperlink, except that the URL you provide as the `href` value is an email address. The application prefixes it with `mailto:` so that the link triggers the preparation of an email message.

### Sections

#### Introduction

As described above, your résumé will be partitioned into sections, each represented in your source file as a root-level property.

Each section has a format, a “title” (i.e. metafact), and some content. To specify a section, make it an object with `format`, `title`, and `data` properties, whose values comply with the requirements given below.

Some formats require that the `data` property have an object value. This object may be required, or permitted, to have a `head` property. In such cases, the `head` property’s value is an object with `size` and `data` properties. The `size` value is an integer from 1 (largest) through 7 (smallest). The `data` value is a stringable.

There are 8 permitted section formats:

#### Boxed bullet list (`boxedBulletList`)

The `data` value is an object with an optional `head` property (see above) and a `list` property. The `list` property has an array of stringables as its value.

The property will be rendered as a bulleted list, with a heading if you included a `head` property, enclosed in a box. Each stringable in the `data.list` array will be an item in the bulleted list.

#### Centered text (`center`)

The `data` value is an array of objects. Each object has `size` and `text` properties. The `size` value is an integer from 1 (largest) through 7 (smallest). The `text` value is a stringable.

The `text` values will be rendered as lines, one below the other.

#### Left-headed table (`tableLeftHeads`)

The `data` value is an object with an optional `head` property (see above) and a `table` property. The `table` value is an array of objects. Each inner object has `label` and `data` properties. The `label` value is a string. The `data` value is an array of stringables.

The property will be rendered as a table whose leftmost column contains headings, right-justified and not bordered, with a heading if you included a `head` property.

#### One-row tables (`rowTables`)

The `data` value is an array of arrays of strings. Each inner array represents a one-row table whose cells are populated by the strings in that array.

The property will be rendered as a set of one-row tables, each centered, one below the other.

#### One-row tables with border (`rowTablesCircled`)

The `data` value is an object with an optional `head` property (see above) and a `tables` property. The `tables` value is an array of arrays, as specified above under “One-row tables”.

The property will be rendered as a set of one-row tables, as with “One-row tables”, but also with a heading if you included a `head` property and an oval border.

#### Paragraph (`left`)
The `data` value is an array of strings.

The property will be rendered as a succession of paragraphs, left-justified, one per string.

#### Portrait (`cornerPic`)

The `data` value is an object with 2 string properties: `src` and `alt`. The value of `src` is the URL of an image. The value of `alt` is a description of the image.

The property will be rendered as an image in the upper-right corner of the document, not displacing any other content.

#### Top-headed table (`tableTopHead`)

The `data` value is an object with an optional `head` property (see above) and a `table` property. The `table` value is an object with `label` and `data` properties. The `label` value is an array of strings. The `data` value is an array of stringables.

The property will be rendered as a table whose top row contains headings, centered and not bordered, with a heading if you included a `head` property.
