import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RentValidators } from '../../validators/rent-validator';
import { RentService } from '../../services/rent.service';
import { Rent } from '../../common/rent';
import { environment } from '../../../environments/environment.development';
import { PaymentInfo } from '../../common/payment-info';

@Component({
  selector: 'app-rent-car',
  standalone: false,

  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  car: Car = new Car();

  isDisabled: boolean = false;
  storage: Storage = sessionStorage;
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';
  stripe = Stripe(environment.stripePublishableKey);

  rentFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private rentService: RentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCarDetails();
    });

    this.setupStripePaymentForm();

    const formattedTodayDate = this.getTodayDate();
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.rentFormGroup = this.formBuilder.group({
      reservation: this.formBuilder.group({
        receptionDate: new FormControl(formattedTodayDate, [
          Validators.required,
          RentValidators.dateAfterNow,
        ]),
        returnDate: new FormControl('', [
          Validators.required,
          RentValidators.dateAfterReception,
        ]),
      }),

      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          RentValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          RentValidators.notOnlyWhitespace,
        ]),
        email: new FormControl(theEmail, [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        country: new FormControl('', [Validators.required]),
      }),
      creditCard: this.formBuilder.group({}),
    });
  }

  handleCarDetails() {
    const theCarId: number = +this.route.snapshot.paramMap.get('id')!;

    this.carService.getCar(theCarId).subscribe((data) => {
      this.car = data;
    });
  }

  setupStripePaymentForm() {
    // get a handle to stripe elemnts
    var elements = this.stripe.elements();
    //create card element
    this.cardElement = elements.create('card', {
      hidePostalCode: true,
    });
    //add an instance of card UI component into the 'card-element div
    this.cardElement.mount('#card-element');
    //add event bingind
    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');
      if (event.complete) {
        this.displayError = '';
      } else if (event.error) {
        //show validateion error to customer
        this.displayError.textContent = event.error.message;
      }
    });
  }

  onSubmit() {
    this.isDisabled = true;

    if (this.rentFormGroup.invalid) {
      this.rentFormGroup.markAllAsTouched();
      return;
    }

    let rent = new Rent();
    rent.customer = this.rentFormGroup.controls['customer'].value;
    rent.car = this.car;
    rent.receptionDate =
      this.rentFormGroup.controls['reservation'].value.receptionDate;

    rent.returnDate =
      this.rentFormGroup.controls['reservation'].value.returnDate;

    console.log(rent.returnDate);

    const date1 = new Date(rent.receptionDate);
    const date2 = new Date(rent.returnDate);

    const diffTime = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))+1;
    console.log(diffDays);

    this.paymentInfo.amount = diffDays * this.car.dailyFee * 100;
    this.paymentInfo.currency = 'PLN';
    this.paymentInfo.receiptEmail =
      this.rentFormGroup.controls['customer'].value.email;

    this.rentService
      .createPaymentIntent(this.paymentInfo)
      .subscribe((paymentIntentResponse) => {
        this.stripe
          .confirmCardPayment(
            paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
              },
            },
            {
              handleActions: false,
            }
          )
          .then((result: any) => {
            if (result.error) {
              alert(`There was an error: ${result.error.message}`);
              this.isDisabled = false;
            } else {
              this.rentService.rentCar(rent).subscribe({
                next: (response) => {
                  alert(
                    `Your car has been reserved. Your reservation number: ${response.reservationId}`
                  );
                  this.router.navigateByUrl('/cars');
                },
                error: (err) => {
                  alert(`There was an error: ${err.message}`);
                  this.isDisabled = false;
                },
              });
            }
          });
      });
  }

  // gettery
  get firstName() {
    return this.rentFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.rentFormGroup.get('customer.lastName');
  }
  get email() {
    return this.rentFormGroup.get('customer.email');
  }
  get country() {
    return this.rentFormGroup.get('customer.country');
  }
  get receptionDate() {
    return this.rentFormGroup.get('reservation.receptionDate');
  }
  get returnDate() {
    return this.rentFormGroup.get('reservation.returnDate');
  }

  getTodayDate(): string {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
}
