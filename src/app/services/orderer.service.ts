import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Orderer} from "../model/orderer.model";

@Injectable({
  providedIn: 'root'
})
export class OrdererService {

  constructor(private http: HttpClient) {
  }

  getOrdererById(id: string): Observable<Orderer> {
    return this.http.get<Orderer>(`${environment.server_url_r}/v1/orderer/${id}`);
  }
}
