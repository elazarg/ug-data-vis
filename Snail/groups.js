// Courses that were actually taken
// GUI: Initialized from "outside", and incrementally added (or removed)
// 	    Visible at all times
var taken = new Set('044145', '104012', '104167', '104167', '234114');

// Courses that can be taken right now
// GUI: visible at all times, except perhaps 0-dependencies courses
var feasible = new Set();

// Courses that a taken course might help getting
// GUI: At hover?
var touched = new Set();

// Courses that might help take a wanted course (one of touched)
var helper = new Set();

function computeFeasibleFromTaken(taken) {
	var candidates = new Set();
	taken.each(function(cid){		
		candidates.add(reverse_kdam[cid]);
	});
	candidates.remove(undefined);
	candidates.remove(taken);
	return candidates.filter(function(cid) {
		var kdams = all[cid].kdam || [];
		for (var i = 0; i < kdams.length; i++) 
			if (taken.isSuperset(kdams[i]))
				return true;
		return false;
	});
}
