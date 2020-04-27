const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const image = require('gulp-image');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
// const plumber = require('gulp-plumber');
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.config.js')

// const concatenate = require('gulp-concat'); for combining files

const origin = 'src';
const destination = 'build';
// const dist = 'dist1';

sass.compiler = require('node-sass');

async function clean(cb) {
    await del(destination);
    cb();
}

function html(cb) {
    src(`${origin}/**/*.html`).pipe(dest(destination))
        // .pipe(plumber());
    cb();
}
// pug to HTML -- Works!
function template(cb) {
    src(`${origin}/**/*.pug`)
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(destination));
    cb();
};

// gulp.task('imageSm', function() {
//     gulp.src('img/**/*')
//         .pipe(cache(imagemin({
//             optimizationLevel: 3,
//             progressive: true,
//             interlaced: true
//         })))
//         .pipe(gulp.dest('build/img/'));
// });

function images(cb) {
    src(`${origin}/images/*`)
        .pipe(image())
        .pipe(dest(`${destination}/images`));
    src(`${origin}/**/*.ico`)
        .pipe(image())
        .pipe(dest(`${destination}`));
    cb();
}

// function assets(cb) {
//     return new Promise((resolve, reject) => {
//         webpack(webpackConfig, (err, stats) => {
//             if (err) {
//                 return reject(err)
//             }
//             if (stats.hasErrors()) {
//                 return reject(new Error(stats.compilation.errors.join('\n')))
//             }
//             resolve()
//         })
//     })
// }

function css(cb) {
    // src([`${origin}/styles/main.css`]).pipe(dest(`${destination}/styles`));

    src(`${origin}/styles/**/*.css`)
        // .pipe(sass().on('error', sass.logError))
        // .pipe(postcss([autoprefixer]))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest(`${destination}/styles`));

    cb();
}

// function sassStyles(cb) {
//     src(`${origin}/styles/**/*.sass`)
//         .pipe(sass())
//         .pipe(autoprefixer({
//             overrideBrowserslist: ['last 3 versions'],
//             cascade: false
//         }))
//         .pipe(sass({
//             outputStyle: 'expanded'
//         }))
//         .pipe(dest(`${destination}/styles`))

//         .pipe(dest(`${destination}/styles/main.sass`))

//     cb();
// }

function js(cb) {
    // any js file
    src(`${origin}/scripts/lib/**/*.js`).pipe(dest(`${destination}/scripts/lib`));

    // specific js file
    src(`${origin}/scripts/main.js`).pipe(dest(`${destination}/scripts`));
    // .pipe(babel({
    //     presets: ['@babel/env']
    // }))
    cb();
}

function watcher(cb) {
    watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
    watch(`${origin}/**/*.css`).on('change', series(css, browserSync.reload))
        // watch(`${origin}/**/*.sass`).on('change', series(sassStyles, browserSync.reload))
    watch(`${origin}/**/*.pug`).on('change', series(template, browserSync.reload))
    watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))
    cb();
}

function server(cb) {
    browserSync.init({
        notify: false,
        open: true,
        server: {
            baseDir: destination,
        }
    })
    cb();
}

exports.default = series(clean, parallel(template, html, css, js, images), server, watcher);