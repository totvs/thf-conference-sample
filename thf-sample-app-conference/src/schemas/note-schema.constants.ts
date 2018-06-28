import { ThfSyncSchema } from '@totvs/thf-sync';

export const noteSchema: ThfSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/notes',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/notes/diff',
  deletedField: 'deleted',
  fields: [ 'id', 'title', 'text', 'lectureId', 'userId' ],
  idField: 'id',
  name: 'Notes',
  pageSize: 10
};
