// Import dependencies.
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const converter = require(path.join(__dirname, 'converter'));

// Process the command arguments.
commander
.description(
  'Create a jsonresume-theme-a11y source file from a jsonresume source file'
)
.option(
  '-i, --input <filename>', 'Source file in jsonresume format [resume.json]'
)
.option(
  '-o, --output <filename>',
  'Destination file in jsonresume-theme-a11y format [resume-a11y.json]'
)
.option('-v, --verbose', 'Format array properties as 1-line-per-element lists');
commander.parse(process.argv);
const inFile = commander.input || 'resume.json';
const outFile = commander.output || 'resume-a11y.json';
const isVerbose = commander.verbose;

// Retrieve the source file.
const sourceObject = require(
  inFile.startsWith('/') ? inFile : path.join(__dirname, inFile)
);

// Convert it to an object in jsonresume-theme-a11y format.
const a11yObject = converter.convert(sourceObject, isVerbose);

// Write that object as a JSON string to a file.
fs.writeFileSync(
  outFile.startsWith('/') ? outFile : path.join(__dirname, outFile),
  JSON.stringify(a11yObject, null, 2)
);
