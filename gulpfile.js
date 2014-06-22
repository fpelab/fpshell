//initialize all of our variables
var app, header, base, concat, connect, directory, gulp, gutil, hostname, http, lr, open, path, refresh, sass, server, uglify, imagemin, cache, minifyCSS, clean;

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
refresh     = require('gulp-livereload');
open        = require('gulp-open');
connect     = require('connect');
http        = require('http');
path        = require('path');
lr          = require('tiny-lr');
imagemin    = require('gulp-imagemin');
cache       = require('gulp-cache');
minifyCSS   = require('gulp-minify-css');
clean       = require('gulp-clean');
header      = require('gulp-header');

//start our server
server = lr();

var banner = ['/**',
  ' * @Fedorov Pavel Elaboration 2014',
  ' * @link http://fpelab.com',
  ' * @git https://github.com/fpelab',
  ' * Copyright (c) 2014 Fedorov Pavel The MIT License (MIT)',
  ' */',
  ''].join('\n');

//this starts the webserver so we can run localhost:3000 and sync with the LiveReload plugin
gulp.task('webserver', function() {
    //the port to run our local webserver on
    var port = 3000;
    hostname = null;
    //the directory to our working environment
    base = path.resolve('app');
    directory = path.resolve('app');
    //start up the server
    app = connect().use(connect["static"](base)).use(connect.directory(directory));
    http.createServer(app).listen(port, hostname);
});

//connecting to the live reload plugin, basically notifies the browser to refresh when we want it to
gulp.task('livereload', function() {
    //this is the default port, you shouldn't need to edit it
    server.listen(35729, function(err) {
        if (err != null) {
            return console.log(err);
        }
    });
});

//compressing images & handle SVG files
gulp.task('images-deploy', function() {
    gulp.src(['app/img/*.jpg', 'app/img/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('app/images'));
    //move over any SVG files
    gulp.src('app/img/*.svg')
        .pipe(gulp.dest('app/images'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['src/js/src/*.js', 'src/js/_app.js'])
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //catch errors
               .on('error', gutil.log)
               //compress :D
               .pipe(header(banner))
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('app/js'))
               //notify LiveReload to refresh
               .pipe(refresh(server));
});

//compiling our min Javascripts
gulp.task('scriptsMin', function() {
    //this is where our dev JS scripts are
    return gulp.src(['src/js/src/*.js', 'src/js/_app.js'])
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.min.js'))
               //catch errors
               .on('error', gutil.log)
               //compress :D
               .pipe(uglify())
               .pipe(header(banner))
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('app/js'))
               //notify LiveReload to refresh
               .pipe(refresh(server));
});



//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('src/scss/style.scss')
                //include SCSS and list every "include" folder
               .pipe(sass({
                      includePaths: [
                          'src/scss/'
                      ]
               }))
               //catch errors
               .on('error', gutil.log)
               //the final filename of our combined css file
               .pipe(concat('style.css'))
               .pipe(header(banner))
               //where to save our final, compressed css file
               .pipe(gulp.dest('app/css'))
               //notify LiveReload to refresh
               .pipe(refresh(server));
});

//basically just keeping an eye on all HTML files
gulp.task('html', function() {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.html')
        .pipe(refresh(server))
       //catch errors
       .on('error', gutil.log);
});

//migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('src/styles/ie.css')
        .pipe(gulp.dest('dist/styles'));

    //move over any GIF files
    gulp.src('src/images/*.gif')
        .pipe(gulp.dest('dist/images'));

    //move over htaccess
    gulp.src('src/.htaccess')
        .pipe(gulp.dest('dist'));
});

// open
gulp.task("open", function(){
  var options = {
    url: "http://localhost:3000"
  };
  gulp.src("app/index.html")
  .pipe(open("", options));
});

//CLEAN
gulp.task('clean', function () {
  return gulp.src('*', {read: false})
    .pipe(clean());
});

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up livereload
//  compress all scripts and SCSS files
gulp.task('default', ['webserver', 'livereload', 'open', 'scripts', 'scriptsMin', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('src/js/**', ['scripts','scriptsMin']);
    gulp.watch('src/scss/**', ['styles']);
    gulp.watch('app/*.html', ['html']);
});