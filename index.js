// Import dependencies.
const renderer = require('views/html');
const fs = require('fs');
const path = require('path');

// Convert a code to the string that it represents.
const titleOf = (string, legend) => legend[string] || string;

// Make the renderer render an object.
const render = (key, object, legend) => {
  // Utility to convert non-strings to strings.
  const stringOf = rep => {
    if (typeof rep === 'string') {
      return rep;
    }
    else if (Array.isArray(rep)) {
      return rep.map(item => stringOf(item));
    }
    else if (typeof rep === 'object') {
      return render(key, rep, legend, renderer);
    }
  };
  const title = titleOf(key, legend);
  const {format, level, data} = object;
  if (format && data) {
    switch(format) {
      case 'address': {
        return `${data.address}\n${data.city}, ${data.region} ${data.postalCode}, ${data.countryCode}`;
      }
      case 'boxedBulletList': {
        const bulletItems = data.map(
          item => renderer.bulletItemOf(stringOf(item))
        );
        const listHead = renderer.headOf(title, level);
        return renderer.sectionOf(listHead.concat(bulletItems).join('\n'), '');
      }
      case 'code': {
        return renderer.element2Of(stringOf(data), 'code', {}, -1);
      }
      case 'ed': {
        const edHead = data.url ? renderer.hLinkOf(
          data.head, data.url
        ) : data.head;
        return `${edHead}, ${data.startDate}–${data.endDate}: ${data.area}`;
      }
      case 'head': {
        const heading = renderer.headOf(stringOf(data), level || 1);
        return renderer.sectionOf(heading, title);
      }
      case 'headedString': {
        return renderer.headedStringOf(
          stringOf(data.head), stringOf(data.tail), data.delimiter
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
        return renderer.sectionOf(image, title);
      }
      case 'rowTables': {
        const rows = data.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf(row));
        return renderer.sectionOf(rowTables.join('\n'), title);
      }
      case 'tableLeftHead': {
        const rowElements = data.map(
          rowSpec => renderer.leftHeadRowOf(stringOf(rowSpec))
        );
        const leftHeadTable = renderer.tableOf(rowElements);
        return renderer.sectionOf(leftHeadTable, title);
      }
      case 'tableTopHead': {
        const headRowElement = renderer.headRowOf(stringOf(data[0]));
        const etcRowElements = data.slice(1).map(
          rowSpec => renderer.plainRowOf(stringOf(rowSpec))
        );
        const topHeadTable = renderer.tableOf(
          headRowElement.concat(etcRowElements).join('\n')
        );
        return renderer.sectionOf(topHeadTable, title);
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
    const keys = object.order || Object.keys(object).filter(
      key => object[key].format !== 'hide'
    );
    return keys.map(key => stringOf(object[key])).join('\n');
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
  const style = fs.readFileSync(path.join(__dirname, 'style.css'));
  const cvHTML = renderer.pageOf(
    render('', cvObject, legend), lang, title, style
  );
  fs.writeFileSync(path.join(__dirname, fileArgs[1]), cvHTML);
};

run();
