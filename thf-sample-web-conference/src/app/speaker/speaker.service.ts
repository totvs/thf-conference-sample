import { Speaker } from './../model/speaker';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GenericService } from '../generic/service/generic.service';
import { TotvsResponse } from './../model/totvs-response.interface';

@Injectable()
export class SpeakerService {

  private readonly path: string = 'speakers';

  constructor(private genericService: GenericService) { }

  get(): Observable<TotvsResponse> {
    return this.genericService.get<TotvsResponse>(this.path).map(speakerResponse => (speakerResponse));
  }

  getById(id: string): Observable<Speaker> {
    return this.genericService.getById<Speaker>(this.path, id).map(speaker => (speaker));
  }

  create(speaker: Speaker): Observable<Speaker> {
    return this.genericService.post<Speaker>(this.path, speaker).map(speakerCreated => (speakerCreated));
  }

  update(speaker: Speaker): Observable<Speaker> {
    return this.genericService.put<Speaker>(`${this.path}/${speaker.id}`, speaker).map(speakerUpdated => (speakerUpdated));
  }

}
