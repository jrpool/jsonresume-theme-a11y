// Function converting a jsonresume to a jsonresume-theme-a11y source object.
exports.convert = (sourceObject, isVerbose) => {
  const a11yObject = {};
  a11yObject.lang = {
    format: 'hide',
    data: 'en'
  };
  a11yObject.title = {
    format: 'hide',
    data: `Résumé: ${sourceObject.basics.name}`
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
      picture: 'Photograph',
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
    const {basics} = sourceObject;
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
        table: {
          'caption': {
            'size': 4,
            'data': 'Contacts'
          },
          'data': [
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
        table: {
          caption: {
            size: 4,
            data: 'Profiles'
          },
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
        delimiter: tailItem ? ': ' : ''
      }
    };
  };
  const unheadedListOf = (head, tail) => ({
    format: 'headedString',
    data: {
      head: titleOf(head),
      tail
    }
  });
  const bulletListOf = array => ({
    format: 'bulletList',
    data: array
  });
  const headedListOf = (object, listHead, etcHeads, delimiter) => {
    const result = [headedStringOf(listHead, object[listHead])];
    result.push({
      format: 'bulletList',
      data: []
    });
    etcHeads.forEach(head => {
      const tail = object[head];
      if (tail) {
        let tailItem;
        if(Array.isArray(tail)) {
          if (isVerbose) {
            tailItem = unheadedListOf(head, bulletListOf(tail));
          }
          else {
            tailItem = headedStringOf(head, tail.join(delimiter));
          }
        }
        else {
          tailItem = headedStringOf(head, tail);
        }
        result[1].data.push(tailItem);
      }
    });
    return result;
  };
  const boxedBulletListOf = (
    section, boxHead, listHead, etcHeads, delimiter
  ) => {
    const it = sourceObject[section];
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
  return a11yObject;
};
