import {Component, Input, OnInit} from '@angular/core';
import {OrdererService} from "../../services/orderer.service";
import {Orderer} from "../../model/orderer.model";

@Component({
  selector: 'app-orderer-detail',
  templateUrl: './orderer-detail.component.html',
  styleUrls: ['./orderer-detail.component.css']
})
export class OrdererDetailComponent implements OnInit {
  @Input() ordererId: string | undefined;
  infoLoaded: boolean = false;
  orderer: Orderer | undefined;

  constructor(private ordererService: OrdererService) {

  }

  ngOnInit(): void {
  }

  loadOrdererEvent() {
    if (this.ordererId !== undefined) {
      this.ordererService.getOrdererById(this.ordererId).subscribe(_orderer => {
        this.orderer = _orderer;
        this.infoLoaded = true;
      })
    }

  }

}
