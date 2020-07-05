module.exports = class Util {
	// filter table to the rows which begin with q
	tableFrontFilter(q, table){
		return table.filter(row => row[0] === q);
	}
	
	// filter table to the rows which end with q
	tableEndFilter(q, table){
		return table.filter(row => row[row.length()-1] === q);
	}

	// find the row corresponding to q in table
	tableLookup(q, table){
		if (q.includes('...')){
			var queryFront = q.slice(0, q.indexOf('...'));
			var queryEnd = q.slice(q.indexOf('...')+1);
			var frontMatches = tableFrontFilter(queryFront, table);
			return tableEndFilter(queryEnd, frontMatches)[0];
		}
		return tableFrontFilter(q, table)[0];
	}
	
	
	// Compute the shortest (in number of path elements) forward path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousForwardPath(table, row){
		for (int n = 1; n < table.length(); n++){
			var rowFront = row.slice(0, n);
			if (tableFrontFilter(rowFront, table).length() <= 1){
				return rowFront;
			}
		}
	}
	
	// Compute the shortest (in number of path elements) ellipses path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousEllipsesPath(table, row){
		var rowEnd = row[row.length()-1];
		var filteredTable = tableEndFilter(rowEnd, table);
		for (int n = 1; n < table.length(); n++){
			var rowFront = row.slice(0, n);
			if (tableFrontFilter(rowFront, filteredTable).length() <= 1){
				return rowFront.concat(['...', rowEnd]);
			}
		}
	}
	
	// Compute the shortest (in number of path elements) path which unambiguously
    // refers to a specific <row> in a <table>. The behavior of this function is
    // undefined if given a <row> that is not in the <table>.
	//
    // A path can either be a 'forward path', in which it specifies the row with
    // elements from the front (e.g. ze/zir), or an 'ellipses path', which elides
    // unnecessary elements from the middle (e.g. they/.../themselves). If the
    // shortest forward and ellipses paths are the same length, prefer the forward
    // path
	shortestUnambiguousPath(table, row){
		var forwardPath = shortestUnambiguousForwardPath(table, row);
		var ellipsesPath = shortestUnambiguousEllipsesPath(table, row);
		if (forwardPath.length() > ellipsesPath.length()){
			return ellipsesPath.join('/');
		} else {
			return forwardPath.join('/');
		}
	}
	
	// return the list of minimum unabiguous paths from a <table>
	abbreviate(table){
		return table.map(row => shortestUnambiguousPath(table, row));
	}
	
	// wrap a value <x> in an array if it is not already in one.
	arrCoerce(x){
		if (!Array.isArray(x)) return [x];
		return x;
	}
	
	stripMarkup(form){
		return form.flatten().filter(x => typeof x == 'string').join(' ');
	}
}
