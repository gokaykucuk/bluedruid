// import {GetAllDocuments, MatchParamOnIndex, GetRefsByParams} from "../src/Document";
import { faunaIndexDef, allIndexedCollectionNames } from "../src/Indexes";
import { head } from "ramda";

describe("index operations:", () => {
  test("can generate fauna index definitions", () => {
    const indexDefinitions = ["test"];
    const faunaDefs = faunaIndexDef(indexDefinitions);
    expect(faunaDefs.length).toBe(2);
  });

  test("can read all indexes correctly", () => {
    const foundAllIndexes = allIndexedCollectionNames();
    expect(head(foundAllIndexes)).toBe("collection2_name");
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
