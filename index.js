// Import dependencies.
const converter = require('./converter');
const parser = require('./parser');

/*
  Convert a jsonresume to a jsonresume-theme-a11y source object, then parse
  that, returning an HTML document.
*/
exports.render = sourceObject => parser.parse(
  converter.convert(sourceObject, true)
);
