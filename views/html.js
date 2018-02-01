exports.indent = (content, indentation) => {
  if (indentation === -1) {
    return content;
  }
  else if (indentation === 0) {
    return `${content}\n`;
  }
  else {
    const indentedContent = content.replace(
      /\n/g, `\n${' '.repeat(indentation)}`
    );
    return `${indentedContent}\n`;
  }
};

const attributize = attributes => Object.keys(attributes).map(
  name => ` ${name}="${attributes.name}"`
).join('');

const elementize = (content, tagName, attributes) =>
  `<${tagName}${attributize(attributes)}>${content}</${tagName}>`;

exports.headedString = (head, tail, delimiter) => {
  let parsedHead = head;
  if (Array.isArray(head)) {
    parsedHead = head.map(element => {
      const elementType = typeof element;
      if (
        elementType === 'object'
        && Object.keys(element).every(key => ['meta', 'text'].includes(key))
      ) {
        return elementize(element.text, element.meta, '');
      }
      else if (elementType === 'string') {
        return element;
      }
    }).join('');
  }
  return `${elementize(parsedHead, 'span', {class: 'em'})}${delimiter}${tail}`;
}

exports.overtLink = url => elementize(url, 'a', {href: url});

exports.covertLink = (text, url) => elementize(text, 'a', {href: url});

exports.listItem = (content, outerType, innerType) => {
  const contentSpan = elementize(content, 'span', {class: innerType});
  return elementize(contentSpan, 'p', {class: outerType});
};

exports.list = (heading, listItems, type, title) => {
  const headedList = heading.concat(listItems).join('\n');
  return elementize(headedList, 'section', {class: type, title: title});
};

exports.cell = (content, isHead) => elementize(
  content, isHead ? 'th' : 'td', {}
);

exports.row = cells => elementize(cells.join(''), 'tr', {});

exports.table = (rows, attributes) =>
  elementize(rows.join('\n'), 'table', attributes);
