import { faunaClient, q } from "./Connection";
import { ReadDefaultSchema } from "./utils";
import { map, pipe, path, lensPath } from "rambda";
import { IndexDef } from "./Indexes";

export type Collection = {
	name: string;
	index_all: boolean;
	indexes: Array<IndexDef>;
};

export const SchemaCollections = pipe(
	ReadDefaultSchema,
	lensPath(["collections"])
);
//@ts-ignore
export const SchemaCollectionNames = map(get("name"), SchemaCollections());

export const CreateCollection = (collectionName: string) => {
	return faunaClient.query(q.CreateCollection({ name: collectionName }));
};

export const DropCollection = (collectionName: string) => {
	return faunaClient.query(q.Delete(q.Collection(collectionName)));
};

export const CreateCollections = Promise.all(map(CreateCollection, SchemaCollectionNames()));

export const DropCollections = Promise.all(
	map(SchemaCollectionNames(), DropCollection)
);
export const ListCollections = () => {
	return faunaClient.query(q.Paginate(q.Collections()));
};

export const ListIndexes = () => {
	return faunaClient.query(q.Paginate(q.Indexes()));
};

export const ListDatabases = () => {
	return faunaClient.query(q.Paginate(q.Databases()));
};
