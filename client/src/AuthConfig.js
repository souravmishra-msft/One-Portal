import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "496e5b5e-6163-4f41-861f-6dde39ea5aa2",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
};

export const loginRequest = {
    scopes: ["user.read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};