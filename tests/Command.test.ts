import {findNestedCommand} from '../src/Command'
import { CreateCollection, CreateCollections, DropCollection, DropCollections, CollectionNames} from '../src/Collections';
import {nth} from 'ramda';

describe.skip('schema level operations for faunadb', () => {

   test("calls creation function with correct command",()=>{
        const command = findNestedCommand(['debug', 'cwd']);
        expect(command()).toBe(process.cwd());
    });
    
    test("can create collections listed in schema.json", () => {
        CreateCollections.then((results)=>{
            expect(results.length).toBe(2);
        }).catch((e)=>{
            console.log(e);
        });
    });

    test("can create and drop collection", ()=> {
        const collectionName = nth(1, CollectionNames()) as string;
        CreateCollection(collectionName).then((createResult:any)=>{
            expect(createResult.name).toBe(collectionName);
            return DropCollection(collectionName).then((dropResult :any)=>
            {
                console.log(dropResult);   
            });
        }).catch((e)=>{
            console.log(e);
        });
    });

    test("can create and drop all collections", () => {
        CreateCollections.then((createResults: any)=> {
            console.log(createResults)
            return DropCollections.then((dropResults: any)=>{
                console.log(dropResults);
            })
        }).catch((e)=>{
            console.log(e);
        });
    })

});
