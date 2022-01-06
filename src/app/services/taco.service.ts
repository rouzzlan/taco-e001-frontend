import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Taco} from "../model/taco.model";
import {environment} from "../../environments/environment";
import {Ingredient} from "../model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class TacoService {

  constructor(private http: HttpClient) {
  }

  getTacos(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${environment.url}/v1/tacos/all`);
  }

  performDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/v1/tacos/${id}`)
  }

  getTacoByID(id: number): Observable<Taco> {
    return this.http.get<Taco>(`${environment.url}/v1/tacos/${id}`);
  }
  createTaco(taco: Taco): Observable<Taco> {
    return this.http.post<Taco>(`${environment.url}/v1/tacos/add`, taco);
  }

  updateTaco(taco: Taco): Observable<Taco> {
    return this.http.put<Taco>(`${environment.url}/v1/tacos/update`, taco)
  }
}
