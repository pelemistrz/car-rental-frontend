import { Injectable } from '@angular/core';
import { Car } from '../common/car';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarType } from '../common/car-type';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  
  private carTypeUrl = 'http://localhost:8080/car-type';
  private baseUrl = 'http://localhost:8080/cars';

  constructor(private httpClient: HttpClient) {}

  getCarList(carTypeId: number): Observable<Car[]> {
    return this.httpClient.get<GetResponseCars>(`${this.baseUrl}/car-type/${carTypeId}`).pipe(
      map(response=>response.content));
  }

  getCarType(): Observable<CarType[]> {
    return this.httpClient.get<CarType[]>(this.carTypeUrl);
  }
}

interface GetResponseCars {
  content: Car[]
  
}
