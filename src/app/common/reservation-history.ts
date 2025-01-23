import { Car } from "./car";

export class ReservationHistory {
  public id: string;
  public car: Car;
  public totalFee: number;
  public startDate: Date;
  public endDate:Date;
}
