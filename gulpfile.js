const fs = require('fs');
const del = require('del');
const gulp = require("gulp");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const jsonminify = require('gulp-jsonminify');
const path = require('path');
const fse = require("fs-extra");

const pages = [
  {name: 'post', path: '_server/_includes/post.njk'},
  {name: 'subject', path: '_server/_includes/subject.njk'},
  {name: 'section', path: '_server/_includes/section.njk'},
  {name: 'sections', path: '_server/_includes/sections.njk'},
  {name: 'home', path: '_server/_includes/home.njk'},
  {name: '404', path: '_server/_includes/404.njk'},
];

const deviceTypes = {
  mobile: 'mobile',
  desktop: 'desktop',
};

const globalStyles = [
  '_server/_includes/css/common/markdown.css',
  '_server/_includes/css/common/prism.css',
  '_server/_includes/css/common/hilighted-prism.css',
  '_server/_includes/css/common/custom.css',
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
          {path: `_server/_includes/components/${componentName}/${componentName}.${deviceTypes.mobile}.css`, device: deviceTypes.mobile},
          {path: `_server/_includes/components/${componentName}/${componentName}.${deviceTypes.desktop}.css`, device: deviceTypes.desktop},
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
  mergeAndCopyCss(globalStyles, `_server/_site/css_bundle/`, `common.css`);
  const pages = Object.keys(includedCss);
  pages.forEach(page => {
    mergeAndCopyCss(includedCss[page][deviceTypes.mobile], `_server/_site/css_bundle/${deviceTypes.mobile}/`, `${page}.css`);
    mergeAndCopyCss(includedCss[page][deviceTypes.desktop], `_server/_site/css_bundle/${deviceTypes.desktop}/`, `${page}.css`);
  });
  cb();
}

// create 11tydata files
const tyDataDir = {
  section: '_server/_includes/eleventydata/section/index.11tydata.js',
  subject: '_server/_includes/eleventydata/subject/index.11tydata.js',
  conspect: '_server/_includes/eleventydata/conspect/index.11tydata.js',
  post: '_server/_includes/eleventydata/post/11tydata.js',
}

const conspectDir = '_server/conspect';

const getFolders = dir => {
  return fs.readdirSync(dir)
    .map(file => path.join(dir, file))
    .filter(function(file) {
      return fs.statSync(file).isDirectory();
    });
}

const getFoldersFromArray = arr => {
  return arr.reduce((dirs, dir) => dirs.concat(getFolders(dir)), []);
}

const copy11tydataFile = (src, dest, isNotPost) => {
  const filename = isNotPost ? 'index.11tydata.js' : `${path.basename(dest)}.11tydata.js`;
  fs.copyFile(src, path.join(dest, filename), (err) => {
    if (err) throw err;
    console.log(`${src} was copied to ${path.join(dest, filename)}`);
  }); 
}

const copy11tydataFiles = (src, destArray, isNotPost) => {
  destArray.forEach(dest => {
    copy11tydataFile(src, dest, isNotPost);
  });
}

const add11tydataIntoConspectSubdirs = cb => {
  const sectionDirs = getFolders(conspectDir);
  const subjectDirs = getFoldersFromArray(sectionDirs);
  const conspectsDirs = getFoldersFromArray(subjectDirs);
  copy11tydataFiles(tyDataDir.section, sectionDirs, true);
  copy11tydataFiles(tyDataDir.subject, subjectDirs, true);
  copy11tydataFiles(tyDataDir.conspect, conspectsDirs, true);
  copy11tydataFiles(tyDataDir.post, conspectsDirs, false);
  cb();
}
// end create 11tydata files

const removeSiteData = cb => {
  del.sync('_server/_site/**');
  cb();
}

const removeConspectData = cb => {
  del.sync('_server/conspect/**');
  cb();
}

const copyContentToConspectData = cb => {
  fse.copy('content', conspectDir, function (err) {
      if (err){
          console.log('An error occured while copying content.');
          return console.error(err);
      }
      console.log('Content copying completed.');
  });
  cb();
}

const gitIgnoreConspectFolder = cb => {
  const file = `*
*/
!.gitignore
`;

  var conspectDir = '_server/conspect';

  if (!fs.existsSync(conspectDir)){
    fs.mkdirSync(conspectDir);
  }

  fs.writeFile(`${conspectDir}/.gitignore`, file, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Conspect gitignore wes created.");
  });
  cb();
}

const watchCssAndMakeBundle = () => {
  gulp.watch('./_server/_includes/**/*.css', {ignoreInitial: false}, makeCssBundle);
}

const watchContentAndCopyToConspects = () => {
  gulp.watch('./content/**/*', {ignoreInitial: true}, copyContentToConspectData);
}

const copyRedirectFile = (cb) => {
  gulp.src(['_server/.htaccess', '_server/_redirects'], { dot: true })
    .pipe(gulp.dest('./_server/_site/'));
  cb();  
}

const copyMinifyedManifest = (cb) => {
  gulp.src('_server/manifest/webmanifest')
    .pipe(jsonminify())
    .pipe(gulp.dest('./_server/_site/'));
  cb();  
}

const copyIcons = (cb) => {
  gulp.src('_server/manifest/icons/*.*')
    .pipe(gulp.dest('./_server/_site/'));
  cb();  
}

exports.removeSiteData = removeSiteData;
exports.removeConspectData = removeConspectData;
exports.watchContentAndCopyToConspects = watchContentAndCopyToConspects;
exports.copyContentToConspectData = copyContentToConspectData;
exports.gitIgnoreConspectFolder = gitIgnoreConspectFolder;
exports.makeCssBundle = makeCssBundle;
exports.watchCssAndMakeBundle = watchCssAndMakeBundle;
exports.copyRedirectFile = copyRedirectFile;
exports.copyMinifyedManifest = copyMinifyedManifest;
exports.copyIcons = copyIcons;
exports.add11tydataIntoConspectSubdirs = add11tydataIntoConspectSubdirs;
