"use strict";

const $ = require("../config.js");
const sPath = $.pretty_assets;
const s1Path = $.style_assets;
const mdPath = $.pretty_assets;
const dPath = $.pretty_dest;

const prettyFnc = function() {
	console.log("------------------ Making JavaScript Pretty ------------------");
	console.log(`Source Files: ${sPath}`);
	console.log(`Dest Folder: ${dPath}`);

	$.gulp
		.src(sPath)
		.pipe($.prettier())
		.pipe($.gulp.dest(dPath));
};

$.gulp.task(
	"pretty",
	"runs Prettier on all the source modules",
	[],
	prettyFnc
);
