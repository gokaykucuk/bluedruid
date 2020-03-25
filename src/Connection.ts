import * as faunadb from 'faunadb';
import { ReadJSONFile } from './utils';
import { get } from 'shades';
import { pipe } from 'ramda';

export const q = faunadb.query;

const envConfig = pipe(
    ReadJSONFile,
    get(process.env.NODE_ENV as string)
);

export const faunaClient = new faunadb.Client(envConfig('./db/config.json'));
