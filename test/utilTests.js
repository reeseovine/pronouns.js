const assert = require('assert');
const util = require('../src/util');
const list = require('../resources/pronouns.json');
const listAbbr = require('./abbreviatedList.json');

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
	
	assert.deepStrictEqual( util.tableFrontFilter(['it'], list), [sample1_Row] );
	
	assert.deepStrictEqual( util.tableEndFilter(['itself'], list), [sample1_Row] );
	
	assert.deepStrictEqual( util.tableLookup(sample1_Shortened, list), sample1_Row );
	assert.deepStrictEqual( util.tableLookup(sample2_Shortened, list), sample2_Row );
	
	assert.deepStrictEqual( util.shortestUnambiguousForwardPath(list, sample1_Row), sample1_Forward );
	assert.deepStrictEqual( util.shortestUnambiguousForwardPath(list, sample2_Row), sample2_Forward );
	
	assert.deepStrictEqual( util.shortestUnambiguousEllipsesPath(list, sample1_Row), sample1_Ellipses );
	assert.deepStrictEqual( util.shortestUnambiguousEllipsesPath(list, sample2_Row), sample2_Ellipses );
	
	assert.deepStrictEqual( util.shortestUnambiguousPath(list, sample1_Row), sample1_Shortened );
	assert.deepStrictEqual( util.shortestUnambiguousPath(list, sample2_Row), sample2_Shortened );
	
	assert.deepStrictEqual( util.shortestUnambiguousPath(list, sample1_Row), sample1_Shortened );
	
	assert.deepStrictEqual( util.abbreviate(list), listAbbr );
	
	assert.deepStrictEqual( util.sanitizeSet([sample1_Shortened], list), [sample1_Row] );
	assert.deepStrictEqual( util.sanitizeSet([['a', 'b'], ['a', 'b', 'c', 'd', 'e', 'f', 'g']], list), [['a', 'b', '', '', ''], ['a', 'b', 'c', 'd', 'e']] );
	
	assert.deepStrictEqual( util.expandString(sample3_String, list), sample3_Expected );
	
	assert.strictEqual( util.capitalize("Hello,"), "Hello," );
	assert.strictEqual( util.capitalize("world!"), "World!" );
	
	assert.deepStrictEqual( util.arrFormat('x'), ['x'] );
	assert.deepStrictEqual( util.arrFormat(['x']), ['x'] );
	
	assert.strictEqual( util.rowsEqual(sample3_Expected[0], sample3_Expected[1]), false );
	assert.strictEqual( util.rowsEqual(['a', 'b'], ['a', 'b']), true );
	assert.strictEqual( util.rowsEqual(['a', 'b'], ['a', 'b', 'c']), true );
}());
