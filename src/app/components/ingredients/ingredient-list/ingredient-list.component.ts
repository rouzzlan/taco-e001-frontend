import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../model/ingredient.model";
import {IngredientService} from "../../../services/ingredient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  IngredientData: Ingredient[] = [];

  displayedColumns: string[] = ['id', 'name', 'type', 'actions'];

  constructor(private ingredientService: IngredientService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadIngredients();
  }

  private loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe(value => {
      this.IngredientData = value;
    })
  }

  public performUpdate(id: string) : void {
    this.router.navigate(['/edit-ingredient', id]).then();
  }

  public performDisable(id: string): void {
    this.ingredientService.disableIngredient(id).subscribe(() => {
      this.loadIngredients();
    });
  }

  public performEnable(id: string): void {
    this.ingredientService.enableIngredient(id).subscribe(() => {
      this.loadIngredients();
    });
  }

}
