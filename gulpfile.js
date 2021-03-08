// Initialize modules
const gulp = require('gulp');
const data = require('gulp-data');
const fs = require('fs');
const merge = require('gulp-merge-json');
const sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const browsersync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const twig = require('gulp-twig');
const beautify = require('gulp-beautify');

const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');



gulp.task('svgstore', function() {
  return gulp
    .src('icons/*.svg')
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(svgstore({
      prefix: 'icon-',
      inlineSvg: true
  }))
    .pipe(gulp.dest('dist/icons/'));
});


// paths
const paths = {
  root: {
    css: 'css/',
    js: 'js/',
    template: 'templates/',
    
    postCss: 'sass/',
    twigTemplates: 'template/',
    data: 'template/data/',

    dist: './dist',
    distEmail: 'dist/emailers/templates/',
    bootstrap: 'node_modules/bootstrap',

    assetsJS: 'assets/public/js/',
    assetsVendor: 'assets/public/vendor/',
    assetsJS2020: 'assets/public-2020/js/',
    distJs: 'dist/js/',
    distCss: 'dist/css/',
  },

  //old
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
  
  libraries: {
    jquery: 'node_modules/jquery/dist/jquery.js',
    accordionJS: 'node_modules/accordionjs/accordion.js',
    imageLoaded: 'node_modules/imagesloaded/imagesloaded.pkgd.js',
    lazysizes: 'node_modules/vanilla-lazyload/dist/lazyload.js',
    flickity: 'node_modules/flickity/dist/flickity.pkgd.js'
  }
  
};

// browsersync
gulp.task('browser-sync', () => {
  browsersync.init({
    server: {
      baseDir: './dist/',
      proxy: 'localhost:3001',
    },
    browser: "google chrome",
    notify: false,
  });
});

// css
gulp.task('css', () => {
  return gulp
    .src([
      // this css will be replace with new sass in future
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


// Gulp setup for icebox newer version 
// ======================================
gulp.task('sass', () => {
  return gulp
    // default: varibals, bootstrap
    // app-icebox for whole icon page
    .src([paths.root.postCss + 'default.scss', paths.root.postCss + 'app-icebox.scss']) 
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass())
    .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message));
      notifier.notify({
        title: 'Sass Error',
        message: error.message,
      });
    })
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
        }),
        cssnano()
      ])
    )
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({ level: { 1: { restructureRules: false } } }))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.root.distCss))
    .pipe(browsersync.stream());
});

// twig
gulp.task('data', () => {
  return gulp
    .src(paths.root.data + '**/*.json')
    .pipe(merge({ fileName: 'data.json' }))
    .pipe(gulp.dest('dist/temp'));
});

gulp.task('twigTemplate', () => {
  return (
    gulp
      .src(paths.root.twigTemplates + 'pages/**/*.twig')
      .pipe(
        data(function (file) {
          return JSON.parse(fs.readFileSync(paths.root.data + 'data.json'));
        })
      )
      .pipe(twig())
      .on('error', (error) => {
        gutil.log(gutil.colors.red(error.message));
        notifier.notify({
          title: 'Twig complition faild',
          message: error.message,
        });
      })
      .pipe(beautify.html({ indent_size: 2 }))
      .pipe(gulp.dest(paths.root.dist))
      .pipe(
        browsersync.reload({
          stream: true,
        })
      )
  );
});


gulp.task('js-productpage-v2', () => {
  return gulp
    .src([
        paths.libraries.jquery,
        paths.libraries.imageLoaded,
        paths.libraries.accordionJS,
        paths.libraries.lazysizes,
        paths.libraries.flickity,
        paths.root.js + 'productpage-v2.js',
    ])
    .pipe(concat('productpage-v2.min.js'))
    .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message));
      notifier.notify({
        title: 'Homepage js concat compilation error',
        message: error.message,
      });
    })
    .pipe(
      uglify({
        compress: {
          global_defs: {
            DEBUG: false,
          },
        },
      })
    )
    .pipe(gulp.dest(paths.root.distJs))
    .pipe(browsersync.stream());
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
  gulp.watch([paths.root.css + '**/*'], gulp.series(['css']));
  gulp.watch([paths.root.postCss + '**/*'], gulp.series(['sass']));
  gulp.watch([paths.root.template + '**/*.twig'], gulp.series('twig', 'twig-emailer'));
  gulp.watch(
    [paths.root.twigTemplates + '**/*.twig', paths.root.data + '**/*.json'],
    gulp.series(['twigTemplate', 'data'])
  );
  gulp.watch(
    paths.root.js + '**/*.js',
    gulp.series([
      'js-homepage',
    ])
  );
  gulp.watch([
    '**/*.html',
    paths.root.template + '**/*.twig',
    paths.root.twigTemplates + '**/*.twig',
    paths.root.css + ['**/*.sass', '**/*.scss'],
    paths.root.postCss + ['**/*.sass', '**/*.scss'],
    paths.root.js + ['**/*.js'],
    
  ]);
});

gulp.task(
  'default',
  gulp.series(gulp.parallel(['browser-sync', 'twig', 'watch', 'svgstore']))
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
