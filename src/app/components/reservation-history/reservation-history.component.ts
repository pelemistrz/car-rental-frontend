import { Component, OnInit } from '@angular/core';
import { ReservationHistory } from '../../common/reservation-history';
import { ReservationHistoryService } from '../../services/reservation-history.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-reservation-history',
  standalone: false,

  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css',
})
export class ReservationHistoryComponent implements OnInit {
  reservationHistoryList: ReservationHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(
    private reservationHistoryService: ReservationHistoryService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.handleReservationHistory();
  }
  handleReservationHistory() {
    const theEmail = this.keycloakService._profile?.email ?? '';

    this.reservationHistoryService
      .getReservationsHistory(theEmail)
      .subscribe((data) => {
        this.reservationHistoryList = data;
      });
    console.log(this.reservationHistoryList);
  }
}
