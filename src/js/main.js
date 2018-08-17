/**
 * 	Main script module
 *  A future section will go into the usage of JSDoc
 *
 * @format
 */

const env = {
	SCHEMA : "./VistA_Data_Schema.json",
	TEST_PACKAGE : "./sample_json_data.json",
	PACKAGE : "./pack_json_keyword.json",
	PACKAGE2 : "./pack_json_package.json",
	PACKAGE3 : "./pack_json_routine.json"
};

const $ = require("jquery");
const a = require("./app.js");


$(document).ready(function() {
	var xxxy = Promise.all([a.initData(env)])
		.then(function(state) {
			console.log("Load - ", new Date());
			if (state) {
				console.log("Data Good");
				const vul = a.getVulnerabilities();
				const pack = a.getPackages();
				const routines = a.getRoutines();

				const Table = $("#response");
				const tableData = a.getTable();
				Table.html(tableData);
				$("#pageLoading").hide();

				$(".ExpandCollapse").click(function() {
					console.log("Click");
					$(this).parents().next('.hide').toggle();
				});

				console.log("Page is finished loading");
			}
			else {
				console.log("Data Failure");
			}
		return null;
		}
	);
		return null;
});


