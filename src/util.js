module.exports = {
	// logging turned off by default.
	logging: false,
	
	// filter table to the rows which begin with q
	tableFrontFilter: function(q, table){
		var qlen = q.length;
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

	// find the row corresponding to q in table
	tableLookup: function(q, table){
		if (q.includes('...')){
			var queryFront = q.slice(0, q.indexOf('...'));
			var queryEnd = q.slice(q.indexOf('...')+1);
			var frontMatches = this.tableFrontFilter(queryFront, table);
			return this.tableEndFilter(queryEnd, frontMatches)[0];
		}
		return this.tableFrontFilter(q, table)[0];
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
		return p.map(row => {
			var match = this.tableLookup(row, table);
			if (!match){
				if (this.logging) console.warn(`Unrecognized pronoun "${row.join('/')}". This may lead to unexpected behavior.`);
				while (row.length < 5){
					row.push('');
				}
				if (row.length > 5){
					row = row.slice(0,5);
				}
				return row;
			} else return match;
		});
	},
	
	expandString: function(str, table){
		return this.sanitizeSet(str.split(' ').filter(p => !p.match(/[Oo][Rr]/g)).map(p => p.replace(/[^a-zA-Z\/'.]/, '').toLowerCase().split('/')), table);
	},
	
	// wrap a value <x> in an array if it is not already in one.
	arrFormat: function(x){
		if (!Array.isArray(x)) return [x];
		return x;
	},
	
	// capitalize first letter of a given string
	capitalize: function(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
	
	// check if two arrays are similar. will permit array b to be longer by design.
	rowsEqual: function(a, b){
		for (var i = 0; i < a.length; i++){
			if (a[i] != b[i]) return false;
		}
		return true;
	}
}
