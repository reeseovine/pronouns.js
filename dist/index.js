(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pronouns = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=[
	["she", "her", "her", "hers", "herself"],
	["he", "him", "his", "his", "himself"],
	["they", "them", "their", "theirs", "themself"],
	["ze", "hir", "hir", "hirs", "hirself"],
	["ze", "zir", "zir", "zirs", "zirself"],
	["xey", "xem", "xyr", "xyrs", "xemself"],
	["ae", "aer", "aer", "aers", "aerself"],
	["e", "em", "eir", "eirs", "emself"],
	["ey", "em", "eir", "eirs", "eirself"],
	["fae", "faer", "faer", "faers", "faerself"],
	["fey", "fem", "feir", "feirs", "feirself"],
	["hu", "hum", "hus", "hus", "humself"],
	["it", "it", "its", "its", "itself"],
	["jee", "jem", "jeir", "jeirs", "jemself"],
	["kit", "kit", "kits", "kits", "kitself"],
	["ne", "nem", "nir", "nirs", "nemself"],
	["peh", "pehm", "peh's", "peh's", "pehself"],
	["per", "per", "per", "pers", "perself"],
	["sie", "hir", "hir", "hirs", "hirself"],
	["se", "sim", "ser", "sers", "serself"],
	["shi", "hir", "hir", "hirs", "hirself"],
	["si", "hyr", "hyr", "hyrs", "hyrself"],
	["they", "them", "their", "theirs", "themselves"],
	["thon", "thon", "thons", "thons", "thonself"],
	["ve", "ver", "vis", "vis", "verself"],
	["ve", "vem", "vir", "virs", "vemself"],
	["vi", "ver", "ver", "vers", "verself"],
	["vi", "vim", "vir", "virs", "vimself"],
	["vi", "vim", "vim", "vims", "vimself"],
	["xie", "xer", "xer", "xers", "xerself"],
	["xe", "xem", "xyr", "xyrs", "xemself"],
	["xey", "xem", "xeir", "xeirs", "xemself"],
	["yo", "yo", "yos", "yos", "yosself"],
	["ze", "zem", "zes", "zes", "zirself"],
	["ze", "mer", "zer", "zers", "zemself"],
	["zee", "zed", "zeta", "zetas", "zedself"],
	["zie", "zir", "zir", "zirs", "zirself"],
	["zie", "zem", "zes", "zes", "zirself"],
	["zie", "hir", "hir", "hirs", "hirself"],
	["zme", "zmyr", "zmyr", "zmyrs", "zmyrself"]
]

},{}],2:[function(require,module,exports){
module.exports = {
	// logging turned off by default.
	logging: false,
	
	// filter table to the rows which begin with q
	tableFrontFilter: function(q, table){
		var qlen = q.length;
		return table.filter(row => this.rowsEqual(q, row) );
	},
	
	// filter table to the rows which end with q
	// TODO: make this more concise if possible
	tableEndFilter: function(q, table){
		var qlen = q.length;
		return table.filter(row => {
			for (var i = 0; i < qlen; i++){
				if (row[row.length-1-i] != q[qlen-1-i]) return false;
			}
			return true;
		});
	},

	// find the row corresponding to q in table
	tableLookup: function(q, table){
		if (q.includes('...')){
			var queryFront = q.slice(0, q.indexOf('...'));
			var queryEnd = q.slice(q.indexOf('...')+1);
			var frontMatches = this.tableFrontFilter(queryFront, table);
			return this.tableEndFilter(queryEnd, frontMatches)[0];
		}
		return this.tableFrontFilter(q, table)[0];
	},
	
	// Compute the shortest (in number of path elements) forward path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousForwardPath: function(table, row){
		for (var n = 1; n < table.length; n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, table).length <= 1){
				return rowFront;
			}
		}
	},
	
	// Compute the shortest (in number of path elements) ellipses path which
    // unambiguously refers to a specific <row> in a <table>. The behavior of
    // this function is undefined if given a <row> that is not in the <table>.
	shortestUnambiguousEllipsesPath: function(table, row){
		var rowEnd = row[row.length-1];
		var filteredTable = this.tableEndFilter(rowEnd, table);
		for (var n = 1; n < table.length; n++){
			var rowFront = row.slice(0, n);
			if (this.tableFrontFilter(rowFront, filteredTable).length <= 1){
				return rowFront.concat(['...', rowEnd]);
			}
		}
	},
	
	// Compute the shortest (in number of path elements) path which unambiguously
    // refers to a specific <row> in a <table>. The behavior of this function is
    // undefined if given a <row> that is not in the <table>.
	//
    // A path can either be a 'forward path', in which it specifies the row with
    // elements from the front (e.g. ze/zir), or an 'ellipses path', which elides
    // unnecessary elements from the middle (e.g. they/.../themselves). If the
    // shortest forward and ellipses paths are the same length, prefer the forward
    // path
	shortestUnambiguousPath: function(table, row){
		var forwardPath = this.shortestUnambiguousForwardPath(table, row);
		var ellipsesPath = this.shortestUnambiguousEllipsesPath(table, row);
		
		if (forwardPath.length > ellipsesPath.length) return ellipsesPath;
		else return forwardPath;
	},
	
	// return the list of minimum unabiguous paths from a <table>
	abbreviate: function(table){
		return table.map(row => this.shortestUnambiguousPath(table, row));
	},
	
	sanitizeSet: function(p, table){
		var out = [];
		for (var row of p){
			var match = this.tableLookup(row, table);
			if (!match){
				if (row.some(p => p.match(/(\b(any(thing)?|all)\b|\*)/))){
					if (this.logging) console.log(`Wildcard detected.`);
					continue;
				}
				if (this.logging) console.warn(`Unrecognized pronoun "${row.join('/')}". This may lead to unexpected behavior.`);
				while (row.length < 5){
					row.push('');
				}
				if (row.length > 5){
					row = row.slice(0,5);
				}
				out.push(row);
			} else out.push(match);
		}
		return out;
	},
	
	expandString: function(str, table){
		return this.sanitizeSet(str.split(' ').filter(p => !p.match(/[Oo][Rr]/g)).map(p => p.replace(/[^a-zA-Z\/'.]/, '').toLowerCase().split('/')), table);
	},
	
	// wrap a value <x> in an array if it is not already in one.
	arrFormat: function(x){
		if (!Array.isArray(x)) return [x];
		return x;
	},
	
	// capitalize first letter of a given string
	capitalize: function(str){
		return str.replace(/[a-zA-Z]/, l => l.toUpperCase());
	},
	
	// check if two arrays are similar. will permit array b to be longer by design.
	rowsEqual: function(a, b){
		for (var i = 0; i < a.length; i++){
			if (a[i] != b[i]) return false;
		}
		return true;
	}
}

},{}],3:[function(require,module,exports){
const util = require('./util');
const table = require('../resources/pronouns.json');
var logging = false;

class Pronouns {
	constructor(input){
		this.pronouns = this._process(input);
		this.generateForms();
		this.generateExamples();
	}
	
	_process(input){
		
		if (typeof input === "string"){
			if (!this.hasOwnProperty('any') || !this.any) this.any = !!input.match(/(\b(any(thing)?|all)\b|\*)/);
			return util.expandString(input, table); // passed a string, most common case.
		}
		else if (typeof input === "object"){
			if (input.pronouns && Array.isArray(input.pronouns)) return util.sanitizeSet(input.pronouns, table); // passed a pronouns-like object.
			else if (Array.isArray(input)) return util.sanitizeSet(input, table); // passed an array representing some pronouns.
		} else {
			if (logging) console.warn("Unrecognized input. Defaulting to they/them.");
			return util.tableLookup("they", table);
		}
	}
	
	generateForms(i){
		i = Number.isInteger(parseInt(i)) ? parseInt(i) : 0;
		
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
		this.examples_html = [];
		this.examples_md = [];
		for (var i = -1; i < this.pronouns.length; i++){
			var p;
			if (this.pronouns.length == 0){
				if (logging) console.warn("Pronouns array empty. Defaulting to they/them.");
				p = util.tableLookup("they", table);
			}
			else p = this.pronouns[i];
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

module.exports = (input, log) => {
	logging = !!log; // convert it to a boolean value
	util.logging = logging;
	return new Pronouns(input);
}
module.exports.complete = (input) => {
	var rest = input.substring(0, input.lastIndexOf(' ') + 1).replace(/\s+/g, ' ');
	var last = input.substring(input.lastIndexOf(' ') + 1, input.length);
	
	// Generate list of matching rows
	var matches = [];
	if (last.length == 0){
		matches = table.slice(); // Clones the table so it doesn't get changed
		if (!rest.match(/[Oo][Rr]\s$/g)) matches.unshift(['or']);
	} else {
		var parts = last.split('/');
		var end = parts.pop();
		matches = util.tableFrontFilter(parts, table);
		matches = matches.filter(row => row[parts.length].substring(0, end.length) === end);
		if (last.match(/^[Oo][Rr]?$/g)) matches.unshift(['or']);
	}
	
	// Filter matches to those which are not already in rest of input
	var all = util.expandString(rest, table);
	matches = matches.filter(m => {
		for (var p of all){
			if (util.rowsEqual(p,m)) return false;
		}
		return true;
	});
	
	if (logging && matches.length == 0) console.log(`No matches for ${input} found.`);
	
	return matches.map(row => rest + util.shortestUnambiguousPath(table, row).join('/'));
}
module.exports.util = util;
module.exports.table = table;
module.exports.abbreviated = util.abbreviate(table);
module.exports.Pronouns = Pronouns;

},{"../resources/pronouns.json":1,"./util":2}]},{},[3])(3)
});
