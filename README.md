# jsonresume-theme-a11y

## Introduction

This is an accessible theme for [JSON Resume](http://jsonresume.org/).

The idea motivating the `jsonresume` project is that people need to adapt their résumés for different purposes, modifying length, layout, complexity, and content. So, the project aims to let a person write one résumé but render it automatically in many different ways.

The `jsonresume` method for achieving this purpose is to define a format for a _source file_ where you will put all the **information** for your résumé, and then to invite software developers to create converters that will **render** that information in various ways. It calls those converters _themes_.

This theme, [as published at `npm`](https://www.npmjs.com/package/jsonresume-theme-a11y), is one of [over 200 themes](https://www.npmjs.com/search?q=jsonresume-theme) for the `jsonresume` project, giving you a wealth of rendering options. Why is there a need for **yet another** theme?

This theme does offer something new, compared with the others. In fact, it offers two new features:

- It makes your rendered résumé **accessible**. That means that your rendered document contains features, some visible and some invisible, that help people consume it across a wide range of abilities and disabilities. These features help users, or the assistive devices that some users with disabilities use, understand the structure and content of your résumé and navigate within it. Standards of accessibility have been codified by the [Accessibility Guidelines Working Group](https://www.w3.org/TR/WCAG21/) (WCAG 2.1) and the [Accessible Rich Internet Applications (ARIA) Working Group](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) (WAI-ARIA).
- It gives you granular control over your rendered résumé’s content and layout. You can decide, for any particular rendering, what to include and exclude. You can decide what order the sections appear in. You can automatically translate labels into different languages or vocabularies. You can also decide what to render as a list, or a table, or running prose. And you can decide on the sizes of headings.

These two features are in tension. Some designs interfere with accessibility. For example, some themes render text that is subtly lighter or darker than its background, but that prevents users with limited vision from distinguishing the two. This theme prioritizes accessibility over layout control. So, for some aesthetic effects, you may wish to use other themes, possibly sacrificing some accessibility.

“Accessibility” in the sense used here is abbreviated `a11y`. Hence the name of this theme.

## Accessibility metrics

How accessible are the renderings produced by this theme? For one approximation, we can perform tests on what this theme and other themes produce from an identical source file. Here are results from such a set of tests. The source file is `pool-medium-std.json`, one of the samples in this theme’s repository. Tests were conducted with some publicly available tools. Relative success is indicated by a high accessibility score (+) or a low error count (–).

Theme | [ADT](https://chrome.google.com/webstore/detail/fpkknkljclfencbdbgkenhalefipecmb) (+) | [aXe](https://chrome.google.com/webstore/detail/lhdoppojpmngadmnindnejefpokejbdd) (–) | [WAA](https://chrome.google.com/webstore/detail/kpfleokokmllclahndmochhenmhncoej) (–) | [WAVE](https://chrome.google.com/webstore/detail/jbbplnpkjmmeebjpijfedlgcdilocofh) (–) | [SAC](https://siteimprove.com/)/AAA (–) | [HCS](http://pauljadam.com/extension.html)/AAA (–)
--- | ---: | ---: | ---: | ---: | ---: | ---:
**a11y** | **100** | **0** | **0** | **0** | **15** | **0**
crisp | 94 | 22 | 15 | 2 | 62 | 2
eloquent | 97 | 211 | 184 | 8 | 590 | 328
flat | 89 | 44 | 42 | 7 | 83 | 42
modern | 97 | 3 | 0 | 2 | 8 | 2
stackoverflow | 89 | 35 | 40 | 16 | 316 | 143

Such automated testing is not definitive. Some of the above-tabulated errors are not really violations of standards, but rather solutions that adopt one of several permitted methods, which a particular tool is not properly recognizing. Conversely, accessibility defects may exist that some tools do not catch.

## License

Available under [the MIT license](http://mths.be/mit).

## Status

### History

Version 2.0.0 made a breaking change to version 1.0.12. The schema changed with respect to section formats `tableLeftHeads` and `tableTopHead`. The prior schema made no provision for table captions. The current schema permits captions in the tables of both these formats. Captions are a recommended feature for usability in general and accessibility in particular. In order to allow captions, the schema revised the specification of `tableLeftHeads`. A `tableLeftHeads` section conforming to the schema of version 1.0.12 would fail to conform to the schema of version 2.0.0.

Version 2.1.0 added automatic page-title creation to the `converter` module.

### Future

Contemplated future work includes:

- Investigating additional opportunities for accessibility improvements in the theme.
- Performing human accessibility tests.
- Extending the theme’s functionality to cover compatibility with commonly used résumé parsers.
- Implementing additional formats.
- Developing a graphical user interface for source-file creation.
- Integrated source-file validation.

Contributions of, or suggestions for, enhancements and repairs, and comments on priorities, are welcome. Feel free to make pull requests or open issues at [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y).

## Usage

### Source files

The `jsonresume` system depends on your source file adhering strictly to a particular format, so that a theme can automatically render it.

This theme, as stated above, gives you more control than other themes do. To enable that control, this theme defines a more flexible format for your source file. We can call that the _a11y format_.

So, there are two possible formats you can create a source file in:

- `jsonresume` format
- a11y format

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

- Objects: Subsidiary items (_properties_) have _names_ (e.g., “state”) and _values_ (e.g., “Texas”).
- Arrays: Subsidiary items (_elements_) have values (e.g., “risk management”) but no names.
- Primitives: strings of text, numbers, values of `true` and `false`, etc.

Objects have values enclosed in braces, arrays have values enclosed in brackets, strings have values enclosed in double quotes, and other primitives have unenclosed values, as shown above.

Strings can include **almost** all possible characters, including spaces, in any language, within the double quotes, but [there are exceptions](https://www.json.org/). The double quote itself, the backslash, and control characters (such as a horizontal tab, carriage return, or newline) are illegal there unless you substitute 2-character codes for them (such as `\n` for newline).

You can nest items as deeply as you want and still be JSON-compliant. Any value can be a primitive, an object, or an array. If it’s an object or array, then it can have its own subsidiary items, whose values can be primitives, objects, or arrays, etc.

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
