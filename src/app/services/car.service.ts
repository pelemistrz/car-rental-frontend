import { Injectable } from '@angular/core';
import { Car } from '../common/car';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarType } from '../common/car-type';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carTypeUrl = environment.carRentalUrl + '/car-type';
  private baseUrl = environment.carRentalUrl + '/cars';

  constructor(private httpClient: HttpClient) {}

  getCarList(carTypeId: number): Observable<Car[]> {
    if (carTypeId === 0) {
      return this.httpClient
        .get<Car[]>(`${this.baseUrl}`)
        .pipe(map((response) => response));
    }

    return this.httpClient
      .get<GetResponseCars>(`${this.baseUrl}/car-type/${carTypeId}`)
      .pipe(map((response) => response.content));
  }

  getCarType(): Observable<CarType[]> {
    return this.httpClient.get<CarType[]>(this.carTypeUrl);
  }

  searchCars(theModel: string): Observable<Car[]> {
    return this.httpClient
      .get<GetResponseCars>(`${this.baseUrl}/${theModel}`)
      .pipe(map((resp) => resp.content));
  }

  getCar(theCarId: number) {
    return this.httpClient.get<Car>(`${this.baseUrl}/car/${theCarId}`);
  }

  addCar(car: Car): Observable<any> {
    return this.httpClient.post<Car>(this.baseUrl, car);
  }
}

interface GetResponseCars {
  content: Car[];
}
