// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: require('../../package.json').version,
  baseapi: window["env"].BASEAPI,
  useSSO: +window["env"].USESSO,
  redirect: window["env"].REDIRECT,
  logoutRedirect: window["env"].LOGOUTREDIRECT,
  keycloakConfig: {
    url: window["env"].KEYCLOAKCONFIG.URL,
    realm: window["env"].KEYCLOAKCONFIG.REALM,
    clientId: window["env"].KEYCLOAKCONFIG.CLIENTID
  },
  clientSettings: {
    authority: window["env"].CLIENTSETTINGS.AUTHORITY,
    client_id: window["env"].CLIENTSETTINGS.CLIENTID,
    redirect_uri: window["env"].CLIENTSETTINGS.REDIRECT_URI,
    post_logout_redirect_uri: window["env"].CLIENTSETTINGS.POSTLOGOUTREDIRECTURI,
    response_type: window["env"].CLIENTSETTINGS.RESPONSE_TYPE,
    scope: window["env"].CLIENTSETTINGS.SCOPE,
    filterProtocolClaims: window["env"].CLIENTSETTINGS.FILTERPROROCOLCLAIMS,
    loadUserInfo: window["env"].CLIENTSETTINGS.LOADUSERINFO
  }``
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
