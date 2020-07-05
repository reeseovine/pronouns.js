module.exports = class Pronoun {
	const util = require('./util');
	const list = require('../resources/pronouns.json');
	
	constructor(shortString){
		this.pronouns = expandString(shortString);
		
		this.sub = this.pronouns[0][0];
		this.obj = this.pronouns[0][1];
		this.det = this.pronouns[0][2];
		this.pos = this.pronouns[0][3];
		this.ref = this.pronouns[0][4];
	}
}
