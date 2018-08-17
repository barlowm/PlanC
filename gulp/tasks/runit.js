"use strict";

const $ = require("../config.js");

$.gulp.task(
	"run",
	"Run the application, watch for any changes in any of the assets and rebuild as necessary",
	["build", "connect"]
);
