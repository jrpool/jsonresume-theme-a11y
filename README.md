# jsonresume-theme-a11y

## Introduction

This is an accessible theme for [JSON Resume](http://jsonresume.org/). It produces a résumé or curriculum vitae (or any other document!) that satisfies many of the standards of accessibility set forth by the [Accessibility Guidelines Working Group](https://www.w3.org/TR/WCAG21/) (WCAG 2.1) and the [Accessible Rich Internet Applications (ARIA) Working Group](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) (WAI-ARIA).

Accessibility, in the sense of usability for a wide range of abilities and disabilities, is abbreviated `a11y`. Hence the name of this theme.

## Accessibility metrics

How accessible are the HTML files produced by this theme? For one approximation, we can perform tests on what this theme and other themes produce from an identical source file. Here are results from such a set of tests. The source file is `pool-medium-std.json`, one of the samples in this theme’s repository. Tests were conducted with some publicly available tools. Relative success is indicated by a high accessibility score (+) or a low error count (–).

Theme | [ADT](https://chrome.google.com/webstore/detail/fpkknkljclfencbdbgkenhalefipecmb) (+) | [aXe](https://chrome.google.com/webstore/detail/lhdoppojpmngadmnindnejefpokejbdd) (–) | [WAA](https://chrome.google.com/webstore/detail/kpfleokokmllclahndmochhenmhncoej) (–) | [WAVE](https://chrome.google.com/webstore/detail/jbbplnpkjmmeebjpijfedlgcdilocofh) (–) | [SAC](https://siteimprove.com/)/AAA (–) | [HCS](http://pauljadam.com/extension.html)/AAA (–)
--- | ---: | ---: | ---: | ---: | ---: | ---:
**a11y** | **100** | **0** | **0** | **0** | **15** | **0**
crisp | 94 | 22 | 15 | 2 | 62 | 2
eloquent | 97 | 211 | 184 | 8 | 590 | 328
flat | 89 | 44 | 42 | 7 | 83 | 42
modern | 97 | 3 | 0 | 2 | 8 | 2
stackoverflow | 89 | 35 | 40 | 16 | 316 | 143

Such automated testing is not definitive. Some of the above-tabulated errors are not really violations of standards, but rather solutions that adopt one of several permitted methods, which a particular tool is not properly recognizing. Conversely, accessibility defects may exist that some tools do not catch.

## Philosophy

This theme differs from other `jsonresume` themes by:

- Prioritizing accessibility over visual appeal.
- Giving you granular control over content and format.

## License

Available under [the MIT license](http://mths.be/mit).

## Status

### Current

The current version of this theme is 2.0.0. Contributions of, or suggestions for, enhancements and repairs are welcome. Feel free to make pull requests or open issues at [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y).

### History

Version 2.0.0 made a breaking change to version 1.0.12. The schema changed with respect to section formats `tableLeftHeads` and `tableTopHead`.

The prior schema made no provision for table captions. The current schema permits captions in the tables of both these formats. Captions are a recommended feature for usability in general and accessibility in particular. In order to allow captions, the schema revised the specification of `tableLeftHeads` to make the `table` value an object rather than an array. A `tableLeftHeads` section conforming to the schema of version 1.0.12 would fail to conform to the schema of version 2.0.0.

### Future

Contemplated future work includes:

- Investigating additional opportunities for accessibility improvements in the theme.
- Performing human accessibility tests.
- Extending the theme’s functionality to cover compatibility with commonly used résumé parsers.
- Implementation of additional formats.

## Usage

### Introduction

The `jsonresume` project lets you create a _source file_ containing the information in your résumé (which is used here to refer to any content) and then automatically generate a web page containing that information in any of over 200 formats. Each format belongs to one of the [`jsonresume` themes](https://www.npmjs.com/search?q=jsonresume-theme). So, instead of baking a format into your résumé by combining the information and the design into a single document, you separate these two components. You can think of the project’s value proposition as “Write once, apply anywhere”.

Here the concept of “format” means more than layout. It also includes selection. Each theme selects some of the information in your source file for inclusion and omits the rest. Some themes select it all. So, to the extent that applying for employment at different organizations requires you to change both the appearance and the content of your résumé, you may find themes that do what you want.

This theme, `jsonresume-theme-a11y`, approaches your design decisions in a different way. It gives you more control, so if you decide to create a version of your résumé with certain information omitted, you don’t need to look for a theme that does that. You can, instead, tell this theme to do it.

Conversely, this theme forces your résumé to comply with accessibility standards. So it does not let you do things that would impair accessibility. For example, accessible web pages can’t depend on mouse manipulation for navigation, and they can’t have subtle, hard-to-distinguish color differences. Some themes produce résumés violating those requirements; this one does not. So your aesthetic choices are constrained here.

### Source files

The `jsonresume` system depends on your source file adhering strictly to a particular format, so that a theme can automatically convert it to the résumé that you want.

This theme permits you to create a source file in a different format, one that allows you to give the theme more detailed instructions.

So, there are two possible formats you can create a source file in:

- `jsonresume` format
- a11y format

Other themes can produce a résumé from a `jsonresume`-format source file, but this theme can produce a résumé from either kind of source file. If the file is in the a11y format, you have more control over the content and format of the result.

Both formats are special cases of a general standard named [JSON](https://en.wikipedia.org/wiki/JSON). If you are not familiar with it, you can think of it as a kind of outlining system. [Some commentators](https://www.json.org/) say it is “easy for humans” to write. [Other experts](https://github.com/arc-repos/arc-docs/blob/master/en/aws/intro-concepts.md) say it is “difficult to read” and “unforgiving to edit”.

An example of a fragment of a JSON file is:

```json
{
  "employer": {
    "name": "Apex Technologies",
    "city": "Lubbock",
    "state": "Texas"
  },
  "years worked": 4,
  "duties": [
    "insurance procurement",
    "risk management"
  ]
}
```

As shown, the JSON format lets you outline information, with items of various kinds:

- Objects: Subsidiary items have _names_ (e.g., “state”) and _values_ (e.g., “Texas”).
- Arrays: Subsidiary items have values (e.g., “risk management”) but no names.
- Primitives: strings of text, numbers, values of `true` and `false`, etc.

Objects have values enclosed in braces, arrays have values enclosed in brackets, strings have values enclosed in double quotes, and other primitives have unenclosed values, as shown above.

You can nest items as deeply as you want and still be JSON-compliant. Any value can be an object or array, with its own subsidiary items, whose values can be objects or arrays, etc.

Two relatively convenient methods for writing a source file in either format are:

- Using a text editor that supports JSON. By color-coding syntax errors, it helps you notice and correct any violations.
- Opening an existing source file of somebody’s résumé and then editing it, to replace the information in it with your own. This theme contains sample source files in both formats, so you can create yours that way if you prefer.

### Workflows

But which format should you create your source file in?

That depends on your situation and your intent. There are three plausible workflows for using this theme: A, B, and C.

- Workflow A is good if you want to render a résumé with **various** themes and do **not** want to use this theme’s extra features.
- Workflow B is good if you want to render a résumé with **only this** theme, and to use its extra features.
- Workflow C is good if you want to render a résumé with **various** themes and, when rendering it with this theme, to use its extra features.
- If you are a `jsonresume` user and already have a source file in the `jsonresume` format, workflows A and C allow you to leverage that file with this theme.

Here is a diagram of the three workflows:

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

As shown above, in workflows A and C you create a source file in the `jsonresume` format, and in workflow B you create one in the a11y format.

If you are ready to start, you can now switch to the instructions for the workflow you prefer:

- Workflow A: [README-workflowa.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowa.md)
- Workflow B: [README-workflowb.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowb.md)
- Workflow C: [README-workflowc.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowc.md)
