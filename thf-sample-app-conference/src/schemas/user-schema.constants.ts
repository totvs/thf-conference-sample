import { ThfSyncSchema } from '@totvs/thf-sync';

export const userSchema: ThfSyncSchema = {
  getUrlApi: 'http://localhost:8080/conference-api/api/v1/users',
  diffUrlApi: 'http://localhost:8080/conference-api/api/v1/users',
  deletedField: 'deleted',
  fields: [
    'id',
    'username',
    'password',
    'notes'
  ],
  idField: 'id',
  name: 'Users',
  pageSize: 1
}
