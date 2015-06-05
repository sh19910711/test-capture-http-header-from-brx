gulp = require("gulp")

gulp.task "manifest.json", ->
  gulp.src ["manifest.json"]
    .pipe gulp.dest("dist/")

gulp.task "coffee", ->
  coffee = require("gulp-coffee")
  gulp.src ["coffee/**/*.coffee"]
    .pipe coffee()
    .pipe gulp.dest("dist/js/")

gulp.task "build", [
  "manifest.json"
  "coffee"
]

gulp.task "build/watch", ->
  gulp.watch ["*.json", "coffee/**/*.coffee"], ["build"]
