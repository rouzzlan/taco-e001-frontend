import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../../services/ingredient.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../model/ingredient.model";

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  types: Observable<string[]> | undefined;
  ingredientFormGroup: FormGroup;
  idFC: FormControl = new FormControl(null, [Validators.required, Validators.max(4)]);
  nameFC: FormControl = new FormControl(null, [Validators.required, Validators.min(3), Validators.max(15)]);
  typeFC: FormControl = new FormControl(null, Validators.required);

  constructor(private ingredientService: IngredientService, private router: Router) {
    this.ingredientFormGroup = new FormGroup({
      id: this.idFC,
      name: this.nameFC,
      type: this.typeFC
    });
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  public loadTypes(): void {
    this.types = this.ingredientService.getIngredientTypes();
  }

  onSubmit() {
    let ingredient: Ingredient = new Ingredient();
    ingredient.id = this.ingredientFormGroup.value.id;
    ingredient.name = this.ingredientFormGroup.value.name;
    ingredient.type = this.ingredientFormGroup.value.type;
    this.ingredientService.createIngredient(ingredient).subscribe(() => {
      this.router.navigate(['/', 'private', 'ingredient-list']).then();
    });
  }
}
