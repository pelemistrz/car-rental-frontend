import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';

@Component({
  selector: 'app-rent-car',
  standalone: false,

  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css',
})
export class RentCarComponent {
  car: Car = new Car();
  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCarDetails();
    });
  }

  handleCarDetails() {
    const theCarId: number = +this.route.snapshot.paramMap.get('id')!;

    this.carService.getCar(theCarId).subscribe((data) => {
      this.car = data;
      this.isLoaded = true;
    });
  }
}
