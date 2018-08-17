const fetch = require("node-fetch");		// Module which brings window.fetch to Node.js
const tv4 = require("tv4");	// Tiny validator for JSON Schema V4

const get_JSON = function() {
	const get_data = function(packagePath) {
		if(!packagePath) {
			packagePath = env.PACKAGE;
		}
		return fetch(packagePath, {
			mode: 'no-cors'
		})
			.then(res => {
				return res.json()
			})
			.catch(err => {
				console.error(`get_data() ERROR - ${err}`);
				return null;
			})
	};

 	const get_schema = function(schemaPath) {
		if(!schemaPath) {
			schemaPath = env.SCHEMA;
		}
		return get_data(schemaPath);
 	};

	const verify_json = function(schemaPath, packagePath) {
		if(!schemaPath) {
			schemaPath = env.SCHEMA;
		}
		if(!packagePath) {
			packagePath = env.PACKAGE;
		}
		return Promise.all([get_schema(), get_data()])
			.then( function(values) {
				const valid = tv4.validate(values[1], values[0]);
				if (valid) {
					return values[1];
				}
				return null;
			});
	};

	return {
		get_data,
		get_schema,
		verify_json
	}
};

module.exports = get_JSON();
