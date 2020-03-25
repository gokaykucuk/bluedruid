import * as fs from 'fs';
import { pipe } from 'ramda';

export const ReadJSONFile = pipe((c: string)=>(fs.readFileSync(c,'utf-8')), JSON.parse);
export const ReadDefaultSchema = () => {
    return ReadJSONFile('./db/schema.json');
};


