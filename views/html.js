/*
  Renderer into HTML.
  All conversions via the legend take place before these functions are called.
*/

// Object representing the attributes of an element.
const specOf = attributes => Object.keys(attributes).map(
  name => ` ${name}="${attributes.name}"`
).join('');

// Specification of a self-closing element.
const element1Of = (tagName, attributes) => `<${tagName}${specOf(attributes)}>`;

/*
  Specification of an element with opening and closing tags and possibly
  indented content.
*/
const element2Of = (content, tagName, attributes, indent) => {
  const fullOpenTag = `<${tagName}${specOf(attributes)}>`;
  if (indent > -1) {
    const indenter = `\n${' '.repeat(indent)}`;
    const indentedContent = `${indenter}${content.replace(/\n/g, indenter)}\n`;
    return `${fullOpenTag}${indentedContent}</${tagName}>`;
  }
  else {
    return `${fullOpenTag}${content}</${tagName}>`;
  }
}

// Photograph of the subject.
exports.imageOf = (src, alt) => element1Of('img', {src, alt});

// Representation of a string, possibly typed.
exports.stringOf = rep => {
  if (typeof rep === 'string') {
    return rep;
  }
  else if (Array.isArray(rep)) {
    return rep.map(element => stringOf(rep)).join(' ');
  }
  else if (typeof rep === 'object'){
    const {format, label, url, text, head, tail, delimiter} = rep;
    if (format === 'hLink') {
      return element2Of(label || url, 'a', {href: url}, -1);
    }
    else if (format === 'mailLink') {
      return element2Of(label || url, 'a', {href: `mailto:${url}`}, -1);
    }
    else if (head) {
      const parsedHead = element2Of(stringOf(head), 'strong', {}, -1);
      const parsedTail = stringOf(tail);
      return [parsedHead, parsedTail].join(delimiter);
    }
    else {
      return element2Of(rep.text, format, {}, -1);
    }
  }
};

// Representation of a string formatted as a heading.
exports.headOf = (rep, level) => element2Of(stringOf(rep), `h${level}`, {}, -1);

// Array of arrays, each representing a 1-row table.
exports.rowTablesOf = array => {
  const rows = array.map(rowArray => {
    const cells = rowArray.map(rep => element2Of(stringOf(rep), 'td', {}, -1));
    return element2Of(cells.join(''), 'tr', {}, 2);
  });
  const tables = rows.map(row => element2Of(row, 'table', {}, 2));
  return tables.join('\n');
};

/*
  Array representing a 2-column table with headings in the left column and
  strings, possibly typed, in the right column.
*/
exports.table2ColOf = array => {
  const rows = array.map(rowObject => {
    const head = rowObject.head;
    let tail = stringOf(rowObject.tail);
    const headCell = element2Of(head, 'th', {class: 'right-align'}, -1);
    const tailCell = element2Of(tail, 'td', {}, -1);
    return (element2Of([headCell, tailCell].join(''), 'tr', {}, 2));
  });
  return element2Of(rows.join('\n'), 'table', {}, 2);
};

// Array representing a table with headings in the top row.
exports.tableTopHeadOf = array => {
  const headCells = array[0].map(head => element2Of(stringOf(head), 'th', {}));
  const tailCells = array.slice(1).map(rowArray => rowArray.map(
    cellSpec => element2Of(stringOf(cellSpec, 'td', {}))
  ));
  const rows = [headCells, ...tailCells].map(
    rowCells => element2Of(rowCells.join(''), 'tr', {}, 2)
  );
  return element2Of(rows.join('\n'), 'table', {}, 2);
};

// Specification of a boxed, headed, bulleted list.
exports.boxedBulletListOf((array, head, type) => {
  const headParagraph = headOf(head, 1);
  const tailParagraphs = array.map(item => {
    const contentSpan = element2Of(
      stringOf(item), 'span', {class: 'list-item'}
    );
    return elementPair(contentSpan, 'p', {});
  }).join('\n');
  return element2Of(
    [headParagraph, tailParagraphs].join('\n'), 'section', {class: type}, 2
  );
});
