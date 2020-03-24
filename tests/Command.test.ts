import {findNestedCommand} from '../src/Command'

test("calls creation function with correct command",()=>{
    findNestedCommand(['debug', 'cwd']);
});
