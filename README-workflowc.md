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
- Enter the command `node convert`, optionally followed by one, two, or three qualifications:

- If your source file is not in the current directory or is not named `resume.json`, tell the theme where to find it, using an `-i` or `--input` option.
- If you want your output file not to be in the current directory or not to be named `resume-a11y.json`, tell the theme where to put it, using an `-o` or `--output` option.
- Some objects in your source file may have properties with array values. The elements of such arrays, if not inside the `basics` object, can be laid out in two ways: (1) as bulleted lists or (2) strung together into a single string, with slashes or commas between them. If you want the bullet-list layout, specify this with the `-v` or `--verbose` option.

Here are examples:

```bash
node convert
node convert -i docs/technical-resume.json
node convert --input docs/technical-resume.json
node convert -o technical-resume-a11y.json
node convert --output technical-resume-a11y.json
node convert -i docs/technical-resume.json --output technical-resume-a11y.json
node convert -i /home/wang/cv/cv3.json -o /home/wang/cv/cv3.html
node convert -v
node convert --verbose
node convert -v -i docs/technical-resume.json
node convert --verbose -i docs/technical-resume.json
node convert -i docs/technical-resume.json -v
node convert --output technical-resume-a11y.json --verbose
node convert -vi docs/technical-resume.json
```

In the last example, you would be asking the theme to retrieve your source file from inside the `docs` directory within the current directory, and telling it that the source file will be named `technical-resume.json`. And you would be asking the theme to convert the file to a source file named `resume-a11y.json` in the current directory (not inside `docs`), and in doing so to apply the bullet-list treatment to array values.

## Editing

Once you have converted your source file to a file in the a11y format, you can further edit that file to take advantage of this theme’s options.

Your editorial changes must comply with the schema of the a11y format, described in detail in the README file for Workflow B: [README-workflowb.md](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowb.md#schema).

## Rendering with this theme

After converting your source file to a file in the a11y format and, if you so choose, further editing it, the next step is to render the résumé as a web page. To do this, enter the command `node parse`, optionally followed by one or two qualifications. The [instructions for this command](https://github.com/jrpool/jsonresume-theme-a11y/blob/master/README-workflowb.md#rendering) are in the README file for Workflow B.

## Rendering with other themes

You can also render your original source file (the one in the `jsonresume` format) with other `jsonresume` themes. For any theme `xyz`, you can do this as follows:

- Name your `jsonresume`-format source file `resume.json`. Or, if you prefer, make a copy of the file and give that name to the copy.
- Enter `npm install -g jsonresume-theme-xyz`.
- Enter `resume export --theme xyz <outputfilename>`.

You can find the available themes at the [`jsonresume` website](https://jsonresume.org/themes/) and the [NPM website](https://www.npmjs.com/search?q=jsonresume-theme).
