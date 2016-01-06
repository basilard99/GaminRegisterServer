/****************
 * Gaming Register Server
 ***************/
'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var eslint = require('gulp-eslint');
var neo4jManager = require('./neo4jFunctions').create();

gulp.task('dev', function devTask() {

	env({ vars: { ENV: 'test' } });

    var watcher = gulp.watch(['app.js',
                              'gulpfile.js',
                              'neo4jFunctions.js',
                              './lib/**/*.js',
                              './tests/**/*.js']);

    watcher.on('change', function actOnChange() {
        console.log('-------------CHANGE!');
        gulp.src(['./lib/**/*.js', './tests/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format());

        gulp.src('tests/unitTests/*.js', { read: false })
            .pipe(gulpMocha());
    });

    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function actOnRestart() {
        console.log('Restarting');
    })
    .on('exit', function cleanUp() {
        console.log('Cleaning up');
    });

});

gulp.task('lint', function lintTask() {
	return gulp.src(['gulpfile.js', 'neo4jFunctions.js', './lib/**/*.js', './tests/**/*.js'])
               .pipe(eslint())
               .pipe(eslint.format());
});

gulp.task('integration', function integrationTestTask(done) {
	env({ vars: { ENV: 'test' } });
	neo4jManager.switchToDevelopmentDb(null)
                .then(function doneSwitching() {
                    gulp.src('tests/integrationTests/*.js', { read: false })
                        .pipe(gulpMocha());
                    done();
                });
});

gulp.task('unit', function unitTestTask() {
	gulp.src('tests/unitTests/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('data', function dataTestTask(done) {
/*	neo4jManager.switchToDevelopmentDb(null)
                .then(function doneSwitching() {
                    gulp.src('tests/dataTests/*.spec.js', { read: false })
                        .pipe(gulpMocha());
                    done();
                });*/
    gulp.src('tests/dataTests/*.spec.js', { read: false })
        .pipe(gulpMocha());
    done();
});

gulp.task('default', function defaultTask() {

	neo4jManager.switchToDevelopmentDb();

	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function actOnRestart() {
		console.log('Restarting');
	});
});

gulp.task('mantest', function manualTestTask() {

	neo4jManager.switchToDevelopmentDb();

	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			ENV: 'test',
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function actOnRestart() {
		console.log('Restarting');
	});
});
