import {faunaClient, q} from "./Connection";
import * as _ from 'lodash';
import {ReadYAML} from './utils';
import {get, all} from 'shades';

export const ReadDefaultSchema = () => {
    return ReadYAML('./db/schema.yml');
};

export const CollectionNames = _.flow(
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
    _.map(
        CollectionNames(),
        CreateCollection
    )
);

export const DropCollections = Promise.all(
    _.map(
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
