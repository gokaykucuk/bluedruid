import { setupFaunaDB, resumeFaunaDB, destroyFaunaDB } from '../src/Commands';
import { pipe } from 'ramda';
import { CreateCollections, DropCollections } from '../src/Collections';

export const commandsStore = {
	fauna: {
		start: setupFaunaDB,
		resume: resumeFaunaDB,
		cleanStart: pipe(destroyFaunaDB, setupFaunaDB)
	},
	collections: {
		create: CreateCollections,
		drop: DropCollections
	},
	indexes: {
		create: ""
	}
};
