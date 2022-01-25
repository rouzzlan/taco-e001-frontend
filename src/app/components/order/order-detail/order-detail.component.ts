import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: number

  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
