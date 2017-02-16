var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var zip = require('gulp-zip');

gulp.task('default', ['coffee', 'watch']);

gulp.task('coffee', function(){
  return gulp.src(["src/**/!(boot)*.coffee"])
      .pipe(coffee())
      .pipe(concat('game.js'))
      .pipe(gulp.dest('build/'));
});

gulp.task('zip', function() {

  return gulp.src(["!game.zip", "./**/*"])
    .pipe(zip('game.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.coffee", ['coffee']);
});
