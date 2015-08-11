// create a network
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
	interaction: {
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
	
	nodes.update({
        id: params.nodes[0],
        group: 30,
    });
	
})

network.stabilize(1000);
