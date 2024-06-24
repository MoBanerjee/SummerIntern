import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "b28c3a37-c88f-406c-a8fd-1ad5bd25d400",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:5001/",
  },
  cache: {
    cacheLocation: "localStorage", 
    storeAuthStateInCookie: false, 
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
