// to support es6 in node
require('babel-register')
// to support await/async
require("babel-polyfill")

var gulp = require('gulp')
var runSequence = require('run-sequence')
var webpack = require('webpack')
var del = require('del')
var webpackConfig = require('./webpack/webpack.config')
var zip = require('gulp-zip')
var package = require("./package.json")

gulp.task('default', function () {})
gulp.task('build', build)
gulp.task('test', test)
gulp.task('watch-test', watchTest)

function build() {
  runSequence('clean', 'webpack', function () {
    runSequence(
      ['move-client-js', 'move-client-css'],
      'clean-client-js-css',
      ['move-image', 'move-serverjs', 'move-sharejs', 'move-root'],
      'zip'
    )
  })
}

function test() {
  return gulp.src(['src/js/test/test-*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }))
}

function watchTest() {
  gulp.watch(['src/js/test/**'], ['test'])
}

gulp.task('clean', function () {
  return del(['dist'])
})

gulp.task('move-client-js', function () {
  return gulp.src(['dist/*.js', 'dist/*.js.map'])
    .pipe(gulp.dest('dist/js/client/'))
})

gulp.task('move-client-css', function () {
  return gulp.src(['dist/*.css', 'dist/*.css.map'])
    .pipe(gulp.dest('dist/css/'))
})

gulp.task('clean-client-js-css', function () {
  return del(['dist/*.js', 'dist/*.css', 'dist/*.js.map', 'dist/*.css.map'])
})

gulp.task('move-css', function () {
  return gulp.src(['src/css/**'])
    .pipe(gulp.dest('dist/css'))
})

gulp.task('move-image', function () {
  return gulp.src(['src/images/**'])
    .pipe(gulp.dest('dist/images'))
})

gulp.task('move-serverjs', function () {
  return gulp.src(['src/js/server/**'])
    .pipe(gulp.dest('dist/js/server/'))
})

gulp.task('move-sharejs', function () {
  return gulp.src(['src/js/shared/**'])
    .pipe(gulp.dest('dist/js/shared/'))
})

gulp.task('move-root', function () {
  return gulp.src(['./package.json', './favicon.ico', './webpack-stats.json', './oneapm.js'])
    .pipe(gulp.dest('dist/'))
})

gulp.task('zip', function () {
  return runSequence('move-for-zip-css', 'move-for-zip-js', 'do-zip', 'clean-zipTmp')
})

gulp.task('move-for-zip-css', function () {
  return gulp.src(['dist/css/**'])
    .pipe(gulp.dest('dist/zipTmp/css/'))
})

gulp.task('move-for-zip-js', function () {
  return gulp.src(['dist/js/client/**'])
    .pipe(gulp.dest('dist/zipTmp/js/client/'))
})

gulp.task('do-zip', function () {
  return gulp.src(['dist/zipTmp/**'])
    .pipe(zip(package.version + '.zip'))
    .pipe(gulp.dest('dist/assert'))
})

gulp.task('clean-zipTmp', function () {
  return del(['dist/zipTmp'])
})

gulp.task('webpack', function (cb) {
  return webpack(webpackConfig).run(function (err) {
    if (err) console.error(err)
    if (cb) cb()
  })
})



