"use strict";

const $ = require("../../config.js");
const iPath = $.image_assets;
const idPath = $.image_dest;

const sPath = $.root_assets;
const dPath = $.page_dest;

const miscFnc = function() {
	console.log(
		"------------------ Building Misc Assets for the root ------------------"
	);
	console.log(`Source Files: ${sPath}`);
	console.log(`Dest Folder: ${dPath}`);

	$.gulp.src(sPath).pipe($.gulp.dest(dPath));

	$.gulp.src(iPath).pipe($.gulp.dest(idPath));
};

$.gulp.task(
	"misc",
	"Move and misc assets from the root into the build folder",
	[],
	miscFnc
);
