const util = require('./util');
const table = require('../resources/pronouns.json');

class Pronouns {
	constructor(pronouns){
		this.pronouns = pronouns;
		this.generateForms();
		this.generateExamples();
	}
	
	generateForms(i){
		i = Number.isInteger(i) ? i : 0;
		
		this.sub = this.pronouns[i][0]; // subject
		this.subject = this.pronouns[i][0]; // subject
		
		this.obj = this.pronouns[i][1]; // object
		this.object = this.pronouns[i][1]; // object
		
		this.det = this.pronouns[i][2]; // possessive determiner
		this.determiner = this.pronouns[i][2]; // possessive determiner
		
		this.pos = this.pronouns[i][3]; // possessive
		this.possessive = this.pronouns[i][3]; // possessive
		
		this.ref = this.pronouns[i][4]; // reflexive
		this.reflexive = this.pronouns[i][4]; // reflexive
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
}

module.exports = function(input){
	var pronouns;
	if (typeof input === "string") pronouns = util.expandString(input, table); // passed a string, most common option.
	else if (typeof input === "object"){
		if (input.pronouns && Array.isArray(input.pronouns)) pronouns = util.sanitizeSet(input.pronouns, table); // passed a pronouns-like object.
		else if (Array.isArray(input)) pronouns = util.sanitizeSet(input, table); // passed an array representing some pronouns.
	}
	
	return new Pronouns(pronouns);
}

module.exports.util = util;
module.exports.table = table;
module.exports.abbreviated = util.abbreviate(table);
