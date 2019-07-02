const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const getNav = (collections, conspectName, title) => {
  const postsCnt = collections['postInConspect:'+conspectName].length;
  let postIndex = postsCnt;
  while (postIndex--) {
    const data = collections['postInConspect:'+conspectName][postIndex].data;
    if (conspectName === data.conspect && title === data.title) {
      const prev = collections['postInConspect:'+conspectName][postIndex - 1];
      const next = collections['postInConspect:'+conspectName][postIndex + 1];
      return {prev, next};
    }
  }
};

const getFirstArticleinConspect = (conspectName, collections) => collections[`postInConspect:${conspectName}`][1]; // index 0 is "about page"

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('htmlDate', (dateObj) => {
    return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split("T")[0];
  });

  eleventyConfig.addShortcode('home', () => `<a href="/"><span class="breadcrumbs-home-ico">🏠 </span> <span class="breadcrumbs-home-text">главная</span></a>`);
  eleventyConfig.addShortcode('postPagination', (collections, conspectName, title) => {
    const {prev, next} = getNav(collections, conspectName, title);
    if (prev || next) {
      return `<ul class="pagination-bottom">${next ? `<li class="next"><a href="${next.url}">${next.data.title} &#8594;</a></li>` : ''}${prev ? `<li class="prev"><a href="${prev.url}">&#8592; ${prev.data.title}</a></li>` : ''}</ul>`;
    }
    return ' ';
  });
  eleventyConfig.addShortcode('getSiteMenu', (collections, sectionActive, subjectActive, conspectActive) => {
    if (!collections) {
      throw Error('Collections is required.');
    }
    const sections = collections['section'];
    let content = '<div class="sections">';
    for (let secInd = 0, secLen = sections.length; secInd < secLen; secInd++) {
      content += '<div class="section-block">';
      const isSecChecked = sections[secInd].data.section === sectionActive ? 'checked' : '';
      content += `
        <input class="section-checkbox" id="section-${secInd}" type="checkbox" ${isSecChecked} />
        <label class="section-item" for="section-${secInd}">${sections[secInd].data.title}</label>
      `;
      const nestedSubjects = collections[`subjectInSection:${sections[secInd].data.section}`];
      if (nestedSubjects) {
        content += '<div class="subject-block">';
        for (let subInd = 0, subLen = nestedSubjects.length; subInd < subLen; subInd++) {
          const isSubChecked = nestedSubjects[subInd].data.subject === subjectActive ? 'checked' : '';
          content += `
            <input class="subject-checkbox" id="subject-${secInd}-${subInd}" type="checkbox" ${isSubChecked} />
            <label class="subject-item" for="subject-${secInd}-${subInd}">${nestedSubjects[subInd].data.title}</label>
          `;
          const nestedConspects = collections[`conspectInSubject:${nestedSubjects[subInd].data.subject}`];
          if (nestedConspects) {
            content += '<div class="conspect-block">';
            for (let conInd = 0, conLen = nestedConspects.length; conInd < conLen; conInd++) {
              const isConActive = nestedConspects[conInd].data.conspect === conspectActive ? 'active' : '';
              const conspectName = nestedConspects[conInd].data.conspect;
              const firstConspectArticle = getFirstArticleinConspect(conspectName, collections);
              content += `<a class="conspect-item ${isConActive}" href="${firstConspectArticle.url}">${nestedConspects[conInd].data.conspectTitle}</a>`;
            }
            content += '</div>';
          }
        }
        content += '</div>';
      }
      content += '</div>';
    }
    content += '</div>';
    return `
      <div class="site-menu">
        <div class="site-menu__container">
          ${content}
        </div>  
      </div>  
    `;
  });
  
  
  eleventyConfig.addShortcode('getMainConspectBlocks', (collections) => {
    let layout = ``;
    collections['subject'].forEach(subjectElement => {
      const subjectName = subjectElement.data.subject;
      layout += `
        <div class="block">
          <h2>${subjectName}</h2>
          <ul class="base-list">
        `;
      collections[`conspectInSubject:${subjectName}`].forEach(conspectElement => {
        const conspectName = conspectElement.data.conspect;
        const firstConspectArticle = getFirstArticleinConspect(conspectName, collections);
        layout += `
            <li>
              <a href="${firstConspectArticle.url}">${conspectElement.data.conspectTitle}</a>
            </li>
        `;
      });
      layout += `
          </ul>
        </div>  
      `;
    });
    return layout;
  });

  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItEmoji = require("markdown-it-emoji");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    level: [2],
    permalinkBefore: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts).use(markdownItEmoji)
  );
  eleventyConfig.addPassthroughCopy("_server/assets");
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });
  return {
    templateFormats : ['njk', 'md'],
    markdownTemplateEngine: false,
    passthroughFileCopy: true,
    dir: {
      input: "_server",
      output: "_server/_site",
    }
  };
};
