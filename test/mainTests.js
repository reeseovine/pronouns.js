const assert = require('assert');
const pronouns = require('../src/index');

(function(){
	/* Basic usage */
	const sample1_String = "she/her or they/them";
	const sample1_Obj = pronouns(sample1_String);
	sample1_Obj.add("they");
	
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
	
	assert.deepStrictEqual( sample1_Obj.pronouns, sample1_Array );
	assert.deepStrictEqual( sample1_Obj.sub, sample1_Array[0][0] );
	assert.deepStrictEqual( sample1_Obj.obj, sample1_Array[0][1] );
	assert.deepStrictEqual( sample1_Obj.det, sample1_Array[0][2] );
	assert.deepStrictEqual( sample1_Obj.pos, sample1_Array[0][3] );
	assert.deepStrictEqual( sample1_Obj.ref, sample1_Array[0][4] );
	assert.deepStrictEqual( sample1_Obj.examples, sample1_examples );
	assert.strictEqual( sample1_Obj.toString(), sample1_toString );
	assert.strictEqual( sample1_Obj+"", sample1_toString );
	assert.strictEqual( sample1_Obj.toUrl(), sample1_URL );
	assert.strictEqual( sample1_Obj.any, false );
	
	
	/* Adding more later */
	const sample2_String = "fae/faer";
	const sample2_Obj = pronouns(sample2_String);
	sample2_Obj.add("e/em");
	
	const sample2_toString = "fae or e";
	const sample2_Array = [
		["fae", "faer", "faer", "faers", "faerself"],
		["e", "em", "eir", "eirs", "emself"]
	];
	const sample2_examples = [
		[
			'Fae went to the park.',
			'I went with faer.',
			'Fae brought faer frisbee.',
			'At least I think it was faers.',
			'Fae threw the frisbee to faerself.'
		],
		[
			'E went to the park.',
			'I went with em.',
			'E brought eir frisbee.',
			'At least I think it was eirs.',
			'E threw the frisbee to emself.'
		]
	];
	const sample2_URL = "https://pronoun.is/fae/:or/e";
	
	assert.deepStrictEqual( sample2_Obj.pronouns, sample2_Array );
	assert.deepStrictEqual( sample2_Obj.sub, sample2_Array[0][0] );
	assert.deepStrictEqual( sample2_Obj.obj, sample2_Array[0][1] );
	assert.deepStrictEqual( sample2_Obj.det, sample2_Array[0][2] );
	assert.deepStrictEqual( sample2_Obj.pos, sample2_Array[0][3] );
	assert.deepStrictEqual( sample2_Obj.ref, sample2_Array[0][4] );
	assert.deepStrictEqual( sample2_Obj.examples, sample2_examples );
	assert.strictEqual( sample2_Obj.toString(), sample2_toString );
	assert.strictEqual( `${sample2_Obj}`, sample2_toString );
	assert.strictEqual( sample2_Obj.toUrl(), sample2_URL );
	assert.strictEqual( sample2_Obj.any, false );
	
	
	/* Wildcard without alternatives */
	const sample3_String = "any/all";
	const sample3_Obj = pronouns(sample3_String);
	
	const sample3_toString = "any";
	const sample3_Array = [];
	const sample3_examples = [sample1_examples[1]];
	const sample3_URL = "https://pronoun.is/";
	
	assert.deepStrictEqual( sample3_Obj.pronouns, sample3_Array );
	assert.deepStrictEqual( sample3_Obj.sub, sample1_Array[1][0] );
	assert.deepStrictEqual( sample3_Obj.obj, sample1_Array[1][1] );
	assert.deepStrictEqual( sample3_Obj.det, sample1_Array[1][2] );
	assert.deepStrictEqual( sample3_Obj.pos, sample1_Array[1][3] );
	assert.deepStrictEqual( sample3_Obj.ref, sample1_Array[1][4] );
	assert.deepStrictEqual( sample3_Obj.examples, sample3_examples );
	assert.strictEqual( sample3_Obj.toString(), sample3_toString );
	assert.strictEqual( sample3_Obj+"", sample3_toString );
	assert.strictEqual( sample3_Obj.toUrl(), sample3_URL );
	assert.strictEqual( sample3_Obj.any, true );
	
	
	/* Wildcard with 1 alternative */
	const sample4_String = "any she";
	const sample4_Obj = pronouns(sample4_String);

	const sample4_toString = "she or any";
	const sample4_Array = [sample1_Array[0]];
	const sample4_examples = [sample1_examples[0]];
	const sample4_URL = "https://pronoun.is/she";

	assert.deepStrictEqual( sample4_Obj.pronouns, sample4_Array );
	assert.deepStrictEqual( sample4_Obj.sub, sample1_Array[0][0] );
	assert.deepStrictEqual( sample4_Obj.obj, sample1_Array[0][1] );
	assert.deepStrictEqual( sample4_Obj.det, sample1_Array[0][2] );
	assert.deepStrictEqual( sample4_Obj.pos, sample1_Array[0][3] );
	assert.deepStrictEqual( sample4_Obj.ref, sample1_Array[0][4] );
	assert.deepStrictEqual( sample4_Obj.examples, sample4_examples );
	assert.strictEqual( sample4_Obj.toString(), sample4_toString );
	assert.strictEqual( sample4_Obj+"", sample4_toString );
	assert.strictEqual( sample4_Obj.toUrl(), sample4_URL );
	assert.strictEqual( sample4_Obj.any, true );

	
	/* Completion */
	// assert.deepStrictEqual( pronouns.complete("th"), ["they/.../themself", "they/.../themselves", "thon"] );
	// assert.deepStrictEqual( pronouns.complete("they/fa"), ["they/fae"] );
}());
