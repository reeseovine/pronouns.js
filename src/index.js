const util = require('./util');
const table = require('../resources/pronouns.json');

class Pronouns {
	constructor(input){
		this.pronouns = this._process(input);
		this.generateForms();
		this.generateExamples();
	}
	
	_process(input){
		if (typeof input === "string") return util.expandString(input, table); // passed a string, most common case.
		else if (typeof input === "object"){
			if (input.pronouns && Array.isArray(input.pronouns)) return util.sanitizeSet(input.pronouns, table); // passed a pronouns-like object.
			else if (Array.isArray(input)) return util.sanitizeSet(input, table); // passed an array representing some pronouns.
		} else {
			console.warn("Unrecognized input. Defaulting to they/them.");
			return util.tableLookup("they", table);
		}
	}
	
	generateForms(i){
		i = Number.isInteger(i) ? i : 0;
		
		// the 5 main pronoun types
		this.subject = this.pronouns[i][0];
		this.object = this.pronouns[i][1];
		this.determiner = this.pronouns[i][2];
		this.possessive = this.pronouns[i][3];
		this.reflexive = this.pronouns[i][4];
		
		// aliases
		this.sub = this.subject;
		this.obj = this.object;
		this.det = this.determiner;
		this.pos = this.possessive;
		this.ref = this.reflexive;
	}
	
	generateExamples(){
		this.examples = [];
		for (var i = 0, p; p = this.pronouns[i]; i++){
			this.examples.push([
				util.capitalize(`${p[0]} went to the park.`),
				util.capitalize(`I went with ${p[1]}.`),
				util.capitalize(`${p[0]} brought ${p[2]} frisbee.`),
				util.capitalize(`At least I think it was ${p[3]}.`),
				util.capitalize(`${p[0]} threw the frisbee to ${p[4]}.`)
			]);
		}
	}
	
	toString(){
		return this.pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join(' or ');
	}
	
	toUrl(){
		return `https://pronoun.is/${this.pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join('/:or/')}`;
	}
	
	add(input){
		var newRows = this._process(input);
		for (var i = 0, p; p = newRows[i]; i++){
			if (!this.pronouns.includes(p)){
				this.pronouns.push(p);
			}
		}
		this.generateExamples();
	}
}

module.exports = (input) => new Pronouns(input);
module.exports.util = util;
module.exports.table = table;
module.exports.abbreviated = util.abbreviate(table);
module.exports.Pronouns = Pronouns;
