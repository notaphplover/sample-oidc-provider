import express from "express";
import {
  Provider,
  ClientMetadata,
  Configuration,
  ResourceServer,
} from "oidc-provider";

const app = express();

const clients: ClientMetadata[] = [
  {
    client_id: "foo",
    client_secret: "bar",
    redirect_uris: ["https://jwt.io"],
    response_types: ["id_token", "code", "code id_token"],
    grant_types: ["authorization_code", "client_credentials", "implicit"],
    token_endpoint_auth_method: "client_secret_post",
  },
];

const resourceServer: ResourceServer = {
  audience: "sample-audience",
  scope: "sample-scope samba",
  accessTokenFormat: "jwt",
  accessTokenTTL: 3600,
  jwt: {
    sign: {
      alg: "RS256",
    },
  },
};

const configuration: Configuration = {
  clients,
  clientDefaults: {},
  features: {
    clientCredentials: {
      enabled: true,
    },
    resourceIndicators: {
      defaultResource() {
        return ["http://sample-identifier.com"];
      },
      enabled: true,
      getResourceServerInfo() {
        return resourceServer;
      },
    },
  },
};

const oidc = new Provider("http://localhost:3000", configuration);

app.use("/", oidc.callback());
app.listen(3000);
