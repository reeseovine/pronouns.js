module.exports = {
	// filter table to the rows which begin with q
	tableFrontFilter: function(q, table){
		return table.filter(row => row.slice(0, q.length()) == q);
	},
	
	// filter table to the rows which end with q
	tableEndFilter: function(q, table){
		return table.filter(row => row.slice(q.length()-1) == q);
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
		for (var n = 1; n < table.length(); n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, table).length() <= 1){
				return rowFront;
			}
		}
	},
	
	// Compute the shortest (in number of path elements) ellipses path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousEllipsesPath: function(table, row){
		var rowEnd = row[row.length()-1];
		var filteredTable = this.tableEndFilter(rowEnd, table);
		for (var n = 1; n < table.length(); n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, filteredTable).length() <= 1){
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
		if (forwardPath.length() > ellipsesPath.length()){
			return ellipsesPath.join('/');
		} else {
			return forwardPath.join('/');
		}
	},
	
	// return the list of minimum unabiguous paths from a <table>
	abbreviate: function(table){
		return table.map(row => this.shortestUnambiguousPath(table, row));
	},
	
	// wrap a value <x> in an array if it is not already in one.
	arrFormat: function(x){
		if (!Array.isArray(x)) return [x];
		return x;
	},
	
	stripMarkup: function(form){
		return form.flatten().filter(x => typeof x == 'string').join(' ');
	},
	
	sanitizeSet: function(p, table){
		console.log(p);
		var match = this.tableLookup(p, table);
		if (!match){
			console.warn(`Unrecognized pronoun "${p.join('/')}". This may lead to unexpected behavior.`);
			while (p.length() < 5){
				p.push('');
			}
			if (p.length() > 5){
				p = p.slice(0,5);
			}
			return p;
		} else return match;
	},
	
	expandString: function(str, table){
		return str.split(' or ').map(p => this.sanitizeSet(p.split('/'), table));
	}
}
