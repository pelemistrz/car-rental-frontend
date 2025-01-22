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

@Component({
  selector: 'app-rent-car',
  standalone: false,

  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  car: Car = new Car();
  isLoaded: boolean = false;

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

    const formattedDate = this.getFormattedDate();

    this.rentFormGroup = this.formBuilder.group({
      reservation: this.formBuilder.group({
        receptionDate: new FormControl(formattedDate, [
          Validators.required,
          RentValidators.dateAfterNow,
        ]),
        returnDate: new FormControl('', [
          Validators.required,
          RentValidators.dateAfterReception,
        ]),
      }),

      customer: this.formBuilder.group({
        firstName: new FormControl('Marcin', [
          Validators.required,
          Validators.minLength(2),
          RentValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          RentValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        country: new FormControl(''),
      }),
    });
  }

  handleCarDetails() {
    const theCarId: number = +this.route.snapshot.paramMap.get('id')!;

    this.carService.getCar(theCarId).subscribe((data) => {
      this.car = data;
      this.isLoaded = true;
    });
  }

  onSubmit() {
    
    if(this.rentFormGroup.invalid){
      this.rentFormGroup.markAllAsTouched();
      return;
    }

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

  getFormattedDate(): string {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
}
