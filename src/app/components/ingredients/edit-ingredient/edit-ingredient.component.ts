import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ingredient} from "../../../model/ingredient.model";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {

  ingredientID: string;
  ingredient: Ingredient | undefined;
  types: Observable<string[]> | undefined;
  ingredientFormGroup: FormGroup;
  nameFC: FormControl = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]{3,25}$')]);
  typeFC: FormControl = new FormControl(null, Validators.required);
  isEnabledFC: FormControl = new FormControl(null, Validators.required);

  constructor(private ingredientService: IngredientService,
              private router: Router,
              private route: ActivatedRoute) {
    this.ingredientFormGroup = new FormGroup({
      name: this.nameFC,
      type: this.typeFC,
      isEnabled: this.isEnabledFC
    });
    this.ingredientID = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.ingredientService.getIngredientByID(this.ingredientID).subscribe((_ingredient) => {
      this.ingredientFormGroup.patchValue({name: _ingredient.name});
      this.ingredientFormGroup.patchValue({type: _ingredient.type});
      this.ingredientFormGroup.patchValue({isEnabled: _ingredient.isEnabled});
      this.ingredient = _ingredient;
    });
    this.types = this.ingredientService.getIngredientTypes();
  }

  onSubmit() {
    if (this.ingredient) {
      this.ingredient.isEnabled = this.ingredientFormGroup.value.isEnabled;
      this.ingredient.name = this.ingredientFormGroup.value.name;
      this.ingredient.type = this.ingredientFormGroup.value.type;
      this.ingredientService.updateIngredient(this.ingredient).subscribe(() => {
        this.router.navigate(['/', 'private', 'ingredient-list']).then();
      })
    }
  }

  onCancel() {
    this.router.navigate(['/', 'private', 'ingredient-list']).then();
  }
}
