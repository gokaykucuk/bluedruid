import * as _ from 'lodash';
import * as YAML from 'yaml';
import * as fs from 'fs';

export const ReadYAML = _.flow((c)=>(fs.readFileSync(c,'utf-8')), YAML.parse);
