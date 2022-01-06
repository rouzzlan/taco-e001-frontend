import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import * as cardValidator from "card-validator";

@Directive({
  selector: '[appCcardValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CcardValidatorDirective, multi: true}]
})
export class CcardValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (cardValidator.number(control.value)) {
      return {'cardNumberValid': true}
    }
    return null;
  }
}
