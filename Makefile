bootstrap:
	cd src && \
npm install \
ansi-colors@^1.1.0 \
babel-core@^6.0.0 \
babel-loader@^6.0.0 \
babel-preset-env@^1.6.1 \
babel-preset-es2015@^6.0.0 \
babel-preset-react@^6.0.0 \
babel-preset-stage-0@^6.0.0 \
babel-preset-stage-2@^6.0.0 \
babel-polyfill@^6.0.0 \
babel-plugin-lodash@3.2.11 \
babel-plugin-object-assign@1.2.1 \
babel-runtime@5.8.20 \
babelify@6.2.0 \
browserify@14.3.0 \
create-react-class@15.5.3 \
gulp@3.9.1 \
gulp-clean-css@2.0.10 \
gulp-gzip@1.4.0 \
gulp-if@2.0.1 \
gulp-notify@2.2.0 \
gulp-rename \
gulp-replace-task@0.11.0 \
gulp-sourcemaps@1.5.2 \
gulp-stylus@2.0.5 \
gulp-uglify@^2.0.0 \
gulp-strip-debug@1.1.0 \
gulp-watch@4.3.5 \
jquery@2.1.4 \
lodash@3.10.1 \
map-stream@^0.0.7 \
plugin-error@^1.0.1 \
react@15.5.4 \
react-dom@15.5.4 \
react-router@1.0.2 \
vinyl-buffer@^1.0.1 \
vinyl-source-stream@^2.0.0 \
watchify@3.9.0 \
webpack@3.11.0 \

#popper.js@^1.14.3
 # // "bootstrap": "^4.1.3",
#acorn@^6.0.0

run-client:
	cd src && \
		gulp watch



