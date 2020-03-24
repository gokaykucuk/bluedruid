import * as faunadb from 'faunadb';
import { ReadYAML } from './utils';
import { get } from 'shades';
import * as _ from 'lodash';

export const q = faunadb.query;


console.log(process.env);
const envConfig = _.flow(
    ReadYAML,
    get(process.env.NODE_ENV as string)
);

export const faunaClient = new faunadb.Client(envConfig('./db/config.yml'));
