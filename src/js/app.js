const getData = require("./get_data.js");
const initData = function() {
	let Vulnerabilities = "";
	let Packages = "";
	let Routines = "";

	const getVulnerabilities = function() {
		return Vulnerabilities;
	};
	const getPackages = function() {
		return Packages.nodes;
	};
	const getRoutines = function() {
		return Routines.nodes;
	};

	const initData = function(env) {
		if (env) {
			return Promise.all([
				getData.get_data("./pack_json_keyword.json"),
				getData.get_data("./pack_json_package.json"),
				getData.get_data("./pack_json_routine.json")
			])
				.then(function(values) {
					Vulnerabilities = values[0].Keyword;
					Packages = values[1].packages;
					Routines = values[2].routines;
					return true;
				});
		}
	}

	return {
		getVulnerabilities,
		getPackages,
		getRoutines,
		initData
	}
};

module.exports = initData();
