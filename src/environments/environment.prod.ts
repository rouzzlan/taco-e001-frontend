export const environment = {
  production: true,
  version: '0.0.7-PROD',
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
  baseUrl: 'http://172.16.1.100:8081'
};
