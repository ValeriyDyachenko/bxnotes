const fs = require('fs');
const del = require('del');
const gulp = require("gulp");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const pages = [
  {name: 'post', path: '_includes/post.njk'},
  {name: 'subject', path: '_includes/subject.njk'},
  {name: 'section', path: '_includes/section.njk'},
  {name: 'sections', path: '_includes/sections.njk'},
  {name: 'home', path: '_includes/home.njk'},
  {name: '404', path: '_includes/404.njk'},
];

const deviceTypes = {
  mobile: 'mobile',
  desktop: 'desktop',
};

const globalStyles = [
  '_includes/css/common/markdown.css',
  '_includes/css/common/prism.css',
  '_includes/css/common/hilighted-prism.css',
  '_includes/css/common/custom.css',
];

const includedCss = {};

const parser = /({% *include.*components[^\/]*\/[^\/]*\/((?:(?!\.njk).)+)|data-include-component="?'?([^"']*)"?'?)/g;

pages.forEach(page => {
  const content = fs.readFileSync(page.path).toString();
  let match = parser.exec(content);
  while (match != null) {
    if (!includedCss[page.name]) includedCss[page.name] = {};
    if (!includedCss[page.name][deviceTypes.mobile]) includedCss[page.name][deviceTypes.mobile] = [];
    if (!includedCss[page.name][deviceTypes.desktop]) includedCss[page.name][deviceTypes.desktop] = [];
    const componentName = match[2] || match[3];
    if (componentName) {
      const componentCss = [
        {path: `_includes/components/${componentName}/${componentName}.${deviceTypes.mobile}.css`, device: deviceTypes.mobile},
        {path: `_includes/components/${componentName}/${componentName}.${deviceTypes.desktop}.css`, device: deviceTypes.desktop},
      ];
      try {
        componentCss.forEach(css => {
          if (fs.existsSync(css.path)) {
            includedCss[page.name][css.device].push(css.path);
            console.log(`Css ${css.path} is included to page ${page.name}`);
          } else {
            console.warn(`Css ${css.path} not exist`);
          }
        })
      } catch(err) {
        console.error(err)
      }
    }
    match = parser.exec(content);
  }
});

function css(src, dest, fileName) {
  return gulp.src(src)
    .pipe(concat(fileName))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest));
}

const build = cb => {
  del.sync(['_site/assets/styles/**']);
  css(globalStyles, `assets/styles/`, `common.css`);
  const pages = Object.keys(includedCss);
  pages.forEach(page => {
      css(includedCss[page][deviceTypes.mobile], `assets/styles/${deviceTypes.mobile}/`, `${page}.css`);
      css(includedCss[page][deviceTypes.desktop], `assets/styles/${deviceTypes.desktop}/`, `${page}.css`);
    });
  cb();
}

const watch = () =>
  gulp.watch('./_includes/components/**/*.css', build);

exports.watch = watch;
exports.default = build;
