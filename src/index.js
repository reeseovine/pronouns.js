const util = require('./util');
const list = require('../resources/pronouns.json');

module.exports = class Pronoun {
	// util = util;
	// list = list;
	
	constructor(input){
		if (typeof input === "string") this.pronouns = util.expandString(input, list);
		else if (Array.isArr(input)) this.pronouns = input.map(p => util.sanitizeSet(p, list));
		// else if () this.pronouns = input.pronouns; // if passed a Pronoun instance, copy its data.
		
		this.sub = this.pronouns[0][0];
		this.obj = this.pronouns[0][1];
		this.det = this.pronouns[0][2];
		this.pos = this.pronouns[0][3];
		this.ref = this.pronouns[0][4];
	}
}
