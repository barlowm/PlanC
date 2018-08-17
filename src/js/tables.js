const getTables = function() {
const type = [
	{
		"name": "Vulnerabilities",
		"headers": ["ID", "Name", "Type", "Value"],
		"data": ["id", "name", "type", "value"]
	},

	{
		"name": "Packages",
		"headers": ["ID", "Name", "Type", "# Globals", "# Routines"],
		"data": ["id", "name", "NodeType", "Globals", "Routines"]
	},

	{
		"name": "Routines",
		"headers": ["ID", "Name", "Type", "Value"],
		"data": ["id", "name", "NodeType", "Package"]
	}
];

const Tbl = function(data, name) {
	let t1 = `<table class="PlanC">`;

	t1 += `<thead class="labels">`;
	t1 += `<tr><th colspan="${type[name].headers.length}">`;
	t1 += `<button class="ExpandCollapse">${type[name].name} (${data.length})</button>`;
	t1 += `</th></tr></thead>`;

	t1 += `<tbody class="hide"><tr>`;
	for (i = 0; i < type[name].headers.length; i++) {
		t1 += `<th>${type[name].headers[i]}</th>`;
	}
	t1 += `</tr>`;

	data.forEach(function(d) {
		t1 += `<tr>`;
		const x = type[name].data;
		for (i = 0; i < x.length; i++) {
			let y = x[i];
			if (name>0) {
				t1 += `<td>${d.data[y]}</td>`;
			}
			else {
				t1 += `<td>${d[y]}</td>`;
			}
		}
		t1 += `</tr>`;
	});

	t1 += `</tbody>`;
	t1 += `</table>`;
	return t1;
};



	const getVulnerabilitiesTable = function(vul) {
		return(Tbl(vul, 0));
		// let t1 = `<table class="PlanC">`;

		// t1 += `<thead class="labels">`;
		// t1 += `<tr><th colspan="4">`;
		// t1 += `<button class="ExpandCollapse">Vulnerabilities (${vul.length})</button>`;
		// t1 += `</th></tr></thead>`;
		// t1 += `<tbody class="hide"><tr><th>ID</th><th>Name</th><th>Type</th><th>Value</th></tr>`;
		// vul.forEach(function(v) {
		// 	t1 += `<tr><td>${v.id}</td><td>${v.name}</td><td>${v.type}</td><td>${v.value}</td></tr>`;
		// });
		// t1 += `</tbody>`;
		// t1 += `</table>`;
		// return t1;
	};

	const getPackagesTable = function(packs) {
		return(Tbl(packs, 1));
		// let t1 = `<table class="PlanC">`;

		// t1 += `<thead class="labels ExpandCollapse"><tr><th colspan="5">`;
		// t1 += `<label for="packages">Packages (${packs.nodes.length})</label>`;
		// t1 += `<input type="checkbox" name="packages" id="packages" data-toggle="toggle">`;
		// t1 += `</th></tr></thead>`;


		// t1 += `<tbody class="hide"><tr><th>ID</th><th>Name</th><th>Type</th><th># of Globals</th><th># of Routines</th></tr>`;
		// packs.nodes.forEach(function(v) {
		// 	t1 += `<tr><td>${v.data.id}</td><td>${v.data.name}</td><td>${v.data.NodeType}</td><td>${v.data.Globals}</td><td>${v.data.Routines}</td></tr>`;
		// });



		// t1 += `</table>`;
		// return t1;
	};

	const getRoutinesTable = function(routines) {
		return(Tbl(routines, 2));
		// let t1 = `<table class="PlanC">`;

		// t1 += `<thead class="labels"><tr><th colspan="4">`;
		// t1 += `<label for="routines">Routines (${routines.nodes.length})</label>`;
		// t1 += `<input type="checkbox" name="routines" id="routines" data-toggle="toggle">`;
		// t1 += `</th></tr></thead>`;

		// t1 += `<tbody class="hide"><tr><th>ID</th><th>Name</th><th>Type</th><th>Package</th></tr>`;
		// routines.nodes.forEach(function(v) {
		// 	t1 += `<tr><td>${v.data.id}</td><td>${v.data.name}</td><td>${v.data.NodeType}</td><td>${v.data.Package}</td></tr>`;
		// });


		// t1 += `</table>`;
		// return t1;
	};

	return {
		getVulnerabilitiesTable,
		getPackagesTable,
		getRoutinesTable
	}
};

module.exports = getTables();
