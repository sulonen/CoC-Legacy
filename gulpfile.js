'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const Server = require('karma').Server;
const istanbul = require('gulp-istanbul');
const protractor = require('gulp-protractor').protractor;

const paths = ['*.js', 'src/*.js', 'test/*_spec.js', 'models/*.js'];

var runCommand = function(command) {
  exec(command, (err, stdout, stderr) => {
    /* eslint-disable */
    console.log(stdout);
    /* eslint-disable */
    console.log(stderr);
    if (err !== null) {
      /* eslint-disable */
      console.log('exec error: ' + err);
    }
  });
};

gulp.task('lint', () => {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('pre-test', function () {
  return gulp.src(['src/**.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test-e2e', ['pre-test'], function () {
  return gulp.src(['test/e2e/*spec.js'])
    .pipe(protractor({configFile: 'protractor.conf.js'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('test-unit', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', () => {
  gulp.watch([paths], ['lint']);
});

gulp.task('mongo-start', () => {
  var command = 'mongod --dbpath ./data';
  runCommand(command);
});

gulp.task('mongo-stop', () => {
  var command = 'mongo admin --eval "db.shutdownServer()"';
  runCommand(command);
});

gulp.task('static', function() {
  return gulp.src(['src/**/*.html', 'src/**/*.json', 'src/*.ico'])
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack:dist', () => {
  return gulp.src('./entry.js')
    .pipe(gulpWebpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()],
      module: {
        loaders: [{
          test: /\.css$/,
          loaders: ['style', 'css']
        }]
      }
    }, webpack))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('webpack:test', () => {
  return gulp.src('./test/*_spec.js')
    .pipe(gulpWebpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('./test'));
});

gulp.task('push', ['static', 'webpack:dist']);

gulp.task('default', ['lint', 'static', 'webpack:dist']);

