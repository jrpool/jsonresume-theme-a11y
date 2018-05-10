# jsonresume-theme-a11y, Workflow B

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

This file gives you instructions for the above-illustrated Workflow B introduced in the [main README file](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README.md).

## Writing your source file

### Introduction

As you can see, in this workflow the first step is to write a source file in the a11y format. You can name it whatever you want, but the name that this theme expects (if you don’t tell it otherwise) is `resume-a11y.json`. You can also put it wherever you want, but this theme expects to find it (if you don’t tell it otherwise) in the directory of this theme. The [rendering section](#rendering) below tells you about that directory.

If you wish to start with an existing sample source file for another person’s résumé and edit it, or by imitating it in a new source file of your own, you can find five such examples:

-  [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-short/pool-short-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-short/pool-short-a11y.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y-verbose.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium/pool-medium-a11y-verbose.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium-ex/pool-medium-ex-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium-ex/pool-medium-ex-a11y.json)
- [https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium-ex/pool-mediumrecent-ex-a11y.json](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/docs/samples/pool-medium-ex/pool-mediumrecent-ex-a11y.json)

If, instead, you wish to follow instructions (or refer to them while using an example source file), here they are:

### Schema

This schema describes how you can use the a11y format to make decisions about your résumé.

This section is designed to be more of a reference document than a tutorial. You may want to look at it quickly and return to it to look things up, rather than read it carefully from start to end. Opening a sample `-a11y.json` file and looking up anything in it that puzzles you may be more productive.

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

#### Data (any arbitrary names)

You can record data that will be extracted into a section of your résumé. The benefit of doing this is that your data can remain constant, while from time to time you can change how the data are rendered.

Do this by including a property with any unique arbitrary name at the root level of your source file. Make the value of the property an object with 2 properties: `format` and `data`. The value of `format` is `hide`, and the value of `data` is an array of 1 or more objects. Each object in the array describes some item in the section. For example, if you are recording data about your history of education, each object could be one of the schools you have attended, or it could be one of the subjects you have studied. It’s your choice how to organize the section and how to structure each item in it, but the items for any given section should have uniform structures, so one set of rules for the section can render all its items.

#### Stringables

You can choose how passages of text in your résumé are formatted. You will see below that the theme format requires some property values and some array elements to be “stringables”. A stringable can be a string, but it can also be an array or object. If it is an array, then each of its elements is a stringable. If it is an object, then it has `format` and `data` properties. The format property has one of the values listed below (from `address` through `mailLink`), and the `data` property complies with the specifications of that value. The theme converts the object to a string. Wherever a specification requires a stringable, if an array of stringables is provided, the theme renders each element of the array and then concatenates the renderings into a string, without any delimiter. So, in the end, every stringable becomes a string.

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

##### Section types

Sections can be of two types:

- Extractive: Your section object creates an extractive section by applying a named format to the data in a named object. The theme extracts the data from the object and renders them according to the rules of the format.
- Integrated: Your section object creates an integrated section by applying a named format to data that you include in the section object itself.

The named formats of both types are defined in the `parser.js` file. If you want to define additional formats, you can do so by adding format definitions to that file. If your additional formats are likely to be useful to other users, you are invited to submit them as pull requests.

##### Extractive formats

An extractive section’s object has `extraction` as the value of its `format` property. Its `data` property’s value is an object with `from` and `into` properties. The `from` property has as its value a string naming the object containing the data for the section. The `into` property has as its value a string naming the extractive format for the section (shown in parentheses below).

There are 10 extractive formats to choose from:

###### Basic 2-line (`basicMainHeads`)

The named object’s value is an array of 1 object, which has `head` and `subhead` properties, both having strings as values.

The property will be rendered as 2 centered large-font-size bold lines, one below the other.

This format may be appropriate for a page heading like:

```
Forename Surname
Résumé
```

###### Basic multiline (`centeredStrongLines`)

The named object’s value is an array of stringables.

The property will be rendered as centered large-font-size bold lines, one below the other.

This format may be appropriate for a page heading of 3 or more lines, such as a heading containing a name, an occupation, a telephone number, and an email address.

###### Work/volunteering with list details (`headedWorkVolLists`)

The named object’s value is an array of objects, each of which has `organization`, `role`, `location`, `startDate`, `endDate`, and `highlights`. The value of the `highlights` property is an array of strings. The values of the other properties are stringables.

The property will be rendered as a succession of blocks. In each block, the first 4 lines are the organization’s name, the role, the location, and the date range, in a bold medium-size font. After that is a bulleted list of the elements of the `highlights` array.

###### Work/volunteering with prose details (`headedWorkVolParagraphs`)

The named object’s value is an array of objects, each of which has `organization`, `role`, `website`, `startDate`, `endDate`, and `synopsis` properties, all of whose values are strings. The value of the `website` property is a URL.

The property will be rendered as a succession of 3-line blocks. In each block, the first line is the organization’s name as a link to the website. The second line is the date range and the role, separated by a colon. The third line is the synopsis. The first 2 lines are bold, with the first having a font size larger than that of the second.

###### Conference presentations (`headedConferenceParagraphs`)

The named object’s value is an array of objects, each of which has `name`, `date`, and `title` properties, all of whose values are strings. The value of the `date` property is a date.

The property will be rendered as a succession of 2-line blocks. In each block, the first line is the conference name and the date, separated by a comma. The second line is the title, in quotation marks. The first line is bold.

###### Education (`headedEducationParagraphs`)

The named object’s value is an array of obects, each of which has `organization`, `level`, `diploma`, `specialties`, `website`, `startDate`, `endDate`, `synopsis`, `gpa`, and `transcript` properties, all of whose values are strings. The value of the `website` and `transcript` properties are URLs, and the values of the `startDate` and `endDate` properties are dates.

The property will be rendered as a succession of 3-line blocks. In each block, the first line is the organization’s name as a link to the website and the date range, separated by a comma. The second line is 4 elements, separated by semicolons:

- The `level` value (e.g., “undergraduate”).
- The `diploma` value (e.g., “B.A.”).
- The `gpa` value, labeled as such (e.g., “3.5” rendered as “GPA = 3.5”).
- A link to the URL that is the `transcript` value, identified as such.

The first and second lines are bold. The first line has a font size larger than that of the second line.

###### Grants (`headedGrantParagraphs`)

The named object’s value is an array of objects, each of which has `grantor`, `date`, and `title` properties, all of whose values are strings. The value of the `date` property is a date.

The property will be rendered as a succession of 2-line blocks. In each block, the first line is the grantor’s name and the date, separated by a comma. The second line is the grant title, in quotation marks. The first line is bold.

###### Publications (`headedPublicationParagraphs`)

The named object’s value is an array of objects, each of which has `authors`, `title`, `date`, `publisher`, and `url` properties. The `authors` value is an array of strings. The other properties’ values are strings. The `date` value is a date, and the `url` value is a URL.

The property will be rendered as a succession of 3-line blocks. In each block, the first line is the authors’ names, separated by commas. The second line is the publication title (not in quotation marks), as a link to the URL that is the `url` value. The third line is the publisher and the publication date, separated by a colon. If you want an article title quoted, you can include quotation marks in the `title` value.

###### Introductory lists (`introLists`)

The named object’s value is an array of objects, each of which has `introTopic` and `list` properties. The `introTopic` value is a stringable. The `list` property’s value is an array of strings.

The property will be rendered as a succession of blocks. In each block, the first line the `introTopic` value in a medium-size bold font. The remaining lines are a bulleted list of the elements in the `list` array.

###### Affiliations (`headedGroupLists`)

In this version this structure is identical to that of `introLists`, except that the property names are `organization` and `roles` (rather than `introTopic` and `list`).

The reason for the separate existence of this format is an intent to elaborate it in a future version, such as by permitting the inclusion of start and end dates of roles. Making this format distinct from `introLists` minimizes the revisions that would be required in a source file when such elaborations are added.

##### Integrated formats

An integrated section’s object has a named format as the value of its `format` property (shown in paretheses below). Its `data` property’s value is specified by the rules of the section’s format, given below.

There are 8 section formats to choose from:

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
- Enter the command `node parse`, optionally followed by one or two qualifications:

    - If your source file is not in the current directory or is not named `resume-a11y.json`, tell the theme where to find it, using an `-i` or `--input` option.
    - If you want your output file not to be in the current directory or not to be named `resume-a11y.html`, tell the theme where to put it, using an `-o` or `--output` option.

The file paths that you give as the values of the `-i`, `--input`, `-o`, and `--output` arguments can each be relative to the module directory or absolute paths starting with `/`.

Here are examples:

```bash
node parse
node parse -i docs/technical-resume.json
node parse -i /home/wang/cv/technical-resume.json
node parse --input docs/technical-resume.json
node parse -o technical-resume.html
node parse --output technical-resume.html
node parse -i docs/technical-resume.json --output technical-resume.html
```

 In the last of these examples, you would be asking the theme to retrieve your source file from inside the `docs` directory within the current directory, and telling it that the source file will be named `technical-resume.json`. And you would be asking the theme to render the résumé to a file named `technical-resume.html` in the current directory (not inside `docs`).
