import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ingredient} from "../model/ingredient.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.server_url_r}/v1/ingredients/all`);
  }

  deleteIngredient(id: string): any {
    return this.http.delete(`${environment.server_url_cud}/v1/ingredients/${id}`);
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${environment.server_url_cud}/v1/ingredients/add`, ingredient);
  }

  getIngredientTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.server_url_r}/v1/ingredients/get/ingredient/types`);
  }

  getIngredientByID(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${environment.server_url_r}/v1/ingredients/${id}`);
  }

  updateIngredient(ingredient: Ingredient) : Observable<Ingredient> {
    return this.http.put<Ingredient>(`${environment.server_url_cud}/v1/ingredients/${ingredient.id}`, ingredient)
  }
}
