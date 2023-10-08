const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const eslint = require("gulp-eslint");
const tinypng = require("gulp-tinypng-compress");
const newer = require("gulp-newer");
const yargs = require("yargs");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const Fiber = require("fibers"); // to speed up sass compilation for dart sass
const webpack = require("webpack");
const webpackconfig = require("./webpack.production.config.js");
const webpackstream = require("webpack-stream");
const replace = require("gulp-replace");
var deleteUnusedImages = require("gulp-delete-unused-images"); // Uncomment this and its function below for deleting unused images

const PRODUCTION = yargs.argv.prod;

const fractal = require("./fractal.config");

const logger = fractal.cli.console;

// Delete unused images
export const delImg = () => {
  return gulp
    .src(["./src/assets/images/**/*.jpg", "./src/styles/**/*.hbs"])
    .pipe(plumber())
    .pipe(
      deleteUnusedImages({
        log: true,
        delete: true
      })
    )
    .pipe(gulp.dest("./deploy"));
};

// Fractal watch task for dev
gulp.task("fractal:start", function () {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
    logger.success(`Fractal server is now running at ${server.urls.sync.external}`);
  });
});

// Fractal build task for production
gulp.task("fractal:build", function () {
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) => logger.update(`Exported ${completed} of ${total} items`, "info"));
  builder.on("error", (err) => logger.error(err.message));
  return builder.start().then(() => {
    logger.success("Fractal build completed!");
  });
});

// Browsersync server to watch and reload
export const browserSync = (done) => {
  browsersync.init({
    server: "./",
    port: 4000
  });
  done();
};

export const browserSyncReload = (done) => {
  browsersync.reload();
  done();
};

// 1. Remove unnecessary files folders from build directory
export const cleanForProd = () => del(["build/assets.html", "build/components.html", "build/docs.html", "build/components/detail", "build/components/raw", "build/components/render", "build/themes"]);

// 2. Move components/preview/html files to html folder
var htmlFilesToMove = ["./build/components/preview/**/*.*"];

export const moveHtmlFiles = () => {
  return gulp.src(htmlFilesToMove, { base: "./build/components/preview/" }).pipe(gulp.dest("./html"));
};

// 3.  Move assets etc folders to html folder
var otherFilesToMove = ["./build/assets/**/*.*", "./build/js/**/*.*", "./build/styles/**/*.*", "./build/vendors/**/*.*"];

export const moveOtherFiles = () => {
  return gulp.src(otherFilesToMove, { base: "./build/" }).pipe(gulp.dest("./html"));
};

// 4. Inside html, replace ../../ paths in html to ./ path for correctly referencing images/assets etc.
gulp.task("inject-base-href", function () {
  return gulp
    .src("html/*.html")
    .pipe(
      replace('"../../', function (match) {
        console.log("Replace called on", match);
        return '"./';
      })
    )
    .pipe(gulp.dest("html"));
});

// Delete public folder
export const clean = () => del(["build", "html"]);

// Images: optimize
export const images = () => {
  return gulp
    .src("./src/assets/**/*")
    .pipe(newer("./static/assets"))
    .pipe(
      tinypng({
        key: "QDL8BgxzmG6GLYtBcf5cXq0zRmqc4sPr",
        sigFile: "images/.tinypng-sigs",
        log: true,
        ignore: "flaticon.*"
      })
    )
    .pipe(gulp.dest("./static/assets/"));
};

// CSS task
export const css = () => {
  return (
    gulp
      .src("./src/styles/**/*.scss")
      .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
      .pipe(plumber())
      .pipe(
        gulpif(
          !PRODUCTION,
          sass({
            includePaths: ["./node_modules"],
            fiber: Fiber,
            outputStyle: "expanded", // set to 'compact' for sourcemaps to work.
            indentType: "tab",
            indentWidth: 1
          }).on("error", sass.logError)
        )
      )
      .pipe(
        gulpif(
          PRODUCTION,
          sass({
            includePaths: ["./node_modules"],
            fiber: Fiber,
            outputStyle: "expanded", // Should be for expanded for theme packages.
            indentType: "tab",
            indentWidth: 1
          }).on("error", sass.logError)
        )
      )
      // .pipe(gulpif(PRODUCTION, rename({ suffix: '.min' }))) //use it for PRODUCTION only
      .pipe(postcss([autoprefixer(["last 3 versions"]), cssnano()]))
      .pipe(gulpif(!PRODUCTION, sourcemaps.write(".")))
      .pipe(gulp.dest("./static/styles/"))
      .pipe(browsersync.stream())
  );
};

// Lint scripts
export const scriptsLint = () => {
  return gulp.src(["./src/js/**/*", "./gulpfile.babel.js"]).pipe(plumber()).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
};

// Transpile, concatenate and minify scripts
export const scripts = () => {
  return (
    gulp
      .src(["./src/js/**/*", "./src/styles/components/**/*.js"])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig), webpack)
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("./static/js/"))
      .pipe(browsersync.stream())
  );
};

// Copy vendors folder as is to the public
export const copy = () => {
  return gulp.src(["src/**/*", "!src/{assets,docs,js,styles}", "!src/{assets,docs,js,styles}/**/*"]).pipe(gulp.dest("static"));
};

// Watch files
function watchFiles() {
  gulp.watch("./src/styles/**/*.scss", { interval: 2250 }, css);
  gulp.watch(["./src/js/**/*", "./src/styles/components/**/*.js"], { interval: 2250 }, gulp.series(scriptsLint, scripts));
  gulp.watch(["./src/**/*", "!src/{assets,docs,js,styles}", "!src/{assets,docs,js,styles}/**/*"], { interval: 2250 }, gulp.series(copy, browserSyncReload));
  gulp.watch(["**/*.php", "**/*.hbs", "**/*.html"], { interval: 2250 }, browserSyncReload);
  gulp.watch("./src/assets/**/*", { interval: 2250 }, images);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, images, copy, js), "fractal:build", cleanForProd, moveHtmlFiles, moveOtherFiles, "inject-base-href");
const watch = gulp.parallel(watchFiles, browserSync);
const dev = gulp.series(clean, gulp.parallel(css, images, copy, js), "fractal:start", watchFiles);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.delImg = delImg;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.dev = dev;
exports.htmlFilesToMove = moveHtmlFiles;
exports.otherFilesToMove = moveOtherFiles;
