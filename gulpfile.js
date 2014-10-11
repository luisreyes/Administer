'use strict';

var // Gulpjs and plugin declarations
gulp = require( 'gulp' ),
sass = require( 'gulp-sass' ),
cssmin = require( 'gulp-minify-css' ),
concat = require( 'gulp-concat' ),
jade = require( 'gulp-jade' ),
jshint = require( 'gulp-jshint' ),
stylish = require('jshint-stylish'),
locals = require( './locals.json' ),
pckg = require( './package.json' ),
connect = require('gulp-connect'),
headerfooter = require('gulp-headerfooter');
var filesToMove = [
        './dev/scripts/libraries/**/*.*',
        './dev/styles/libraries/**/*.*'
    ];



function getFileHeader(){
  return '/*!\r\n * '+pckg.name+' v'+pckg.version+'\r\n * '+pckg.description+'\r\n * ---------------------------------------\r\n * ©2014 '+pckg.author+'\r\n * Twitter: '+pckg.twitter+'\r\n */\r\n\n';
}

function getSectionHeader(title){
  return '\r\n/*! '+ title +' - START */\r\n\n';
}

function getSectionFooter(title){
  return '\r\n\n/*! '+ title +' - END */\r\n\n';
}

/************************************************************
 *                       Gulp Compile                       *
 ************************************************************/

gulp.task( 'compile_jade', function () {

  // Compile Jade to Html
  gulp.src( 'dev/views/**/*.jade' )
    .pipe( jade({
      pretty: true,
      locals: locals
      }))
    .pipe( gulp.dest( 'app/' ));

});

gulp.task( 'compile_sass', function () {

  gulp.src( 'dev/styles/core.scss' )
    .pipe( sass() )
    .pipe( cssmin() )
    .pipe( gulp.dest( 'app/styles/' ));

});

gulp.task( 'compile_js', function () {

  gulp.src( 'dev/scripts/*.js' )
    .pipe(headerfooter.header(getFileHeader()+getSectionHeader('app.js - Main App Scripts Closure')))
    .pipe(headerfooter.footer(getSectionFooter('app.js - Main App Scripts Closure')))
    .pipe( concat('app.js') )
    .pipe( gulp.dest( 'app/scripts/' ));

  gulp.src( 'dev/scripts/modules/*.js' )
    .pipe(headerfooter.header(getFileHeader()+'var modules = (function(){\r\n'+getSectionHeader('modules.js - Modules Closure')+'  var m = {};\r\n\n'))
    .pipe(headerfooter.footer(getSectionFooter('modules.js - Modules Closure')+'return m;\r\n\n})();'))
    .pipe( concat('modules.js') )
    .pipe( gulp.dest( 'app/scripts/' ));

});

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './dev/' })
  .pipe(gulp.dest('app'));
});

gulp.task('lint_app', function(){
  gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


gulp.task('lint_dev', function(){
  gulp.src(['dev/scripts/**/*.js','!dev/scripts/libraries/**/*.*'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
});


/******************************************************************
 *                       Gulp Main Methods                        *
 ******************************************************************/
gulp.task( 'build', [ 'compile_jade', 'compile_sass', 'compile_js' ]);

// Default gulp task
gulp.task( 'default', ['connect', 'watch']);