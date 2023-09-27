export const oktaConfig = {
    clientId: "0oaaqs5v2bilN05yd5d7",
    issuer: "https://dev-72454077.okta.com/oauth2/default",
    // redirectUri: "https://127.0.0.1/login/callback",
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}