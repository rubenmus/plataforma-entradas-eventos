import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Events } from '../interfaces/events.interface';
import { EventSession } from '../interfaces/eventsesion.interface';

/*istanbul ignore file*/
@Injectable({
  providedIn: 'root'
})
export class EventsService {

private baseUrl: string = 'http://localhost:3000/events';
private baseUrlSessions: string = 'http://localhost:3000/eventsSesions';

  constructor(private http: HttpClient) { }


  getEvents(): Observable<Events[]>{
    return this.http.get<Events[]>(this.baseUrl);
  }

  getEventsSesions(): Observable<EventSession[]>{
    return this.http.get<EventSession[]>(this.baseUrlSessions);
  }

}
