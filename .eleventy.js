const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('logger', _ => console.log(JSON.stringify(_)));
  eleventyConfig.addShortcode('home', () => `<a href="/">Главная</a>`);
  eleventyConfig.addShortcode('postPagination', (collections, conspectName, title) => {
    const postsCnt = collections['postInConspect:'+conspectName].length;
    let postIndex = postsCnt;
    while (postIndex--) {
      const data = collections['postInConspect:'+conspectName][postIndex].data;
      if (conspectName === data.conspect && title === data.title) {
        const prev = collections['postInConspect:'+conspectName][postIndex - 1];
        const next = collections['postInConspect:'+conspectName][postIndex + 1];
        return `<ul class="pagination">${prev ? `<li class="prev"><a href="${prev.url}">${prev.data.title}</a></li>` : ''}${next ? `<li class="next"><a href="${next.url}">${next.data.title}</a></li>` : ''}</ul>`;
      }
    }
    return ' ';
  });
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
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
    permalinkSymbol: "#"
  };
  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts).use(markdownItEmoji)
  );
  eleventyConfig.addPassthroughCopy("img");
  return {
    passthroughFileCopy: true
  };
};
