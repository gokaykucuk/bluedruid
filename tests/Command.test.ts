import {findNestedCommand} from '../src/Command'

test("calls creation function with correct command",()=>{
    const command = findNestedCommand(['debug', 'cwd']);
    expect(command()).toBe(process.cwd());
});

