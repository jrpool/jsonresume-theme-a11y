// Import dependencies.
const fs = require('fs');
const path = require('path');

const fileArgs = process.argv.slice(2);
fileArgs[0] = fileArgs[0] || './resume.json';
fileArgs[1] = fileArgs[1] || 'docs/resume-a11y.json';
const cvObject = require(path.join(__dirname, fileArgs[0]));
const a11yObject = {};
a11yObject.lang = {
  format: 'hide',
  data: 'en'
};
a11yObject.order = {
  format: 'hide',
  data: [
    'picture',
    'identity',
    'summary',
    'contacts',
    'profiles',
    'work',
    'volunteer',
    'education',
    'awards',
    'publications',
    'skills',
    'languages',
    'interests',
    'references',
  ]
};
a11yObject.legend = {
  format: 'hide',
  data: {
    address: 'Address',
    area: 'Area',
    awarder: 'Awarder',
    awards: 'Awards',
    basics: 'Basics',
    city: 'City',
    company: 'Company',
    countryCode: 'Country code',
    courses: 'Courses',
    creditTo: 'Powered by ',
    date: 'Date',
    education: 'Education',
    email: 'Email',
    endDate: 'End date',
    fluency: 'Fluency',
    gpa: 'GPA',
    highlights: 'Highlights',
    institution: 'Institution',
    interests: 'Interests',
    keywords: 'Keywords',
    label: 'Label',
    language: 'Language',
    languages: 'Languages',
    level: 'Level',
    location: 'Mailing address',
    name: 'Name',
    network: 'Network',
    organization: 'Organization',
    phone: 'Phone',
    picture: 'Picture',
    position: 'Position',
    postalCode: 'Postal code',
    profiles: 'Profiles',
    publications: 'Publications',
    publisher: 'Publisher',
    reference: 'Reference',
    references: 'References',
    region: 'Region',
    releaseDate: 'Release date',
    skills: 'Skills',
    startDate: 'Start date',
    studyType: 'Study type',
    summary: 'Synopsis',
    title: 'Title',
    url: 'URL',
    username: 'Username',
    volunteer: 'Volunteering',
    website: 'Website',
    work: 'Work'
  }
};
const {
  basics,
  work,
  volunteer,
  education,
  awards,
  publications,
  skills,
  languages,
  interests,
  references
} = cvObject;
{
  const {
    name, label, picture, email, phone, website, summary, location, profiles
  } = basics;
  a11yObject.picture = {
    normalFormat: 'cornerPic',
    format: picture ? 'cornerPic' : 'hide',
    title: 'picture',
    data: {
      src: picture || '',
      alt: `Photograph${name ? ' of ' + name : ''}`
    }
  };
  a11yObject.identity = {
    normalFormat: 'center',
    format: name || label ? 'center' : 'hide',
    title: 'identity',
    data: [
      {
        size: 1,
        text: name
      },
      {
        size: 2,
        text: label
      }
    ]
  };
  const {address, postalCode, city, region, countryCode} = location;
  a11yObject.contacts = {
    normalFormat: 'tableLeftHeads',
    format:
      email || phone || website || city || region || countryCode
        ? 'tableLeftHeads'
        : 'hide',
    title: 'contacts',
    data: {
      table: [
        {
          label: 'email',
          data: [
            {
              format: 'mailLink',
              data: {
                href: email
              }
            }
          ]
        },
        {
          label: 'phone',
          data: [
            phone
          ]
        },
        {
          label: 'website',
          data: [
            {
              format: 'hLink',
              data: {
                href: website
              }
            }
          ]
        },
        {
          label: 'location',
          data: [
            {
              format: 'address',
              data: {
                point: address,
                city: city,
                region: region,
                postalCode: postalCode,
                countryCode: countryCode
              }
            }
          ]
        }
      ]
    }
  };
}
a11yObject.summary = {
  normalFormat: 'left',
  format: summary ? 'left' : 'hide',
  title: 'summary',
  data: summary ? summary.split('\n') : ''
};
{
  const {network, username, url} = profiles;
  a11yObject.profiles = {
    normalFormat: 'tableTopHead',
    format: profiles && profiles.length ? 'tableTopHead' : 'hide',
    title: 'profiles',
    data: {
      head: {
        size: 4,
        data: 'Profiles'
      },
      table: {
        label: ['network', 'username', 'url'],
        data: profiles && profiles.length ? profiles.map(profile => [
          profile.network || '',
          profile.username || '',
          {
            format: 'hLink',
            data: {
              href: profile.url || ''
            }
          }
        ]) : []
      }
    }
  };
}
{
a11yObject.work = {
  normalFormat: 'boxedBulletList',
  format: work && work.length ? 'boxedBulletList' : 'hide',
  title: 'work',
  data: {
    head: {
      size: 2,
      data: 'Work history'
    },
    list: work && work.length ? work.map(workItem => {
      const {
        company, position, website, startDate, endDate, summary, highlights
      } = work;
      const summaryItem = summary && summary.endsWith('.')
        ? summary.slice(0, -1)
        : summary;
      const highlightsItem = highlights && highlights.endsWith('.')
        ? highlights.slice(0, -1)
        : highlights;
      const subject = summaryItem && highlightsItem
        ? `${summaryItem}. ${highlightsItem}.`
        : `${summaryItem || ''}${highlightsItem || ''}`;
      return {
        format: 'edWork',
        data: {
          location: company || '',
          url: website || '',
          startDate: startDate || '',
          endDate: endDate || '',
          subject
        }
      };
    }) : []
  }
};
a11yObject.volunteer = {
  normalFormat: 'boxedBulletList',
  format: volunteer && volunteer.length ? 'boxedBulletList' : 'hide',
  title: 'volunteer',
  data: {
    head: {
      size: 2,
      data: 'Volunteering'
    },
    list: volunteer && volunteer.length ? volunteer.map(volunteerItem => {
      const {
        organization, position, website, startDate, endDate, summary, highlights
      } = volunteer;
      const subject = summary && highlights
        ? `${summary}. ${highlights}`
        : (summary || '') + (highlights || '');
      return {
        format: 'edWork',
        data: {
          location: organization || '',
          url: website || '',
          startDate: startDate || '',
          endDate: endDate || '',
          subject
        }
      };
    }) : []
  }
};
a11yObject.education = {
  normalFormat: 'boxedBulletList',
  format: education && education.length ? 'boxedBulletList' : 'hide',
  title: 'education',
  data: {
    head: {
      size: 2,
      data: 'Education'
    },
    list: education && education.length ? education.map(educationItem => {
      const {
        institution, area, studyType, startDate, endDate, gpa, courses
      } = education;
      const courseItem = courses ? courses.join(', ') : '';
      const gpaItem = gpa ? `GPA: ${gpa}` : '';
      const subject = [
        studyType,
        area,
        courseItem,
        summary && highlights
          ? `${summary}. ${highlights}`
          : (summary || '') + (highlights || '')
        ].filter(item => item && item.length).join('; ');
      return {
        format: 'edWork',
        data: {
          location: institution || '',
          url: '',
          startDate: startDate || '',
          endDate: endDate || '',
          subject
        }
      };
    }) : []
  }
};
a11yObject.awards = {
  normalFormat: 'boxedBulletList',
  format: awards && awards.length ? 'boxedBulletList' : 'hide',
  title: 'awards',
  data: {
    head: {
      size: 2,
      data: 'Grants, awards, and prizes'
    },
    list: awards && awards.length ? awards.map(awardsItem => {
      const {title, date, awarder, summary} = awards;
      return [title, date, awarder, summary].filter(
        item => item && item.length
      ).join(', ');
    }) : []
  }
};
a11yObject.publications = {
  normalFormat: 'boxedBulletList',
  format: publications && publications.length ? 'boxedBulletList' : 'hide',
  title: 'publications',
  data: {
    head: {
      size: 2,
      data: 'Publications'
    },
    list: publications && publications.length ? publications.map(
      publicationsItem => {
        const {name, publisher, releaseDate, website, summary} = publications;
        websiteItem = website ? {
          format: 'hLink',
          data: {
            href: website
          }
        } : '';
        const preSummary = [name, publisher, releaseDate, websiteItem].filter(
          item => item && item.length
        ).map(item => )
        return [title, date, awarder, summary].filter(
          item => item && item.length
        ).join(', ');
      }
    ) : []
  }
};
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
const headOf = object => {
  const headObject = object.head;
  return headObject
    ? renderer.headOf(stringOf(headObject.data), headObject.size)
    : '';
}

// Function rendering and writing the object represented by a source file.
const page = () => {
  const fileArgs = process.argv.slice(2);
  fileArgs[0] = fileArgs[0] || 'docs/resume-a11y.json';
  fileArgs[1] = fileArgs[1] || 'docs/resume-a11y.html';
  const cvObject = require(path.join(__dirname, fileArgs[0]));
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
        const head = headOf(data);
        const bulletItems = data.list.map(
          item => renderer.bulletItemOf(stringOf(item))
        );
        const bulletList = renderer.bulletListOf(bulletItems);
        const content = head ? [head, bulletList].join('\n') : bulletList;
        return renderer.sectionOf(content, title, format);
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
        const head = headOf(data);
        const rows = data.tables.map(rowArray => renderer.plainRowOf(rowArray));
        const rowTables = rows.map(row => renderer.tableOf([row], 'rowTable'));
        const contentItems = head ? [head, ...rowTables] : rowTables;
        return compactSectionOf(
          contentItems.join('\n'), title, 'rowTablesCircled'
        );
      }
      case 'tableLeftHeads': {
        const head = headOf(data);
        const rowItems = data.table.map(
          rowSpec => {
            rowSpec.data.unshift(titleOf(rowSpec.label, legend));
            return renderer.leftHeadRowOf(
              rowSpec.data.map(cellSpec => stringOf(cellSpec))
            );
          }
        );
        const table = renderer.tableOf(rowItems, 'tableLH');
        const content = head ? [head, table].join('\n') : table;
        return renderer.sectionOf(content, title, 'center');
      }
      case 'tableTopHead': {
        const head = headOf(data);
        const headRowItem = renderer.headRowOf(
          data.table.label.map(string => titleOf(string, legend))
        );
        const etcRowItems = data.table.data.map(
          rowSpec => renderer.plainRowOf(
            rowSpec.map(cellSpec => stringOf(cellSpec))
          )
        );
        const table = renderer.tableOf(
          [headRowItem, ...etcRowItems], 'tableTH'
        );
        const content = head ? [head, table].join('\n') : table;
        return renderer.sectionOf(content, title, 'center');
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
