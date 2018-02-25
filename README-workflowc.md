# jsonresume-theme-a11y, Workflow C

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

This file gives you instructions for the above-illustrated Workflow C introduced in the [main README file](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README.md).

## Writing your source file

As you can see, in this workflow and in Workflow A the first step is to write a source file in the `jsonresume` format.

The instructions for doing that are in [README-writejr.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-writejr.md).

## Converting

After you have a source file, your next step is to convert it from the `jsonresume` format to a file in the a11y format.

This step involves the following actions:

- If you don’t yet have `node` running on your computer, [install it](https://nodejs.org/en/). Either the latest version or the LTS version is good.
- Open a terminal window.
- Install the `jsonresume` project’s `resume-cli` package with the command `npm install -g resume-cli`. (This action uses the `npm` command, which you get by installing `node`.)
- Make a local copy on your own computer of [this theme’s repository](https://github.com/jrpool/jsonresume-theme-a11y). If you don’t already know how, the easiest way is to click on the `Clone or download` button and choose `Download ZIP`, then open the saved `.zip` file to make a directory.
- Put your source file into that directory.
- In your terminal window, make that directory your current directory.
- Convert the source file with the following command:

```bash
node convert [-v (--verbose)] [-i (--input) oldsourcefile] [-o (--output) newsourcefile]
```

- If not specified, `oldsourcefile` defaults to `resume.json` in the current directory.
- If not specified, `newsourcefile` defaults to `resume-a11y.json` in the current directory.
- If specified, `--verbose` causes array values of object properties other than those in the `basics` object (for example, lists of keywords) to be converted in such a way that they will be rendered as bullet sublists. If `--verbose` is not specified, such values are compacted into lists on a single line, with slashes or commas between the items.

## Editing

Once you have converted your source file to a file in the a11y format, you can further edit that file to take advantage of this theme’s options.

Your editorial changes must comply with the schema of the a11y format, described in detail in the README file for Workflow B: [README-workflowb.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowb.md#schema).

## Rendering with this theme

After converting your source file to a file in the a11y format, and, if you so choose, further editing it, the next step is to render the résumé as a web page.

To do this, enter the following command in your terminal window:

```bash
node parse [-i (--input) newsourcefile] [-o (--output) htmlfile]
```

- If not specified, `newsourcefile` defaults to `resume-a11y.json`.
- If not specified, `htmlfile` defaults to `resume-a11y.html`.

## Rendering with other themes

You can also render your original source file (the one in the `jsonresume` format) with other `jsonresume` themes. For any theme `xyz`, you can do this as follows:

- Name your `jsonresume`-format source file `resume.json`. Or, if you prefer, make a copy of the file and give that name to the copy.
- Enter `npm install -g jsonresume-theme-xyz`.
- Enter `resume export --theme xyz <outputfilename>`.

You can find the available themes at the [`jsonresume` website](https://jsonresume.org/themes/) and the [NPM website](https://www.npmjs.com/search?q=jsonresume-theme).
