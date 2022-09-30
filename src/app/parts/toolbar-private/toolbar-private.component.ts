import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-toolbar-private',
  templateUrl: './toolbar-private.component.html',
  styleUrls: ['./toolbar-private.component.css']
})
export class ToolbarPrivateComponent implements OnInit {

  title = 'angular-app';
  version: string;

  constructor(private authService: AuthService) {
    this.version = environment.version;
  }

  ngOnInit(): void {
  }

  onLogoutEvent() {
    this.authService.startLogout();
  }

}
