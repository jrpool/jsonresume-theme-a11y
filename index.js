const renderer = require('views/html');
const fs = require('fs');
const path = require('path');

const cvJSON = fs.readFileSync(path.join(__dirname, 'resume.json'), 'utf8');
const cvObject = JSON.parse(cvJSON);
const cvSections = cvObject.order
  ? cvObject.order.data
  : Object.keys(cvObject).filter(
    section => cvObject[section].format !== 'hide'
  );
const lang = cvObject.lang ? cvObject.lang.data : 'en';
const legend = cvObject.legend ? cvObject.legend.data : {};
const cvBasics = basicsRender(basics, legend);
const title = basics.name;
const cvHTML = render(cvObject, cvBasics, title, legend);
fs.writeFileSync(path.join(__dirname, 'resume-a11y.html'), cvHTML);

exports = {render};

const format = object => {
  if (Object.keys(object).every(key => ['format', 'data'].includes(key))) {
    const f = object.format;
    if (f === 'hide') {
      return '';
    }
    else {
      const d = object.data;
      const dt = typeof d;
      if (dt === 'object') {
        d = format(d);
      }
      if (f === 'head1' && dt === 'string') {
        return renderer.head1(d);
    }
  }
};

const topHeadTable = (array, attributes, legend) => {
  const keys = Object.keys(array[0]);
  const headRow = renderer.row(keys.map(key => renderer.cell(legend.key, true)));
  const bodyRows = array.map(object => renderer.row(keys.map(key => {
    if (key === 'url') {
      return renderer.cell(renderer.overtLink(object.url), false);
    }
    else {
      return renderer.cell(object[key]);
    }
  })));
  return renderer.table(headRow.concat(bodyRows), attributes, legend);
};

const leftHead2ColTable = (array, attributes) => {
  const keys = Object.keys(array[0]);
  const rows = array.map(object => renderer.row(keys.map(key => {
    const headCell = renderer.cell(legend[key], true);
    const bodyCellContent;
    if (key === 'email') {
      bodyCellContent = renderer.overtLink(object.email, true);
    }
    else if (key === 'website') {
      bodyCellContent = renderer.overtLink(object[key], false);
    }
    else {
      bodyCellContent = object[key];
    }
    const bodyCell = renderer.cell(bodyCellContent, false);
    return [headCell, bodyCell];
  })));
  return renderer.table(rows, attributes);
};

const formattedString = object => {
  return renderer.elementize(object.text, 'span', {class: object.format})
};

const overtLink = (object, isEmail) => renderer.headedString(
  object.head, renderer.overtLink(object.urlTail, isEmail), ': '
);

const covertLink = (object, isEmail) => renderer.headedString(
  object.head, renderer.covertLink(object.head, object.urlTail, isEmail), ': '
);

const headedString = object => renderer.headedString(
  object.head, object.urlTail, ': '
);

const edString = object => renderer.headedString(
  renderer.covertLink(object.head, object.urlTail),
  `${object.startDate}–${object.endDate}, ${object.area}`,
  ': '
);

const workString = object => renderer.headedString(
  renderer.covertLink(object.head, object.urlTail),
  `${object.startDate}–${object.endDate}, ${object.duties}`,
  ': '
);

const arraySection = (key, value, level) => {
  const head = renderer.elementize(legend[key], `h${level}`, '');
  const tail = value.map(element => {
    if (Array.isArray(element)) {
      return array
    }
  });
};

const object = (object, isRoot) => {
  if (isRoot)
};

const parseArrayProperty = (name, value) => {
  const listItems = value.map(element => {
    const elementType = typeof element;
    if (elementType === 'string') {
      return element;
    }
    else if ()
  });
  return renderer.list()
};

const property = (object, isRoot, key, legend) => {
  if (isRoot) {
    const sectionHead = renderer.elementize(legend[key], 'h1', '');
    let tail = object[key];
    if (Array.isArray(tail)) {
      tail = tail.map(element => arrayElement(element));
    }
    else if (typeof tail === 'object') {
      tail = Object.keys(tail).map(key => objectProperty(key));
    }
    const sectionTail = renderer.elementize()
  }
};

const relation = (parent, isRoot, child) => {
  if (Array.isArray(parent)) {
    if (Array.isArray(child)) {
      return child.map(grandchild => {
        return parse(child, grandchild);
      });
    }
    else if (typeof child === 'object') {
      if (Object.keys(child).every(
        element => ['network', 'username', 'url'].includes(element)
      )) {
        return parseProfile(child);
      }
      else if (Object.keys(child).every(
        element => ['format', 'text'].includes(element)
      )) {
        return parseFormattedText(child);
      }
      else if (Object.keys(child).every(
        element => ['head', 'urlTail'].includes(element)
      )) {
        return parseLink(child);
      }
      else if (Object.keys(child).every(
        element => ['head', 'tail'].includes(element)
      )) {
        return parseHeadedString(child);
      }
      else if (Object.keys(child).every(
        element => [
          'head', 'urlTail', 'startDate', 'endDate', 'area'
        ].includes(element)
      )) {
        return parseEd(child);
      }
      else if (Object.keys(child).every(
        element => [
          'head', 'urlTail', 'startDate', 'endDate', 'duties'
        ].includes(element)
      )) {
        return parseWork(child);
      }
    }
    else if (typeof child === 'string') {
      return parseString(child);
    }
  }
  else if (typeof parent === 'object') {
    if (Array.isArray(child.value)) {
      return parseArrayProperty(child)
    }
    else if (typeof child.value === 'string') {
      return parseStringProperty(child);
    }
    else if (typeof child.value === 'object') {
      if (Object.keys(child.value).every(
        element => [
          'address', 'postalCode', 'city', 'countryCode', 'region'
        ].includes(element)
      )) {
        return parseAddressProperty(child);
      }
    }
  }
}

const parseStringElement = string => renderer.listItem(string, '', 'list-item', -1);

const parseStringProperty = (name, value) => {
  const headedString = renderer.headedString(name, value, ': ');
};

const parseStringObject = (head, tail) =>
  renderer.headedString(head, tail, ': ');

const parseLinkObject = (head, urlTail) =>
  renderer.headedString(head, renderer.overtLink(urlTail), ': ');

const parseArrayProperty = (name, value) => {
  const listItems = value.map(element => {
    const elementType = typeof element;
    if (elementType === 'string') {
      return element;
    }
    else if ()
  });
  return renderer.list()
};

// ===================

const isLink = string => {
  return string.startsWith('http://') || string.startsWith('https://');
};

const hasLink = object => {
  return object.hasOwnProperty('link');
};

const isImageLink = string => {
  return isLink(string) && /\.(?:jpg|jpeg|gif|png|svg)$/.test(string);
};

const linkify = string => {
  return `<a href="${string}">${string}</a>`;
};

const appendLink = object => {
  return `${object.head}: <a href="${object.link}">${object.link}</a>`;
};

const imageLinkify = (string, alt) => {
  return `<img src="${string}" alt="${alt}">`;
};

const indent = (string, spaceCount) => string.trim().split('\n').join(
  '\n' + ' '.repeat(spaceCount)
);

const sectionize = (string, hLevel) => {
  const sectionClass = hLevel && hLevel < 4 ? ` class=level${hLevel}` : '';
  return `<section${sectionClass}>\n  ${indent(string, 2)}\n</section>\n`;
};

const headRender = (string, hLevel) => {
  const tagName = `h${hLevel}`;
  const openTag = `<${tagName}>`;
  const closeTag = `</${tagName}>`;
  return `${openTag}${string}${closeTag}\n`;
};

const stringRender = string => {
  const colonIndex = string.indexOf(': ');
  let renderString = string;
  if (colonIndex > 0) {
    const stringParts = [
      string.slice(0, colonIndex),
      string.slice(colonIndex)
    ];
    renderString = `<span class="em">${stringParts[0]}</span>${stringParts[1]}`;
  }
  return `<p><span class=list-item>${renderString}</span></p>`;
};

const ordinary = (code, legend) => legend ? legend[code] || code : code;

const itemRender = (propertyName, item, legend, hLevel) => {
  const itemType = typeof item;
  if (Array.isArray(item)) {
    const sectionContent = item.map(element => {
      const subSectionContent = itemRender(
        propertyName, element, legend, hLevel
      );
      const noBox
        = ['number', 'string', 'boolean'].includes(typeof element)
        || (typeof element === 'object' && hasLink(element));
      return noBox ? `${subSectionContent}\n` : sectionize(
        subSectionContent, hLevel
      );
    });
    return sectionContent.join('').trim();
  }
  else if (['number', 'string', 'boolean'].includes(itemType)) {
    item = item.toString();
    if (isImageLink(item)) {
      item = imageLinkify(item, propertyName);
    }
    else if (isLink(item)) {
      item = linkify(item);
    }
    return stringRender(item);
  }
  else if (itemType === 'object') {
    if (hasLink(item)) {
      return stringRender(appendLink(item));
    }
    else {
      const sectionContent = Object.keys(item).map(subPropertyName => {
        const subItem = item[subPropertyName];
        const subPropertyContent = [
          headRender(ordinary(subPropertyName, legend), hLevel),
          itemRender(subPropertyName, subItem, legend, hLevel + 1)
        ].join('');
        const noBox = ['number', 'string', 'boolean'].includes(typeof subItem);
        return noBox ? `${subPropertyContent}\n` : sectionize(
          subPropertyContent, hLevel
        );
      });
      return sectionContent.join('').trim();
    }
  }
  else {
    return '';
  }
};

const render = (cvObject, cvBasics, title, legend) => {
  const css = indent(fs.readFileSync(
    path.join(__dirname, 'style.css'), 'utf-8'
  ), 6);
  const html = indent(itemRender('', cvObject, legend, 1), 6);
  const template = fs.readFileSync(
    path.join(__dirname, 'template.html'), 'utf8'
  );
  return template
  .replace('##title##', title)
  .replace('##style-insert##', css)
  .replace('##main-insert##', [cvBasics, html].join('\n' + ' '.repeat(6)));
};

const profilesRender = object => {
  const profileRows = object.profiles.map(profile => {
    return `${' '.repeat(6)}<tr>
        <td>${profile.network}</td>
        <td>${profile.username}</td>
        <td>${linkify(profile.urlTail)}</td>
      </tr>`;
  }).join('\n');
  return indent(profileRows, 8);
};

const tableRender = (content, indentation, title) => {
  const rows = indent(content.map(row => {
    return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
  }).join('\n'), 2);
  const table = [`<table title="${title}">`, rows, '</table>'].join('\n');
  return indent(table, indentation);
};

const basicsRender = (object, legend) => {
  const basicsTemplate = fs.readFileSync(
    path.join(__dirname, 'basicstemplate.html'), 'utf8'
  );
  let basics = basicsTemplate
  .trim()
  .replace('##picture-alt-name##', object.name)
  .replace('##href-email##', object.email)
  .replace('##href-website##', object.website);
  basics = basics.replace(
    '##subSummary##',
    tableRender(object.subSummary, 10, legend.subSummary)
  );
  Object.keys(legend).forEach(key => {
    basics = basics.replace(`##${key}-title##`, legend[key]);
    if (object[key]) {
      basics = basics.replace(`##${key}##`, object[key]);
    }
    else if (object.location[key]) {
      basics = basics.replace(`##${key}##`, object.location[key]);
    }
    else if (object.profiles[key]) {
      basics = basics.replace(`##${key}##`, object.profiles[key]);
    }
  });
  return basics.replace('##profiles-rows##', profilesRender(object));
};
