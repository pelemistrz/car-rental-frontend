import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rent } from '../common/rent';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private rentUrl = environment.carRentalUrl + '/rent';
  private paymentIntentUrl = environment.carRentalUrl + '/rent/payment-intent';

  constructor(private httpClient: HttpClient) {}

  rentCar(rent: Rent): Observable<any> {
    return this.httpClient.post<Rent>(this.rentUrl, rent);
  }
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(
      this.paymentIntentUrl,
      paymentInfo
    );
  }
}
