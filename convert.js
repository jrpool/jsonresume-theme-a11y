// Import dependencies.
const fs = require('fs');
const path = require('path');

// Process command arguments.
const fileArgs = process.argv.slice(2);
fileArgs[0] = fileArgs[0] || './resume.json';
fileArgs[1] = fileArgs[1] || 'docs/resume-a11y.json';

// Retrieve source file.
const cvObject = require(path.join(__dirname, fileArgs[0]));

// Convert it to object in jsonresume-theme-a11y format.
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
const headedStringOf = (head, tail) => {
  const tailItem = head === 'website' ? {
    format: 'hLink',
    href: tail
  } : tail;
  return {
    format: 'headedString',
    data: {
      head,
      tail: tailItem || ''
      delimiter: ': '
    }
  };
};
const headedlistOf = (
  object, headPropertyName, etcPropertyNames, delimiter
) => {
  const result = [headedStringOf(headPropertyName, object[headPropertyName])];
  result.push({
    format: 'bulletList',
    data: []
  });
  etcPropertyNames.forEach(name => {
    let tail = object[name];
    if(Array.isArray(object[name])) {
      tail = tail.join(delimiter);
    }
    if (tail) {
      result[1].data.push(headedStringOf(name, tail));
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
        object => headedListOf(
          object, listHead, etcHeads.map(etcHead => object[etcHead], delimiter)
        )
      ) : []
    }
  };
};
boxedBulletListOf('work', 'Work history', 'company', [
  position, website, startDate, endDate, summary, highlights
], '/');
boxedBulletListOf('volunteer', 'Volunteering', 'organization', [
  position, website, startDate, endDate, summary, highlights
], '/');
boxedBulletListOf('education', 'Education', 'institution', [
  area, studyType, startDate, endDate, gpa, courses
], '/');
boxedBulletListOf('awards', 'Grants, awards, and prizes', 'title', [
  date, awarder, summary
], '');
boxedBulletListOf('publications', 'Publications', 'name', [
  publisher, releaseDate, website, summary
], '');
boxedBulletListOf('skills', 'Skills', 'name', [
  level, keywords
], ', ');
boxedBulletListOf('languages', 'Languages known', 'name', [
  level
], '');
boxedBulletListOf('interests', 'Interests', 'name', [
  keywords
], ', ');
boxedBulletListOf('references', 'References', 'name', [
  reference
], '');

// Write object as JSON string to converted source file.
fs.writeFileSync(
  path.join(__dirname, fileArgs[1]), JSON.stringify(a11yObject, null, 2)
);
