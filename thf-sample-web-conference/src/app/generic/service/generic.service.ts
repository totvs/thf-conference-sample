import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class GenericService {

  private host: string = 'http://localhost:';
  private port: number = 8080;
  private apiName: string = '/conference-api/api/v';
  private version: number = 1;

  private readonly urlApi: string = this.host + this.port + this.apiName + this.version;

  constructor(private http: HttpClient) { }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${path}`).map(totvsResponse => (totvsResponse));
  }

  getById<T>(path: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${path}/${id}`).map(response => (response));
  }

  post<T>(path: string, object: T): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${path}`, object)
      .map(objectCreated => (objectCreated));
  }

  put<T>(path: string, object: T): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${path}`, object)
      .map(objectUpdated => (objectUpdated));
  }

}
