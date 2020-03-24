import {faunaClient, q} from "./Connection";
import * as _ from 'lodash';
import {ReadYAML} from './utils';
import {get} from 'shades';

export const CreateCollections = () => {
    const collectionNames = _.flow(
        ReadDefaultSchema,
        get('collections')
    );
    const createResultPromises = _.map(
        collectionNames,
        _.flow(
            get('name'),
            CreateCollection
            )

    );
    return Promise.all(createResultPromises);
};

export const DropCollections = () => {
    
};

export const ReadDefaultSchema = () => {
    return ReadYAML('./db/schema.yml');
};


export const DropCollection = (collectionName: string) => {
    return faunaClient.query(q.Delete(q.Collection(collectionName)));
};

export const CreateCollection = (collectionName: string) => {
    return faunaClient.query(q.CreateCollection({ name: collectionName }));
};

export const ListCollections = () => {
    return faunaClient.query(q.Paginate(q.Collections()));
};

export const ListIndexes = () => {
    return faunaClient.query(q.Paginate(q.Indexes()));
};

export const ListDatabases = () => {
    return faunaClient.query(q.Paginate(q.Databases()));
};
