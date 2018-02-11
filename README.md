# jsonresume-theme-a11y

This is an accessible theme for [JSON Resume](http://jsonresume.org/). It produces a résumé or curriculum vitae (or any other document!) that satisfies some of the standards of accessibility set forth by the Accessibility Guidelines Working Group and the Accessible Rich Internet Applications (ARIA) Working Group.

## Status

This application is still under development and has not yet been published for use as a theme in the `jsonresume` project.

## Philosophy

This theme differs from other `jsonresume` themes by:

- Complying with accessibility standards.
- Prioritizing accessibility over visual appeal.
- Giving you granular control over content and format.

## License

Available under [the MIT license](http://mths.be/mit).

## Usage

### Introduction

In order to give you more control over your résumé than other themes do, this theme defines a new standard for the JSON source file. The standard is more liberal, by giving you more flexibility. But it also imposes some requirements that you must satisfy in order to exercise your additional power.

For interoperability with other `jsonresume` themes, this theme contains a module that translates a file from the `jsonresume` standard format to the theme format. If you already have a résumé in the former standard, you can use that module to create a version in the theme’s format. Thereafter you can edit that version as you choose, to change the information in your résumé and how it appears.

### Installation

- Install [resume-cli](https://github.com/jsonresume/resume-cli).
- Install this theme: `npm install jsonresume-theme-a11y`.

### Authoring

If you want to create, a résumé in the `jsonresume` standard format, you can:

- Use the `resume init` command to generate a starter source file.
- Name the source file `resume.json` and put it into the `resume-cli` directory where this README file is located.
- Edit the source file so it contains the information you want.

Once you have a source file in the `jsonresume` standard format, you can convert it to this theme’s format as follows:

- Clone this theme’s repository into a local directory.
- Use the `node convert [oldsourcefile] [newsourcefile]` command to convert your source file to this theme’s format.

If you want to use only this theme and you don’t yet have a résumé in the `jsonresume` standard format, you can author a file directly in this theme’s format. That format is described below.

### Generation

#### In `resume-cli`

If you have a résumé in the `jsonresume` standard format, you can generate an output in this theme with the `resume-cli` command:

`resume export --theme a11y --format {html|markdown|pdf} [outputfilename]`

This command will generate the output in two steps:

- It will convert your source file to a source file in this theme’s format.
- It will then generate an output file from the latter file.

The command requires that your source file be located in the `resume-cli` directory and be named `resume.json`.

#### In `jsonresume-theme-a11y`

If you are in a local repository of this theme instead, and if you have already created or generated a source file in this theme’s format, you can generate an HTML output file with the command:

`node index [< source file] [> output file]`

This command gets your source file from standard input and outputs the result to standard output. That permits you to maintain multiple source files, and keep them anywhere in your filesystem. You can choose the input and output files each time you issue the command.

This command will use this theme to render the specified source file and will output the HTML rendering to the specified output file.

At this time, this command does not generate a PDF or Markdown output file. You can do that with the `resume-cli` counterpart, or by using another method to convert this command’s HTML output to PDF or Markdown.

## Theme format

This is a specification of the theme’s JSON source file format.

### Language (`lang`)

You can declare what language your résumé is in. This makes your résumé localized and also more accessible. With the language declared, an assistive device that is converting the text to speech may be better able to choose the proper language-specific algorithm and thus render the content with correct pronunciation.

Do this by including a `lang` property at the root level of your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this. For English, the `lang` property would be:

```json
"lang": {
  "format": "hide",
  "data": "en"
}
```

### Introducers (`legend`)

#### Introduction

You can decide how “introducers” are rendered.

Introducers can appear in the following forms:

- Heading of a list
- Prefix of a string
- Metafact (fact revealed to a parser or conditionally displayed)

Under various conditions, a string may be rendered as one or another of these introducers. When they are rendered as metafacts, they appear as hover-triggered tooltips, and they are also accessible to assistive technologies.

#### Examples

<blockquote>
**Languages known**<br>
Cobol<br>
Go<br><br>

**Languages known**: Cobol, Go<br><br>

`<h2 title="Languages known">Cobol, Go</h2>`
</blockquote>

In these examples, “Languages known” is an introducer.

#### Eligible strings

The following strings in your source file are introducers:

- Non-hidden property names
- Values of `title` properties
- First cells of `tableLeftHead` rows
- Cells in first `tableTopHead` row

#### Method

Before this theme renders an introducer in an output file, the theme first checks to see whether you want it “translated”. That means converted from its text in the source file to some other text.

To tell the theme to translate introducers, include a `legend` property at the root level of your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an object. The `data` object should have a property for each introducer that you want translated. Use the original text as the property name, and the translation as the property value.

Example:

```json
"legend": {
  "format": "hide",
  "data": {
    "address": "Street address",
    "area": "Major",
    "awarder": "Granting agency",
    "awards": "Awards, grants, and prizes",
    "...": "..."
  }
}
```

### Order

You can decide what root-level sections appear in your output file, and in what order.

The root-level properties in your source file, unless they are hidden or omitted, represent sections of your résumé. To decide which sections to include, and what order they will appear in, include an `order` property at the root level of your source file. Make its value an object with 2 properties: `format` and `data`. The value of `format` should be `hide`, and the value of `data` should be an array of strings. Each string should be one of the root-level property names. **Only** those properties will be rendered, and they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file.

An example of an `order` property that might appear in the root-level object is:

```json
"order": {
  "format": "hide",
  "data": [
    "name",
    "contacts",
    "skills",
    "projects",
    "references"
  ]
}
```

If your source file does not contain a root-level `order` property, then all of the non-hidden sections will be rendered, and there is no guarantee as to the order they will appear in.

### Stringables

You can give various formats to inline text in your résumé. The theme format requires that some items be “stringables”. A stringable is either a string or an object that the theme knows how to convert to a string. Such an object must have `format` and `data` properties. The format property has one of the following format descriptors as its value:

#### Address (`address`)

The `data` value is an object with `address`, `city`, `region`, `postalCode`, and `countryCode` properties, where each of those properties has a string value.

It will be rendered as a 2-line string, with a line break after the (street) address.

#### Code (`code`)

The `data` value is a stringable.

It will be rendered as a string whose typography indicates it is a segment of code.

#### Education or work (`edWork`)

The `data` value is an object with `location`, (optionally) `url`, `startDate`, `endDate`, and `subject` properties.

It will be rendered as a single-line string. If a URL is provided, it will be the destination but not the content of a link. The link’s content will be the value of the `location` property.

#### Headed string (`headedString`)

The `data` value is an object with `head`, `tail`, and (optionally) `delimiter` properties. If you provide no `delimiter` property, the application sets the delimiter to `: `. The `head` and `tail` must each be stringables.

It will be rendered as a single-line string starting with the rendering of `head`, in bold, with the delimiter after that and, at the end, the rendering of `tail`.

#### Hyperlink (`hLink`)

The `data` value is an object with (optionally) `label` and `href` properties, each having a string value, where the `href` string is a URL.

It will be rendered as a single-line hyperlink. If you provide a `label` property, its value will be shown as the link content. If you don’t, the displayed link content will be the URL that you provide as the `href` value.

#### Email link (`mailLink`)

The requirements and rendering are the same as with a hyperlink, except that the URL you provide as the `href` value is an email address. The application prefixes it with `mailto:` so that the link triggers the preparation of an email message.

### Sections

#### Introduction

As described above, your résumé will be partitioned into sections. Sections may also have subsections, which may have subsubsections, etc. When “section” appears below, it refers to a section at any level of nesting.

Each section must have a format, a “title” (i.e. metafact), and some content. To specify a section, make it an object with `format`, `title`, and `data` properties, whose values comply with the requirements given below.

The `title` property of a section object may, if you wish, be identical to the name of the property whose value that object is. For example, if there is a `hobbies` property and your legend translates `hobbies` to “Leisure activities”, you can make the `title` value `hobbies`, just like the property name.

However, you may prefer to have a reusable legend while customizing some of the titles, such as replacing "hobbies" with "What I do after work".

There are 7 permitted section formats:

#### Boxed bullet list (`boxedBulletList`)

The `data` value is an array of stringables.

Example:

```json
"hobbies": {
  "format": "boxedBulletList",
  "title": "What I do after work",
  "data": [
    "philately",
    "hang gliding"
  ]
}
```

The property will be rendered as a bulleted list with a heading (i.e. the value of `title`, or its conversion), enclosed in a box. Each stringable in the `data` array will be an item in the bulleted list.

#### Centered text (`center`)

The `data` value is an array of objects. Each object has `text` and `size` properties. The `text` value is a stringable. The `size` value is an integer from 1 (largest) through 7 (smallest).

The `text` values will be rendered as lines, one below the other.

#### Portrait ('cornerPic')

The `data` value is an object with 2 properties: `src` and `alt`. The value of `src` should be the URL of an image. The value of `alt` should be a string describing the image.

The property will be rendered as an image in the upper-right corner of the document, not displacing any other content.

#### One-row tables (`rowTables`)

The `data` value is an array of arrays of strings. Each inner array represents a one-row table whose cells are populated by the strings in that array.

The property will be rendered as a set of one-row tables, each centered, one below the other.

#### One-row tables with heading and border (`rowTablesCircled`)

The `data` value is an object with `head` and `tables` properties. The `head` value is an object with `text` and `size` properties. The `text` value is a stringable. The `size` value is an integer from 1 (largest) through 7 (smallest). The `tables` value is an array of arrays, as specified above under “One-row tables”.

The property will be rendered as a set of one-row tables, as with “One-row tables”, but with two additional features: a heading and an oval border.

#### Left-headed table (`tableLeftHeads`)

The `data` value is an object with properties `head`, `size`, and `table`. The `head` value is a string. The `size` value is an integer from 1 (largest) through 7 (smallest). The `table` value is an array of arrays. Each inner array must contain at least 2 elements, the first being a string and the others being stringables.

The property will be rendered as a table whose leftmost column contains headings, right-justified and not bordered. The row headings will be the first elements of the inner arrays, or, if possible, their conversions.

#### Top-headed table (`tableTopHead`)

The `data` value is an object with properties `head`, `size`, and `table`. The `head` value is a string. The `size` value is an integer from 1 (largest) through 7 (smallest). The `table` value is an array of arrays. The first inner array is an array of strings, and any and all subsequent inner arrays are arrays of stringables.

The property will be rendered as a table whose top row contains headings, centered and not bordered. The headings will be the elements of the first inner array or, if possible, their conversions.
