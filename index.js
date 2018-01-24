const fs = require('fs');
const path = require('path');

const renderHead = (string, hLevel) => {
  const tagName = `h${hLevel}`;
  const openTag = `<${tagName}>`;
  const closeTag = `</${tagName}>`;
  return `${openTag}${string}${closeTag}\n`;
};

const renderString = string => {
  return `<p>${string}</p>\n`;
};

const renderItem = (item, hLevel) => {
  const itemType = typeof item;
  if (Array.isArray(item)) {
    return item.map(element => renderItem(element, hLevel)).join('');
  }
  else if (['number', 'string', 'boolean'].includes(itemType)) {
    return renderString(item);
  }
  else if (itemType === 'object') {
    return Object.keys(item).map(propertyName => [
      renderHead(propertyName, hLevel),
      renderItem(item[propertyName], hLevel + 1)
    ].join('')).join('');
  }
  else {
    return '';
  }
};

const render = cvObject => {
  const css = fs.readFileSync(
    path.join(__dirname, 'style.css'), 'utf-8'
  ).slice(0, -1).split('\n').join('\n      ');
  const html = renderItem(cvObject, 1).split('\n').join('\n      ');
  const template = fs.readFileSync(
    path.join(__dirname, 'template.html'), 'utf-8'
  );
  return template
  .replace('{{style-insert}}', css)
  .replace('{{main-insert}}', html);
}

const cvJSON = fs.readFileSync(path.join(__dirname, 'resume.json'));
const cvObject = JSON.parse(cvJSON);
const cvHTML = render(cvObject);
fs.writeFileSync(path.join(__dirname, 'resume-a11y.html'), cvHTML);

exports = {render};
