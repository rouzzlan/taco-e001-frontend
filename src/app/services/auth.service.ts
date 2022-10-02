import {Injectable} from '@angular/core';
import {SignoutResponse, User, UserManager} from "oidc-client";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager: UserManager;
  private readonly stsSetting: any;
  private user: User | null;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.stsSetting = environment.authconf;
    this.userManager = new UserManager(this.stsSetting);
    this.user = null;
  }

  startSignin() {
    this.userManager.signinRedirect({data: 'some data'}).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }

  completeLogin(): Promise<User> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this.awaitExpiration(user.expires_at);
      return user;
    });
  }

  awaitExpiration(expirationTime: number) {
    const timeNow = Math.floor(Date.now() / 1000);
    const duration = Math.abs(expirationTime - timeNow) - 60;
    console.log(duration);
    setTimeout(() => {
      this.showSnackBar();
    }, duration * 1000);

  }

  showSnackBar() {
    // console.log('SESSION EXPIRING');
    this.snackBar.open('Session Expiring', 'Login', {
      duration: 5000,
    });
  }

  getLoggedInUser(): User | null {
    return this.user !== null ? this.user : null;
  }

  completeLogout(): Promise<SignoutResponse> {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }

  startLogout() {
    this.userManager.signoutRedirect().then();
  }

  tokenExpired(): Promise<boolean> {
    return this.userManager.getUser().then((user: User | null): boolean => {
      // console.log(user)
      if (user === null || user === undefined) {
        console.log('No user in storage');
        this.router.navigate(['/', 'public', 'session-expired']).then();
        return false;
      } else if (user?.expires_in <= 0 && user?.expired) {
        console.log('AuthGuard: token expired');
        this.router.navigate(['/', 'public', 'session-expired']).then();
        return false;
      } else {
        return true;
      }
    });
  }

  async tokenExpiredSync(): Promise<boolean> {
    return await this.tokenExpired();
  }

  getAccessToken(): string {
    if (this.user === null) {
      return '';
    } else {
      return this.user.access_token;
    }
  }

  async navigateSessionExpired() {
    await this.router.navigate(['/', 'public', 'session-expired']).then();

  }
}
