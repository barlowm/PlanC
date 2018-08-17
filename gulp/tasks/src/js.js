"use strict";

const $ = require("../../config.js");
const sPath = $.main_script_assets;
const dPath = $.script_dest;

const jsFnc = function() {
	console.log("------------------ Building Scripts ------------------");
	console.log(`Output Script File: ${$.main_script}`);
	console.log(`Source Files: ${sPath}`);
	console.log(`Dest Folder: ${dPath}`);

	// Note in this task, we're using Browserify to transform, concatinate, and pipe the output rather than $.gulp
	return $.browserify(sPath)
		.bundle()
		.pipe($.source($.main_script))
		.pipe($.gulp.dest(dPath));
};

$.gulp.task(
	"js",
	"Combine any Script files into a single file and move combined file into the build folder",
	[],
	jsFnc
);
