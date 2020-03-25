import * as _ from 'lodash';
import * as fs from 'fs';

export const ReadJSONFile = _.flow((c)=>(fs.readFileSync(c,'utf-8')), JSON.parse);
