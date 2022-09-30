import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.startsWith('/login-redirect')) {
      this.authService.completeLogin().then(() => {
        this.router.navigate(['/home'], {replaceUrl: true}).then();
      });
    } else {
      this.authService.completeLogout().then(() => {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      });
    }
  }
}
