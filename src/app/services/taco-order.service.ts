import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TacoOrder} from "../model/tacoOrder.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TacoOrderService {

  constructor(private http: HttpClient) {
  }

  createTacoOrder(tacoOrder: TacoOrder): Observable<TacoOrder> {
    return this.http.post<TacoOrder>(`${environment.server_url_cud}/v1/order/add`, tacoOrder);
  }

  getOrders(): Observable<TacoOrder[]> {
    return this.http.get<TacoOrder[]>(`${environment.server_url_r}/v1/order/all`);
  }

  getOrderById(id: number): Observable<TacoOrder> {
    return this.http.get<TacoOrder>(`${environment.server_url_r}/v1/order/${id}`);
  }
}
