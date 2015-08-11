
// create a network
var nodes = new vis.DataSet([]);
for (var i = 234000; i <= 234999; i++) {
	var k = all[''+i];
	if (!k || k['kdam'] && k['kdam'].length > 0) continue;
	nodes.add({
		id : k['id'],
		label : k['name']
	});
}

var edges = new vis.DataSet([]);

var container = document.getElementById('mynetwork');
var data = {
	nodes : nodes,
	edges : edges
};

var options = {
	nodes : {
		shape : 'box'
	},
	interaction : {
		hover : true
	},
	edges : {
		arrows : {
			to : true
		}
	},
	physics : {
		solver : 'forceAtlas2Based'
	},
	interaction : {
		keyboard : true,
		multiselect : true,
		navigationButtons : true
	},
	configure : {
		container : document.getElementById('config')
	}
};
var network = new vis.Network(container, data, options);

network.on("selectNode", function(params) {
	var sels = network.getSelectedNodes();
	for (var i = 0; i < sels.length; i++) {
		var cur = sels[i];
		all[cur].taken = true;
		var rev = reverse_kdam[cur];
		if (!rev)
			continue;
		for (var j = 0; j < rev.length; j++) {
			var to_id = rev[j];
			var to = all[to_id];
			var kdams = to['kdam'];
			for (var k = 0; k < kdams.length; k++) {
				var j = 0;
				for (; j < kdams[k].length; j++) {
					if (all[kdams[k][j]] && !all[kdams[k][j]].taken)
						break;
				}
				if (j == kdams[k].length)
					break;
			}
			if (j != kdams.length) {
				to['taken'] = true;
				nodes.add({
					id : to['id'],
					label : to['name']
				});
				edges.add({
					from : cur,
					to : to['id']
				});
			}
		}
	}
})

network.stabilize(1000);
