import {faunaClient, q} from "./Connection";
import {pickBy} from 'lodash';

export const CreateDocument = (collectionName: string, rootKeyFilter: Array<string>, documentData: any) => {
    const filteredDocumentData = pickBy(documentData, (key: string)=>(rootKeyFilter.includes(key)));
    return faunaClient.query(
        q.Create(collectionName, {data: filteredDocumentData})
    );
};
