// Import dependencies.
const renderer = require('./views/html');
const fs = require('fs');
const path = require('path');

// Utility to convert a code to the string that it represents.
const titleOf = (string, legend) => legend[string] || string;

// Make the renderer render an object.
const render = (key, object, legend) => {
  // Utility to convert non-strings to strings.
  const stringOf = (subkey, rep) => {
    if (typeof rep === 'string') {
      return rep;
    }
    else if (Array.isArray(rep)) {
      return rep.map(item => stringOf(key, item)).join('');
    }
    else if (typeof rep === 'object') {
      return render(subkey, rep, legend);
    }
  };
  const compactSectionOf = (content, atObject) => {
    const bufferDiv = renderer.element2Of('', 'div', {}, -1);
    const middleDiv = renderer.element2Of(
      content, 'div', {class: 'compactDiv'}, 2
    );
    const quasiRow = [bufferDiv, middleDiv, bufferDiv].join('\n');
    return renderer.sectionOf(quasiRow, atObject);
  };
  const title = titleOf(key, legend);
  const {format, level, data} = object;
  let formatClass;
  if (format && data) {
    level = level || 1;
    switch(format) {
      case 'address': {
        return renderer.multilineOf([
          data.address,
          `${data.city}, ${data.region} ${data.postalCode}, ${data.countryCode}`
        ]);
      }
      case 'boxedBulletList': {
        const bulletItems = data.map(
          item => renderer.bulletItemOf(stringOf(key, item))
        );
        const listHead = renderer.headOf(title, level);
        return renderer.sectionOf(
          [listHead, ...bulletItems].join('\n'),
          {class: `${format} level${level}`}
        );
      }
      case 'code': {
        return renderer.element2Of(stringOf(key, data), 'code', {}, -1);
      }
      case 'ed': {
        const edHead = data.url ? renderer.hLinkOf(
          data.head, data.url
        ) : data.head;
        return `${edHead}, ${data.startDate}–${data.endDate}: ${data.area}`;
      }
      case 'head': {
        const heading = renderer.headOf(stringOf(key, data), level);
        return renderer.sectionOf(heading, {title, class: `head${level}`});
      }
      case 'headedString': {
        return renderer.headedStringOf(
          stringOf(key, data.head), stringOf(key, data.tail), data.delimiter
        );
      }
      case 'hLink': {
        return renderer.hLinkOf(data.label, data.href);
      }
      case 'mailLink': {
        return renderer.mailLinkOf(data.label, data.href);
      }
      case 'pic1': {
        const image = renderer.imageOf(data.src, data.alt);
        return renderer.sectionOf(image, {title, class: format});
      }
      case 'rowTables': {
        const rows = data.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf([row], 'rowTable'));
        return renderer.sectionOf(
          rowTables.join('\n'), {title, class: format}
        );
      }
      case 'rowTablesCircled': {
        const head = renderer.element2Of(
          data.head, 'div', {class: `head${level}`}, -1
        );
        const rows = data.tables.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf([row], 'rowTable'));
        return compactSectionOf(
          [head, ...rowTables].join('\n'), {title, class: format}
        );
      }
      case 'tableLeftHead': {
        const rowElements = data.map(
          rowSpec => {
            rowSpec[0] = titleOf(rowSpec[0], legend);
            return renderer.leftHeadRowOf(
              rowSpec.map(cellSpec => stringOf('', cellSpec))
            );
          }
        );
        const leftHeadTable = renderer.tableOf(rowElements, 'tableLH');
        return renderer.sectionOf(leftHeadTable, {title});
      }
      case 'tableTopHead': {
        const headRowElement = renderer.headRowOf(
          data[0].map(string => titleOf(string, legend))
        );
        const etcRowElements = data.slice(1).map(
          rowSpec => renderer.plainRowOf(
            rowSpec.map(cellSpec => stringOf('', cellSpec))
          )
        );
        const topHeadTable = renderer.tableOf(
          [headRowElement, ...etcRowElements], 'tableTH'
        );
        return renderer.sectionOf(topHeadTable, {title});
      }
      case 'work': {
        const workHead = data.url ? renderer.hLinkOf(
          data.head, data.url
        ) : data.head;
        return `${workHead}, ${data.startDate}–${data.endDate}: ${data.duties}`;
      }
      default: {
        return renderer.headOf(`ERROR: BAD FORMAT AT ${key}`, 1);
      }
    }
  }
  else {
    const keys = object.order ? object.order.data : Object.keys(object).filter(
      subkey => object[subkey].format !== 'hide'
    );
    return keys.map(subkey => stringOf(subkey, object[subkey])).join('\n');
  }
};

// Process the specified file.
const run = () => {
  const fileArgs = process.argv.slice(2);
  fileArgs[0] = fileArgs[0] || 'resume.json';
  fileArgs[1] = fileArgs[1] || 'docs/resume-a11y.html';
  const cvJSON = fs.readFileSync(path.join(__dirname, fileArgs[0]), 'utf8');
  const cvObject = JSON.parse(cvJSON);
  const lang = cvObject.lang ? cvObject.lang.data : 'en';
  const legend = cvObject.legend ? cvObject.legend.data : {};
  const title = cvObject.name ? cvObject.name.data : 'Résumé';
  const style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
  const footPrefix = titleOf('creditTo', legend);
  const footLink = {
    format: 'hLink',
    data: {
      label: 'jsonresume-theme-a11y',
      href: 'https://github.com/jrpool/jsonresume-theme-a11y'
    }
  };
  const footContent = [footPrefix, render('', footLink, legend)].join('');
  const footElement = renderer.sectionOf(footContent, {class: 'theme-credit'});
  const cvHTML = renderer.pageOf(
    render('', cvObject, legend), footElement, lang, title, style
  );
  fs.writeFileSync(path.join(__dirname, fileArgs[1]), cvHTML);
};

run();
