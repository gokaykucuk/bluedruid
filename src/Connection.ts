import * as faunadb from 'faunadb';
import { ReadJSONFile } from './utils';
import { pipe, path } from 'ramda';
import { ClientConfig } from 'faunadb';

export const q = faunadb.query;

const envConfig = pipe(
	ReadJSONFile,
	path([process.env.NODE_ENV as string])
);

export const faunaClient = new faunadb.Client(envConfig('./db/config.json') as ClientConfig);
