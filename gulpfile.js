const { src, dest } = require('gulp');
const rename = require('gulp-rename');

const instructions = process.argv

const currentName = ''
const currentFile = `./src/request/config${currentName}.js`
const reConfig = function() {
    src(currentFile).pipe(rename('config.js')).pipe(dest('./request'))
}
exports.reConfig = reConfig;
