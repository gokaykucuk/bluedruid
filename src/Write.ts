import {faunaClient, q} from "./Connection";
import {values} from "faunadb";
import Document = values.Document;

export const CreateDocument = async (collectionName: string, documentData: any) => {
    const faunaResponse: Document = await faunaClient.query(
        q.Create(collectionName, {data: documentData}));
    return faunaResponse.data;
};
