import {CreateCollection, DropCollection} from '../src/Collections';
import {GetAllDocuments, CreateDocument} from '../src/Documents';


describe('document operations:', () => {
  const testCollectionName = 'documents_test';
  const testData = {column: 'value'}
  beforeAll(()=>{
    return CreateCollection(testCollectionName);
  });


  test.skip('reader can get documents', async () => {
    const getResult = await GetAllDocuments('deals');
    expect(getResult).toBeTruthy();
  });

  test('create', () => {
    return CreateDocument(testCollectionName,['test_column'], testData).then((createResult: any) => {
      return expect(createResult.ref).toBeTruthy();
    }).catch(console.log);
  });

  afterAll(()=>{
    DropCollection(testCollectionName);
  });
});


