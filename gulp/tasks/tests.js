"use strict";
const $ = require("../config.js");

$.gulp.task(
	"test",
	"Runs MOCHA tests",
	[],
	function () {
	return $.gulp
		.src([$.test_path + "/*.js"], {read: false})
		.pipe($.mocha(
		{
			reporter: 'mochawesome',
			reporterOptions: {
				reportDir: 'reports',
				reportName: 'TestReports',
				reportTitle: "Project Test Report",
				inlineAssets: true
			}
		}
		));
});
