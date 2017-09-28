'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');

gulp.task('javascript', function () {
	var bundledStream = through();

	bundledStream
		.pipe(source('src/app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/'));

	globby(['./src/*.js']).then(function(entries) {
		var b = browserify({
			entries: entries,
			debug: true,
			transform: [reactify]
		});

		b.bundle().pipe(bundledStream);
	}).catch(function(err) {
		bundledStream.emit('error', err);
	});

	return bundledStream;
});