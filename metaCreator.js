const paramsFromPath = (path) => {
  const parser = /\\conspect\\([^\\]*)\\?([^\\]*)\\?([^\\]*)/g;
  const [, section, subject, conspect] = parser.exec(path);
  return {section, subject, conspect};
}

const getPostMeta = ({section, subject, conspect}) => ({
  layout: "post.njk",
  tags: [
    `post`, 
    `postInConspect:${conspect}`, 
    `postInSubject:${subject}`, 
    `postInSection:${section}`,
  ],
  conspect,
  section,
  subject,
});

const getConspectMeta = ({section, subject, conspect}) => ({
  tags: [
    `conspect`, 
    `conspectName:${conspect}`, 
    `conspectInSubject:${subject}`, 
    `conspectInSection:${section}`,
    `post`, 
    `postInConspect:${conspect}`, 
    `postInSubject:${subject}`, 
    `postInSection:${section}`,
  ]
});

const getSubjectMeta = ({section, subject}) => ({
  layout: 'subject.njk',
  tags: [
    `subject`, 
    `subjectInSection:${section}`, 
    `subjectName:${subject}`,
  ],
  subject,
  section,
});

const getSectionMeta = ({section}) => ({
  layout: 'section.njk',
  tags: [
    `section`, 
    `sectionName:${section}`,
  ],
  section,
});

module.exports = {
  getPostMeta: (path) => {
    return getPostMeta(paramsFromPath(path));
  },
  getConspectMeta: (path) => {
    return getConspectMeta(paramsFromPath(path));
  },
  getSubjectMeta: (path) => {
    return getSubjectMeta(paramsFromPath(path));
  },
  getSectionMeta: (path) => {
    return getSectionMeta(paramsFromPath(path));
  },
};
