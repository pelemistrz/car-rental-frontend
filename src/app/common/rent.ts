import { Car } from './car';
import { Customer } from './customer';

export class Rent {
  customer: Customer;
  car: Car;
  receptionDate: Date;
  returnDate: Date;
}
