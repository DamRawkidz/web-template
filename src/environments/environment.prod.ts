export const environment = {
  production: true,
  appVersion: require('../../package.json').version,
  baseapi: window["env"].BASEAPI,
  // useSSO: +window["env"].USESSO,
  // redirect: window["env"].REDIRECT,
  // logoutRedirect: window["env"].LOGOUTREDIRECT,
  // keycloakConfig: {
  //   url: window["env"].KEYCLOAKCONFIG.URL,
  //   realm: window["env"].KEYCLOAKCONFIG.REALM,
  //   clientId: window["env"].KEYCLOAKCONFIG.CLIENTID
  // },
  // clientSettings: {
  //   authority: window["env"].CLIENTSETTINGS.AUTHORITY,
  //   client_id: window["env"].CLIENTSETTINGS.CLIENTID,
  //   redirect_uri: window["env"].CLIENTSETTINGS.REDIRECT_URI,
  //   post_logout_redirect_uri: window["env"].CLIENTSETTINGS.POSTLOGOUTREDIRECTURI,
  //   response_type: window["env"].CLIENTSETTINGS.RESPONSE_TYPE,
  //   scope: window["env"].CLIENTSETTINGS.SCOPE,
  //   filterProtocolClaims: window["env"].CLIENTSETTINGS.FILTERPROROCOLCLAIMS,
  //   loadUserInfo: window["env"].CLIENTSETTINGS.LOADUSERINFO
  // }
};
