import { Injectable } from '@angular/core';
import { Train } from '../models/train.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private url = environment.apiURL + environment.train

  constructor(private http: HttpClient) { }

  getTrainsWithTime(date: string): Observable<Array<Train>> {
    return this.http.get<Array<Train>>(`${this.url}?date=${date}`);
  }

  getTrainsWithTimeAndDestination(date: string, destination: string): Observable<Array<Train>> {
    return this.http.get<Array<Train>>(`${this.url}?date=${date}&destination=${destination}`);
  }

  getTrainsWithDestination(destination: string): Observable<Array<Train>> {
    return this.http.get<Array<Train>>(`${this.url}?destination=${destination}`);
  }

  removeTrainById(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }

  postTrain(body: {destination: string, departureTime: string, arrivalTime: string}): Observable<Object> {
    return this.http.post(this.url, {
      destination: body.destination,
      departureTime: body.departureTime,
      arrivalTime: body.arrivalTime
    })
  }
}
