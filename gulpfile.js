const fs = require('fs');
const del = require('del');
const gulp = require("gulp");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const jsonminify = require('gulp-jsonminify');

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

const parser = /({% *include.*components[^\/]*\/[^\/]*\/((?:(?!\.njk).)+)|data-include-component="?'?([^"']*)"?'?)/g;

function mergeAndCopyCss(src, dest, fileName) {
  return gulp.src(src)
    .pipe(concat(fileName))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest));
}

const getIncludedCss = () => {
  const includedCss = {};
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
  return includedCss;
};

const makeCssBundle = cb => {
  const includedCss = getIncludedCss();
  mergeAndCopyCss(globalStyles, `_site/css_bundle/`, `common.css`);
  const pages = Object.keys(includedCss);
  pages.forEach(page => {
    mergeAndCopyCss(includedCss[page][deviceTypes.mobile], `_site/css_bundle/${deviceTypes.mobile}/`, `${page}.css`);
    mergeAndCopyCss(includedCss[page][deviceTypes.desktop], `_site/css_bundle/${deviceTypes.desktop}/`, `${page}.css`);
  });
  cb();
}

const removeSiteData = cb => {
  del.sync('_site/**');
  cb();
}

const watchCssAndMakeBundle = () => {
  gulp.watch('./_includes/**/*.css', {ignoreInitial: false}, makeCssBundle);
}

const copyRedirectFile = (cb) => {
  gulp.src(['.htaccess', '_redirects'])
    .pipe(gulp.dest('./_site/'));
  cb();  
}

const copyMinifyedManifest = (cb) => {
  gulp.src('manifest/webmanifest')
    .pipe(jsonminify())
    .pipe(gulp.dest('./_site/'));
  cb();  
}

const copyIcons = (cb) => {
  gulp.src('manifest/icons/*.*')
    .pipe(gulp.dest('./_site/'));
  cb();  
}

exports.removeSiteData = removeSiteData;
exports.makeCssBundle = makeCssBundle;
exports.watchCssAndMakeBundle = watchCssAndMakeBundle;
exports.copyRedirectFile = copyRedirectFile;
exports.copyMinifyedManifest = copyMinifyedManifest;
exports.copyIcons = copyIcons;
