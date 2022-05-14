const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const Fs = require('fs');

//const data = JSON.parse(Fs.readFileSync('./data.json'));


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
}

function html() {
    return src('index.html')
        //.pipe(pug({
            //pretty: true,
            //locals: data || {},
        //}))
        .pipe(dest('build'))
        .pipe(browserSync.stream())
}

function css() {
    return src('assets/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: 'autoplace',
        }))
        .pipe(cleanCSS())
        .pipe(dest('build/assets/styles'))
        .pipe(browserSync.stream())
}

function js() {
    return src('script.js')
        .pipe(dest('build'))
        .pipe(browserSync.stream())
}

function images() {
    return src('assets/images/**/*')
        .pipe(imagemin())
        .pipe(dest('build/assets/images'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('assets/fonts/**/*')
        .pipe(dest('build/assets/fonts'))
        .pipe(browserSync.stream())
}

function clear() {
    return del('build', {force: true});
}


function startWatch() {
    watch('**/*.html', html)
    watch('assets/styles/**/*.scss', css)
    watch('assets/images/**/*', images)
    watch('assets/fonts/**/*', fonts)
    watch('**/*.js', js)
}

exports.dev = parallel(browsersync, startWatch, html, images, fonts, css, js)
exports.build = series(clear, parallel(html, images, fonts, css, js))


exports.default = series(html, images, fonts, css, js)