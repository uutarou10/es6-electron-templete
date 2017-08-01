const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const electron = require('electron-connect').server.create()

gulp.task('compile', () => {
  console.log($.sourcemaps)
  return gulp.src('src/**/*.{js,jsx}')
  .pipe($.sourcemaps.init())
  .pipe($.babel({
    presets: ['es2015'],
    plugins: [
      ['transform-react-jsx']
    ]
  }))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('public'))
})

gulp.task('serve', () => {
  electron.start()

  // Recompile when updated change src files
  gulp.src('src/**/*.{js,jsx}', ['compile'])

  // Reload electron when updated resouce of MainProcess
  gulp.watch(['public/main.js', 'public/main/**/*.js'], electron.restart)

  // Reload browser when updated resouce of RendererProcess
  gulp.watch(['public/styles/**/*.css', 'public/renderer/**/*.{html,js}'], electron.reload)
})
