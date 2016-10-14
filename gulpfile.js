"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");
var cleanCss = require("gulp-clean-css");
var less = require("gulp-less");
var concat = require("gulp-concat");

var config = {
	rootUrl: "http://localhost",
	port: 3000,
	paths: {
		html: "./src/*.html",
		less: "./src/less/*.less",
		dist: "./dist"
	}
};

gulp.task("html", function(){
	return gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});

gulp.task("connect", function(){
	connect.server({
		root: ["dist"],
		port: config.port,
		base: config.rootUrl,
		livereload: true
	})
})

gulp.task("open", ["connect"], function(){
	gulp.src("dist/index.html")
	.pipe(open({ uri: config.rootUrl + ":" + config.port + "/" }));
});

gulp.task("watch", function(){
	gulp.watch(config.paths.html, ["html"]);
	gulp.watch(config.paths.less, ["less"]);
});

gulp.task("less", function(){
	return gulp.src(config.paths.less)
	.pipe(less())
	.pipe(concat("bundle.css"))
	.pipe(gulp.dest(config.paths.dist + "/css"))
	.pipe(connect.reload());
})

gulp.task("default", ["html", "less", "open", "watch"]);