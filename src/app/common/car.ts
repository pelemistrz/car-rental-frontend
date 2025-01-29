import { CarType } from './car-type';


export class Car {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  dailyFee: number;
  yearOfProduction:number;
  registration: string;
   date_created: Date;
  last_updated: Date; 

  carType: CarType;
  
  description: string;
}
