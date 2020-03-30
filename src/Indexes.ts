import { faunaClient, q } from "./Connection";
import { map, pipe, concat, filter, isNil, reject, curry } from "ramda";
import { get, all } from "shades";
import { ReadDefaultSchema } from "./utils";
import { Collection, SchemaCollections } from "./Collections";

export type IndexDef = {
  terms: Array<string>;
  values: Array<string>;
  unique: boolean;
};

export const faunaIndexDef = pipe(
  map((columnName: string) => ({ field: ["data", columnName] })),
  concat([{ field: ["ref"] }])
);

export const CreateIndex = curry((collectionName: string, def: IndexDef) =>
  faunaClient.query(
    q.CreateIndex({
      name: `${collectionName}_by_${def.terms.join("_and_")}`,
      source: q.Collection(collectionName),
      terms: faunaIndexDef(def.terms),
      values: faunaIndexDef(def.values),
      unique: def.unique
    })
  )
);

export const CreateAllIndex = (collectionName: string) =>
  faunaClient.query(
    q.CreateIndex({
      name: `all_${collectionName}`,
      source: q.Collection(collectionName)
    })
  );

const hasAllIndex = (collection: Collection) => collection.index_all;
export const allIndexedCollectionNames = pipe(
  ReadDefaultSchema,
  get("collections"),
  //@ts-ignore
  filter(hasAllIndex),
  map(get("name"))
);

export const CreateAllIndexes = pipe(
  allIndexedCollectionNames,
  map(CreateAllIndex)
);

export const indexes = pipe(
  ReadDefaultSchema,
  get("collections", all(), "indexes")
);

export const collectionsWithIndexes = pipe(
  SchemaCollections,
  //@ts-ignore
  filter(get("indexes"))
);

export const createCollectionOnIndexes = (collection: Collection) =>
  Promise.all(map(CreateIndex(collection.name), collection.indexes));

export const CreateIndexes = () =>
  pipe(
    //@ts-ignore
    collectionsWithIndexes,
    map(createCollectionOnIndexes)
  );
//   terms: [{ field: ['data', 'iataCode'] }],
//   values: [{ field: ['data', 'iataCode'] }, { field: ['data', 'name'] }, { field: ['ref'] }],
//   unique: true

// await faunaClient.query(q.Map(collectionNames, q.Lambda('collectionName', q.CreateIndex({
//     name: q.Concat(['all_', q.Var('collectionName')]),
//     source: q.Collection(q.Var('collectionName'))
//   }))));
