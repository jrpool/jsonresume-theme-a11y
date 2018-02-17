// Import dependencies.
const fs = require('fs');
const path = require('path');
const commander = require('commander');

// Process the command arguments.
commander
.description(
  'Create a jsonresume-theme-a11y source file from a jsonresume source file'
)
.option(
  '-i, --input <filename>', 'Source file in jsonresume format [resume.json]'
)
.option(
  '-o, --output <filename>',
  'Destination file in jsonresume-theme-a11y format [resume-a11y.json]'
)
.option('-v, --verbose', 'Format array properties as 1-line-per-element lists');
commander.parse(process.argv);
const inFile = commander.input || 'resume.json';
const outFile = commander.output || 'resume-a11y.json';
const verbose = commander.verbose;

// Retrieve the source file.
const cvObject = require(path.join(__dirname, inFile));

// Convert it to an object in jsonresume-theme-a11y format.
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
    keywords: 'Details',
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
{
  const {basics} = cvObject;
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
  a11yObject.summary = {
    normalFormat: 'left',
    format: summary ? 'left' : 'hide',
    title: 'summary',
    data: summary ? summary.split('\n') : ''
  };
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
const titleOf = string => a11yObject.legend.data[string] || string;
const headedStringOf = (head, tail) => {
  const tailItem = head === 'website' ? {
    format: 'hLink',
    data: {
      href: tail
    }
  } : tail;
  return {
    format: 'headedString',
    data: {
      head: titleOf(head),
      tail: tailItem || '',
      delimiter: ': '
    }
  };
};
const headedListOf = (object, listHead, etcHeads, delimiter) => {
  const result = [headedStringOf(listHead, object[listHead])];
  result.push({
    format: 'bulletList',
    data: []
  });
  etcHeads.forEach(head => {
    let tail = object[head];
    if (tail) {
      if(Array.isArray(tail) && !verbose) {
        tail = tail.join(delimiter);
      }
      result[1].data.push(headedStringOf(head, tail));
    }
  });
  return result;
};
const boxedBulletListOf = (
  section, boxHead, listHead, etcHeads, delimiter
) => {
  const it = cvObject[section];
  a11yObject[section] = {
    normalFormat: 'boxedBulletList',
    format: it && it.length ? 'boxedBulletList' : 'hide',
    title: section,
    data: {
      head: {
        size: 2,
        data: boxHead
      },
      list: it && it.length ? it.map(
        object => headedListOf(object, listHead, etcHeads, delimiter)
      ) : []
    }
  };
};
boxedBulletListOf('work', 'Work history', 'company', [
  'position', 'website', 'startDate', 'endDate', 'summary', 'highlights'
], '/');
boxedBulletListOf('volunteer', 'Volunteering', 'organization', [
  'position', 'website', 'startDate', 'endDate', 'summary', 'highlights'
], '/');
boxedBulletListOf('education', 'Education', 'institution', [
  'area', 'studyType', 'startDate', 'endDate', 'gpa', 'courses'
], '/');
boxedBulletListOf('awards', 'Grants, awards, and prizes', 'title', [
  'date', 'awarder', 'summary'
], '');
boxedBulletListOf('publications', 'Publications', 'name', [
  'publisher', 'releaseDate', 'website', 'summary'
], '');
boxedBulletListOf('skills', 'Skills', 'name', ['level', 'keywords'], ', ');
boxedBulletListOf('languages', 'Languages known', 'name', ['level'], '');
boxedBulletListOf('interests', 'Interests', 'name', ['keywords'], ', ');
boxedBulletListOf('references', 'References', 'name', ['reference'], '');

// Write object as JSON string to converted source file.
fs.writeFileSync(
  path.join(__dirname, outFile), JSON.stringify(a11yObject, null, 2)
);
