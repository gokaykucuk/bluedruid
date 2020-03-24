import * as faunadb from 'faunadb';

export const q = faunadb.query;

export const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_ROOT_KEY as string,
});
