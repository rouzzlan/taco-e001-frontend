import {Component, OnInit} from '@angular/core';
import {TacoService} from "../../../services/taco.service";
import {Router} from "@angular/router";
import {Taco} from "../../../model/taco.model";

@Component({
  selector: 'app-taco-list',
  templateUrl: './taco-list.component.html',
  styleUrls: ['./taco-list.component.css']
})
export class TacoListComponent implements OnInit {
  tacoData: Taco[] | undefined;
  displayedColumns: string[] = ['id', 'name', 'date', 'ingredients', 'actions'];

  constructor(private tacoService: TacoService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadTacos();
  }

  private loadTacos() {
    this.tacoService.getTacos().subscribe(tacos => {
      this.tacoData = tacos;
    })
  }

  performUpdate(id: number) {
    this.router.navigate(['/edit-taco', id]).then();
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/taco-detail', id]).then();
  }

  performDelete(id: number) {
    this.tacoService.performDelete(id).subscribe(() => {
      this.loadTacos();
    })
  }

}
