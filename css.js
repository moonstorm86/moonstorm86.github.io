const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const { origin, destination, browserSync } = require("./gulpfile");

function css(cb) {
    src(`${origin}/styles/**/*.css`)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest(`${destination}/styles`))
        .pipe(browserSync.stream);

    cb();
}
exports.css = css;