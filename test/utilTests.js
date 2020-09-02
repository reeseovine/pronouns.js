const assert = require('assert');
const util = require('../src/util');
const table = require('../resources/pronouns.json');
const tabAbbr = require('./abbreviatedList.json');

(function() {
	const sample1_Row = ['it', 'it', 'its', 'its', 'itself'];
	const sample1_Forward = ['it'];
	const sample1_Ellipses = ['it', '...', 'itself'];
	const sample1_Shortened = sample1_Forward;
	
	const sample2_Row = ['they', 'them', 'their', 'theirs', 'themself'];
	const sample2_Forward = sample2_Row;
	const sample2_Ellipses = ['they', '...', 'themself'];
	const sample2_Shortened = sample2_Ellipses;
	
	const sample3_String = "she/her or they/them";
	const sample3_Expected = [
		['she', 'her', 'her', 'hers', 'herself'],
		['they', 'them', 'their', 'theirs', 'themself']
	];
	
	const sample4_Query = ['hir'];
	const sample4_Expected = [
		[ 'ze', 'hir', 'hir', 'hirs', 'hirself' ],
		[ 'sie', 'hir', 'hir', 'hirs', 'hirself' ],
		[ 'shi', 'hir', 'hir', 'hirs', 'hirself' ],
		[ 'zie', 'hir', 'hir', 'hirs', 'hirself' ]
	];
	
	const sample5_Query = ['she', 'hers'];
	const sample5_Expected = [ [ 'she', 'her', 'her', 'hers', 'herself' ] ];
	
	assert.deepStrictEqual( util.tableFrontFilter(['it'], table), [sample1_Row] );
	
	assert.deepStrictEqual( util.tableEndFilter(['itself'], table), [sample1_Row] );
	
	assert.deepStrictEqual( util.tableWalkFilter(sample4_Query, table), sample4_Expected );
	assert.deepStrictEqual( util.tableWalkFilter(sample5_Query, table), sample5_Expected );
	assert.deepStrictEqual( util.tableWalkFilter(['their', 'foo'], table), [] );
	assert.deepStrictEqual( util.tableWalkFilter(['foo', 'bar'], table), [] );
	
	assert.deepStrictEqual( util.tableLookup(sample1_Shortened, table), sample1_Row );
	assert.deepStrictEqual( util.tableLookup(sample2_Shortened, table), sample2_Row );
	
	assert.deepStrictEqual( util.shortestUnambiguousForwardPath(table, sample1_Row), sample1_Forward );
	assert.deepStrictEqual( util.shortestUnambiguousForwardPath(table, sample2_Row), sample2_Forward );
	
	assert.deepStrictEqual( util.shortestUnambiguousEllipsesPath(table, sample1_Row), sample1_Ellipses );
	assert.deepStrictEqual( util.shortestUnambiguousEllipsesPath(table, sample2_Row), sample2_Ellipses );
	
	assert.deepStrictEqual( util.shortestUnambiguousPath(table, sample1_Row), sample1_Shortened );
	assert.deepStrictEqual( util.shortestUnambiguousPath(table, sample2_Row), sample2_Shortened );
	
	assert.deepStrictEqual( util.shortestUnambiguousPath(table, sample1_Row), sample1_Shortened );
	
	assert.deepStrictEqual( util.abbreviate(table), tabAbbr );
	
	assert.deepStrictEqual( util.sanitizeSet([sample1_Shortened], table), [sample1_Row] );
	assert.deepStrictEqual( util.sanitizeSet([['they', 'any']], table), [sample2_Row] );
	assert.deepStrictEqual( util.sanitizeSet([['she', 'they']], table), sample3_Expected );
	assert.deepStrictEqual( util.sanitizeSet([['her', 'them']], table), sample3_Expected );
	assert.deepStrictEqual( util.sanitizeSet([['any']], table), [] );
	assert.deepStrictEqual( util.sanitizeSet([['a', 'b'], ['a', 'b', 'c', 'd', 'e', 'f', 'g']], table), [['a', 'b', 'c', 'd', 'e']] );
	
	assert.deepStrictEqual( util.expandString(sample3_String, table), sample3_Expected );
	
	assert.strictEqual( util.capitalize("Hello,"), "Hello," );
	assert.strictEqual( util.capitalize("world!"), "World!" );
	assert.strictEqual( util.capitalize("1!a"), "1!A" );
	
	assert.deepStrictEqual( util.arrFormat('x'), ['x'] );
	assert.deepStrictEqual( util.arrFormat(['x']), ['x'] );
	
	assert.strictEqual( util.rowsEqual(sample3_Expected[0], sample3_Expected[1]), false );
	assert.strictEqual( util.rowsEqual(['a', 'b'], ['a', 'b']), true );
	assert.strictEqual( util.rowsEqual(['a', 'b'], ['a', 'b', 'c']), true );
}());
