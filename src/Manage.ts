import {faunaClient, q} from "./Connection";


const DropCollection = (collectionName: string) => {
    faunaClient.query(q.Delete(q.Collection(collectionName)));
};

const CreateCollection = (collectionName: string) => {
    faunaClient.query(q.CreateCollection({ name: collectionName }));
};

export const ListCollections = () => {
    faunaClient.query(q.Paginate(q.Collections()));
};

export const ListIndexes = () => {
    faunaClient.query(q.Paginate(q.Indexes()));
};

export const ListDatabases = () => {
    faunaClient.query(q.Paginate(q.Databases()));
};
