import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private service: TacoOrderService, private router: Router) {
    this.order = service.getOrderById(this.route.snapshot.params.id);
  }

  ngOnInit(): void {
  }

  onNavigateTaco(id: number | undefined) {
    console.log('Navigating to taco detail. taco id: ' + id);
    this.router.navigate(['/taco-detail', id]).then();
  }

  onNavigateToOrders() {
    this.router.navigate(["/orders"]).then();
  }

}
