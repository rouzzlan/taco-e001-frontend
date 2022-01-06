import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../model/ingredient.model";
import {IngredientService} from "../../../services/ingredient.service";
import {Router} from "@angular/router";
import * as cardValidator from "card-validator";
import {TacoOrder} from "../../../model/tacoOrder.model";
import {Taco} from "../../../model/taco.model";
import {TacoOrderService} from "../../../services/taco-order.service";

@Component({
  selector: 'app-order-window',
  templateUrl: './order-window.component.html',
  styleUrls: ['./order-window.component.css']
})
export class OrderWindowComponent implements OnInit {
  private ingredientData: Ingredient[] = [];
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isLoaded: boolean = false;
  wrapIngredientsData: Ingredient[] = [];
  proteinIngredientsData: Ingredient[] = [];
  veggiesIngredientsData: Ingredient[] = [];
  cheeseIngredientsData: Ingredient[] = [];
  sauceIngredientsData: Ingredient[] = [];

  get ingredientsWrapFormArray() {
    return this.firstFormGroup.controls.wrapIngredients as FormArray;
  }

  get ingredientsProteinFormArray() {
    return this.firstFormGroup.controls.proteinIngredients as FormArray;
  }

  get ingredientsVeggiesFormArray() {
    return this.firstFormGroup.controls.veggiesIngredients as FormArray;
  }

  get ingredientsCheeseFormArray() {
    return this.firstFormGroup.controls.cheeseIngredients as FormArray;
  }

  get ingredientsSouseFormArray() {
    return this.firstFormGroup.controls.sauceIngredients as FormArray;
  }


  constructor(private _formBuilder: FormBuilder,
              private ingredientService: IngredientService,
              private orderService: TacoOrderService,
              private router: Router) {
    this.firstFormGroup = this._formBuilder.group({
      tacoName: ['', Validators.required],
      wrapIngredients: new FormArray([]),
      proteinIngredients: new FormArray([]),
      veggiesIngredients: new FormArray([]),
      cheeseIngredients: new FormArray([]),
      sauceIngredients: new FormArray([])
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      street_address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      card: new FormControl('', [Validators.required, this.validateCard]),
      expiration: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])([\\/])([1-9][0-9])$')]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
    });
  }

  private loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((value: Ingredient[]) => {
      this.ingredientData = value;
      value.forEach(ingredient => {
        switch (ingredient.type) {
          case 'WRAP':
            this.wrapIngredientsData.push(ingredient);
            break;
          case 'PROTEIN':
            this.proteinIngredientsData.push(ingredient);
            break;
          case 'VEGGIES':
            this.veggiesIngredientsData.push(ingredient);
            break;
          case 'CHEESE':
            this.cheeseIngredientsData.push(ingredient);
            break;
          case 'SAUCE':
            this.sauceIngredientsData.push(ingredient);
            break;
        }
      })
      this.buildFormArray();
    });
  }

  private buildFormArray(): void {
    this.wrapIngredientsData.forEach(() => this.ingredientsWrapFormArray.push(new FormControl(false)));
    this.proteinIngredientsData.forEach(() => this.ingredientsProteinFormArray.push(new FormControl(false)));
    this.veggiesIngredientsData.forEach(() => this.ingredientsVeggiesFormArray.push(new FormControl(false)));
    this.cheeseIngredientsData.forEach(() => this.ingredientsCheeseFormArray.push(new FormControl(false)));
    this.sauceIngredientsData.forEach(() => this.ingredientsSouseFormArray.push(new FormControl(false)));
  }

  ngOnInit() {
    this.loadIngredients();
    this.isLoaded = true;
  }

  validateStep1() {
    const selectedWrapIngredientIds: string = this.firstFormGroup?.value.wrapIngredients
      .map((checked: any, i: number) => checked ? this.wrapIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedProteinIngredientIds: string = this.firstFormGroup?.value.proteinIngredients
      .map((checked: any, i: number) => checked ? this.proteinIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedVeggiesIngredientIds: string = this.firstFormGroup?.value.veggiesIngredients
      .map((checked: any, i: number) => checked ? this.veggiesIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedCheeseIngredientIds: string = this.firstFormGroup?.value.cheeseIngredients
      .map((checked: any, i: number) => checked ? this.cheeseIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedSauceIngredientIds: string = this.firstFormGroup?.value.sauceIngredients
      .map((checked: any, i: number) => checked ? this.sauceIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const arr: string[] = [...selectedWrapIngredientIds, ...selectedProteinIngredientIds, ...selectedVeggiesIngredientIds, ...selectedCheeseIngredientIds, ...selectedSauceIngredientIds];
    console.log(arr);
  }

  validateCard(control: AbstractControl): { [key: string]: boolean } | null {
    const numberValidation = cardValidator.number(control.value);
    if (!numberValidation.isValid) {
      return {'invalidCard': true}
    }
    return null;
  }

  loadDataFromForm(): void {
    const _tacoName: string = this.firstFormGroup.value.tacoName;
    const _all_ingredient_codes: string[] = this.extractIngredientCodes();

    const _name: string = this.secondFormGroup.value.name;
    const _street_address: string = this.secondFormGroup.value.street_address;
    const _city: string = this.secondFormGroup.value.city;
    const _state: string = this.secondFormGroup.value.state;
    const _zip: string = this.secondFormGroup.value.zip;

    const _email: string = this.thirdFormGroup.value.email;
    const _card: string = this.thirdFormGroup.value.card;
    const _expiration: string = this.thirdFormGroup.value.expiration;
    const _cvv: string = this.thirdFormGroup.value.cvv;

    console.log('-----------------------------------------------');
    console.log('Taco name: ', _tacoName);
    console.log('Taco ingredient codes: ', _all_ingredient_codes);
    console.log('Taco ingredient: ', this.extractIngredients(_all_ingredient_codes, this.ingredientData));
    console.log('-----------------------------------------------');
    console.log('Name: ', _name);
    console.log('Street address: ', _street_address);
    console.log('City: ', _city);
    console.log('State: ', _state);
    console.log('Zip: ', _zip);
    console.log('-----------------------------------------------');
    console.log('Email: ', _email);
    console.log('Card: ', _card);
    console.log('Expiration date: ', _expiration);
    console.log('CVV: ', _cvv);
    console.log('-----------------------------------------------');
  }

  loadDataToObject(): TacoOrder {
    const _tacoName: string = this.firstFormGroup.value.tacoName;
    const _all_ingredient_codes: string[] = this.extractIngredientCodes();
    const _chosen_ingredients: Ingredient[] = this.extractIngredients(_all_ingredient_codes, this.ingredientData);

    const _name: string = this.secondFormGroup.value.name;
    const _street_address: string = this.secondFormGroup.value.street_address;
    const _city: string = this.secondFormGroup.value.city;
    const _state: string = this.secondFormGroup.value.state;
    const _zip: string = this.secondFormGroup.value.zip;

    const _email: string = this.thirdFormGroup.value.email;
    const _card: string = this.thirdFormGroup.value.card;
    const _expiration: string = this.thirdFormGroup.value.expiration;
    const _cvv: string = this.thirdFormGroup.value.cvv;

    const taco: Taco = new Taco();
    taco.name = _tacoName;
    taco.ingredients = _chosen_ingredients;

    const tacoOrder: TacoOrder = new TacoOrder();
    tacoOrder.deliveryName = _name;
    tacoOrder.deliveryStreet = _street_address;
    tacoOrder.deliveryCity = _city;
    tacoOrder.deliveryState = _state;
    tacoOrder.deliveryZip = _zip;

    tacoOrder.email = _email;
    tacoOrder.ccNumber = _card;
    tacoOrder.ccExpiration = _expiration;
    tacoOrder.ccCVV = _cvv;

    tacoOrder.tacos = [taco];
    return tacoOrder;
  }

  submitOrder(): void {
    const tacoOrder: TacoOrder = this.loadDataToObject();
    this.orderService.createTacoOrder(tacoOrder).subscribe((newOrder: TacoOrder) => {
      console.log(newOrder);
    })
  }

  extractIngredientCodes(): string[] {
    const selectedWrapIngredientIds: string = this.firstFormGroup?.value.wrapIngredients
      .map((checked: any, i: number) => checked ? this.wrapIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedProteinIngredientIds: string = this.firstFormGroup?.value.proteinIngredients
      .map((checked: any, i: number) => checked ? this.proteinIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedVeggiesIngredientIds: string = this.firstFormGroup?.value.veggiesIngredients
      .map((checked: any, i: number) => checked ? this.veggiesIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedCheeseIngredientIds: string = this.firstFormGroup?.value.cheeseIngredients
      .map((checked: any, i: number) => checked ? this.cheeseIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const selectedSauceIngredientIds: string = this.firstFormGroup?.value.sauceIngredients
      .map((checked: any, i: number) => checked ? this.sauceIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    const arr: string[] = [...selectedWrapIngredientIds, ...selectedProteinIngredientIds,
      ...selectedVeggiesIngredientIds, ...selectedCheeseIngredientIds,
      ...selectedSauceIngredientIds];
    return arr;
  }

  private extractIngredients(ids: string[], ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter(ing => ids.includes(ing.id!));
  }
}
