var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    spritesmith	= require('gulp.spritesmith'),
    svgSprite	= require('gulp-svg-sprites'),
    svgmin		= require('gulp-svgmin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    ftp = require('vinyl-ftp'),
    cheerio		= require('gulp-cheerio'),
    replace		= require('gulp-replace');
    rsync = require('gulp-rsync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
});

/*gulp.task('svgSpriteBuild', function () {
    return gulp.src('app/svg/!*.svg')
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: "symbols",
            preview: false,
            selector: "icon-%f",
            svg: {
                symbols: 'sprite.svg'
            }
        }))
        .pipe(gulp.dest('app/images'));
});*/

/*gulp.task('svgSpriteSass', function () {
    return gulp.src('app/svg/!*.svg')
        .pipe(svgSprite({
                preview: false,
                selector: "icon-%f",
                svg: {
                    sprite: 'svg_sprite.html'
                },
                cssFile: '../sass/_svg_sprite.scss',
                templates: {
                    css: require("fs").readFileSync('app/sass/_sprite_template.scss', "utf-8")
                }
            }
        ))
        .pipe(gulp.dest('app/sprite'));
});*/

/*gulp.task('svgSprite', ['svgSpriteBuild', 'svgSpriteSass']);

gulp.task('spritesmith', function() {
    var spriteData =
        gulp.src('app/images/sprite/!*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.sass',
                imgPath: '../images/sprite.png',
                padding: 2
            }));
    spriteData.img.pipe(gulp.dest('app/images')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sass')); // путь, куда сохраняем стили
});*/



gulp.task('styles', function() {
  return gulp.src('app/sass/**/main.sass')
    .pipe(sass({ outputStyle: 'compact' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    //.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('styles-libs', function() {
  return gulp.src('app/sass/**/libs.sass')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js',
      //'app/libs/svg/svg4everybody.js',
      'app/libs/fancybox/jquery.fancybox.js',
      'app/libs/slick-slider/slick.min.js',
      'app/libs/jquery.lazy/jquery.lazy.js',
      //'app/libs/maskedinput/jquery.maskedinput.min.js',
      //'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
      //'app/libs/leaflet/leaflet.js',
      //'app/libs/leaflet/markercluster.js',
      //'app/libs/fotorama/fotorama.js',
      //'app/libs/owl-carousel/dist/owl.carousel.min.js',
      //'app/libs/datapicker/moment.min.js',
      //'app/libs/datapicker/daterangepicker.js',
      //'app/js/common.js', // Always at the end
    ])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Minify js (opt.)
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
  return gulp.src('app/**')
    .pipe(rsync({
      root: 'app/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // include: ['*.htaccess'], // Includes files to deploy
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
      recursive: true,
      archive: true,
      silent: false,
      compress: true
    }))
});

/*gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function(callback) {
  return cache.clearAll();
})*/

gulp.task('img', function() {
  return gulp.src('app/img/***') // Берем все изображения из app
    .pipe(cache(imagemin({ // С кешированием
      // .pipe(imagemin({ // Сжимаем изображения без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('code', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
    gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('start', gulp.parallel('watch', 'styles', 'js', 'browser-sync'));


/*
  gulp.task('build', ['clean', 'img',  'styles', 'js'], function() {
  
    var buildCss = gulp.src('app/css/*')
      .pipe(gulp.dest('dist/css'))
  
    var buildFonts = gulp.src('app/fonts/*') // Переносим шрифты в продакшен
      .pipe(gulp.dest('dist/fonts'))
  
    var buildJs = gulp.src('app/js/*') // Переносим скрипты в продакшен
      .pipe(gulp.dest('dist/js'))
  
    //var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    //.pipe(gulp.dest('dist'));
  
  });*/