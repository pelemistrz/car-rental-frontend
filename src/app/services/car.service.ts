import { Injectable } from '@angular/core';
import { Car } from '../common/car';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = 'http://localhost:8080/cars';

  constructor(private httpClient: HttpClient) {}

  getCarsList(): Observable<Car[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl) .pipe(
        map((response) => response.cars)
    );
  }
}
interface GetResponse {
  cars: Car[];
}
