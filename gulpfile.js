const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
exports.browserSync = browserSync;
const sass = require('gulp-sass');
const image = require('gulp-image');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const { css } = require("./css");
// const gulpFont = require('gulp-font');
// const plumber = require('gulp-plumber');
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.config.js')

// const concatenate = require('gulp-concat'); for combining files

const origin = 'src';
exports.origin = origin;
const destination = 'build';
exports.destination = destination;
const projects = 'build/projects';

sass.compiler = require('node-sass');

async function clean(cb) {
    await del(destination);
    await del([destination, '!destination/images']);
    cb();
}

function html(cb) {
    src(`${origin}/**/*.html`)
        .pipe(dest(destination));
    cb();
}

// pug to HTML -- Works!
function template(cb) {
    src(`${origin}/**/*.pug`)
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(destination))
        .pipe(browserSync.stream);
    cb();
};

function images(cb) {
    src(`${origin}/images/*`)
        .pipe(image())
        .pipe(dest(`${destination}/images`));
    src(`${origin}/*.ico`)
        .pipe(image())
        .pipe(dest(`${destination}`));
    cb();
}

function js(cb) {
    // any js file
    src(`${origin}/scripts/lib/**/*.js`).pipe(dest(`${destination}/scripts/lib`));

    // specific js file
    src(`${origin}/scripts/main.js`).pipe(dest(`${destination}/scripts`))
        .pipe(browserSync.stream);

    cb();
}

function watcher(cb) {
    watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
    watch(`${origin}/images/*`).on('change', series(images, browserSync.reload))
    watch(`${origin}/images/**/*.{png,jpg,jpeg,gif,svg}, {events: 'all'}`).on('change', series(images, browserSync.reload))
    watch(`${destination}/**/*.html`).on('change', series(html, browserSync.reload))
    watch(`${origin}/**/*.css`).on('change', series(css, browserSync.reload))
    watch(`${origin}/**/*.css`).on('add', series(css, browserSync.reload))
    watch(`${origin}/**/*.pug`).on('change', series(template, browserSync.reload))
    watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))
    cb();
}

function server(cb) {
    browserSync.init({
        notify: false,
        open: true,
        server: [destination, projects]
            // proxy: localhost: 80
            // server: {
            //     baseDir: destination,
            // }
    })
    cb();
}

// exports.default = series(clean, parallel(template, html, css, js), server, watcher);
// uncomment to add new images
exports.default = series(clean, parallel(template, html, css, js, images), server, watcher);