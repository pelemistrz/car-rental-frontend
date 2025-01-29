import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../common/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: false,

  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  curentTypeId: number = 1;
  currentType: string = '';

  searchMode: boolean = false;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listCars();
    });
  }
  listCars() {
    this.searchMode = this.route.snapshot.paramMap.has('model');
    if (this.searchMode) {
      this.handleSearchCars();
    } else {
      this.handleListCars();
    }
  }

  handleSearchCars() {
    const theModel: string = this.route.snapshot.paramMap.get('model')!;
    this.carService.searchCars(theModel).subscribe((data) => {
      this.cars = data;
    });
  }

  handleListCars() {
    const hasCarTypeId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCarTypeId) {
      this.curentTypeId = +this.route.snapshot.paramMap.get('id')!;
      this.currentType = this.route.snapshot.paramMap.get('name')!;
    } else {
      this.curentTypeId = 0;
      this.currentType = 'All';
    }

    this.carService.getCarList(this.curentTypeId).subscribe((data) => {
      this.cars = data;
    });
  }
}
