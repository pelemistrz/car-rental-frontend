import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationHistory } from '../common/reservation-history';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReservationHistoryService {
  private reservationUrl =  environment.carRentalUrl+ '/reservations';

  constructor(private httpClient: HttpClient) {}

  getReservationsHistory(theEmail: string): Observable<ReservationHistory[]> {
    const reservationsHistoryUrl = `${this.reservationUrl}?email=${theEmail}`;
    return this.httpClient.get<ReservationHistory[]>(reservationsHistoryUrl);
  }
}
