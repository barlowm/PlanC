const getTables = function() {
const type = [
	{
		"name": "Vulnerabilities",
		"headers": ["ID", "Name", "Type", "Value"],
		"data": ["id", "name", "type", "value"]
	},

	{
		"name": "Packages",
		"headers": ["ID", "Name", "Type", "# Globals", "# Routines", "# Vulnerabilities"],
		"data": ["id", "name", "NodeType", "Globals", "Routines"]
	},

	{
		"name": "Routines",
		"headers": ["ID", "Name", "Type", "Package", "# Vulnerabilities"],
		"data": ["id", "name", "NodeType", "Package"]
	}
];

const getTableRow = function(d, dataTypeIdx, NumVulnerabilities, getPackage) {
	let row = "<tr>";
	let data = d;
	if (dataTypeIdx > 0) {
		data = data.data;
	}
	let rowDataKeys = type[dataTypeIdx].data;
	if (data.Vulnerabilities) {
		NumVulnerabilities += data.Vulnerabilities.length;
	}
	let packageID = "";
	for (let cellIdx = 0; cellIdx < rowDataKeys.length; cellIdx++) {
		let CellKey = rowDataKeys[cellIdx];
		if (dataTypeIdx > 0) {
			if (getPackage && "Package" == CellKey) {
				packageID = data[CellKey]
				let package = getPackage(packageID);
				row += `<td>${package.name}</td>`;
			}
			else {
				row += `<td>${data[CellKey]}</td>`;
			}
		}
		else {
			row += `<td>${data[CellKey]}</td>`;
		}
	}
	if (dataTypeIdx > 0) {
		if (getPackage) {
			let aPackage = getPackage(packageID);
			if (!aPackage.Vulnerabilities) {
				aPackage.Vulnerabilities = 0;
			}
			aPackage.Vulnerabilities += NumVulnerabilities;
		}
		if (1 == dataTypeIdx && data.Vulnerabilities) {
			row += `<td>${data.Vulnerabilities}</td>`;
		}
		else {
			row += `<td>${NumVulnerabilities}</td>`;
		}
	}
	row += "</tr>";
	return row;
}

const getTable = function(data, dataTypeIdx, getPack) {
	let NumVulnerabilities = 0;
	let rows = "";
	data.forEach(function(d) {
		rows += getTableRow(d, dataTypeIdx, NumVulnerabilities, getPack);
	});

	let vulInfo = "";
	if (NumVulnerabilities > 0) {
		vulInfo = `(${NumVulnerabilities} Vulnerabilities)`;
	}

	let t1 = `<table class="PlanC">`;
	t1 += `<thead class="labels">`;
	t1 += `<tr><th colspan="${type[dataTypeIdx].headers.length}">`;
	t1 += `<button class="ExpandCollapse">${type[dataTypeIdx].name} (${data.length}) ${vulInfo}</button>`;
	t1 += `</th></tr></thead>`;

	t1 += `<tbody class="hide"><tr>`;
	for (i = 0; i < type[dataTypeIdx].headers.length; i++) {
		t1 += `<th>${type[dataTypeIdx].headers[i]}</th>`;
	}
	t1 += `</tr>`;
	t1 += rows;
	t1 += `</tbody>`;

	t1 += `</table>`;
	return t1;
};



	const getVulnerabilitiesTable = function(vulData, getPack) {
		return(getTable(vulData, 0, getPack));
	};

	const getPackagesTable = function(packData, getPack) {
		return(getTable(packData, 1, getPack));
	};

	const getRoutinesTable = function(routineData, getPack) {
		return(getTable(routineData, 2, getPack));
	};

	return {
		getVulnerabilitiesTable,
		getPackagesTable,
		getRoutinesTable
	}
};

module.exports = getTables();
