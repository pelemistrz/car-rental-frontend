import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RentValidators } from '../../validators/rent-validator';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCarDetails();
    });

    this.rentFormGroup = this.formBuilder.group({
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

  onSubmit() {}

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
}
