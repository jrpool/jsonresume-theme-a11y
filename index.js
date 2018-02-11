// Import dependencies.
const renderer = require('./views/html');
const fs = require('fs');
const path = require('path');

// Utility to convert a code according to a legend.
const titleOf = (string, legend) => legend[string] || string;

// Utility to identify a list of keys of properties to be rendered.
const keysOf = object =>
  object.order && object.order.format !== 'hide'
  ? object.order.data
  : Object.keys(object).filter(key => object[key].format !== 'hide');

/*
  Make the renderer render an item. Precondition: origin is one of:
    0. 'root'
    1. 'array'
    2. ['key']
  */

const render = (structure, origin, legend) => {
  const title = titleOf(key, legend);
  const treeLevel = structure.treeLevel || 1;
  if (typeof structure === 'string') {
    return structure;
  }
  else if (Array.isArray(structure)) {
    const list = [];
    if (title) {
      list.push(renderer.headOf(title, treeLevel));
    }
    list.push(...structure.map(item => render(item, element, legend)));
    return renderer.sectionOf(
      list.join('\n'), {class: `boxedBulletList level${treeLevel}`}
    );
  }
  else if (typeof structure === 'object') {
    const {format, data} = structure;
    if (format && data) {
      switch(format) {
        case 'address': {
          return renderer.multilineOf([
            data.address,
            `${data.city}, ${data.region} ${data.postalCode}, ${data.countryCode}`
          ]);
        }
        case 'boxedBulletList': {
          const listHead = renderer.headOf(title, treeLevel);
          const bulletItems = data.map(
            item => renderer.bulletItemOf(render(item, element, legend))
          );
          return renderer.sectionOf(
            [listHead, ...bulletItems].join('\n'),
            {class: `${format} level${treeLevel}`}
          );
        }
        case 'code': {
          return renderer.codeOf(render(key, data, legend));
        }
        case 'ed': {
          const edHead = data.url ? renderer.hLinkOf(
            data.head, data.url
          ) : data.head;
          return `${edHead}, ${data.startDate}–${data.endDate}: ${data.area}`;
        }
        case 'head': {
          const heading = renderer.headOf(render(key, data, legend), treeLevel);
          return renderer.sectionOf(heading, {title, class: `head${treeLevel}`});
        }
        case 'headedString': {
          return renderer.headedStringOf(
            render(key, data.head, legend),
            render(key, data.tail, legend),
            data.delimiter || ': '
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
          const compactSectionOf = (content, atObject) => {
            const quasiRow = renderer.squeezeBox(content);
            return renderer.sectionOf(quasiRow, atObject);
          };
          const head = renderer.headOf(data.head, data.size);
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
                rowSpec.map(cellSpec => render('', cellSpec, legend))
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
              rowSpec.map(cellSpec => render('', cellSpec, legend))
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
      const contentList = [];
      if (title) {
        contentList.push(renderer.headOf(title, treeLevel);
      }
      const propertyKeys = keysOf(structure);
      const bulletItems = propertyKeys.map(key => {
        if (typeof stucture[key] === 'string') {
          return renderer.headedStringOf(key, structure[key], ': ');
        }
        else if (Array.isArray(structure[key])) {

        }
      );
      return renderer.sectionOf(
        [listHead, ...bulletItems].join('\n'),
        {class: `boxedBulletList level${treeLevel}`}
      );
    }
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
    render('Résumé', cvObject, legend), footElement, lang, title, style
  );
  fs.writeFileSync(path.join(__dirname, fileArgs[1]), cvHTML);
};

run();
