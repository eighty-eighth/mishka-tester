"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var server = require("browser-sync").create();
var reload = server.reload;

var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
// var pump = require("pump");

var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var newer = require("gulp-newer");

// var paths = ["img/**/*.jpg"].concat(["img/bb-logo-adaptive.svg", "img/logo-adaptive.svg", "img/logo-htmlacademy.svg", "img/logo-footer.svg"]);

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function() {
  return gulp.src("img/icon-*.svg")
  .pipe(plumber())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("*.html")
  .pipe(newer("build"))
  .pipe(posthtml([
    include()
  ]))
  // .pipe(htmlmin({
  //   collapseWhitespace: true
  // }))
  .pipe(gulp.dest("build"))
  .pipe(server.stream());
});

gulp.task("compress", function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"));
});

// gulp.task("htmlminify", function() {
//   return gulp.src("index.html")
//   .pipe(htmlmin({
//     collapseWhitespace: true
//   }))
//   // .pipe(rename("index.min.html"))
//   // .pipe(rename("style.min.css"))
//   .pipe(gulp.dest("build"))
//   .pipe(server.stream());
// });

// var paths = {
//   kaka:["img/**/*.jpg"],
//   sasa:["img/bb-logo-adaptive.svg", "img/logo-adaptive.svg", "img/logo-htmlacademy.svg"],
//   kek: [kaka.concat(sasa)]
// };

gulp.task("images", function() {
  return gulp.src("img/**/*.{jpg,png}")
  // return gulp.src({paths.sasa, paths.kaka])
  // return gulp.src(paths)
  .pipe(newer("build/img"))
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    // imagemin.svgo({
    //   plugins: [{
    //     minifyStyles: false
    //   }, {
    //     removeHiddenElems: false
    //   }, {
    //     mergePaths: false
    //   }, {
    //     convertStyleToAttrs: false
    //   }, {
    //     moveElemsAttrsToGroup: false
    //   }, {
    //     moveGroupAttrsToElems: false
    //   }, {
    //     removeEmptyAttrs: false
    //   }, {
    //     removeEmptyText: false
    //   }, {
    //     removeUnusedNS: false
    //   }, {
    //     removeEditorsNSData: false
    //   }, {
    //     convertTransform: false
    //   }, {
    //     removeEmptyContainers: false
    //   }, {
    //     removeUnknownsAndDefaults: false
    //   }, {
    //     removeNonInheritableGroupAttrs: false
    //   }, {
    //     collapseGroups: false
    //   }, {
    //     convertShapeToPath: false
    //   }]
    // })
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  // return gulp.src("img/**/*.{jpg,png}")
  return gulp.src("img/*.jpg")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("img"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss, sass}", ["style"]);
  // gulp.watch("sass/**/*.{scss, sass}", ["style", reload]);
  gulp.watch("*.html", ["html"]);
  // gulp.watch("js/*.js", ["compress", reload]);
  // gulp.watch("img/*").on("change", server.reload);
  gulp.watch("img/icon-*.svg", ["sprite", reload]);
  // gulp.watch("img/**/*", ["images", reload]);
  // gulp.watch("img/*", ["sprite"]).on("change", reload);
  // gulp.watch("*.html").on("change", server.reload);
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/*.webp",
    "img/logo-*.svg"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "images",
    "sprite",
    "html",
    "style",
    "compress",
    done);
});
