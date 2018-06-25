import { ThfSyncSchema } from '@totvs/thf-sync';

export const speakerSchema: ThfSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/speakers',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/speakers/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'name', 'email', 'photo', 'description', 'lectures' ],
  idField: 'id',
  name: 'Speakers',
  pageSize: 10
};
