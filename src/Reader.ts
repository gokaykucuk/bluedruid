// Matchtype can be 'or' or 'and'. If it's or, it will return all results from all queries. If it's
//

import {faunaClient, q} from './Connection';
import {flatten} from 'lodash';

export const ExistsOnIndex = async (collectionName: string, params: any, matchType: string = 'any') => {

};

/*
* Params must have the following format,
* {
*   columnName: value,
*   columnName: value
* }
*
*  */

export const GetDocuments = async (collectionName: string, page: number = 0) => {
    const faunaResponse = await faunaClient.query(
       q.Paginate(
           q.Match(
               q.Index(`all_${collectionName}`)
           )
       )
    );

    return faunaResponse['data'];
};


type queryPair = {
    columnName: string,
    value: string
};


/**
 * @param collectionName
 * @param param
 * @constructor
 */
export const MatchParamOnIndex = async (collectionName: string, param: queryPair) => {
    const faunaResponse = await
        faunaClient.query(
            q.Paginate(q.Match(q.Index(`${collectionName}_by_${param.columnName}`), param.value))
        );

    return faunaResponse['data'];
};

//TODO: Improve and enable again
export const MatchParamsByByIndex = async (collectionName: string, params: any) => {
    const faunaResponses = await Promise.all(Object.entries(params).map((param) => {
        return faunaClient.query(
            q.Paginate(q.Match(q.Index(`${collectionName}_by_${param[0]}`), param[1] as any))
        );
    }));

    return flatten(faunaResponses.map((response) => response['data']));
};
