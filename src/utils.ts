import * as fs from 'fs';
import { pipe } from 'rambda';

export const ReadJSONFile = pipe((c: string) => (fs.readFileSync(c, 'utf-8')), JSON.parse);
export const SchemaConfig = ReadJSONFile('./db/schema.json');


