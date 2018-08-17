"use strict";

const $ = require("../../config.js");
const sPath = $.page_assets;
const dPath = $.page_dest;

const htmlFnc = function() {
	console.log("------------------ Building HTML ------------------");
	// console.log("Config - ", $);
	// console.log(`Source Files: ${sPath}`);
	// console.log(`Dest Folder: ${dPath}`);

	$.gulp.src(sPath).pipe($.gulp.dest(dPath));
};

$.gulp.task("html", "Copy any HTML pages into the build folder", [], htmlFnc);
