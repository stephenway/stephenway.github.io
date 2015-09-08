var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var harp = require('harp');
var imageOptim = require('gulp-imageoptim');
var htmlmin = require('gulp-htmlmin');
var penthouse = require('penthouse');
var fs = require('fs');
var cleanCSS = require('clean-css');

/**
 * Optimize source images with ImageOptim
 */
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('public/images'));
});

/**
 * Optimize html
 */
gulp.task('minify', function() {
  return gulp.src('../*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      keepClosingSlash: true
    }))
    .pipe(gulp.dest('../'))
});

/**
 * Inline intro.css
 */
gulp.task('penthouse', function() {
   penthouse({
       url: '../index.html',
       css: '../css/intro.css',
       width: 480,
       height: 800
   }, function (err, criticalCss) {
       console.log(criticalCss);
       console.log(err);
       var clean = new cleanCSS().minify(criticalCss);
       fs.writeFile('public/partials/_critical.ejs', '<style>' + clean + '</style>');
   });
});

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch("public/css/**/*.scss", function () {
      reload("public/css/main.css", {stream: true});
    });

    gulp.watch("public/js/**/*.js", function () {
      reload("public/js/main.js", {stream: true});
    });

    gulp.watch("public/images/src/**/*", ['images']);

    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["public/*.ejs", "public/partials/*.ejs"], function () {
      reload();
    });
  })
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
gulp.task('optimize', ['minify']);
