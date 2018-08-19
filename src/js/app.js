const getData = require("./get_data.js");
const tables = require("./tables.js");

const theApp = function() {
	let Vulnerabilities = "";
	let VulnerabilitiesArray = [];
	let Packages = "";
	let PackagesArray = [];
	let Routines = "";
	let RoutinesArray = [];

	const getVulnerabilities = function() {
		return Vulnerabilities;
	};
	const getVulnerability = function(vulnerabilityId) {
		return VulnerabilitiesArray[vulnerabilityId];
	};

	const getPackages = function() {
		return Packages.nodes;
	};
	const getPackage = function(packageId) {
		return PackagesArray[packageId];
	};

	const getRoutines = function() {
		return Routines.nodes;
	};
	const getRoutine = function(routineId) {
		return RoutinesArray[routineId];
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
					getVulnerabilities().forEach(function(v) {
						VulnerabilitiesArray[v.id] = v;
					});
					Packages = values[1].packages;
					getPackages().forEach(function(p) {
						PackagesArray[p.data.id] = p.data;
					});

					Routines = values[2].routines;
					getRoutines().forEach(function(r) {
						RoutinesArray[r.data.id] = r.data;
					});
					return true;
				});
		}
		return null;
	};

	const getSuperTableData = function() {
		return(tables.getSuperTable(getPackages, getRoutines, getRoutines));
	}





	return {
		getVulnerabilities,
		getPackages,
		getRoutines,
		getSuperTableData,
		initData
	}
};

module.exports = theApp();
