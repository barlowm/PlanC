// "use strict";
// const $ = require("../config.js");

// $.gulp.task(
// 	"watch",
// 	"Watch for any changes in any of the assets. Rebuild/reload browser as needed",
// 	["connect"],
// 	function() {
// 		console.log("Watching for changes in - :::", $.page_assets);
// 		$.gulp.watch($.page_assets, ["html"]);
// 		$.gulp.watch([$.root_assets, $.image_assets], ["misc"]);
// 		$.gulp.watch($.style_assets, ["css"]);
// 		$.gulp
// 			.watch($.script_assets, ["reload", "js"])
// 			.on("change", function() {
// 				console.log("Watching - ", $.script_assets);
// 			});
// 	}
// );
