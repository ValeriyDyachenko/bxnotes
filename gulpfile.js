const gulp = require("gulp");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const paths = {
  css: {
    common: {
      post: {
        src: [
          '_includes/css/common/markdown.css',
          '_includes/css/common/prism.css',
          '_includes/css/common/hilighted-prism.css',
          '_includes/css/common/custom.css',
        ],
        dest: 'assets/styles/pages/common/',
      }  
    },
    desktop: {
      post: {
        src: [
          '_includes/css/desktop/components/header.css',
          '_includes/css/desktop/components/breadcrumbs.css',
          '_includes/css/desktop/components/conspect-nav.css',
          '_includes/css/desktop/components/container.css',
          '_includes/css/desktop/components/footer.css',
          '_includes/css/desktop/components/post-content.css',
          '_includes/css/desktop/components/github-btn.css',
          '_includes/css/desktop/components/pagination-bottom.css',
        ],
        dest: 'assets/styles/pages/desktop/',
      }
    },
    mobile: {
      post: {
        src: ([
          '_includes/css/mobile/custom.css',
          '_includes/css/mobile/components/header.css',
          '_includes/css/mobile/components/breadcrumbs.css',
          '_includes/css/mobile/components/conspect-nav.css',
          '_includes/css/mobile/components/container.css',
          '_includes/css/mobile/components/footer.css',
          '_includes/css/mobile/components/post-content.css',
          '_includes/css/mobile/components/github-btn.css',
          '_includes/css/mobile/components/pagination-bottom.css',
        ]),
        dest: 'assets/styles/pages/mobile/',
      }
    },
  }
};

function css(src, dest, fileName) {
  return gulp.src(src)
    .pipe(concat(fileName))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest));
}

const build = gulp.series(
  gulp.parallel(
    () => css(paths.css.common.post.src, paths.css.common.post.dest, 'post.css'),
    () => css(paths.css.desktop.post.src, paths.css.desktop.post.dest, 'post.css'),
    () => css(paths.css.mobile.post.src, paths.css.mobile.post.dest, 'post.css')
  )
);

gulp.watch('./_includes/css/**/*.css', build);

exports.watch = gulp.watch;
exports.default = build;