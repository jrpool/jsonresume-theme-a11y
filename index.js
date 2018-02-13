// Import dependencies.
const renderer = require('./views/html');
const fs = require('fs');
const path = require('path');

// Function converting a string according to a legend.
const titleOf = (string, legend) => legend[string] || string;

// Function identifying a list of keys of properties to be rendered.
const keysOf = object =>
  object.order && object.order.format !== 'hide'
    ? object.order.data
    : Object.keys(object).filter(key => object[key].format !== 'hide');

// Function rendering a stringable.
const stringOf = stringable => {
  if (typeof stringable === 'string') {
    return stringable;
  }
  else if (Array.isArray(stringable)) {
    return stringable.map(element => stringOf(element)).join('');
  }
  else if (typeof stringable === 'object') {
    const format = stringable.format;
    const data = stringable.data;
    switch(format) {
      case 'address': {
        return renderer.multilineOf([
          data.point,
          `${data.city}, ${data.region} ${data.postalCode}, ${data.countryCode}`
        ]);
      }
      case 'code': {
        return renderer.codeOf(stringOf(data));
      }
      case 'edWork': {
        const location = data.url ? renderer.hLinkOf(
          data.location, data.url
        ) : data.location;
        return `${location}, ${data.startDate}–${data.endDate}: ${data.subject}`;
      }
      case 'headedString': {
        return renderer.headedStringOf(
          stringOf(data.head), stringOf(data.tail), data.delimiter || ': '
        );
      }
      case 'hLink': {
        return renderer.hLinkOf(data.label, data.href);
      }
      case 'mailLink': {
        return renderer.mailLinkOf(data.label, data.href);
      }
    }
  }
};

// Function rendering a heading.
const headOf = object => renderer.headOf(stringOf(object.data), object.size);

// Function rendering and writing the object represented by a source file.
const page = () => {
  const fileArgs = process.argv.slice(2);
  fileArgs[0] = fileArgs[0] || 'docs/resume-a11y.json';
  fileArgs[1] = fileArgs[1] || 'docs/resume-a11y.html';
  const cvJSON = fs.readFileSync(path.join(__dirname, fileArgs[0]), 'utf8');
  const cvObject = JSON.parse(cvJSON);
  const lang = cvObject.lang ? cvObject.lang.data : 'en';
  const pageTitle = cvObject.title ? cvObject.title.data : 'Résumé';
  const style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
  const legend = cvObject.legend ? cvObject.legend.data : {};
  const footPrefix = titleOf('creditTo', legend);
  const footLink = {
    format: 'hLink',
    data: {
      label: 'jsonresume-theme-a11y',
      href: 'https://github.com/jrpool/jsonresume-theme-a11y'
    }
  };
  const footContent = [footPrefix, stringOf(footLink)].join('');
  const footSection = renderer.sectionOf(
    footContent, 'credit', 'theme-credit'
  );
  const sectionNames = keysOf(cvObject);
  const sections = sectionNames.map(sectionName => {
    const sectionObject = cvObject[sectionName];
    const format = sectionObject.format;
    const title = titleOf(sectionObject.title, legend);
    const data = sectionObject.data;
    switch(format) {
      case 'boxedBulletList': {
        const listHead = headOf(data.head);
        const bulletItems = data.list.map(
          item => renderer.bulletItemOf(stringOf(item))
        );
        return renderer.sectionOf(
          [listHead, ...bulletItems].join('\n'), title, format
        );
      }
      case 'center': {
        const lines = data.map(
          lineSpec => renderer.headOf(stringOf(lineSpec.text), lineSpec.size)
        );
        return renderer.sectionOf(lines.join('\n'), title, format);
      }
      case 'cornerPic': {
        const image = renderer.imageOf(data.src, data.alt);
        return renderer.sectionOf(image, title, format);
      }
      case 'rowTables': {
        const rows = data.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf([row], 'rowTable'));
        return renderer.sectionOf(rowTables.join('\n'), title, 'center');
      }
      case 'rowTablesCircled': {
        const compactSectionOf = (content, title, format) => {
          const quasiTable = renderer.squeezeBoxOf(content);
          return renderer.sectionOf(quasiTable, title, format);
        };
        const head = renderer.headOf(data.head.data, data.head.size);
        const rows = data.tables.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf([row], 'rowTable'));
        return compactSectionOf(
          [head, ...rowTables].join('\n'), title, 'rowTablesCircled'
        );
      }
      case 'tableLeftHeads': {
        const head = renderer.headOf(data.head.data, data.head.size);
        const rowElements = data.table.map(
          rowSpec => {
            rowSpec.data.unshift(titleOf(rowSpec.label, legend));
            return renderer.leftHeadRowOf(
              rowSpec.data.map(cellSpec => stringOf(cellSpec))
            );
          }
        );
        const leftHeadTable = renderer.tableOf(rowElements, 'tableLH');
        return renderer.sectionOf(
          [head, leftHeadTable].join('\n'), title, 'center'
        );
      }
      case 'tableTopHead': {
        const head = renderer.headOf(data.head.data, data.head.size);
        const headRowElement = renderer.headRowOf(
          data.table.label.map(string => titleOf(string, legend))
        );
        const etcRowElements = data.table.data.map(
          rowSpec => renderer.plainRowOf(
            rowSpec.map(cellSpec => stringOf(cellSpec))
          )
        );
        const topHeadTable = renderer.tableOf(
          [headRowElement, ...etcRowElements], 'tableTH'
        );
        return renderer.sectionOf(
          [head, topHeadTable].join('\n'), title, 'center'
        );
      }
    }
  });
  const sectionContent = sections.join('\n');
  const result = renderer.pageOf(
    sectionContent, footSection, lang, pageTitle, style
  );
  fs.writeFileSync(path.join(__dirname, fileArgs[1]), result);
};

// Process the specified file.
page();
