const util = require('../src/util');
const table = require('../resources/pronouns.json');
const pronouns = require('../src/index');

(function(){
	////////////////////////////////
	/* UTIL METHODS               */
	////////////////////////////////
	console.log('== Util methods ==');
	
	console.time('rowsEqual');
	util.rowsEqual(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e']);
	console.timeEnd('rowsEqual');
	
	console.time('tableFrontFilter');
	util.tableFrontFilter(['xey','xem'], table);
	console.timeEnd('tableFrontFilter');
	
	console.time('tableEndFilter');
	util.tableEndFilter(['xyrs','xemself'], table);
	console.timeEnd('tableEndFilter');
	
	console.time('tableWalkFilter');
	util.tableWalkFilter(['ve','vis'], table);
	console.timeEnd('tableWalkFilter');
	
	console.time('tableLookup');
	util.tableLookup(['they', '...', 'themselves'], table);
	console.timeEnd('tableLookup');
	
	console.time('shortestUnambiguousForwardPath');
	util.shortestUnambiguousForwardPath(['vi', 'vim', 'vir', 'virs', 'vimself'], table);
	console.timeEnd('shortestUnambiguousForwardPath');
	
	console.time('shortestUnambiguousEllipsesPath');
	util.shortestUnambiguousEllipsesPath(['they', 'them', 'their', 'theirs', 'themselves'], table);
	console.timeEnd('shortestUnambiguousEllipsesPath');
	
	console.time('shortestUnambiguousPath');
	util.shortestUnambiguousPath(['vi', 'vim', 'vir', 'virs', 'vimself'], table);
	console.timeEnd('shortestUnambiguousPath');
	
	console.time('abbreviate');
	util.abbreviate(table);
	console.timeEnd('abbreviate');
	
	console.time('sanitizeSet (full match)');
	util.sanitizeSet([['zee']], table);
	console.timeEnd('sanitizeSet (full match)');
	
	console.time('sanitizeSet (multiple)');
	util.sanitizeSet([['ze','zir'], ['thon']], table);
	console.timeEnd('sanitizeSet (multiple)');
	
	console.time('sanitizeSet (shorthand)');
	util.sanitizeSet([['fae', 'it']], table);
	console.timeEnd('sanitizeSet (shorthand)');
	
	console.time('sanitizeSet (custom)');
	util.sanitizeSet([['a', 'b', 'c', 'd', 'e']], table);
	console.timeEnd('sanitizeSet (custom)');
	
	console.time('expandString');
	util.expandString('she, they/he, a/b/c/d/e, and any', table);
	console.timeEnd('expandString');
	
	
	////////////////////////////////
	/* PRONOUNS METHODS           */
	////////////////////////////////
	console.log('\n== Pronouns methods ==');
	
	console.time('pronouns');
	const p = pronouns('she, they/he, a/b/c/d/e, and any');
	console.timeEnd('pronouns');
	
	console.time('add');
	p.add('ze/hir');
	console.timeEnd('add');
	
	console.time('complete');
	pronouns.complete('xe');
	console.timeEnd('complete');
}());
