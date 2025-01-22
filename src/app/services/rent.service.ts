import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rent } from '../common/rent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private rentUrl = 'http://localhost:8080/rent';

  constructor(private httpClient: HttpClient) {}

  rentCar(rent: Rent): Observable<any> {
    return this.httpClient.post<Rent>(this.rentUrl, rent);
  }
}
