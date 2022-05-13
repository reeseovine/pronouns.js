module.exports = {
	// options object overwritten by index.js.
	opts: {
		log: false
	},
	
	// filter table to the rows which begin with q
	tableFrontFilter: function(q, table){
		return table.filter(row => this.rowsEqual(q, row) );
	},
	
	// filter table to the rows which end with q
	// TODO: make this more concise if possible
	tableEndFilter: function(q, table){
		var qlen = q.length;
		return table.filter(row => {
			for (var i = 0; i < qlen; i++){
				if (row[row.length-1-i] != q[qlen-1-i]) return false;
			}
			return true;
		});
	},
	
	// filter table using the walkRow function
	tableWalkFilter: function(q, table){
		return table.filter(row => this.walkRow(q, row, 0,0));
	},
	
	// match query to row by walking each element along it
	walkRow: function(q, row, q_i, row_i){
		if (q[q_i] != row[row_i]){
			if (row_i >= row.length-(q.length-q_i)) return false;
			return this.walkRow(q, row, q_i, row_i+1);
		}
		if (q_i < q.length-1) return this.walkRow(q, row, q_i+1, row_i+1);
		return true;
	},

	// find the row corresponding to q in table
	tableLookup: function(q, table){
		if (q.length < 1 || q.length > table[0].length) return;
		if (q.includes('...')){
			var queryFront = q.slice(0, q.indexOf('...'));
			var queryEnd = q.slice(q.indexOf('...')+1);
			var frontMatches = this.tableFrontFilter(queryFront, table);
			return this.tableEndFilter(queryEnd, frontMatches)[0];
		}
		return this.tableWalkFilter(q, table)[0];
	},
	
	// Compute the shortest (in number of path elements) forward path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousForwardPath: function(table, row){
		for (var n = 1; n < table.length; n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, table).length <= 1){
				return rowFront;
			}
		}
	},
	
	// Compute the shortest (in number of path elements) ellipses path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousEllipsesPath: function(table, row){
		var rowEnd = row[row.length-1];
		var filteredTable = this.tableEndFilter(rowEnd, table);
		for (var n = 1; n < table.length; n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, filteredTable).length <= 1){
				return rowFront.concat(['...', rowEnd]);
			}
		}
	},
	
	// Compute the shortest (in number of path elements) path which unambiguously
    // refers to a specific <row> in a <table>. The behavior of this function is
    // undefined if given a <row> that is not in the <table>.
	//
    // A path can either be a 'forward path', in which it specifies the row with
    // elements from the front (e.g. ze/zir), or an 'ellipses path', which elides
    // unnecessary elements from the middle (e.g. they/.../themselves). If the
    // shortest forward and ellipses paths are the same length, prefer the forward
    // path
	shortestUnambiguousPath: function(table, row){
		var forwardPath = this.shortestUnambiguousForwardPath(table, row);
		var ellipsesPath = this.shortestUnambiguousEllipsesPath(table, row);
		
		if (forwardPath.length > ellipsesPath.length) return ellipsesPath;
		else return forwardPath;
	},
	
	// return the list of minimum unabiguous paths from a <table>
	abbreviate: function(table){
		return table.map(row => this.shortestUnambiguousPath(table, row));
	},
	
	sanitizeSet: function(p, table){
		var out = [];
		for (var row of p){
			if (row.length < 1) continue;
			if (row.length == 1 && row[0].match(/\b(or|and)\b/)) continue;
			
			var match = this.tableLookup(row, table);
			if (match){
				out.push(match);
				continue;
			}
		
			var expansions = [];
			var badMatch = false;
			for (var part of row){
				var match = this.tableLookup([part], table);
				if (part.match(/(\b(any(thing)?|all)\b|\*)/)){
					if (this.opts.log) console.log(`Wildcard detected.`);
					continue;
				}
				if (!match){
					badMatch = true;
					break;
				}
				expansions.push(match);
			}
			if (!badMatch){
				out = out.concat(expansions);
				continue;
			}
			
			if (row.some(p => p.match(/(\b(any(thing)?|all)\b|\*)/))){
				if (this.opts.log) console.log(`Wildcard detected.`);
				continue;
			}
			
			if (this.opts.log) console.warn(`Unrecognized pronoun(s) "${row.join('/')}". This may lead to unexpected behavior.`);
			if (row.length >= 5){
				if (row.length > 5){
					row = row.slice(0,5);
				}
				if (!row.includes('')) out.push(row);
			}
		}
		out = out.filter((row,i) => {
			for (var p of out.slice(0,i)){
				if (this.rowsEqual(p,row)) return false;
			}
			return true;
		});
		return out;
	},
	
	expandString: function(str, table){
		return this.sanitizeSet(str.trim().split(' ').map(p => p.replace(/[^a-zA-Z\/'.]/, '').toLowerCase().split('/')), table);
	},
	
	// wrap a value <x> in an array if it is not already in one.
	arrFormat: function(x){
		if (!Array.isArray(x)) return [x];
		return x;
	},
	
	// capitalize first letter of a given string
	capitalize: function(str){
		return str.replace(/[a-zA-Z]/, l => l.toUpperCase());
	},
	
	// check if two arrays are similar. will permit array b to be longer by design.
	rowsEqual: function(a, b){
		for (var i = 0; i < a.length; i++){
			if (a[i] != b[i]) return false;
		}
		return true;
	}
}
