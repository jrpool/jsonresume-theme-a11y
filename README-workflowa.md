# jsonresume-theme-a11y, Workflow A

![A: write jsonresume JSON, convert+render to HTML; B: write a11y JSON, render to HTML; C: write jsonresume JSON, convert to a11y JSON, render to HTML](https://jpdev.pro/jsonresume-theme-a11y/workflows.png)

This file gives you instructions for the above-illustrated Workflow A introduced in the [main README file](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README.md).

## Writing your source file

As you can see, in this workflow and in Workflow C the first step is to write a source file in the `jsonresume` format.

The instructions for doing that are in [README-writejr.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-writejr.md).

## Converting and rendering

Once you have a source file, you can convert it to the a11y format and render it as a web page in a single action. This does **not** produce an a11y-format source file. The conversion takes place only in memory, and the a11y-format version disappears immediately after it is rendered.

This step involves the following actions:

- If you don’t yet have `node` running on your computer, [install it](https://nodejs.org/en/). Either the latest version or the LTS version is good.
- Open a terminal window.
- Install the `jsonresume` project’s `resume-cli` package with the command `npm install -g resume-cli`. (This action uses the `npm` command, which you get by installing `node`.)
- Install this theme with the command `npm install -g jsonresume-theme-a11y`.
- Name your source file `resume.json`.
- In your terminal window, make the directory containing your source file your current directory.
- Convert and render the source file with the command `resume export --theme a11y <outputfilename>`. (Installing `resume-cli` has made the `resume` command available.)

In principle, this last action (the `resume export` command) allows you to specify a PDF output format, too, with the option `--format pdf` before or after the `--theme a11y` option. However, in practice, the resulting PDF file is relatively unpresentable. You are likely to want a more powerful converter from HTML to PDF, instead. Saving a PDF file from the page in your web browser will probably be more satisfactory. Some browsers, such as Chrome, allow you to set the margins of the PDF file before you save.

## Rendering with other themes

You can also render your `jsonresume`-format source file with other `jsonresume` themes. For any theme `xyz`, you can do this with these commands:

- `npm install -g jsonresume-theme-xyz`
- `resume export --theme xyz <outputfilename>`

You can find those themes at the [`jsonresume` website](https://jsonresume.org/themes/) and the [NPM website](https://www.npmjs.com/search?q=jsonresume-theme).
