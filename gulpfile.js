//utils
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const rename = require('gulp-rename');

//css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//babel + browserify
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');


gulp.task('default', ['sass', 'babel'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 5000
    });
    gulp.watch("./*.html").on('change', browserSync.reload); 
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['babel']);
});

gulp.task('sass', () => {
    const plugins = [autoprefixer({browsers: ['last 2 versions']}), cssnano()];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('babel', function() {
    browserify({
        entries: './src/js/main.js',
        debug: true
    })
    .transform(babelify, { presets: ['env'] })
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});