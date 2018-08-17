"use strict";

const $ = require("../config.js");

const buildFnc = function() {
	console.log(
		"------------------ Application Build is complete ------------------"
	);
};

$.gulp.task(
	"build",
	"Build the entire application by running individual processes",
	["html", "misc", "js", "css"],
	buildFnc
);
