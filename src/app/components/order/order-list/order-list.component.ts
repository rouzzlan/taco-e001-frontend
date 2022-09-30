import {Component, OnInit} from '@angular/core';
import {TacoOrderService} from "../../../services/taco-order.service";
import {Observable} from "rxjs";
import {TacoOrder} from "../../../model/tacoOrder.model";
import {Taco} from "../../../model/taco.model";
import {TacoService} from "../../../services/taco.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Observable<TacoOrder[]>;
  tacos: Taco[] | undefined;

  constructor(private service: TacoOrderService, private tacoService: TacoService, private router: Router) {
    this.orders = service.getOrders();
  }

  ngOnInit(): void {
  }

  onClick(id: number | undefined) {
    console.log("Id: " + id);
    if (id) {
      this.tacoService.getTacosForOrder(id).subscribe(data => {
        this.tacos = data;
      })
    }
  }

  onNavigateTaco(id: number | undefined) {
    console.log('Navigating to taco detail. taco id: ' + id);
    this.router.navigate(['/', 'private', 'taco-detail', id]).then();
  }

  onNavigateToOrder(orderId: number | undefined) {
    if (orderId) {
      this.router.navigate(['/', 'private', 'order-detail', orderId]).then();
    }
  }
}
