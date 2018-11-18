"use strict";

const gulp = require('gulp');
const gulpif = require('gulp-if');
const stylus =  require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const log = require('fancy-log');
const colors = require('ansi-colors');
const PluginError = require('plugin-error');
const gzip = require('gulp-gzip');
const notify = require('gulp-notify');
const watchify = require('watchify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const _ = require('lodash');
const touch = require('./touch');

// ############## VARS #################################################################################################

const extensions = [".js", ".es6"];
const destination = "../js/";
const paths = ['./node_modules'];

// Setting the Global environment status. Default is false/development
const global = {
  isWatching: false,
  stopOnError: false,
  cdnCompress: false
};

const jsFiles = [
  {
    input: ["./js/app.es6"],
    output: "app.js",
    extensions: extensions,
    destination: destination
  }
];

const stylusFiles = [
  {
    name: "app.css",
    src: ["./stylus/app.styl"],
    globs: ["./stylus/app.styl", "./stylus/app/**/*.styl", "./stylus/app/**/*.css"],
    destination: "../css/"
  }
];

// ############## JS ###################################################################################################

function createBundles(bundles) {
  bundles.forEach((bundle) => {
    createBundle({
      input: bundle.input,
      output: bundle.output,
      extensions: bundle.extensions,
      destination: bundle.destination
    });
  });
}

function createBundle(options) {
  const bOpts = {
    debug: true, // add a source map inline to the end of the bundle
    extensions: options.extensions,
    paths: paths,
    entries: options.input,
    fullPaths: true
  };
  const opts = _.assign({}, watchify.args, bOpts);

  let bundler = browserify(opts)
    .add(require.resolve("babel-polyfill"))
    .transform(babelify.configure({
      extensions: options.extensions, ignore: /(bower_components)|(node_modules)/
    }));

  if (global.isWatching) {
    bundler.plugin(watchify)
      .on("update", () => {
        console.log("Detected filesystem change. Recompiling...");
        executeBundle(bundler, options, Date.now());
      });
  }

  executeBundle(bundler, options, Date.now());
};

function executeBundle(bundler, options, startTime) {
  return bundler.bundle()
    .on("error", function(error) {
      log(colors.red(error.message));

      if (global.stopOnError) {
        var error = new PluginError({
          plugin: "compile",
          message: error.message
        });

        throw error;

        process.exit(0);
      }
    })
    .pipe(source(options.output))
    .pipe(buffer())
    //Gulp will strip debugging stuffs, uglify the JS, ie minify it, and gzip it when 'compile' is called
    .pipe(gulpif(!global.isWatching, stripDebug()))
    .pipe(gulpif(!global.isWatching, uglify({ mangle: false, compress: false})))
    .pipe(gulpif(global.cdnCompress, gzip({ append: false })))
    .pipe(gulp.dest(options.destination))
    .pipe(notify(function () {
      return `Build of ${options.output} finished in ${(Date.now() - startTime)}ms`
    }));
}

// ############## STYLE ################################################################################################

function watchStyluses(files) {
  files.forEach((file) => {
    watchCss(file.name, file.src, file.globs);
    executeStylus(file.name, file.src, Date.now()) ;
  });
}

function watchCss(name, src, watch) {
  gulp.watch(watch, function rebuild_styles(done) {
    executeStylus(name, src, Date.now());
    done();
  });
}

function executeStylus(name, src, startTime) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'compress': false
    }).on('error',function(error){
      log(colors.red(error.message));

      if (global.stopOnError) {
        process.exit();
      }
    }))
    .pipe(sourcemaps.write())
    // Gulp will minify CSS using cleanCSS when 'compile' task is called
    .pipe(gulpif(!global.isWatching, cleanCSS()))
    .pipe(gulpif(global.cdnCompress, gzip({ append: false })))
    .pipe(gulp.dest("../css/"))
    // For some reason in gulp 4.0.0 a file timestamp is not updated and servers doesn't send updated version of the file.
    // We change file timestamp manually with touch() script
    .pipe(touch({stopOnError: global.stopOnError}))
    .pipe(notify(function () {
      return `Stylus build of ${name} finished in ${(Date.now() - startTime)}ms`
    }));
}

// ############## TASKS ################################################################################################

gulp.task("watch", function(done) {
  global.isWatching = true;

  watchStyluses(stylusFiles);
  createBundles(jsFiles);

  done();
});

gulp.task("compile", function(done) {
  global.cdnCompress = true;
  global.stopOnError = true;

  stylusFiles.forEach((file) => {
    executeStylus(file.name, file.src, Date.now());
  });

  createBundles(jsFiles);

  done();
});

