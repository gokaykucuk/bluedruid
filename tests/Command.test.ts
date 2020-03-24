import {findNestedCommand} from '../src/Command'
import { CreateCollection, CreateCollections, DropCollection } from '../src/Collections';


describe('schema level operations for faunadb', () => {

    test("calls creation function with correct command",()=>{
        const command = findNestedCommand(['debug', 'cwd']);
        expect(command()).toBe(process.cwd());
    });
    
    test("can create collections", () => {
        CreateCollections().then((results)=>{
            expect(results.length).toBe(2);
        }).catch((e)=>{
            console.log(e);
        });
    });
    
    test('can list collections', () => {
        CreateCollection('collection_test_list').then((result: any) => { 
            expect(result.name).toBe('collection_test_list');
            console.log(result);
        });
    });
});
