"use strict";

const $ = require("../config.js");

const lintSrc = function() {
	console.log("Checking Source Code for Lint");
	$.fs.ensureDirSync("reports");
	return $.gulp.src([$.script_assets])
	.pipe($.eslint({config: ".eslintrc"}))
	.pipe($.eslint.format("html", $.fs.createWriteStream("reports/LintReport_Src.html")))
	.pipe($.notify({ message: "LINT task complete, saving report in \"reports/LintReport_Src.html\".", onLast:true }));
};

$.gulp.task(
	"lint",
	"runs ESLint on all the source modules",
	[],
	lintSrc
);
