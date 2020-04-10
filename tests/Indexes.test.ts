import {
	faunaIndexDef,
	allIndexedCollectionNames,
	CreateIndexes,
	collectionsWithIndexes,
	CreateIndex
} from "../src/Indexes";
import { head } from "rambda";
import { CreateCollection } from "../src/Collections";

describe("index operations:", () => {
	test("can generate fauna index definitions", () => {
		const indexDefinitions = ["test"];
		const faunaDefs = faunaIndexDef(indexDefinitions);
		expect(faunaDefs.length).toBe(2);
	});

	test("can read all indexes correctly", () => {
		expect(head(allIndexedCollectionNames)).toBe("collection2_name");
	});
	test("can get collections only with indexes", () => {
		const collections = collectionsWithIndexes;
		expect(collections.length).toBe(2);
	});

	test("can create index on field", () => {
		const collectionName = "index_creation_test";
		CreateCollection(collectionName).then((createCollectionResult: any) =>
			CreateIndex(collectionName, {
				terms: ["test"],
				values: ["test"],
				unique: false
			})
		);
		const createdIndexes = CreateIndexes();
		console.log(createdIndexes);
	});

	//     test('reader can match param on idexes', async () => {
	//         const matchResult = await MatchParamOnIndex('deals', {
	//             key: 'url',
	//             value: 'https://urun.n11.com/kadin-parfum/lancome-la-vie-est-belle-edp-100-ml-kadin-parfum-P174446805'
	//         });
	//         expect(matchResult).toBeTruthy();
	//     });

	//     test('reader can get documents', async () => {
	//         const getResult = await GetAllDocuments('deals');
	//         expect(getResult).toBeTruthy();
	//     });

	//     test('can get elements after matching', async () =>{
	//       const result = await GetRefsByParams('deals',[{
	//           key: 'url',
	//         value: 'https://urun.n11.com/kadin-parfum/lancome-la-vie-est-belle-edp-100-ml-kadin-parfum-P174446805'
	//       }]);
	//       console.log(result);
	//       expect(result).toBeTruthy();
	//     });
});

// test('reader can generate index pairs', () => {
//     const result = paramsIndexPairs('test', ['hello','world'])
//     console.log(result);
// });
