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
  const bareContent = content.replace(/\n+$/, '');
  const fullOpenTag = `<${tagName}${atSpecOf(atObject)}>`;
  if (indent > -1) {
    const indenter = `\n${' '.repeat(indent)}`;
    const indentedContent = `${indenter}${bareContent.replace(/\n(?=.)/g, indenter)}\n`;
    return `${fullOpenTag}${indentedContent}</${tagName}>`;
  }
  else {
    return `${fullOpenTag}${content}</${tagName}>`;
  }
};

// ELEMENT CREATORS

// Body rows’ table section.
const tableBodyOf = rows => {
  return element2Of(rows.join('\n'), 'tbody', {}, 2);
};

// Bullet list.
const bulletListOf = array => element2Of(array.join('\n'), 'ul', {}, 2);

// Bulleted list item.
const bulletItemOf = string => element2Of(string, 'li', {}, -1);

// Code.
const codeOf = string => element2Of(string, 'code', {}, -1);

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
const headOf = (string, size, type) => {
  const elementClass = `size${size}` + (type ? ` ${type}` : '');
  return element2Of(string, 'h1', {class: elementClass}, -1);
};

// Heading row’s table section.
const headRowOf = array => {
  const cells = array.map(string => element2Of(string, 'th', {}, -1));
  const row = rowOf(cells);
  return element2Of(row, 'thead', {}, 2);
};

// Hyperlink.
const hLinkOf = (label, href) => element2Of(label || href, 'a', {href}, -1);

// Image.
const imageOf = (src, alt) => element1Of('img', {src, alt});

// Left-headed table row.
const leftHeadRowOf = array => {
  const cells = array.map((string, index) => element2Of(
    string, index ? 'td' : 'th', {}, -1)
  );
  return rowOf(cells);
};

// Multiline string.
const multilineOf = lineArray => lineArray.join(element1Of('br', {}));

// Page.
const pageOf = (content, foot, lang, title, style) => {
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
  const mainElement = element2Of(content, 'main', {}, 2);
  const bodyElement = element2Of(
    [mainElement, foot].join('\n'), 'body', {}, 2
  );
  const htmlElement = element2Of(
    [headElement, bodyElement].join('\n'), 'html', {lang}, 2
  );
  return `${['<!DOCTYPE html>', htmlElement].join('\n')}\n`;
};

// Paragraph.
const paragraphOf = (string, size, type) => {
  const elementClass = `size${size}` + (type ? ` ${type}` : '');
  return element2Of(string, 'p', {class: elementClass}, -1);
};

// Plain row.
const plainRowOf = array => {
  const cells = array.map(string => element2Of(string, 'td', {}, -1));
  return rowOf(cells);
};

// Section.
const sectionOf = (content, title, type) => element2Of(
  content, 'section', type ? {title, class: type} : {title}, 2
);

// Squeeze box.
const squeezeBoxOf = content => {
  const squeezer = element2Of('', 'div', {}, -1);
  const squeezed = element2Of(content, 'div', {class: 'compact'}, 2);
  return [squeezer, squeezed, squeezer].join('\n');
};

// Style.
const styleOf = style => element2Of(style, 'style', {}, -1);

// Table.
const tableOf = (tableSections, type) => element2Of(
  tableSections.join('\n'), 'table', {class: type}, 2
);

// Table caption.
const captionOf = (size, data) => element2Of(
  data, 'caption', {class: `size${size}`}, 2
);

// Table row.
const rowOf = cellElements => element2Of(cellElements.join('\n'), 'tr', {}, 2);

module.exports = {
  bulletItemOf,
  bulletListOf,
  captionOf,
  codeOf,
  element1Of,
  element2Of,
  headedStringOf,
  headOf,
  headRowOf,
  hLinkOf,
  imageOf,
  leftHeadRowOf,
  mailLinkOf,
  multilineOf,
  pageOf,
  paragraphOf,
  plainRowOf,
  sectionOf,
  squeezeBoxOf,
  styleOf,
  tableBodyOf,
  tableOf
};
