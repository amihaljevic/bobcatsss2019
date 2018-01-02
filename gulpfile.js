// Variables
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cssmin = require("gulp-cssmin");
var imagemin = require("gulp-imagemin");
var autoprefixer = require("gulp-autoprefixer");
var browsersync = require("browser-sync").create();
var watch = require("gulp-watch");
var sass = require("gulp-sass");

// SCSS Task
gulp.task("scss", function() {
  return gulp.src("src/scss/base.scss")
  .pipe(sass().on("error", sass.logError))
  .pipe(autoprefixer({
    browsers: ["last 100 versions"],
    grid: true
  }))
  .pipe(gulp.dest("dist/"))
  .pipe(cssmin())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("dist/"));
});

// SCSS BrowserSync
gulp.task("bs-reload-scss", ["scss"], function(done) {
  browsersync.reload();
  done();
});

// JS Task
gulp.task("js", function() {
  return gulp.src("src/js/**")
  .pipe(concat("script.bundle.js"))
  .pipe(gulp.dest("dist/"))
  .pipe(uglify())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("dist/"));
});

// JS BrowserSync
gulp.task("bs-reload-js", ["js"], function(done) {
  browsersync.reload();
  done();
});

// Image Minifying
gulp.task("img", function() {
  return gulp.src("src/img/**")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/"));
});

// Image BrowserSync
gulp.task("bs-reload-img", ["img"], function(done) {
  browsersync.reload();
  done();
});

// BrowserSync Task
gulp.task("bs", function() {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });

  // Watch for Changes
  gulp.watch("src/scss/**", ["bs-reload-scss"]);
  gulp.watch("src/js/**", ["bs-reload-js"]);
  gulp.watch("src/img/**", ["bs-reload-img"]);
  gulp.watch("**.html").on("change", browsersync.reload);
});

// Task to Run Script
gulp.task("default", ["scss", "js", "img"]);
gulp.task("serve", ["scss", "js", "img", "bs"]);