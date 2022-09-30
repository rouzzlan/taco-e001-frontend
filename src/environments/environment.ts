// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '0.0.7-DEV',
  server_url_r: 'http://172.16.1.100:8081',
  server_url_cud: 'http://172.16.1.100:8082',
  authconf: {
    authority: 'https://keycloak-dev-1.localdomain:8443/realms/myrealm',
    client_id: 'myclient',
    redirect_uri: 'http://172.16.1.100:8001/login-redirect',
    post_logout_redirect_uri: 'http://172.16.1.100:8001/logout-redirect',
    response_type: 'code',
    scope: 'openid profile email',
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  baseUrl: 'http://172.16.1.100'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
