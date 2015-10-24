/****************
 * Gaming Register Server
 ***************/
'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var eslint = require('gulp-eslint');
var child = require('child_process');
var exec = require('child_process').exec;
var spawn = require('child_process').spawnSync;

gulp.task('dev', function devTask() {
	var watcher = gulp.watch(['app.js',
                              'gulpfile.js',
                              './lib/**/*.js',
                              './tests/**/*.js']);
	watcher.on('change', function actOnChange() {
		gulp.src(['./lib/**/*.js', './tests/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format());
	});
});

gulp.task('lint', function lintTask() {
	return gulp.src(['gulpfile.js', './lib/**/*.js', './tests/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('integration', function integrationTask() {
	env({ vars: { ENV: 'test' } });
	gulp.src('tests/integrationTests/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('unit', function unitTask() {
	env({ vars: { ENV: 'test' } });

	gulp.src('tests/unitTests/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('data', function(done) {
	
	var proc = exec('.\\..\\neo4j-community-2.3.0-M03\\bin\\Neo4j.bat', function executeFunction(err, stdout, stderr) {})
	  .on('error', function() {
		console.log('Error occurred while launching neo4j: ' + error);
	}).on('exit', function() {
		setTimeout(function() {
			gulp.src('tests/dataTests/*.js', { read: false }).pipe(gulpMocha());
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

gulp.task('alltest', function allTestTask() {
	env({ vars: { ENV: 'test' } });

	gulp.src('tests/**/*.js', { read: false })
		.pipe(gulpMocha());
});

