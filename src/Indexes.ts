import { faunaClient, q } from "./Connection";
import { map, pipe, concat, filter, defaultTo } from "ramda";
import { get, all } from "shades";
import { ReadDefaultSchema } from "./utils";
import { Collection } from "./Collections";

export type IndexDef = {
  terms: Array<string>;
  values: Array<string>;
  unique: boolean;
};

export const faunaIndexDef = pipe(
  map((columnName: string) => ({ field: ["data", columnName] })),
  concat([{ field: ["ref"] }])
);

export const CreateIndex = (
  indexName: string,
  collectionName: string,
  def: IndexDef
) =>
  faunaClient.query(
    q.CreateIndex({
      name: indexName,
      source: q.Collection(collectionName),
      terms: faunaIndexDef(def.terms),
      values: faunaIndexDef(def.values),
      unique: def.unique
    })
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

export const CreateIndexes = () => {};
//   terms: [{ field: ['data', 'iataCode'] }],
//   values: [{ field: ['data', 'iataCode'] }, { field: ['data', 'name'] }, { field: ['ref'] }],
//   unique: true

// await faunaClient.query(q.Map(collectionNames, q.Lambda('collectionName', q.CreateIndex({
//     name: q.Concat(['all_', q.Var('collectionName')]),
//     source: q.Collection(q.Var('collectionName'))
//   }))));
