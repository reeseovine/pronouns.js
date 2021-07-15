const util = require('./util');
const table = require('../resources/pronouns.json');

var opts = {
	log: false,
	default: "they/them"
};

class Pronouns {
	constructor(input){
		this.pronouns = this._process(input);
		this.generateForms();
		this.generateExamples();
	}
	
	_process(input){
		if (typeof input == "string"){
			if (!this.hasOwnProperty('any') || !this.any) this.any = !!input.match(/(\b(any(thing)?|all)\b|\*)/);
			return util.expandString(input, table); // passed a string, most common case.
		}
		if (opts.log) console.warn(`Unrecognized input. Defaulting to ${opts.default}.`);
		return util.expandString(opts.default, table);
	}
	
	generateForms(i){
		i = Number.isInteger(parseInt(i)) ? parseInt(i) : 0;
		var p = (this.pronouns && this.pronouns.length > 0) ? this.pronouns[i] : util.expandString(opts.default, table);
		
		// the 5 main pronoun types
		this.subject = p[0];
		this.object = p[1];
		this.determiner = p[2];
		this.possessive = p[3];
		this.reflexive = p[4];
		
		// aliases
		this.sub = this.subject;
		this.obj = this.object;
		this.det = this.determiner;
		this.pos = this.possessive;
		this.ref = this.reflexive;
	}
	
	generateExamples(){
		this.examples = [];
		this.examples_html = [];
		this.examples_md = [];
		var i = 0;
		var p = (i < this.pronouns.length) ? this.pronouns[i] : util.expandString(opts.default, table);
		do {
			this.examples.push([
				util.capitalize(`${p[0]} went to the park.`),
				util.capitalize(`I went with ${p[1]}.`),
				util.capitalize(`${p[0]} brought ${p[2]} frisbee.`),
				util.capitalize(`At least I think it was ${p[3]}.`),
				util.capitalize(`${p[0]} threw the frisbee to ${p[4]}.`)
			]);
			this.examples_html.push([
				`<strong>${util.capitalize(p[0])}</strong> went to the park.`,
				util.capitalize(`I went with <strong>${p[1]}</strong>.`),
				`<strong>${util.capitalize(p[0])}</strong> brought <strong>${p[2]}</strong> frisbee.`,
				util.capitalize(`At least I think it was <strong>${p[3]}</strong>.`),
				`<strong>${util.capitalize(p[0])}</strong> threw the frisbee to <strong>${p[4]}</strong>.`
			]);
			this.examples_md.push([
				util.capitalize(`**${p[0]}** went to the park.`),
				util.capitalize(`I went with **${p[1]}**.`),
				util.capitalize(`**${p[0]}** brought **${p[2]}** frisbee.`),
				util.capitalize(`At least I think it was **${p[3]}**.`),
				util.capitalize(`**${p[0]}** threw the frisbee to **${p[4]}**.`)
			]);
			i++;
		} while (p = this.pronouns[i]);
	}
	
	toString(){
		return this.pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).concat(this.any ? [['any']] : []).join(' or ');
	}
	
	toUrl(){
		return `https://pronoun.is/${this.pronouns.map(p => util.shortestUnambiguousPath(table, p).join('/')).join('/:or/')}`;
	}
	
	add(input){
		var newRows = this._process(input);
		this.pronouns = this.pronouns.concat(newRows.filter(p1 => {
			for (var p2 of this.pronouns){
				if (util.rowsEqual(p2,p1)) return false;
			}
			return true;
		}));
		this.generateExamples();
	}
}

module.exports = (input, options) => {
	var p;
	
	if (typeof input == "string") p = new Pronouns(input);
	else if (typeof input == "object" && !!options) options = input;
	
	if (typeof options == "object") opts = {...opts, ...options};
	util.options = opts;
	
	return p;
}
module.exports.complete = (input) => {
	var sepIndex = input.lastIndexOf(' ') + 1;
	var rest = input.substring(0, sepIndex).replace(/\s+/g, ' ');
	var last = input.substring(sepIndex, input.length);
	
	// Generate list of matching rows
	var matches = [];
	if (last.length == 0){
		matches = [...table]; // Clone the table so it doesn't get changed
	} else {
		var parts = last.split('/');
		var end = parts.pop();
		console.dir(parts);
		console.log(end);
		matches = util.tableWalkFilter(parts, table).filter(row => {
			for (var f of row.slice(parts.length, row.length)){
				if (end.length <= f.length && f.substring(0,end.length) === end) return true;
			}
			return false;
		});
		if (matches.length == 0){
			rest += parts.slice(0,parts.length-1).join('/')+'/';
			matches = table.filter(row => row.length == 1);
		}
		console.dir(matches);
	}
	
	// Filter matches to those which are not already in rest of input
	var all = util.expandString(rest, table);
	matches = matches.filter(m => {
		for (var p of all){
			if (util.rowsEqual(p,m)) return false;
		}
		return true;
	});
	
	if (opts.log && matches.length == 0) console.log(`No matches for ${input} found.`);
	
	return matches.map(row => rest + util.shortestUnambiguousPath(table, row).join('/'));
}
module.exports.util = util;
module.exports.table = table;
module.exports.abbreviated = util.abbreviate(table);
module.exports.Pronouns = Pronouns;
