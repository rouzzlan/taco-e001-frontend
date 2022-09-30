import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-toolbar-public',
  templateUrl: './toolbar-public.component.html',
  styleUrls: ['./toolbar-public.component.css']
})
export class ToolbarPublicComponent implements OnInit {

  title = 'angular-app';
  version: string;

  constructor(private authService: AuthService) {
    this.version = environment.version;
  }

  ngOnInit(): void {
  }

  onLoginEvent() {
    this.authService.startSignin();
  }


}
