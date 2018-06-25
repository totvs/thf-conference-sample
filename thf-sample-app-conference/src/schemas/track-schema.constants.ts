import { ThfSyncSchema } from '@totvs/thf-sync';

export const trackSchema: ThfSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/tracks',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/tracks/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'name', 'color' ],
  idField: 'id',
  name: 'Tracks',
  pageSize: 10
};
