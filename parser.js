// Import dependencies.
const fs = require('fs');
const path = require('path');
const renderer = require('./views/html');

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
        const {point, city, region, postalCode, countryCode} = data;
        let line1Item = point;
        const line2Items = [city, region, postalCode, countryCode];
        let line2Item = '';
        if (line2Items[0]) {
          const cityRegion = line2Items.slice(0, 2).filter(
            item => item.length
          ).join(', ');
          const cityRegionCode = [cityRegion, line2Items[2]].filter(
            item => item.length
          ).join(' ');
          line2Item = [cityRegionCode, line2Items[3]].filter(
            item => item.length
          ).join(', ');
        }
        else {
          line1Item = line2Items[2] = '';
          line2Item = line2Items.filter(item => item.length).join(', ');
        }
        return renderer.multilineOf(
          [line1Item, line2Item].filter(item => item.length)
        );
      }
      case 'bulletList': {
        return renderer.bulletListOf(
          data.map(item => renderer.bulletItemOf(stringOf(item)))
        );
      }
      case 'code': {
        return renderer.codeOf(stringOf(data));
      }
      case 'edWork': {
        const {location, startDate, endDate} = data;
        let locationItem = '', dateItem = '';
        if (location) {
          locationItem = data.url ? renderer.hLinkOf(
            location, data.url
          ) : location;
        }
        if (startDate || endDate) {
          dateItem = `${startDate || ''}–${endDate || ''}`;
        }
        const subjectItem = data.subject || '';
        const locationDateItem = [locationItem, dateItem].filter(
          item => item.length
        ).join(', ');
        return [locationDateItem, subjectItem].filter(
          item => item.length
        ).join(': ');
      }
      case 'headedString': {
        return renderer.headedStringOf(
          stringOf(data.head),
          stringOf(data.tail),
          data.hasOwnProperty('delimiter') ? data.delimiter : ''
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
const headOf = object => {
  const headObject = object.head;
  return headObject
    ? renderer.headOf(stringOf(headObject.data), headObject.size)
    : '';
};

/*
  Function returning an HTML document rendering a jsonresume-theme-a11y
  source object.
*/
exports.parse = a11yObject => {
  const lang = a11yObject.lang ? a11yObject.lang.data : 'en';
  const pageTitle = a11yObject.title ? a11yObject.title.data : 'Résumé';
  const style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
  const legend = a11yObject.legend ? a11yObject.legend.data : {};
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
  const sectionNames = keysOf(a11yObject);
  const sections = sectionNames.map(sectionName => {
    const sectionObject = a11yObject[sectionName];
    const format = sectionObject.format;
    const title = titleOf(sectionObject.title, legend);
    const data = sectionObject.data;
    switch(format) {
      case 'boxedBulletList': {
        const head = headOf(data);
        const items = data.list.map(
          item => renderer.bulletItemOf(stringOf(item))
        );
        const list = renderer.bulletListOf(items);
        const content = head ? [head, list].join('\n') : list;
        return renderer.sectionOf(content, title, format);
      }
      case 'center': {
        const lines = data.filter(lineSpec => lineSpec.text.length).map(
          lineSpec => renderer.headOf(stringOf(lineSpec.text), lineSpec.size)
        );
        return renderer.sectionOf(lines.join('\n'), title, format);
      }
      case 'cornerPic': {
        const image = renderer.imageOf(data.src, data.alt);
        return renderer.sectionOf(image, title, format);
      }
      case 'left': {
        const lines = data.map(line => renderer.paragraphOf(line));
        return renderer.sectionOf(lines.join('\n'), title, format);
      }
      case 'rowTables': {
        const rows = data.map(rowArray => renderer.plainRowOf(rowArray));
        const tables = rows.map(
          row => renderer.tableOf([renderer.tableBodyOf([row])], 'rowTable')
        );
        return renderer.sectionOf(tables.join('\n'), title, 'center');
      }
      case 'rowTablesCircled': {
        const compactSectionOf = (content, title, format) => {
          const quasiTable = renderer.squeezeBoxOf(content);
          return renderer.sectionOf(quasiTable, title, format);
        };
        const head = headOf(data);
        const rows = data.tables.map(rowArray => renderer.plainRowOf(rowArray));
        const tables = rows.map(
          row => renderer.tableOf([renderer.tableBodyOf([row])], 'rowTable')
        );
        const items = head ? [head, ...tables] : tables;
        return compactSectionOf(
          items.join('\n'), title, 'rowTablesCircled'
        );
      }
      case 'tableLeftHeads': {
        const sectionHead = headOf(data);
        const sectionTable = data.table;
        const tableCaption = sectionTable.caption;
        const caption = renderer.captionOf(
          tableCaption.size, tableCaption.data
        );
        const rows = sectionTable.data.map(
          rowSpec => {
            rowSpec.data.unshift(titleOf(rowSpec.label, legend));
            return renderer.leftHeadRowOf(
              rowSpec.data.map(cellSpec => stringOf(cellSpec))
            );
          }
        );
        const body = renderer.tableBodyOf(rows);
        const table = renderer.tableOf([caption, body], 'tableLH');
        const content = sectionHead ? [sectionHead, table].join('\n') : table;
        return renderer.sectionOf(content, title, 'center');
      }
      case 'tableTopHead': {
        const sectionHead = headOf(data);
        const sectionTable = data.table;
        const tableCaption = sectionTable.caption;
        const caption = renderer.captionOf(
          tableCaption.size, tableCaption.data
        );
        const head = renderer.headRowOf(
          sectionTable.label.map(string => titleOf(string, legend))
        );
        const etc = renderer.tableBodyOf(sectionTable.data.map(
          rowSpec => renderer.plainRowOf(
            rowSpec.map(cellSpec => stringOf(cellSpec))
          )
        ));
        const table = renderer.tableOf([caption, head, etc], 'tableTH');
        const content = sectionHead ? [sectionHead, table].join('\n') : table;
        return renderer.sectionOf(content, title, 'center');
      }
    }
  });
  const sectionContent = sections.join('\n');
  return renderer.pageOf(sectionContent, footSection, lang, pageTitle, style);
};
