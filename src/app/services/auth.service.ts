import {Injectable} from '@angular/core';
import {SignoutResponse, User, UserManager} from "oidc-client";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager: UserManager;
  private readonly stsSetting: any;
  private user: User | null;

  constructor(private router: Router) {
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
      // console.log(user);
      this.user = user;
      return user;
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
