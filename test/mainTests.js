const assert = require('assert');
const pronouns = require('../src/index');

(function() {
	const sample1_String = "she/her or they/them";
	const sample1_toString = "she or they/.../themself";
	const sample1_Array = [
		['she', 'her', 'her', 'hers', 'herself'],
		['they', 'them', 'their', 'theirs', 'themself']
	];
	const sample1_examples = [
		[
			'She went to the park.',
			'I went with her.',
			'She brought her frisbee.',
			'At least I think it was hers.',
			'She threw the frisbee to herself.'
		],
		[
			'They went to the park.',
			'I went with them.',
			'They brought their frisbee.',
			'At least I think it was theirs.',
			'They threw the frisbee to themself.'
		]
	];
	const sample1_URL = "https://pronoun.is/she/:or/they/.../themself";
	const sample1_Obj = pronouns(sample1_String);
	
	const sample2_String = "fae/faer";
	const sample2_toString = "fae";
	const sample2_Array = [
		["fae", "faer", "faer", "faers", "faerself"]
	];
	const sample2_examples = [
		[
			'Fae went to the park.',
			'I went with faer.',
			'Fae brought faer frisbee.',
			'At least I think it was faers.',
			'Fae threw the frisbee to faerself.'
		]
	];
	const sample2_URL = "https://pronoun.is/fae";
	const sample2_Obj = pronouns(sample2_String);
	
	assert.deepStrictEqual( sample1_Obj.pronouns, sample1_Array );
	assert.deepStrictEqual( sample1_Obj.sub, sample1_Array[0][0] );
	assert.deepStrictEqual( sample1_Obj.obj, sample1_Array[0][1] );
	assert.deepStrictEqual( sample1_Obj.det, sample1_Array[0][2] );
	assert.deepStrictEqual( sample1_Obj.pos, sample1_Array[0][3] );
	assert.deepStrictEqual( sample1_Obj.ref, sample1_Array[0][4] );
	assert.deepStrictEqual( sample1_Obj.examples, sample1_examples );
	assert.strictEqual( sample1_Obj.toString(), sample1_toString );
	assert.strictEqual( sample1_Obj.toUrl(), sample1_URL );
	
	assert.deepStrictEqual( sample2_Obj.pronouns, sample2_Array );
	assert.deepStrictEqual( sample2_Obj.sub, sample2_Array[0][0] );
	assert.deepStrictEqual( sample2_Obj.obj, sample2_Array[0][1] );
	assert.deepStrictEqual( sample2_Obj.det, sample2_Array[0][2] );
	assert.deepStrictEqual( sample2_Obj.pos, sample2_Array[0][3] );
	assert.deepStrictEqual( sample2_Obj.ref, sample2_Array[0][4] );
	assert.deepStrictEqual( sample2_Obj.examples, sample2_examples );
	assert.strictEqual( sample2_Obj.toString(), sample2_toString );
	assert.strictEqual( sample2_Obj.toUrl(), sample2_URL );
}());
