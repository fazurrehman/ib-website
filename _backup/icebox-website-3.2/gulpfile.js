// Initialize modules
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const browsersync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const twig = require('gulp-twig');
const cache = require('gulp-cache');
const prettyHtml = require('gulp-pretty-html');

// paths
const paths = {
  root: {
    css: 'css/',
    js: 'js/',
    template: 'templates/',
    dist: './dist',
    distEmail: 'dist/emailers/templates/',
    bootstrap: 'node_modules/bootstrap',

    assetsJS: 'assets/public/js/',
    assetsVendor: 'assets/public/vendor/',
    assetsJS2020: 'assets/public-2020/js/',
    distJs: 'dist/js/',
    distCss: 'dist/css/',

    // development path (faizur)
    developmentJs: 'js/development/',
    developmentJsDist: 'dist/js/development/',
  },
  lib: {
    jquery: 'node_modules/jquery/dist/jquery.js', //@version 3.5.0 downgraded to 3.4.1
    popperJs: 'node_modules/popper.js/dist/umd/popper.js', //@version 1.15.0
    bootstrapUtils: 'node_modules/bootstrap/js/dist/util.js',
    bootstrapDropdown: 'node_modules/bootstrap/js/dist/dropdown.js',
    bootstrapModal: 'node_modules/bootstrap/js/dist/modal.js',
    bootstrapTabs: 'node_modules/bootstrap/js/dist/tab.js',
    bootstrapCollapse: 'node_modules/bootstrap/js/dist/collapse.js',
    bootstrapTooltip: 'node_modules/bootstrap/js/dist/tooltip.js',
    selectJs: 'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
    imageLoaded: 'node_modules/imagesloaded/imagesloaded.pkgd.js',
    lazysizes: 'node_modules/lazysizes/lazysizes-umd.js',
    // lazysizesUnveilhooks:
    //   'node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js',
    owlCarousel: 'node_modules/owl.carousel/dist/owl.carousel.js',
    StickyJs: 'node_modules/sticky-js/dist/sticky.min.js',
    intlTelInput: 'node_modules/intl-tel-input/build/js/', //@version 16.0.0
    counRegSel: 'node_modules/country-region-selector/dist/jquery.crs.js', //@version 0.5.0
    slimScroll: 'node_modules/jquery-slimscroll/jquery.slimscroll.js', //@version 1.3.8
    fancyBox: 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js', //@version 3.5.7
    lightSlider: 'node_modules/lightslider/dist/js/lightslider.js', //@version 1.1.6
    jQuerySteps: 'node_modules/jquery-steps/build/jquery.steps.js', //@version 1.1.0
  },
};

// browsersync
gulp.task('browser-sync', () => {
  browsersync.init({
    server: {
      baseDir: './dist/',
      proxy: 'localhost:3001',
    },
    notify: false,
  });
});

// css
gulp.task('css', () => {
  return gulp
    .src([
      // this css will be replace with new cssv2 in future
      paths.root.css + 'style.scss',
      // new css v2
      // paths.root.css + 'css_v2/default.scss',
      // paths.root.css + 'css_v2/app-icebox.scss',
    ])
    .pipe(sass())
    .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message));
      notifier.notify({
        title: 'Sass Error',
        message: error.message,
      });
    })
    .pipe(postcss([autoprefixer({
          grid: true,
        }), cssnano()]))
    // .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.root.distCss))
    .pipe(browsersync.stream());
});


// twig
gulp.task('twig', () => {
  return (
    gulp
      .src(paths.root.template + 'pages/**/*.twig')
      .pipe(twig())
      .on('error', (error) => {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Twig complition faild',
          message: error.message,
        });
      })
      // .pipe(prettyHtml())
      .pipe(gulp.dest('./dist'))
      .pipe(
        browsersync.reload({
          stream: true,
        })
      )
  );
});

// twig
gulp.task('twig-emailer', () => {
  return (
    gulp
      .src(paths.root.template + 'emailers/**/*.twig')
      .pipe(twig())
      .on('error', (error) => {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Twig complition faild',
          message: error.message,
        });
      })
      // .pipe(prettyHtml())
      .pipe(gulp.dest('./dist/templates/emailers'))
      .pipe(
        browsersync.reload({
          stream: true,
        })
      )
  );
});

gulp.task('js-homepage', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapDropdown,
        paths.lib.bootstrapModal,
        paths.lib.bootstrapCollapse,
        paths.lib.bootstrapTabs,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        paths.lib.lazysizes,
        // paths.lib.lazysizesUnveilhooks,
        paths.lib.owlCarousel,
        paths.lib.fancyBox,
        paths.lib.intlTelInput + 'intlTelInput.js',
        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        paths.root.js + 'homepage.js',
        paths.root.assetsJS2020 + 'functions.js',
        paths.root.assetsJS + 'main.js',
        paths.root.assetsJS + 'cart-2020.js',
        paths.root.assetsJS2020 + 'jquery.editable.min.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('homepage.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Homepage js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Homepage js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

gulp.task('js-login', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapDropdown,
        paths.lib.bootstrapModal,
        paths.lib.bootstrapCollapse,
        paths.lib.bootstrapTabs,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        //paths.lib.lazysizes,
        paths.lib.owlCarousel,
        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        paths.root.js + 'login-signup.js',
        paths.root.assetsJS2020 + 'functions.js',
        paths.root.assetsJS2020 + 'account-functions.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('login.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Homepage js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Homepage js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

gulp.task('js-categories', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapDropdown,
        paths.lib.bootstrapModal,
        paths.lib.bootstrapCollapse,
        paths.lib.bootstrapTabs,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        paths.lib.slimScroll,
        paths.lib.fancyBox,
        paths.lib.counRegSel,
        paths.root.assetsJS + 'jquery.mCustomScrollbar.js',
        //paths.lib.lazysizes,
        paths.lib.owlCarousel,

        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        paths.root.js + 'categories.js',

        paths.root.assetsJS + 'main.js',
        paths.root.assetsJS + 'cart-2020.js',
        paths.root.assetsJS2020 + 'category-functions.js',
        paths.root.assetsJS2020 + 'account-functions.js',
        paths.root.assetsJS2020 + 'functions.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('categories.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Categories js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Categories js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

gulp.task('js-product', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapDropdown,
        paths.lib.bootstrapModal,
        paths.lib.bootstrapCollapse,
        paths.lib.bootstrapTabs,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        //paths.lib.lazysizes,
        paths.lib.owlCarousel,
        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        paths.root.js + 'product.js',
        paths.root.assetsJS2020 + 'functions.js',
        paths.root.assetsVendor + 'formatter/hashtable.js',
        paths.root.assetsVendor + 'formatter/number-format.js',
        paths.root.assetsJS + 'main.js',
        paths.root.assetsJS + 'cart-2020.js',
        paths.root.assetsJS2020 + 'lightslider.min.js',
        paths.root.assetsJS2020 + 'lightslider.functions.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('product.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Products js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Products js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

gulp.task('js-staticpages', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapDropdown,
        paths.lib.bootstrapModal,
        paths.lib.bootstrapCollapse,
        paths.lib.bootstrapTabs,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        //paths.lib.lazysizes,
        paths.lib.fancyBox,
        paths.lib.owlCarousel,
        paths.lib.jQuerySteps,

        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        paths.root.js + 'staticpages.js',
        paths.root.assetsJS2020 + 'functions.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('staticpages.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Static pages js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Static pages js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

/**
 * This function is temporary purpose for side by side
 * development new feature, by Faizur
 */
gulp.task('js-development', () => {
  return (
    gulp
      .src([
        paths.lib.jquery,
        paths.lib.popperJs,
        paths.lib.bootstrapUtils,
        paths.lib.bootstrapTooltip,
        paths.lib.imageLoaded,
        paths.lib.intlTelInput + 'intlTelInput.js',
        
        paths.root.js + 'menu.js',
        paths.root.js + 'common.js',
        // Development JS
        paths.root.js + 'checkout.js',
      ])
      //.pipe(sourcemaps.init())
      .pipe(concat('checkout.min.js'))
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Static pages js concat compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.distJs))
      .pipe(browsersync.stream())
      //.pipe(rename("homepage.min.js"))
      .pipe(
        uglify({
          compress: {
            global_defs: {
              DEBUG: false,
            },
          },
        })
      )
      .on('error', function (error) {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Static pages js minify compilation error',
          message: error.message,
        });
      })
      .pipe(gulp.dest(paths.root.developmentJsDist))
      .pipe(browsersync.stream())
  );
  //.pipe(browserSync.stream({match: 'KMC-election/homepage/js/*.js'}));
});

gulp.task('watch', () => {
  gulp.watch([paths.root.css + '***/**/*'], gulp.series(['css']));
  gulp.watch(
    [paths.root.template + '**/*.twig'],
    gulp.series('twig', 'twig-emailer')
  );
  gulp.watch(
    paths.root.js + '**/*.js',
    gulp.series([
      'js-homepage',
      // 'js-login',
      // 'js-categories',
      // 'js-product',
      // 'js-staticpages',
      // 'js-development', // development Js
    ])
  );
  gulp.watch([
    '**/*.html',
    paths.root.template + '**/*.twig',
    paths.root.css + ['**/*.sass', '**/*.scss'],
    paths.root.js + ['**/*.js'],
  ]);
});

gulp.task(
  'default',
  gulp.series(gulp.parallel(['browser-sync', 'twig', 'watch']))
);

// emailer templates copying in dist folder
gulp.task('copy-email', () => {
  return gulp
    .src(['templates/emailers/exports/*.html'])
    .pipe(gulp.dest(paths.root.distEmail));
});

gulp.task(
  'js-build',
  gulp.series([
    gulp.parallel([
      'js-homepage',
      'js-login',
      'js-categories',
      'js-product',
      'js-staticpages',
    ]),
  ])
);
