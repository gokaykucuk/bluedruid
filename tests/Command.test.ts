import {findNestedCommand} from '../src/Command'
import { CreateCollection, CreateCollections } from '../src/Collections';

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
    
    test('can list collections', async () => {
        CreateCollection('list_tests').then((result) => { 
            console.log(result);
        }).catch((e)=>{
            console.log(e);
        });
    });
    
});
