let gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    // cssnano      = require('cssnano'),
    nested       = require('postcss-nested'),
    concatCss    = require('gulp-concat-css'),
    browserSync  = require('browser-sync');

gulp.task('default', ['images', 'html', 'css', 'other', 'js', 'watch']);

gulp.task('html', function(){
    console.log("html files have been updated");
    return gulp.src('./app/assets/**/*.html')
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('images', function(){
    console.log("images have been updated");
    return gulp.src('./app/assets/images/**/*.*')
        .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('js', function(){
    console.log("js files have been updated");
    return gulp.src('./app/assets/js/**/*.js')
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('css', function (){
    var plugins = [
        nested(),
        autoprefixer({browsers: ['last 5 version']}),
        // cssnano(),
    ];
    return gulp.src('./app/assets/css/**/*.css')
        .pipe(postcss(plugins))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('other', function(){
    console.log("other has been updated");
    return gulp.src([
        './app/assets/other/*.*', 
        '!./app/assets/other/*.js', 
        '!./app/assets/other/*.css', 
        '!./app/assets/other/*.png',
        '!./app/assets/other/*.html',
        '!./app/assets/other/*.jpg',
        '!./app/assets/other/*.jpeg',
        '!./app/assets/other/*.svg'
        ])
        .pipe(gulp.dest('./public/assets/other'));
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: "localhost/student-book/public/index.php",
        // server: {
        //     baseDir: './public'
        // },
        notify: false
    });
    gulp.watch('./app/**/*.*', ['images', 'html', 'css', 'other', 'js'])
        .on('change', browserSync.reload);
});