const html = require('views/html');
const fs = require('fs');
const path = require('path');

const parseProfile = object => {
  return html.table(
    html.row([
      html.cell(object.network),
      html.cell(object.username),
      html.cell(overtLink(object.url))
    ].join('\n')),
    'table-profiles',
    0
  );
};

const parseFormattedTextObject = object => {
  return html.elementize(object.text, 'span', object.format, -1)
};

const parseLinkObject = (object) =>
  html.headedString(object.intro, html.overtLink(object.url), ': ');

const parseStringObject = (object) =>
  html.headedString(object.intro, object.detail, ': ');

const parseEdObject = (object) => html.headedString(
  html.covertLink(object.intro, object.url),
  `${object.startDate}–${object.endDate} (${object.area})`,
  ': '
);

const parseWorkObject = (object) => html.headedString(
  html.covertLink(object.intro, object.url),
  `${object.startDate}–${object.endDate} (${object.duties})`,
  ': '
);

const parseStringElement = element => html.listItem(
  element, '', 'list-item', -1
);

const parseArrayProperty = (name, value) => {
  const listItems = value.map(element => {
    const elementType = typeof element;
    if (elementType === 'string') {
      return element;
    }
    else if ()
  });
  return html.list()
};

const parse = (parent, child) => {
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
        return parseFormattedTextObject(child);
      }
      else if (Object.keys(child).every(
        element => ['intro', 'url'].includes(element)
      )) {
        return parseLinkObject(child);
      }
      else if (Object.keys(child).every(
        element => ['intro', 'detail'].includes(element)
      )) {
        return parseStringObject(child);
      }
      else if (Object.keys(child).every(
        element => [
          'intro', 'url', 'startDate', 'endDate', 'area'
        ].includes(element)
      )) {
        return parseEdObject(child);
      }
      else if (Object.keys(child).every(
        element => [
          'intro', 'url', 'startDate', 'endDate', 'duties'
        ].includes(element)
      )) {
        return parseWorkObject(child);
      }
    }
    else if (typeof child === 'string') {
      return parseStringElement(child);
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

const parseStringElement = string => html.listItem(string, '', 'list-item', -1);

const parseStringProperty = (name, value) => {
  const headedString = html.headedString(name, value, ': ');
};

const parseStringObject = (intro, detail) =>
  html.headedString(intro, detail, ': ');

const parseLinkObject = (intro, url) =>
  html.headedString(intro, html.overtLink(url), ': ');

const parseArrayProperty = (name, value) => {
  const listItems = value.map(element => {
    const elementType = typeof element;
    if (elementType === 'string') {
      return element;
    }
    else if ()
  });
  return html.list()
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
  return `${object.intro}: <a href="${object.link}">${object.link}</a>`;
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
        <td>${linkify(profile.url)}</td>
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

const cvJSON = fs.readFileSync(path.join(__dirname, 'resume.json'), 'utf8');
const cvObject = JSON.parse(cvJSON);
const legend = cvObject.legend;
delete cvObject.legend;
const basics = cvObject.basics;
delete cvObject.basics;
const cvBasics = basicsRender(basics, legend);
const title = basics.name;
const cvHTML = render(cvObject, cvBasics, title, legend);
fs.writeFileSync(path.join(__dirname, 'resume-a11y.html'), cvHTML);

exports = {render};
