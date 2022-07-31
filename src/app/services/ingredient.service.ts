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

  getEnabledIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.server_url_r}/v1/ingredients/all/enabled`);
  }

  deleteIngredient(id: string): any {
    return this.http.delete(`${environment.server_url_cud}/v1/ingredients/${id}`);
  }

  disableIngredient(id: string): any {
    return this.http.put(`${environment.server_url_cud}/v1/ingredients/disable/${id}`, null);
  }

  enableIngredient(id: string): any {
    return this.http.put(`${environment.server_url_cud}/v1/ingredients/enable/${id}`, null);
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
