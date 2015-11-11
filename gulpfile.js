/****************
 * Gaming Register Server
 ***************/
'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var eslint = require('gulp-eslint');
var exec = require('child_process').exec;

var neo4jPath = '.\\..\\neo4j-community-2.3.0-M03\\bin\\Neo4j.bat';

gulp.task('dev', function devTask() {
	env({ vars: { ENV: 'test' } });
	
	var watcher = gulp.watch(['app.js',
                              'gulpfile.js',
                              './lib/**/*.js',
                              './tests/**/*.js']);
	watcher.on('change', function actOnChange() {
		gulp.src(['./lib/**/*.js', './tests/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format());
	});

	exec(neo4jPath, function executeFunction() {})
        .on('error', function handleErrorEvent() {
            console.log('Error occurred while launching neo4j: ' + error);
		}).on('exit', function handleExitEvent() {
			console.log('Exiting Neo4J');
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
	});
	
});

gulp.task('lint', function lintTask() {
	return gulp.src(['gulpfile.js', './lib/**/*.js', './tests/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('integration', function integrationTestTask(done) {
	env({ vars: { ENV: 'test' } });

	exec(neo4jPath, function executeFunction() {})
        .on('error', function handleErrorEvent() {
            console.log('Error occurred while launching neo4j: ' + error);
		}).on('exit', function handleExitEvent() {
            setTimeout(function timeoutExceeded() {

				// This gives time for the Neo4j server to run
				gulp.src('tests/integrationTests/*.js', { read: false })
					.pipe(gulpMocha());

				done();
			}, 10000);
		});
});

gulp.task('unit', function unitTestTask() {
	env({ vars: { ENV: 'test' } });

	gulp.src('tests/unitTests/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('data', function dataTestTask(done) {

	exec(neo4jPath, function executeFunction() {})
        .on('error', function handleErrorEvent() {
            console.log('Error occurred while launching neo4j: ' + error);
		}).on('exit', function handleExitEvent() {
            setTimeout(function timeoutExceeded() {

				// This gives time for the Neo4j server to run
				gulp.src('tests/dataTests/*.js', { read: false })
					.pipe(gulpMocha());

				done();
			}, 10000);
		});

});

gulp.task('default', function defaultTask() {
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

