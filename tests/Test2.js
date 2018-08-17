"use strict";
const $ = require("../gulp/config.js");
const getTheData = require($.src_path + "get_data");
process.env.PACKAGE = process.env.TEST_PACKAGE

describe("Validating JSON Data", function() {
	before(function() {
		process.env.TMP_PACKAGE = process.env.PACKAGE;
		process.env.PACKAGE = process.env.TEST_PACKAGE;
	});

	it("Should return TRUE if valid JSON Object", function(){
		return getTheData.get_data()
			.then(function(result) {
				$.chai.assert.isObject(result, "Valid JSON Object");
		});
	});

	it("Should return TRUE if valid JSON Schema", function(){
		return getTheData.get_schema()
			.then(function(result) {
				$.chai.assert.isObject(result, "Valid JSON Object");
				$.chai.assert.exists(result.$schema, "JSON Object has schema property");
				$.chai.assert.strictEqual(result.$schema, "http://json-schema.org/draft-04/schema#", "Valid JSON Schema");
		});
	});

	it("Should return TRUE if the JSON Data matches the JSON Schema", function() {
		return getTheData.verify_json()
			.then(function(result) {
				$.chai.assert.isObject(result, "The JSON Data matches the desired schema");
			})
	});

	after(function() {
		process.env.PACKAGE = process.env.TMP_PACKAGE;
	});
});


