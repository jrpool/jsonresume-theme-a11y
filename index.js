const fs = require('fs');
const path = require('path');

const isLink = string => {
  return string.startsWith('http://') || string.startsWith('https://');
};

const isImageLink = string => {
  return isLink(string) && /\.(?:jpg|jpeg|gif|png|svg)$/.test(string);
};

const linkify = string => {
  return `<a href="${string}">${string}</a>`;
};

const imageLinkify = (string, alt) => {
  return `<img src="${string}" alt="${alt}">`;
};

const indent = (string, spaceCount) => string.split('\n').join(
  '\n' + ' '.repeat(spaceCount)
);

const sectionize = (string, hLevel) => {
  const sectionClass = hLevel && hLevel < 3 ? ` class=level${hLevel}` : '';
  return `<section${sectionClass}>\n  ${indent(string, 2)}\n</section>\n`;
};

const renderHead = (string, hLevel) => {
  const tagName = `h${hLevel}`;
  const openTag = `<${tagName}>`;
  const closeTag = `</${tagName}>`;
  return `${openTag}${string}${closeTag}\n`;
};

const renderString = string => {
  return `<p>${string}</p>`;
};

const ordinary = (code, legend) => legend ? legend[code] || code : code;

const renderItem = (propertyName, item, legend, hLevel) => {
  const itemType = typeof item;
  if (Array.isArray(item)) {
    const sectionContent = item.map(element => {
      const subSectionContent = renderItem(
        propertyName, element, legend, hLevel
      );
      return sectionize(subSectionContent, hLevel);
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
    return renderString(item);
  }
  else if (itemType === 'object') {
    const sectionContent = Object.keys(item).map(subPropertyName => {
      const subItem = item[subPropertyName];
      const subPropertyContent = [
        renderHead(ordinary(subPropertyName, legend), hLevel),
        renderItem(subPropertyName, subItem, legend, hLevel + 1)
      ].join('');
      const noBox = ['number', 'string', 'boolean'].includes(typeof subItem);
      return sectionize(subPropertyContent, noBox ? '' : hLevel);
    });
    return sectionContent.join('').trim();
  }
  else {
    return '';
  }
};

const render = (cvObject, legend) => {
  const css = fs.readFileSync(
    path.join(__dirname, 'style.css'), 'utf-8'
  ).slice(0, -1).split('\n').join('\n      ');
  const html = indent(renderItem('', cvObject, legend, 1), 6);
  const template = fs.readFileSync(
    path.join(__dirname, 'template.html'), 'utf-8'
  );
  return template
  .replace('{{style-insert}}', css)
  .replace('{{main-insert}}', html);
}

const cvJSON = fs.readFileSync(path.join(__dirname, 'resume.json'));
const cvObject = JSON.parse(cvJSON);
const legend = cvObject.legend;
delete cvObject.legend;
const cvHTML = render(cvObject, legend);
fs.writeFileSync(path.join(__dirname, 'resume-a11y.html'), cvHTML);

exports = {render};
