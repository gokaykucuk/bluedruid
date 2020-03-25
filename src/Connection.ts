import * as faunadb from 'faunadb';
import { ReadJSONFile } from './utils';
import { get } from 'shades';
import * as _ from 'lodash';

export const q = faunadb.query;

const envConfig = _.flow(
    ReadJSONFile,
    get(process.env.NODE_ENV as string)
);

export const faunaClient = new faunadb.Client(envConfig('./db/config.json'));
