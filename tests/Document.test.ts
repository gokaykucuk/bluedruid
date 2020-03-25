
describe('document operations:', () => {

  test('reader can get documents', async () => {
    const getResult = await GetAllDocuments('deals');
    expect(getResult).toBeTruthy();
  });


});


