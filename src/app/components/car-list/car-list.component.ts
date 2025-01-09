import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';

@Component({
  selector: 'app-car-list',
  standalone: false,

  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.listCars();
  }
  listCars() {
    this.carService.getCarsList().subscribe((data) => {
      this.cars = data;
    });
  }
}
