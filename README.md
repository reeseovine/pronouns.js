# pronouns.js

personal pronoun helper module. fork of [pronoun.is](https://github.com/witch-house/pronoun.is).

`pronouns.js` aims to be an easy way to handle numerous personal pronouns in English. It remains open-ended to allow for myriad use cases. One possible application could be in a social media service in which users can add their pronoun(s) and the interface can refer to them properly.

Check out the demo [here](https://katacarbix.github.io/pronouns.js/demo/index.html).

## Basic usage

`npm i --save pronouns`

```js
const pronouns = require('pronouns');
const my = pronouns('they/them');

console.log(my.pronouns);
// ['they', 'them', 'their', 'theirs', 'themself']

console.log(my.subject);
// 'they'

console.log(pronouns.table);
// [
//   ["she", "her", "her", "hers", "herself"],
//   ["he", "him", "his", "his", "himself"],
//   ["they", "them", "their", "theirs", "themself"],
//   ["ze", "hir", "hir", "hirs", "hirself"],
//   ["ze", "zir", "zir", "zirs", "zirself"],
//   ["xey", "xem", "xyr", "xyrs", "xemself"],
//   ...
// ]
```

## The database

The pronouns "database" is a JSON object located in [resources/pronouns.json](resources/pronouns.json). The following table shows what each column means.

subject|object|possessive-determiner|possessive-pronoun|reflexive
-------|------|---------------------|------------------|---------
they   | them | their               | theirs           | themself

## The code

**`index.js`** is the main program. `pronouns` is both a function you can call with a string parameter, and an object with references to the table and a few methods.

**`util.js`** has most of what was translated from the original Clojure code. These functions are mostly meant for accessing rows in a table or formatting strings and is not needed for typical users, but is exposed nonetheless as `pronouns.util`.

For further documentation, check out [the wiki](https://github.com/katacarbix/pronouns.js/wiki).

## Tests

The `test/` directory contains unit tests for `index.js` and `util.js`. Please run the tests and confirm that everything passes before merging changes, and please include tests with any new logic you introduce in a PR!

## Contributing

Issues and pull/merge requests regarding the code are very much welcome! If you would like to request pronouns to be added to the table there is an issue template for doing so. You should also consider doing the same with the original repository.
