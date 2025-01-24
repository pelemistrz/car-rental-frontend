import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationHistory } from '../common/reservation-history';

@Injectable({
  providedIn: 'root',
})
export class ReservationHistoryService {
  private reservationUrl = 'http://localhost:8080/reservations';

  constructor(private httpClient: HttpClient) {}

  getReservationsHistory(theEmail: string): Observable<ReservationHistory[]> {
    const reservationsHistoryUrl = `${this.reservationUrl}?email=${theEmail}`;
    return this.httpClient.get<ReservationHistory[]>(reservationsHistoryUrl);
  }
}
