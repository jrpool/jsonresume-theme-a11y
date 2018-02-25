# jsonresume-theme-a11y, Workflow B

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

This file gives you instructions for the above-illustrated Workflow B introduced in the [main README file](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README.md).

## Writing your source file

### Introduction

As you can see, in this workflow the first step is to write a source file in the a11y format.

If you wish to do this by starting with an existing sample source file for another person’s résumé and editing it, or by imitating it in a new source file of your own, you can find three such examples:

-  [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-short/pool-short-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-short/pool-short-a11y.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y-verbose.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y-verbose.json)

If, instead, you wish to follow instructions (or refer to them while using an example source file), here they are:

### Schema

This schema describes how you can use the a11y format to make decisions about your résumé.

#### Language (`lang`)

You can declare what language your résumé is in. This makes your résumé localized and also more accessible. With the language declared, an assistive device (such as a screen reader used by a blind user) that is converting the text to speech may be better able to choose the proper language-specific algorithm and thus render the content with correct pronunciation and intonation.

Do this by including a `lang` property at the root level of your source file. Make the value of the `lang` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an [HTML-standard code](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for a language. Follow the [advice of the W3C](https://www.w3.org/International/questions/qa-choosing-language-tags) on this.

If no language is declared in your source file, the HTML language declaration defaults to `en` (English).

#### Page title (`title`)

You can determine the title of the document that will contain your résumé. Do this by including a `title` property at the root level of your source file. Make the value of the `title` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is the title, as a string.

If no `title` property is included, the document title defaults to “Résumé”.

#### Translation (`legend`)

##### Introduction

You can make the theme translate some strings into other strings when it renders your document.

Wherever there is a `title` or `label` property in your source file and the value of that property is a string (or an array of strings), that string is (or the strings in that array are) translatable. Before rendering such a string, the theme checks whether you want it translated. If so, the theme renders its translation. If not, the theme renders the string as it appears in your source file.

##### Method

To tell the theme to translate a `title` or `label` string, include a `legend` property at the root level of your source file. Make the value of the `legend` property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an object. The `data` object has a property for each string that you want translated. The property’s name is the original text, and its value is the translation that you want.

#### Order (`order`)

You can decide what root-level sections appear in your output file, and in what order.

The root-level properties in your source file, unless they are hidden or omitted, represent sections of your résumé. To decide which sections to include or omit, and what order the included ones will appear in, include an `order` property at the root level of your source file. Make its value an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an array of strings. Each string is one of the root-level property names. **Only** those properties can be rendered, and if rendered they will appear in the same order as their names appear in the `order.data` array, **not** in the order of the properties in the source file. But, even if they appear in the `order` array, they will not be rendered if their `format` value is `hide`. So, to make an abbreviated version of your résumé, you can simply change to `hide` the `format` values of the sections you want to omit; you don’t need to remove their properties from the `order` object.

If your source file does not contain a root-level `order` property, then all of the sections without `hide` formats will be rendered, and there is **no guarantee** as to the order they will appear in.

#### Stringables

You can choose how inline text in your résumé is formatted. You will see below that the theme format requires some items to be “stringables”. A stringable is a string, array, or object. If it is an array, then each of its elements is a stringable. If it is an object, then it has `format` and `data` properties. The format property has one of the values listed below (`address`, etc.), and the `data` property complies with the specifications of that value. The theme converts the object to a string. Wherever a specification requires a stringable, if an array of stringables is provided, the theme renders each element of the array and then concatenates the renderings into a string, without any delimiter.

##### Address (`address`)

The `data` value is an object with `point`, `city`, `region`, `postalCode`, and `countryCode` properties, where each of those properties has a string value.

It will be rendered as a 2-line string, with a line break after the `point` string (which is typically a street address or postal box identifier).

##### Bullet list (`bulletList`)

The `data` value is an array of stringables.

It will be rendered as a list of strings, each prefixed with a bullet.

##### Code (`code`)

The `data` value is a stringable.

It will be rendered as a string whose typography indicates it is a segment of code.

##### Education or work (`edWork`)

The `data` value is an object with `location`, (optionally) `url`, `startDate`, `endDate`, and `subject` properties.

It will be rendered as a single-line string. If a URL is provided, it will be the destination but not the content of a link. The link’s content will be the value of the `location` property (typically the name of a school or other organization).

##### Headed string (`headedString`)

The `data` value is an object with `head`, `tail`, and (optionally) `delimiter` properties. If you provide no `delimiter` property, the application sets the delimiter to `: `. The `head` and `tail` are stringables.

It will be rendered as a single-line string starting with the rendering of `head`, in bold, with the delimiter after that and, at the end, the rendering of `tail`.

##### Hyperlink (`hLink`)

The `data` value is an object with (optionally) `label` and `href` properties, each having a string value, where the `href` string is a URL.

It will be rendered as a single-line hyperlink. If you provide a `label` property, its value will be shown as the link content. If you don’t, the displayed link content will be the URL that you provide as the `href` value.

##### Email link (`mailLink`)

The requirements and rendering are the same as with a hyperlink, except that the URL you provide as the `href` value is an email address. The application prefixes it with `mailto:` so that the link triggers the preparation of an email message.

#### Sections

##### Introduction

As described above, your résumé will be partitioned into sections, each represented in your source file as a root-level property.

Each section has a format, a “title” (i.e. metafact), and some content. To specify a section, make it an object with `format`, `title`, and `data` properties, whose values comply with the requirements given below.

Some formats require that the `data` property have an object value. This object may be required, or permitted, to have a `head` property. In such cases, the `head` property’s value is an object with `size` and `data` properties. The `size` value is an integer from 1 (largest) through 7 (smallest). The `data` value is a stringable.

There are 8 permitted section formats:

##### Boxed bullet list (`boxedBulletList`)

The `data` value is an object with an optional `head` property (see above) and a `list` property. The `list` property has an array of stringables as its value.

The property will be rendered as a bulleted list, with a heading if you included a `head` property, enclosed in a box. Each stringable in the `data.list` array will be an item in the bulleted list.

##### Centered text (`center`)

The `data` value is an array of objects. Each object has `size` and `text` properties. The `size` value is an integer from 1 (largest) through 7 (smallest). The `text` value is a stringable.

The `text` values will be rendered as lines, one below the other.

##### Left-headed table (`tableLeftHeads`)

The `data` value is an object with an optional `head` property (see above) and a `table` property. The `table` value is an object with an optional `caption` property and a `data` property. The `caption` value is an object with `size` and `data` properties, where the `size` value is an integer from 1 (largest) through 7 (smallest) and the `data` value is a string. The `data` value (of `table`) is an array of objects, each representing a row. Each object has `label` and `data` properties. The `label` value is a string. The `data` value is an array of stringables.

The property will be rendered as a table whose leftmost column contains headings, right-justified and not bordered, with a heading and/or caption if you included a `head` and/or `caption` property.

If you want the table to have only one item of text introducing or labeling it, you can best serve accessibility by making it a `caption` value and omitting the `head` property. That ties it tightly to the table.

##### One-row tables (`rowTables`)

The `data` value is an array of arrays of strings. Each inner array represents a one-row table whose cells are populated by the strings in that array.

The property will be rendered as a set of one-row tables, each centered, one below the other.

##### One-row tables with border (`rowTablesCircled`)

The `data` value is an object with an optional `head` property (see above) and a `tables` property. The `tables` value is an array of arrays, as specified above under “One-row tables”.

The property will be rendered as a set of one-row tables, as with “One-row tables”, but also with a heading if you included a `head` property and an oval border.

##### Paragraph (`left`)
The `data` value is an array of strings.

The property will be rendered as a succession of paragraphs, left-justified, one per string.

##### Portrait (`cornerPic`)

The `data` value is an object with 2 string properties: `src` and `alt`. The value of `src` is the URL of an image. The value of `alt` is a description of the image.

The property will be rendered as an image in the upper-right corner of the document, not displacing any other content.

##### Top-headed table (`tableTopHead`)

The `data` value is an object with an optional `head` property (see above) and a `table` property. The `table` value is an object with an optional `caption` property, a `label` property, and a `data` property. The `caption` value is an object with `size` and `data` properties. The `size` value is an integer from 1 (largest) through 7 (smallest). The `data` value is a string. The `label` value is an array of strings. The `data` value is an array of arrays of stringables, each inner array representing a row.

The property will be rendered as a table whose top row contains headings, centered and not bordered, with a heading and/or caption if you included a `head` and/or `caption` property. If you want the table to have only one item of text introducing or labeling it, you can best serve accessibility by making it a `caption` value and omitting the `head` property. That ties it tightly to the table.

## Rendering

After writing your source file in the a11y format, your next step is to render it into a web page.

This step involves the following actions:

- If you don’t yet have `node` running on your computer, [install it](https://nodejs.org/en/). Either the latest version or the LTS version is good.
- Make a local copy on your own computer of [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y). If you don’t already know how, the easiest way is to click on the `Clone or download` button and choose `Download ZIP`, then open the saved `.zip` file to make a directory.
- Open a terminal window and make that directory your current directory.
- Enter the following command:

```bash
node parse [-i (--input) newsourcefile] [-o (--output) htmlfile]
```

- If not specified, `newsourcefile` defaults to `resume-a11y.json`.
- If not specified, `htmlfile` defaults to `resume-a11y.html`.
