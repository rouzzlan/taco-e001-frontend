import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../model/ingredient.model";
import {IngredientService} from "../../../services/ingredient.service";
import {Router} from "@angular/router";
import {Taco} from "../../../model/taco.model";
import {TacoService} from "../../../services/taco.service";

@Component({
  selector: 'app-add-taco',
  templateUrl: './add-taco.component.html',
  styleUrls: ['./add-taco.component.css']
})
export class AddTacoComponent implements OnInit {
  ingredientOptions: Ingredient[] | undefined;
  tacoFormGroup: FormGroup;
  nameFC: FormControl = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,50}$')]);
  ingredientsFC: FormControl = new FormControl(null, Validators.required);

  constructor(private ingredientService: IngredientService,
              private tacoService: TacoService,
              private router: Router) {
    this.tacoFormGroup = new FormGroup({
      name: this.nameFC,
      ingredients: this.ingredientsFC
    })
  }

  ngOnInit(): void {
    this.loadIngredients();
  }

  onSubmit() {
    let ingIDs: string[] = this.tacoFormGroup.value.ingredients;
    let newTaco: Taco = new Taco();
    newTaco.name = this.tacoFormGroup.value.name;
    // TODO dummy value, to be removed in future version.
    newTaco.tacoOrderId = 1;
    newTaco.ingredients = this.extractIngredients(ingIDs, this.ingredientOptions!);
    this.tacoService.createTaco(newTaco).subscribe(taco => {
      this.router.navigate(['/', 'private', 'taco-list']).then();
    })
  }

  private loadIngredients(): void {
    this.ingredientService.getEnabledIngredients().subscribe(value => {
      this.ingredientOptions = value;
    })
  }

  private extractIngredients(ids: string[], ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter(ing => ids.includes(ing.id!));
  }
}
