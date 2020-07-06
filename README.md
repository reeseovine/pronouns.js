# pronoun.js

personal pronoun helper module. fork of [pronoun.is](https://github.com/witch-house/pronoun.is).


### The database

The pronouns "database" is an array of arrays meant to represent a table, located in [resources/pronouns.json][pronoun-database], with fields and example values as follows:

subject|object|possessive-determiner|possessive-pronoun|reflexive
-------|------|---------------------|------------------|---------
they   | them | their               | theirs           | themselves

If you have suggestions or changes to the database, please submit an issue or pull request with the [original repository](https://github.com/witch-house/pronoun.is) and published changes will be updated here by hand.

[pronoun-database]: resources/pronouns.json

### The code



### Tests

TBD

### The git repo

For most of this project's history we had separate `master` and `develop`
branches but that's proven to be more trouble than it's worth. Going
forward we'll be doing all development in feature branches off of `master`,
and PRs should be issued against `master`.

Please follow [this guide](https://chris.beams.io/posts/git-commit/)
for writing good commit messages :)

## Philosophy on pronoun inclusion

`pronoun.js` aims to be an easy way to handle numerous personal pronouns in English. It remains open-ended to allow for myriad use cases.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
