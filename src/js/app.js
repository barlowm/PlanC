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









	let noVulnerabilities = [];
	let withVulnerabilities = [];

	// Build Table based on Routines
	// This object returns an array of named package objects.
	// Each package object contains the package info plus an array of named routine objects
	// Each routine object contains the routine info plus an array of vulnerability objects
	// Each vulnerability object contains the vulnerability info plus an array of code lines within the file specified by the routine object
	// e.g.
	/*
		KIDS: {
			id: "p1", name: "KIDS", numGlobals: 0, numRoutines: 89, vulnerabilities: [
			r1||33761: {
				rID: "r1||33761", rName: "XPDDP1", rType: "Routine", vuls:
				[
					{vulID: "k5", vulLines: Array(3), vulName: "ADDRESS", vulType: "Upper", vulValue: "ADDRESS"},
					{vulID: "k32", vulLines: Array(2), vulName: "IDENTITY", vulType: "Upper", vulValue: "IDENTITY"},
					{vulID: "k6", vulLines: Array(3), vulName: "ADR", vulType: "Upper", vulValue: "ADR"},
					{vulID: "k18", vulLines: Array(2), vulName: "CREDENTIALS", vulType: "Upper", vulValue: "CREDENTIALS"}
				]
			}

			r1||33762: {
				rID: "r1||33762", rName: "XPDDP2", rType: "Routine", vuls:
				[
					{vulID: "k6", vulLines: Array(3), vulName: "ADR", vulType: "Upper", vulValue: "ADR"},
					{vulID: "k18", vulLines: Array(2), vulName: "CREDENTIALS", vulType: "Upper", vulValue: "CREDENTIALS"}
				]
			}

			r1||33763: {
				rID: "r1||33763", rName: "XPDDP3", rType: "Routine", vuls:
				[
					{vulID: "k6", vulLines: Array(3), vulName: "ADR", vulType: "Upper", vulValue: "ADR"}
					{vulID: "k18", vulLines: Array(2), vulName: "CREDENTIALS", vulType: "Upper", vulValue: "CREDENTIALS"}
					{vulID: "k33", vulLines: Array(3), vulName: "INITIALIZE", vulType: "Upper", vulValue: "INITIALIZE"}
					{vulID: "k28", vulLines: Array(2), vulName: "HANDSHAKE", vulType: "Upper", vulValue: "HANDSHAKE"}
				]
			}
		}
	*/

	const walkRoutineTable = function() {
		debugger;
		const theRoutines = getRoutines();
		theRoutines.forEach(function(routine) {
			let r = routine.data;
			if (r.Vulnerabilities) {
				let pID = r.Package;
				let p = getPackage(pID);
				if(!withVulnerabilities[p.name]) {
					withVulnerabilities[p.name] = [];
					let pEl = { name: p.name, id: p.id, numRoutines: p.Routines, numGlobals: p.Globals, vulnerabilities: [] };
					withVulnerabilities[p.name] = pEl;
				}

				let theEl = withVulnerabilities[p.name];
				let vulList = null;
				if (theEl.vulnerabilities && theEl.vulnerabilities[r.id]) {
					vulList = theEl.vulnerabilities[r.id];
				}
				else {
					vulList = { rID: r.id, rName: r.name, rType: r.NodeType, vuls: []};
					theEl.vulnerabilities[r.id] = vulList;
				}
				r.Vulnerabilities.forEach(function(v) {
					let vulInfo = getVulnerability(v.id);
					let aVul = { vulID: v.id, vulLines: v.lines, vulName: vulInfo.name, vulType: vulInfo.type, vulValue: vulInfo.value };
					vulList.vuls.push(aVul);
				});
				theEl.vulnerabilities[r.id] = vulList;
			}
			else {
				noVulnerabilities.push(r);
			}
		});
		return([withVulnerabilities, noVulnerabilities]);
	};

	const getVulnerabilityData = function(rTableSubSubRow) {
		let aRow = "";	//`<table class="Vulnerability"><thead><tr><th colspan="4">Vulnerability</th></tr></thead>`;
		aRow += `<tr class="Vulnerability"><td>&nbsp;</td><td>&nbsp;</td>`;
		aRow += `<td>${rTableSubSubRow.vulName}</td>`;
		aRow += `<td>${rTableSubSubRow.vulType}</td>`;
		aRow += `<td>${rTableSubSubRow.vulValue}</td>`;
		aRow += `<td>${rTableSubSubRow.vulLines.join("<br>")}</td>`;
		aRow += `</tr>`;
		return aRow;
	}

	const getRoutineData = function(rTableSubRow) {
		let aRow = `<tr class="Routine"><td>&nbsp;</td><td>${rTableSubRow.rName}</td><td>${rTableSubRow.rType}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`;
		aRow += `<tr><td colspan="6">`;
		let subRows = rTableSubRow.vuls;
		let subRowData = `<table class="Vulnerability"><thead><tr><th colspan="4">Vulnerability</th></tr></thead>`;
		for (var i = 0; i < subRows.length; i++) {
			subRowData += getVulnerabilityData(subRows[i]);
		}
		subRowData +="</table></td></tr>";
		aRow += subRowData;
		return aRow;
	}

	const getPackageData = function(rTableRow) {
		let aRow = `<tr class="Package"><td>${rTableRow.name}</td><td>${rTableRow.numRoutines}</td><td>${rTableRow.numGlobals}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`;
		let subRows = rTableRow.vulnerabilities;
		let subRowData = "";
		for (var key in subRows) {
			if (subRows.hasOwnProperty(key)) {
				subRowData += getRoutineData(subRows[key]);
			}
		}
		aRow += subRowData;
		return aRow;
	};

	const renderRoutineTable = function(rTable) {
		let theTable = "";
		for (var key in rTable) {
			if (rTable.hasOwnProperty(key)) {
				theTable += getPackageData(rTable[key]);
			}
		}
		return theTable;
	}




	return {
		getVulnerabilities,
		getPackages,
		getRoutines,
		getTable,
		getPackage,
		getVulnerability,
		walkRoutineTable,
		renderRoutineTable,
		initData
	}
};

module.exports = theApp();
