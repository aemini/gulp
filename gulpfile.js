var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
	return gulp.src([
		'src/a.txt',
		'src/b.txt'
	])
	.pipe(concat('result.txt'))
	.pipe(gulp.dest('build'));
});
