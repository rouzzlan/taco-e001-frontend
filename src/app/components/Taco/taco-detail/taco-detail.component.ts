import { Component, OnInit } from '@angular/core';
import {TacoService} from "../../../services/taco.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Taco} from "../../../model/taco.model";

@Component({
  selector: 'app-taco-detail',
  templateUrl: './taco-detail.component.html',
  styleUrls: ['./taco-detail.component.css']
})
export class TacoDetailComponent implements OnInit {
  taco: Taco | undefined;

  constructor(private tacoService: TacoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTaco();
  }

  private loadTaco() {
    this.tacoService.getTacoByID(this.route.snapshot.params.id).subscribe(taco => {
      this.taco = taco;
    })
  }

  backToList() {
    this.router.navigate(['/taco-list']).then();
  }

  onEditTaco(id: number | undefined) {
    if (id) {
      this.router.navigate(['/edit-taco', id]).then();
    }
  }

  onNavigateToOrder(orderId: number | undefined) {
    if (orderId) {
      this.router.navigate(['/order-detail', orderId]).then();
    }
  }
}
