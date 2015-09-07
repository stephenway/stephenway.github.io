var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var harp = require('harp');
var imageOptim = require('gulp-imageoptim');

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
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["public/*.ejs", "public/partials/*.ejs"], function () {
      reload();
    });
  })
});

gulp.task('images', function() {
  return gulp.src('public/images/src/**/*')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('public/images'));
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['images','serve']);
