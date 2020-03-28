import { SchemaCollections, SchemaCollectionNames } from "../src/Collections";

describe("collection operations:", () => {
  test("can read collections", () => {
    const collections = SchemaCollections();
    expect(collections?.length).toBe(4);
  });
  test("can get collection names", () => {
    const collectionNames = SchemaCollectionNames();
    expect(collectionNames?.length).toBe(4);
  });
});
