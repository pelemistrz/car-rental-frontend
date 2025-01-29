import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';
import { response } from 'express';
import { Router } from '@angular/router';
import { CarType } from '../../common/car-type';

@Component({
  selector: 'app-add-car',
  standalone: false,

  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent implements OnInit {
  isDisabled: boolean = false;
  addCarFormGroup: FormGroup;
  carTypes: CarType[] = [];

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listCarTypes();
    this.addCarFormGroup = this.formBuilder.group({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      yearOfProduction: new FormControl('', [Validators.required]),
      carType: new FormControl('', [Validators.required]),
      dailyFee: new FormControl('', [Validators.required]),
      registration: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isDisabled = true;
    if (this.addCarFormGroup.invalid) {
      this.addCarFormGroup.markAllAsTouched();
      return;
    }

    if (this.selectedFile) {
    }

    let car = new Car();
    car.brand = this.addCarFormGroup.get('brand')?.value;
    car.model = this.addCarFormGroup.get('model')?.value;
    car.yearOfProduction = this.addCarFormGroup.get('yearOfProduction')?.value;

    let selectedCarTypeId = this.addCarFormGroup.get('carType')?.value;

    car.carType = this.carTypes.find(
      (carType) => carType.id == selectedCarTypeId
    )!;

    car.dailyFee = this.addCarFormGroup.get('dailyFee')?.value;
    car.registration = this.addCarFormGroup.get('registration')?.value;
    car.imageUrl = this.addCarFormGroup.get('imageUrl')?.value;
    car.description = this.addCarFormGroup.get('description')?.value;

    console.log(car);

    this.carService.addCar(car).subscribe({
      next: (response) => {
        alert(`Car has been added`);
        this.router.navigateByUrl('/cars');
      },
      error: (err) => {
        alert(`There was an error: ${err.message}`);
        this.isDisabled = false;
      },
    });
  }

  get brand() {
    return this.addCarFormGroup.get('brand');
  }
  get model() {
    return this.addCarFormGroup.get('model');
  }
  get yearOfProduction() {
    return this.addCarFormGroup.get('yearOfProduction');
  }
  get dailyFee() {
    return this.addCarFormGroup.get('dailyFee');
  }
  get registration() {
    return this.addCarFormGroup.get('registration');
  }
  get imageUrl() {
    return this.addCarFormGroup.get('imageUrl');
  }
  get description() {
    return this.addCarFormGroup.get('description');
  }
  get carType() {
    return this.addCarFormGroup.get('carType');
  }

  listCarTypes() {
    this.carService.getCarType().subscribe((data) => {
      this.carTypes = data;
    });
  }

  onFileSlected(event: any) {
    // this.selectedFile = event.target.files[0];
    console.log(event);
  }
}
