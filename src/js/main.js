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
	return Promise.all([a.initData(env)])
		.then(function(state) {
			if (state) {
				const vul = a.getVulnerabilities();
				const pack = a.getPackages();
				const routines = a.getRoutines();

				const Table = $("#response");
				const tableData = a.getTable();
				Table.html(tableData);
				$("#pageLoading").hide();

				$(".ExpandCollapse").click(function() {
					$(this).parents().next('.hide').toggle();
				});
			}
			return null;
		}
	);
});


