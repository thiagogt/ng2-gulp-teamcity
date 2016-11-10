var gulp = require('gulp');

var karma = require('karma');

var paths = {
    typeScriptSource: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.mock.ts'],
    typeScriptTest: ['src/**/*.spec.ts', 'src/**/*.mock.ts'],
    base: 'src'
};

var del = require('del');

gulp.task('clean:tsc', function() {
    return del(['src/**/*.js', 'src/**/*.js.map', 'src/**/*.d.ts', '!src/systemjs.config.js']);
});

gulp.task('clean:dist', function() {
    return del('dist/**/*');
});

gulp.task('clean', ['clean:tsc']);

var yargs = require('yargs');
var rename = require('gulp-rename');

var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');

var tsCompile = function(source) {
    var tsProject = tsc.createProject('tsconfig.json');

    var tsResult = gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.base)),
        tsResult.js.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.base))
    ]);
};

gulp.task('tsc:src', function() {
    return tsCompile(['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.spec.ts', '!src/**/*.mock.ts',
        'typings/index.d.ts', 'typings-custom/index.d.ts'
    ]);
});

gulp.task('tsc:karma', function() {
    return tsCompile(['src/**/*.ts', '!src/**/*.d.ts',
        'typings/index.d.ts', 'typings-custom/index.d.ts'
    ]);
});

var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(['clean'], ['tsc:src'], cb);
});

var browserSync = require('browser-sync').create();
var url = require('url');
var proxy = require('proxy-middleware');

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: {
            baseDir: 'src',
            routes: {
                "/library": "node_modules"
            }
        }
    });

    gulp.watch(['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.spec.ts', '!src/**/*.mock.ts'], function() {
        return runSequence('tsc:src', browserSync.reload);
    });
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('karma', function(done) {
    new karma.Server({
        configFile: __dirname + '/config/karma.config.js',
        singleRun: false
    }, done).start();

    browserSync({
        server: {
            baseDir: paths.base
        }
    });

    gulp.watch(paths.typeScriptSource, ['tsc']);
    gulp.watch(paths.typeScriptTest, ['tsc-karma']);
});

var npmFiles = require('gulp-npm-files');

gulp.task('dist:npm', function() {
    return gulp.src(npmFiles(), {base: './'})
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace("node_modules\\", "library\\");
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dist:src', function() {
    return gulp.src(['src/**/*.*', '!src/**/*.ts', '!src/**/*.scss'])
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['build', 'clean:dist'], function(cb) {
    runSequence(['clean', 'lint', 'clean:dist'], ['tsc:src'], ['dist:npm', 'dist:src'], cb);
});

gulp.task('serve:dist', ['dist'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('default', ['build']);