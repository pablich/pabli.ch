var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var htmlreplace = require('gulp-html-replace');
var cssmin      = require('gulp-cssmin');
var imageop     = require('gulp-image-optimization');
 
// Remplazar rutas para el build
gulp.task('replace', function() {
  gulp.src('src/index.html')
    .pipe(htmlreplace({
        'css': 'css/styles.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

// Optimizar imagenes
gulp.task('img', function(cb) {
    gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg'])
		.pipe(imageop({
			optimizationLevel: 10,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});

// Concatenar y minificar js
gulp.task('js', function() {  
    return gulp.src('src/js/**/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Concatenar y minificar css
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
    .pipe(concat('styles.min.css'))
	.pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

// Copiar Certificados para el build
gulp.task('pdf', function () {
    return gulp.src('src/certificados/*.pdf')
    .pipe(gulp.dest('dist/certificados'));
});

// Copiar Certificados para el build
gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

// Copiar archivos para el build
gulp.task('files', function () {
    return gulp.src(['src/*.txt', 'src/*.png', 'src/*.php', 'src/*.ico', 'src/404.html'])
    .pipe(gulp.dest('dist/'));
});

// Recargar browser
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// Levantar web
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    //Mirar cambios
    gulp.watch("src/js/*.js", ['js-watch']);
	gulp.watch("src/*.html", ['js-watch']);
	gulp.watch("src/css/*.css", ['js-watch']);
});

// Crear Dist
gulp.task('dist', ['js', 'css', 'replace', 'img', 'fonts', 'pdf', 'files'], function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});