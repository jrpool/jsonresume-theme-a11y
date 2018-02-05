// Renderer into HTML.

// UTILITIES

// Attribute specification.
const atSpecOf = atObject => Object.keys(atObject).map(
  name => ` ${name}="${atObject[name]}"`
).join('');

// Table row.
const rowOf = cellElements => element2Of(cellElements.join(''), 'tr', {}, 2);

// EXPORTS

// Self-closing element.
exports.element1Of = (tagName, atObject) => `<${tagName}${atSpecOf(atObject)}>`;

// Element with content.
exports.element2Of = (content, tagName, atObject, indent) => {
  const fullOpenTag = `<${tagName}${atSpecOf(atObject)}>`;
  if (indent > -1) {
    const indenter = `\n${' '.repeat(indent)}`;
    const indentedContent = `${indenter}${content.replace(/\n/g, indenter)}\n`;
    return `${fullOpenTag}${indentedContent}</${tagName}>`;
  }
  else {
    return `${fullOpenTag}${content}</${tagName}>`;
  }
}

// Hyperlink.
exports.hLinkOf = (label, href) => element2Of(label || href, 'a', {href}, -1);

// Email link.
exports.mailLinkOf = (label, href) => element2Of(
  label || href, 'a', {href: `mailto:${href}`}, -1
);

// Headed string.
exports.headedStringOf = (head, tail, delimiter) => {
  const headElement = element2Of(head, 'strong', {}, -1);
  return [headElement, tail].join(delimiter);
};

// Heading.
exports.headOf = (string, level) => element2Of(string, `h${level}`, {}, -1);

// Bulleted string paragraph.
exports.bulletItemOf(string => {
  const contentSpan = element2Of(string, 'span', {class: 'list-item'});
  return element2Of(contentSpan, 'p', {}, -1);
});

// Image.
exports.imageOf = (src, alt) => element1Of('img', {src, alt});
);

// Heading table row.
exports.headRowOf = array => {
  const cells = array.map(string => element2Of(string, 'th', {}, -1));
  return rowOf(cells);
};

// Plain table row.
exports.plainRowOf = array => {
  const cells = array.map(string => element2Of(string, 'td', {}, -1));
  return rowOf(cells);
};

// Left-headed table row.
exports.leftHeadRowOf = array => {
  const cells = array.map((string, index) => element2Of(
    string, index ? 'td' : 'th', {}, -1)
  );
  return rowOf(cells);
};

// Table.
exports.tableOf = rowElements => element2Of(
  rowElements.join('\n'), 'table', {}, 2
);

// Section.
exports.sectionOf = (content, title) => element2Of(
  content, 'section', {title}, 2
);
