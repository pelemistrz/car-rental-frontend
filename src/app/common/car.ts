import { CarType } from './car-type';
import { FuelCategory } from './fuel-category';

export class Car {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  dailyFee: number;
  registration: string;
  dailyPenalty: number;
  date_created: Date;
  last_updated: Date;
  fuelCategory: FuelCategory;
  carType: CarType;
}
