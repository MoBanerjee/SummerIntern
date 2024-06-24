import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "",
    authority: "",
    redirectUri: "",
  },
  cache: {
    cacheLocation: "localStorage", 
    storeAuthStateInCookie: false, 
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
