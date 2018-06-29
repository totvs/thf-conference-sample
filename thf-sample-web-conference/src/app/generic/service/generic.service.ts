import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TotvsResponse } from './../../model/totvs-response.interface';

@Injectable()
export class GenericService<T> {

  private host: string = 'http://localhost:';
  private port: number = 8080;
  private apiName: string = '/conference-api/api/v';
  private version: number = 1;

  private readonly urlApi: string = this.host + this.port + this.apiName + this.version;

  constructor(private http: HttpClient, public path: string) { }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.urlApi}/${this.path}/${id}`).map(() => (id), error => (error));
  }

  get(): Observable<TotvsResponse> {
    return this.http.get<TotvsResponse>(`${this.urlApi}/${this.path}`).map(totvsResponse => (totvsResponse));
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${this.path}/${id}`).map(response => (response));
  }

  post(entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, entity).map(objectCreated => (objectCreated));
  }

  postWithPath(path: string, entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}/${path}`, entity).map(objectCreated => (objectCreated));
  }

  put(entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${this.path}/${entity.id}`, entity).map(objectUpdated => (objectUpdated));
  }

}
