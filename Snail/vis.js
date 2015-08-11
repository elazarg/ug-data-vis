
// create a network
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

taken.each(function(cid) {
	var k = all[cid];
	nodes.add({
		id : k['id'],
		label : k['name'],
		group: 1
	});

	updateFeasible(k['id']);
});

function updateFeasible(sender) {
	var old_feasible = feasible;
	feasible = computeFeasibleFromTaken(taken);
	feasible.difference(old_feasible).each(function(cid){
		var to = all[cid];
		var from = undefined;
		taken.each(function(from){
			if ((new Set(reverse_kdam[from])).has(cid)) {
				edges.add({from : from, to : cid});
			}
		})
		nodes.add({
			id : to['id'],
			label : to['name'],
			group: 2
		}, sender);
	});
	old_feasible.difference(feasible).each(function(cid){
		//todo: pass sending node?
		edges.remove(network.getConnectedEdges(cid));
		nodes.remove(cid, sender);
	});
}


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

network.on("doubleClick", function(params) {
	var sels = new Set(params.nodes);
	sels.each(function(cid){
		if (!taken.has(cid)) {
			taken.add(cid);
			nodes.update({id:cid, group:1});
		} else {
			taken.remove(cid);
			nodes.update({id:cid, group:2});
		}
		updateFeasible(cid);
	});
})

network.stabilize(1000);
