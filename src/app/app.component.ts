import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  version: string;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.version = environment.version;
    this.isLoggedIn = !!(authService.getLoggedInUser());
  }
}
