var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var superTest = require('supertest');
var jslint = require('gulp-jslint');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log('Restarting');
	});
});

gulp.task('lint', function() {
	return gulp.src('./lib/controllers/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('mantest', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			ENV: 'test',
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log('Restarting');
	});
});

gulp.task('alltest', function() {
	env({vars: { ENV: 'test' }});

	gulp.src('tests/**/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('itest', function() {
	env({vars: { ENV: 'test' }});

	gulp.src('tests/integrationTests/*.js', { read: false })
		.pipe(gulpMocha());
});

gulp.task('utest', function() {
	env({vars: { ENV: 'test' }});

	gulp.src('tests/unitTests/*.js', { read: false })
		.pipe(gulpMocha());
});