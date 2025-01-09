import { Injectable } from '@angular/core';
import { Car } from '../common/car';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = 'http://localhost:8080/cars';

  constructor(private httpClient: HttpClient) {}

  getCarsList(): Observable<Car[]> {


    return this.httpClient
      .get<Car[]>(this.baseUrl);
    
  }
}

