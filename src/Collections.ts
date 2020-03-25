import {faunaClient, q} from "./Connection";
import {ReadDefaultSchema } from './utils';
import {get, all} from 'shades';
import { map, pipe } from 'ramda';

export const CollectionNames = pipe(
    ReadDefaultSchema,
    get('collections',all(),'name')
);

export const CreateCollection = (collectionName: string) => {
    return faunaClient.query(q.CreateCollection({ name: collectionName }));
};


export const DropCollection = (collectionName: string) => {
    return faunaClient.query(q.Delete(q.Collection(collectionName)));
};

export const CreateCollections = Promise.all(
    map(
        CollectionNames(),
        CreateCollection
    )
);

export const DropCollections = Promise.all(
    map(
        CollectionNames(),
        DropCollection
    )
)
export const ListCollections = () => {
    return faunaClient.query(q.Paginate(q.Collections()));
};

export const ListIndexes = () => {
    return faunaClient.query(q.Paginate(q.Indexes()));
};

export const ListDatabases = () => {
    return faunaClient.query(q.Paginate(q.Databases()));
};
