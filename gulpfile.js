const { series, parallel, src, dest, watch } = require('gulp');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const download = require('gulp-download2');
const gunzip = require('gulp-gunzip');

function downloadMaxmindDb() {
  var dbfile = 'https://raw.githubusercontent.com/wp-statistics/GeoLite2-City/master/GeoLite2-City.mmdb.gz';
  return download(dbfile,
    {
      errorCallback: function (code) {
        console.error('Un oh, not able download the geolocation db file!');
        process.exit(1);
      }
    })
    .pipe(gunzip())
    .pipe(dest('./dist/maxmind'));
}

function buildCss() {
  return src('./src/assets/css/*.css')
    .pipe(postcss())
    .pipe(dest('./public/css'));
}

function buildJs() {
  return src('./src/assets/js/*.js')
    .pipe(uglify())
    .pipe(dest('./public/js'));
}

function watcher() {
  watch('./src/assets/css/*.css', buildCss);
  watch('./src/views/*.pug', buildCss);
  watch('./src/assets/js/*.js', buildJs);
}

exports.default = parallel(buildCss, buildJs);
exports.geodata = series(downloadMaxmindDb);
exports.watch = watcher;
