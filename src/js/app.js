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

	const getTable = function() {
		let t1 = tables.getVulnerabilitiesTable(getVulnerabilities(), null);
			// Doing the routines table first so we can populate additional data into the packages array
		let t3 = tables.getRoutinesTable(getRoutines(), getPackage);
		let t2 = tables.getPackagesTable(getPackages(), null);
		return t1 + t2 + t3;
	};

	return {
		getVulnerabilities,
		getPackages,
		getRoutines,
		getTable,
		getPackage,
		getVulnerability,
		initData
	}
};

module.exports = theApp();
