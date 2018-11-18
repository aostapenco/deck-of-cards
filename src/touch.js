'use strict';

const fs = require('graceful-fs');
const map = require('map-stream');
const log = require('fancy-log');
const colors = require('ansi-colors');

// For some reason in gulp 4.0.0 a file timestamp is not updated and servers doesn't send updated version of the file.
// We change file timestamp manually with touch() script
// This is updated version of gulp-touch, because of deprecation warning
module.exports = function(options) {
  return map(function(file, cb) {
    if (file.isNull()) { return cb(null, file); }

    // Update file modification and access time
    fs.utimes(file.path, new Date(), new Date(), (error) => {
      if (error) {
        log(colors.red(error));
      }

      cb(null, file);
    });
  });
};