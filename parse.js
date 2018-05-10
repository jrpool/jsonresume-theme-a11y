// Import dependencies.
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const parser = require(path.join(__dirname, 'parser'));

// Process the command arguments.
commander
.description('Create an HTML file from a jsonresume-theme-a11y source file')
.option(
  '-i, --input <filename>', 'Source file in jsonresume-theme-a11y format [resume-a11y.json]'
)
.option(
  '-o, --output <filename>',
  'Destination file in HTML format [resume-a11y.html]'
);
commander.parse(process.argv);
const inFile = commander.input || 'resume-a11y.json';
const outFile = commander.output || 'resume-a11y.html';
const sourceObject = require(
  inFile.startsWith('/') ? inFile : path.join(__dirname, inFile)
);
const result = parser.parse(sourceObject);
fs.writeFileSync(
  outFile.startsWith('/') ? outFile : path.join(__dirname, outFile), result
);
