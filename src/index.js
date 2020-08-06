const util = require('./util');
const table = require('../resources/pronouns.json');

module.exports = function(input){
	var pronouns;
	if (typeof input === "string") pronouns = util.expandString(input, table); // passed a string, most common option.
	else if (typeof input === "object"){
		if (input.pronouns && Array.isArray(input.pronouns)) pronouns = util.sanitizeSet(input.pronouns, table); // passed a pronouns-like object.
		else if (Array.isArray(input)) pronouns = util.sanitizeSet(input, table); // passed an array representing some pronouns.
	}
	
	return {
		pronouns,
		
		sub: pronouns[0][0], // subject
		subject: pronouns[0][0], // subject
		
		obj: pronouns[0][1], // object
		object: pronouns[0][1], // object
		
		det: pronouns[0][2], // possessive determiner
		determiner: pronouns[0][2], // possessive determiner
		
		pos: pronouns[0][3], // possessive
		possessive: pronouns[0][3], // possessive
		
		ref: pronouns[0][4], // reflexive
		reflexive: pronouns[0][4], // reflexive
		
		
		
		examples: (() => {
			var examples = [];
			for (var i = 0, p; p = pronouns[i]; i++){
				examples[i] = [
					util.capitalize(`${p[0]} went to the park.`),
					util.capitalize(`I went with ${p[1]}.`),
					util.capitalize(`${p[0]} brought ${p[2]} frisbee.`),
					util.capitalize(`At least I think it was ${p[3]}.`),
					util.capitalize(`${p[0]} threw the frisbee to ${p[4]}.`)
				];
			}
			return examples;
		})(),
		
		toString: () => pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join(' or '),
		
		url: `https://pronoun.is/${pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join('/:or/')}`, // deprecated, use toUrl()
		toUrl: () => `https://pronoun.is/${pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join('/:or/')}`
	}
}

module.exports.util = util;
module.exports.table = table;
module.exports.abbreviated = util.abbreviate(table);
