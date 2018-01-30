const classAttr = type => type ? ` class="${type}"` : '';

const indent = (content, indentation) => {
  if (indentation === -1) {
    return content;
  }
  else if (indentation === 0) {
    return `${content}\n`;
  }
  else {
    return content.replace(/\n/g, `\n${' '.repeat(indentation)}`) + '\n';
  }
};

const elementize = (content, tagName, type, indentation) =>
  indent(`<${tagName}${classAttr(type)}>${content}</${tagName}>`, indentation);

exports.headedString = (head, body, delimiter) =>
  `${elementize(head, 'span', 'em', -1)}${delimiter}${body}`;

exports.overtLink = url => `<a href="${url}">${url}</a>`;

exports.covertLink = (text, url) => `<a href="${url}">${text}</a>`;

exports.listItem = (content, outerType, innerType, indentation) => {
  const innerContent = elementize(content, 'span', innerType, -1)
  elementize(innerContent, 'p', outerType, indentation);
};

exports.list = (heading, listItems, type, indentation) => {
  const content = [heading, [listItems].join('\n')].join('\n');
  return elementize(content, 'section', type, indentation);
};

exports.cell = content => `<td>${content}</td>`;

exports.headCell = content => `<th>${content}</th>`;

exports.row = cells => `<tr>${cells.join('')}</tr>`;

exports.table = (rows, type, indentation) =>
  elementize(rows.join('\n'), 'table', type, indentation);
