import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";
import {Ingredient} from "../../../model/ingredient.model";

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {
  form: FormGroup | undefined;
  wrapIngredientsData: Ingredient[] = [];
  proteinIngredientsData: Ingredient[] = [];

  get wrapIngredientsFormArray() {
    return this.form?.controls.wrapIngredients as FormArray;
  }

  get proteinIngredientsFormArray() {
    return this.form?.controls.proteinIngredients as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private ingredientService: IngredientService) {
    ingredientService.getIngredients().subscribe(ingredients => {

      // this.ordersData = ingredients;
      ingredients.forEach(ingredient => {
        switch (ingredient.type) {
          case 'WRAP':
            this.wrapIngredientsData.push(ingredient);
            break;
          case 'PROTEIN':
            this.proteinIngredientsData.push(ingredient);
            break;
        }
      })
      this.wrapIngredientsData.forEach(() => this.wrapIngredientsFormArray.push(new FormControl(false)));
      this.proteinIngredientsData.forEach(() => this.proteinIngredientsFormArray.push(new FormControl(false)));
    })
    this.form = this.formBuilder.group({
      wrapIngredients: new FormArray([]),
      proteinIngredients: new FormArray([])
    });
  }

  submit() {
    const selectedWrapIngredientIds = this.form?.value.wrapIngredients
      .map((checked: any, i: number) => checked ? this.wrapIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    console.log("Wrap ingredients: " + selectedWrapIngredientIds);
    const selectedProteinIngredientIds = this.form?.value.proteinIngredients
      .map((checked: any, i: number) => checked ? this.proteinIngredientsData[i].id : null)
      .filter((v: any) => v !== null);
    console.log("Protein ingredients: " + selectedProteinIngredientIds);
  }

  ngOnInit(): void {
  }

}
