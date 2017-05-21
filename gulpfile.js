/*jshint esversion: 6 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var server = require('gulp-express');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var mocha = require('gulp-mocha');
var child_process = require('child_process');
var gls = require('gulp-live-server');

var paths = {
    sass: {
        shared: 'public/styles/sass/shared/*.sass',
        unique: 'public/styles/sass/unique/*.sass'
    },
    tests: 'tests/unit/**/*.js'
};

gulp.task('serve', function() {
    var server = gls.new('keystone.js');
    server.start();

    gulp.watch(paths.sass.shared, function(event) {
        gulp.start('sass');
    });
    gulp.watch(paths.sass.unique, function(event) {
        gulp.start('sass:unique');
    });
});


gulp.task('test', function() {
    var server = gls.new('keystone.js');
    server.start();
    setTimeout(function () {
        gulp.src(paths.tests, function(event) {
            gulp.start('testAll');
        });
    }, 5000); //This allows the webserver to execute so we can run our tests. Will need to increase over time if it fails

});
gulp.task('testAll', function() {
    return gulp.src(paths.tests)
            .pipe(mocha())
            .once('error', () => {
            process.exit(1);
})
    .once('end', () => {
        process.exit();
});
});
gulp.task('sass', function () {
    return gulp.src(paths.sass.shared)
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 20', 'last 2 Chrome versions', 'Safari >= 9', 'iOS >= 9', 'last 2 Android versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('shared.css'))
        .pipe(gulp.dest('public/styles/css/'));
});

gulp.task('sass:unique', function () {
    return gulp.src(paths.sass.unique)
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 20', 'last 2 Chrome versions', 'Safari >= 9', 'iOS >= 9', 'last 2 Android versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/styles/css'));
});