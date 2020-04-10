import {
	CreateCollection,
	CreateCollections,
	DropCollection,
	DropCollections,
	SchemaCollectionNames
} from "../src/Collections";
import { nth } from "rambda";

describe.skip("schema level operations for faunadb", () => {
	test("can create collections listed in schema.json", () => {
		CreateCollections.then(results => {
			expect(results.length).toBe(2);
		}).catch(e => {
			console.log(e);
		});
	});
	test("can create and drop collection", () => {
		const collectionName = nth(1, SchemaCollectionNames) as string;
		CreateCollection(collectionName)
			.then((createResult: any) => {
				expect(createResult.name).toBe(collectionName);
				return DropCollection(collectionName).then((dropResult: any) => {
					console.log(dropResult);
				});
			})
			.catch((e: any) => {
				console.log(e);
			});
	});

	test("can create and drop all collections", () => {
		CreateCollections.then((createResults: any) => {
			console.log(createResults);
			return DropCollections.then((dropResults: any) => {
				console.log(dropResults);
			});
		}).catch(e => {
			console.log(e);
		});
	});
});
