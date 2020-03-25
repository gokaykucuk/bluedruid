import {CreateCollection, DropCollection} from '../src/Collections';
import {GetAllDocuments, CreateDocument} from '../src/Document';


describe('document operations:', () => {
  const testCollectionName = 'documents_test';
  const testData = {column: 'value'}
  beforeAll(()=>{
    CreateCollection(testCollectionName);
  });


  test('reader can get documents', async () => {
    const getResult = await GetAllDocuments('deals');
    expect(getResult).toBeTruthy();
  });

  test('create', () => {
    console.log(testCollectionName);
    console.log(testData);
    return CreateDocument(testCollectionName,['test_column'], testData).then((createResult: any){
      console.log(createResult);
    }).catch(console.log);
  });

  afterAll(()=>{
    DropCollection(testCollectionName);
  });
});


