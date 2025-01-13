import { Component, OnInit } from '@angular/core';
import { CarType } from '../../common/car-type';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-category-menu',
  standalone: false,

  templateUrl: './car-category-menu.component.html',
  styleUrl: './car-category-menu.component.css',
})
export class CarCategoryMenuComponent implements OnInit {
  carTypes: CarType[] = [];

  constructor(private carService: CarService) {}
  ngOnInit(): void {
    this.listCarTypes();
  }
  listCarTypes() {
    this.carService.getCarType().subscribe((data) => {
      this.carTypes = data;
    });
  }
}
