const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const server = require("browser-sync").create()
const {watch,series} = require("gulp")
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass')
const paths = {
    scripts:{
        src: "./",
        dest: "./build/"
    }
}
async function includeHTML(){
    return gulp.src([
        "*.html"
    ])
    .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
    }))
    .pipe(gulp.dest(paths.scripts.dest))
}
async function reload(){
    server.reload()
}
async function compileSass(){
    gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./assets/css'))
}
async function copyAssets(){
    gulp.src([
        'assets/**/*'
    ])
    .pipe(gulp.dest(paths.scripts.dest))
}
async function copyJs(){
    gulp.src([
        'js/**/*'
    ])
    .pipe(gulp.dest(paths.scripts.dest))
}
async function buildAndReload(){
    await includeHTML()
    await copyAssets()
    await copyJs()
    reload()
}
exports.includeHTML = includeHTML
exports.default = async function(){
    server.init({
        server: {
            baseDir: paths.scripts.dest
        }
    })
    buildAndReload()
    watch('./sass/**/*.sass',series(compileSass))
    watch([
        '*.html',
        'assets/**/*'
    ],series(buildAndReload))
}