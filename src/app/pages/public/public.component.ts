import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  isLoggedIn: Promise<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.tokenExpired();
  }

  ngOnInit(): void {
  }

}
