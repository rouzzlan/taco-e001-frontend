import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TacoOrderService} from "../../../services/taco-order.service";
import {TacoOrder} from "../../../model/tacoOrder.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Observable<TacoOrder>;

  constructor(private route: ActivatedRoute, private service: TacoOrderService) {
    this.order = service.getOrderById(this.route.snapshot.params.id);
  }

  ngOnInit(): void {
  }

}
