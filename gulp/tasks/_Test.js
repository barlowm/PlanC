"use strict";

const $ = require("../config.js");

const testFnc = function() {
	console.log("------------------ Config ------------------");
	console.log($);
};

$.gulp.task(
	"_test",
	"display the config object <-- This is just for demonstration purposes",
	[],
	testFnc
);
