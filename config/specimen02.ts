const commands = require('../src/Commands');
const pipe = require('rambda');
const collections = require('../src/Collections');

module.exports = {
	fauna: {
		start: commands.setupFaunaDB,
		resume: commands.resumeFaunaDB,
		cleanStart: pipe(commands.destroyFaunaDB, commands.setupFaunaDB)
	},
	collections: {
		create: collections.CreateCollections,
		drop: collections.DropCollections
	},
	indexes: {
		create: ""
	}
};
