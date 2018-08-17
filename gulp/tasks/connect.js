"use strict";

const $ = require("../config.js");

const connectFnc = function() {
	$.connect({
		port: $.port,
		server: {
			baseDir: $.dest
		}
	});
	// console.log("Script Assets = ", $.script_assets);
	// $.gulp.watch($.script_assets, ["watch"]);
};

const reloadFnc = function() {
	console.log("----------- Reloading the application --------------");
	$.connect.reload();
};

$.gulp.task(
	"watch",
	`Watches for any changes in source then rebuilds`,
	["build"],
	reloadFnc
);

$.gulp.task(
	"connect",
	`Launches the application in a local server running in the ${
		$.dest
	} folder on a given port`,
	[],
	connectFnc
);

// $.gulp.task(
// 	"reload",
// 	"Reloads the browsers after any changes as a result of a rebuild",
// 	[],
// 	reloadFnc
// );
