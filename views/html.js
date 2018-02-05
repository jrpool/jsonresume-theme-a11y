// Renderer into HTML.

// UTILITIES

// Attribute specification.
const atSpecOf = atObject => Object.keys(atObject).map(
  name => ` ${name}="${atObject[name]}"`
).join('');

// Self-closing element.
const element1Of = (tagName, atObject) => `<${tagName}${atSpecOf(atObject)}>`;

// Element with content.
const element2Of = (content, tagName, atObject, indent) => {
  const fullOpenTag = `<${tagName}${atSpecOf(atObject)}>`;
  if (indent > -1) {
    const indenter = `\n${' '.repeat(indent)}`;
    const indentedContent = `${indenter}${content.replace(/\n/g, indenter)}\n`;
    return `${fullOpenTag}${indentedContent}</${tagName}>`;
  }
  else {
    return `${fullOpenTag}${content}</${tagName}>`;
  }
};

// Hyperlink.
const hLinkOf = (label, href) => element2Of(label || href, 'a', {href}, -1);

// Email link.
const mailLinkOf = (label, href) => element2Of(
  label || href, 'a', {href: `mailto:${href}`}, -1
);

// Headed string.
const headedStringOf = (head, tail, delimiter) => {
  const headElement = element2Of(head, 'strong', {}, -1);
  return [headElement, tail].join(delimiter);
};

// Heading.
const headOf = (string, level) => element2Of(string, `h${level}`, {}, -1);

// Bulleted string paragraph.
const bulletItemOf = string => {
  const contentSpan = element2Of(string, 'span', {class: 'list-item'});
  return element2Of(contentSpan, 'p', {}, -1);
};

// Image.
const imageOf = (src, alt) => element1Of('img', {src, alt});

// Heading table row.
const headRowOf = array => {
  const cells = array.map(string => element2Of(string, 'th', {}, -1));
  return rowOf(cells);
};

// Plain table row.
const plainRowOf = array => {
  const cells = array.map(string => element2Of(string, 'td', {}, -1));
  return rowOf(cells);
};

// Left-headed table row.
const leftHeadRowOf = array => {
  const cells = array.map((string, index) => element2Of(
    string, index ? 'td' : 'th', {}, -1)
  );
  return rowOf(cells);
};

// Table row.
const rowOf = cellElements => element2Of(cellElements.join(''), 'tr', {}, 2);

// Table.
const tableOf = rowElements => element2Of(
  rowElements.join('\n'), 'table', {}, 2
);

// Section.
const sectionOf = (content, title) => element2Of(
  content, 'section', {title}, 2
);

// Style.
const styleOf = style => element2Of(style, 'style', {}, -1);

// Page.
const pageOf = (content, lang, title, style) => {
  const meta0Element = element1Of('meta', {charset: 'utf-8'});
  const meta1Element = element1Of('meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  });
  const titleElement = element2Of(title, 'title', {}, -1);
  const styleElement = element2Of(style, 'style', {}, 2);
  const headElement = element2Of(
    [meta0Element, meta1Element, titleElement, styleElement].join('\n'),
    'head',
    {},
    2
  );
  const bodyElement = element2Of(content, 'body', {}, 2);
  const htmlElement = element2Of(
    ['<!DOCTYPE html>', headElement, bodyElement].join('\n'), 'html', {}, 2
  );
  return htmlElement;
};

module.exports = {
  bulletItemOf,
  element1Of,
  element2Of,
  headedStringOf,
  headOf,
  headRowOf,
  hLinkOf,
  imageOf,
  leftHeadRowOf,
  mailLinkOf,
  pageOf,
  plainRowOf,
  sectionOf,
  styleOf,
  tableOf,
};
