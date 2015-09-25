var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var sass = require('gulp-sass');

// Основные
gulp.task('css', function () {
  // gulp.src('./assets/css/*.css')
  //   .pipe(concatCss("style.min.css"))
  //   .pipe(minifyCss({compatibility: 'ie8'}))
  //   .pipe(autoprefixer({
  //           browsers: ['last 10 versions'],
  //           cascade: false
  //       }))
  //   .pipe(gulp.dest('./public/css/'))
  //   .pipe(connect.reload());
});


gulp.task('sass', function () {
  gulp.src('./assets/css/*.scss')
    .pipe(sass(''))
    .pipe(minifyCss(''))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});



gulp.task('html',function(){
    gulp.src('./assets/**/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('fonts',function(){
    gulp.src('./assets/fonts/*.*')
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('fonts',function(){
    gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(connect.reload());
});

gulp.task('js',function(){
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

// Watch
gulp.task('watch',function(){
    gulp.watch("./assets/css/*.css", ["css"]);
    gulp.watch("./assets/**/*.html", ["html"]);
    gulp.watch("./assets/js/**/*.js", ["js"]);
});

gulp.task('img',function(){
    gulp.src('./assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/img/'))
    .pipe(connect.reload());
});

// Default
gulp.task('default', ["html", "css", "sass", "js", "connect", "fonts", "watch"]);