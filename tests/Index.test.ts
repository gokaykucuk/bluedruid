import {GetAllDocuments, MatchParamOnIndex, GetRefsByParams} from "../src/Document";

describe('index operations:', () => {
    test('reader can match param on idexes', async () => {
        const matchResult = await MatchParamOnIndex('deals', {
            key: 'url',
            value: 'https://urun.n11.com/kadin-parfum/lancome-la-vie-est-belle-edp-100-ml-kadin-parfum-P174446805'
        });
        expect(matchResult).toBeTruthy();
    });

    test('reader can get documents', async () => {
        const getResult = await GetAllDocuments('deals');
        expect(getResult).toBeTruthy();
    });

    test('can get elements after matching', async () =>{
      const result = await GetRefsByParams('deals',[{
          key: 'url',
        value: 'https://urun.n11.com/kadin-parfum/lancome-la-vie-est-belle-edp-100-ml-kadin-parfum-P174446805'
      }]);
      console.log(result);
      expect(result).toBeTruthy();
    });
});



// test('reader can generate index pairs', () => {
//     const result = paramsIndexPairs('test', ['hello','world'])
//     console.log(result);
// });
