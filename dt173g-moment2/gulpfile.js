const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const concatCSS = require("gulp-concat-css");
const cleanCSS = require('gulp-clean-css');

//Search Paths

const files = {
    htmlPath: "src/**/*.html", 
    cssPath: "src/**/*.css",
    jsPath:"src/**/*.js" 
}

//Copy HTML-files
 function copyHTML () {
     return src(files.htmlPath)
        .pipe(dest('pub')
    );
 }

 //Concat and minify js files  
 function jsTask(){
     return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js')
        );
 }
 //Concat and minify CSS files
 function cssTask(){
    return src(files.cssPath)
       .pipe(concatCSS('styles.css'))
       .pipe(cleanCSS())
       .pipe(dest('pub/css')
       );
}


 //Watcher 
 function watchTask(){
     watch([files.htmlPath, files.jsPath, files.cssPath],
        
        parallel(copyHTML, jsTask, cssTask));
 }

 //Default Task
 exports.default = series(
    parallel(copyHTML, jsTask, cssTask),
    watchTask
 );