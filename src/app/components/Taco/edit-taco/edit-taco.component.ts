import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../model/ingredient.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";
import {TacoService} from "../../../services/taco.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Taco} from "../../../model/taco.model";

@Component({
  selector: 'app-edit-taco',
  templateUrl: './edit-taco.component.html',
  styleUrls: ['./edit-taco.component.css']
})
export class EditTacoComponent implements OnInit {
  taco: Taco | undefined;
  ingredientOptions: Ingredient[] | undefined;
  tacoFormGroup: FormGroup | undefined;

  constructor(private ingredientService: IngredientService,
              private tacoService: TacoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTaco();
    this.loadIngredients();
  }

  onSubmit() {
    let ingIDs: string[] = this.tacoFormGroup?.value.ingredients;
    if (this.taco) {
      let newTaco: Taco = this.taco;
      newTaco.name = this.tacoFormGroup?.value.name;
      newTaco.ingredients = this.extractIngredients(ingIDs, this.ingredientOptions!);
      this.tacoService.updateTaco(newTaco).subscribe(() => {
        this.router.navigate(['/taco-list']).then();
      })
    }
  }

  private loadTaco() {
    this.tacoService.getTacoByID(this.route.snapshot.params.id).subscribe(taco => {
      this.taco = taco;
      this.initForm();
    })
  }

  private loadIngredients(): void {
    this.ingredientService.getEnabledIngredients().subscribe(value => {
      this.ingredientOptions = value;
    })
  }

  private initForm() {
    let chosenIngredients = this.taco?.ingredients?.map(ingredient => {
      return ingredient.id;
    });
    this.tacoFormGroup = new FormGroup({
      name: new FormControl(this.taco?.name, [Validators.required, Validators.min(5)]),
      ingredients: new FormControl(chosenIngredients, Validators.required)
    })
  }

  resetToOriginal() {
    let chosenIngredients = this.taco?.ingredients?.map(ingredient => {
      return ingredient.id;
    });
    this.tacoFormGroup?.patchValue({
      name: this.taco?.name,
      ingredients: chosenIngredients
    });
  }

  private extractIngredients(ids: string[], ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter(ing => ids.includes(ing.id!));
  }

  backToList() {
    this.router.navigate(['/taco-list']).then();
  }
}
