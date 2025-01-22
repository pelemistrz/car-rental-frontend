import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class RentValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    } else {
      return null;
    }
  }

  static dateAfterNow(control: FormControl): ValidationErrors | null {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const inputDateTime = new Date(control.value);
    if (control.value != null && inputDateTime < now) {
      return { dateBeforeNow: true };
    } else {
      return null;
    }
  }

  static dateAfterReception(control: FormControl): ValidationErrors | null {
    // const  returnDate: Date = new Date(control.value);
    // const receptionDate=new Date(control.parent?.controls.['receptionDate'].value);



    if (false) {
      return { dateBeforeReception: true };
    } else {
      return null;
    }
  }
}
