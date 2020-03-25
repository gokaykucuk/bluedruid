// Matchtype can be 'or' or 'and'. If it's or, it will return all results from all queries. If it's
//
import {faunaClient, q} from './Connection';
import {pickBy} from 'lodash';

export const ExistsOnIndex = async (collectionName: string, params: any, matchType: string = 'any') => {

};

export const GetAllDocuments = (collectionName: string, page: number = 0) => {
  return faunaClient.query(
    q.Paginate(
      q.Match(
        q.Index(`all_${collectionName}`)
      )
    )
  );
};


export const GetElementByRef = (ref: any) => {
  return faunaClient.query(
    q.Get(ref)
  );
};


type queryPair = {
  key: string,
  value: string
};

export const MatchParamOnIndex = async (collectionName: string, param: queryPair) => {
  return faunaClient.query(
    q.Paginate(q.Match(q.Index(`${collectionName}_by_${param.key}`), param.value))
  );
};

export const GetRefsByParams = (collectionName: string, params: Array<queryPair>, matchType: string = 'union', page: number = 0) => {
  const documentLens = params.map((params)=>(q.Match(
    q.Index(collectionName + "_by_" + params.key), params.value
  )));

  return faunaClient.query(
    q.Paginate(documentLens)
  );
};


//TODO: Improve and enable again
export const MatchParamsByByIndex = (collectionName: string, params: any) => {
  return Object.entries(params).map((param) => {
    return faunaClient.query(
      q.Paginate(q.Match(q.Index(`${collectionName}_by_${param[0]}`), param[1] as any))
    );
  });
};



export const CreateDocument = (collectionName: string, rootKeyFilter: Array<string>, documentData: any) => {
  const filteredDocumentData = pickBy(documentData, (key: string)=>(rootKeyFilter.includes(key)));
  return faunaClient.query(
    q.Create(collectionName, {data: filteredDocumentData})
  );
};
