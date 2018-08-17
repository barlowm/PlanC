"use strict";

const $ = require("../config.js");

const connectFnc = function() {
	$.connect({
		port: $.port,
		server: {
			baseDir: $.dest
		},
		reloadDelay: 2000,
		reloadDebounce: 2000
	});
	$.gulp.watch($.script_assets, ["watch"]);
};

const reloadFnc = function() {
	console.log("----------- Reloading the application --------------");
	$.reload();
};

$.gulp.task(
	"watch",
	`Watches for any changes in source then rebuilds`,
	["html", "misc", "js", "css"],
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

$.gulp.task(
	"reload",
	"Reloads the browsers after any changes as a result of a rebuild",
	[],
	reloadFnc
);
