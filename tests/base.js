// "use strict";
// const $ = require("../gulp/config.js");
// const getTheData = require($.src_path + "get_data");

// /*
//  * This is a basic demo of unit testing features using simple ASSERT for simple functions
//  * as well as for testing Promises
//  *
//  * This module does not need to be included in the normal test process of an application.
//  */


// /*
//  * Note, these functions make use of the JavaaScript "Fat Arrow" feature (e.g. =>).
//  * The function below could also be written as:
//  *      const resolvingPromise = new Promise(function(resolve) {
//  *          resolve("promise resolved");
//  *      }
//  */
// const resolvingPromise = new Promise((resolve) =>
// 	resolve("promise resolved")
// );

// // const rejectingPromise = new Promise((resolve, reject) =>
// //   reject(new Error("promise rejected"))
// // );

// // const rejectingPromise2 = new Promise(function(resolve, reject) {
// //   reject(new Error("promise rejected"))
// // });


// before("Setting up the userList", function(){
// 	console.log("Any setup needed for test can go here");
// });


// describe("Base Test Module", function() {
// 	it("1. should always return true...", function() {
// 		$.chai.assert.isTrue(true, "We got a true as expected");
// 	});

// 	it("2. should always return false...", function() {
// 		$.chai.assert.isNotTrue(false, "We got a FALSE as expected");
// 	});

// 	it("3. promise assertion success using await", async () => {
// 		const result = await resolvingPromise;
// 		$.chai.expect(result).to.equal("promise resolved");
// 	});

// 	it("4. promise assertion success", function(){
// 		return resolvingPromise
// 			.then(function(result) {
// 				$.chai.expect(result).to.equal("promise resolved");
// 			});
// 	});

// 	it("5. should return false if Bad JSON Schema", function(){
// 		return getTheData.get_schema()
// 			.then(function(result) {
// 				$.chai.assert.isObject(result, "Valid JSON Object");
// 				$.chai.assert.exists(result.$schema, "JSON Object has schema property");
// 				$.chai.assert.strictEqual(result.$schema, "http://json-schema.org/draft-04/schema#", "Valid JSON Schema");
// 		});
// 	});

// 	it("6. should return false if Bad JSON Schema", function(){
// 		return getTheData.get_schema("./bad_json_schema_no_schema.json")
// 			.then(function(result) {
// 				$.chai.assert.isObject(result, "Valid JSON Object");
// 				$.chai.assert.notExists(result.$schema, "JSON Object does NOT have schema property");
// 			});
// 	});

// 	it("7. should return false if Bad JSON Schema", function(){
// 		return getTheData.get_schema("./bad_json_schema_bad_schema.json")
// 			.then(function(result) {
// 				$.chai.assert.isObject(result, "Valid JSON Object");
// 				$.chai.assert.exists(result.$schema, "JSON Object has schema property");
// 				$.chai.assert.notStrictEqual(result.$schema, "http://json-schema.org/draft-04/schema#", "Does NOT have a valid JSON Schema");
// 		});
// 	});

// 	it("8. should return true if Bad JSON Schema", function(){
// 		return getTheData.get_schema("./bad_json_schema.json")
// 			.then(function(result) {
// 				$.chai.assert.isNull(result, "Bad JSON Schema");
// 		});
// 	});
//  });

