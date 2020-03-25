import {findNestedCommand} from '../src/Command'
import { CreateCollection, CreateCollections} from '../src/Collections';


describe('schema level operations for faunadb', () => {

    test("calls creation function with correct command",()=>{
        const command = findNestedCommand(['debug', 'cwd']);
        expect(command()).toBe(process.cwd());
    });
    
    test("can create collections listed in schema.yaml", () => {
        CreateCollections().then((results)=>{
            expect(results.length).toBe(2);
        }).catch((e)=>{
            console.log(e);
        });
    });

    test("can delete collection", ()=> {
        CreateCollection('deletion_test').then((result:any)=>{
            console.log(result);
        })
    });
    
    test('can list collections', () => {
        CreateCollection('collection_test_list').then((result: any) => { 
            expect(result.name).toBe('collection_test_list');
            console.log(result);
        });
    });
});
