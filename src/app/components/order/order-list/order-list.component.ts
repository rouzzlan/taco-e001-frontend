import { Component, OnInit } from '@angular/core';
import {TacoOrderService} from "../../../services/taco-order.service";
import {Observable} from "rxjs";
import {TacoOrder} from "../../../model/tacoOrder.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Observable<TacoOrder[]>;

  constructor(private service: TacoOrderService) {
    this.orders = service.getOrders();
  }

  ngOnInit(): void {
  }

}
