"use strict";
const $ = require("../gulp/config.js");
// const getTheData = require($.src_path + "get_data");
const theApp = require($.src_path + "app");

describe("Confirming JSON Data", function() {
	before(function() {
		process.env.TMP_PACKAGE = process.env.PACKAGE;
		process.env.PACKAGE = process.env.TEST_PACKAGE;
	});

	it("Should return TRUE if valid JSON Object", function(){
		return theApp.initData()
			.then(function(result) {
				$.chai.assert.isTrue(result, "Valid JSON Object");
		});
	});

	it("Should return TRUE if there are Vulnerabilities in the JSON Data", function() {
		const Vuls = theApp.getVulnerabilities();
		$.chai.assert.isArray(Vuls, "There are Vulnerabilities in the JSON Data");
	});

	it("Should return TRUE if there are Packages in the JSON Data", function() {
		const Vuls = theApp.getPackages();
		$.chai.assert.isObject(Vuls, "There are Packages in the JSON Data");
	});

	it("Should return TRUE if there are Routines in the JSON Data", function() {
		const Vuls = theApp.getRoutines();
		$.chai.assert.isObject(Vuls, "There are Routines in the JSON Data");
	});

	after(function() {
		process.env.PACKAGE = process.env.TMP_PACKAGE;
	});
});

