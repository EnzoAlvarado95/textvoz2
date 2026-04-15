const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const htmlminifier = require('gulp-html-minifier');
const jsonminify = require('gulp-jsonminify');
const image = require('gulp-image');

//----------------- RUTAS -------------------//
var jsonFiles = ['target/*.json'];
var jsFiles = [
  'target/**/*.js',
  '!target/**/*.min.js',
  '!target/**/node_modules/**'
];
var cssFiles = ['target/**/*.css', '!target/**/*.min.css'];
var imgFiles = ['target/**/*.png', 'target/**/*.jpg', 'target/**/*.gif', 'target/**/*.jpeg'];
var htmlFiles = ['target/**/*.html', 'target/**/*.htm'];


//----------------- JSON -------------------//
gulp.task('minify-json', function (done) {
  gulp.src(jsonFiles, { allowEmpty: true })
    .pipe(jsonminify())
    .pipe(gulp.dest('target'));
  done();
});


//----------------- JS -------------------//
gulp.task('minify-js', function (done) {
  gulp.src(jsFiles, { allowEmpty: true })
    .pipe(gulp.dest('target'));
  done();
});


//----------------- CSS -------------------//
gulp.task('minify-css', function (done) {
  gulp.src(cssFiles, { allowEmpty: true })
    .pipe(cleancss())
    .pipe(gulp.dest('target'));
  done();
});


//----------------- IMAGES -------------------//
gulp.task('compress-images', function (done) {
  gulp.src(imgFiles, { allowEmpty: true })
    .pipe(gulp.dest('target'));
  done();
});


//----------------- HTML -------------------//
gulp.task('minify-html', function (done) {
  gulp.src(htmlFiles, { allowEmpty: true })
    .pipe(htmlminifier({
      collapseWhitespace: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('target'));
  done();
});


// TAREA PRINCIPAL (AL FINAL)
gulp.task('procesoppal', gulp.series(
  'minify-js',
  'minify-css',
  'minify-html',
  'minify-json',
  'compress-images'
));