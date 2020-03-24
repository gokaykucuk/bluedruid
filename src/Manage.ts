import {faunaClient, q} from "./Connection";
import * as YAML from 'yaml';
import * as fs from 'fs';
import * as _ from 'lodash';

export const CreateCollections = () => {
    console.log(ReadDefaultSchema());
};

export const DropCollections = () => {

};

const schemaReader = _.flow(fs.readFileSync, YAML.parse);
export const ReadDefaultSchema = () => {
    return schemaReader('./db/schema.yml');
};

const DropCollection = (collectionName: string) => {
    faunaClient.query(q.Delete(q.Collection(collectionName)));
};

const CreateCollection = (collectionName: string) => {
    faunaClient.query(q.CreateCollection({ name: collectionName }));
};

const ListCollections = () => {
    faunaClient.query(q.Paginate(q.Collections()));
};

const ListIndexes = () => {
    faunaClient.query(q.Paginate(q.Indexes()));
};

const ListDatabases = () => {
    faunaClient.query(q.Paginate(q.Databases()));
};
