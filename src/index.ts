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
  audience: "sample-donna",
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
  jwks: {
    keys: [
      {
        p: "vKrVKix2MnaXAVBja68odxVhSPZa8rjXm4kTNVnwiBnVfWTxbk61GsnOpxkvfWzh3bax3Z8qlZeKx9OcC_pySR_A6_uZQUe0u-BVF2EoooRFGafxd0C1W8SDdrHSCRlh8daNWbi4OG-6whKgPYjrCE4MjxxMkGsiraSr67cK2k0",
        kty: "RSA",
        q: "uU9doCffU5U4MfMlpIvkCTqe8YQYRXlFrJ-k20Rk_Pm0lmpitQGYFXjqPJoQKA2ptXVlYUJQZJSoRBTmvqlHOCDVLlunNBMy4Uim1EqDwzmC8EYlmW62Vpc1OvkvPnPvxoDF7GlAHlSKqDITn7vi8Xo_Sx8kJacewOPGcbN2cAs",
        d: "UV7jtYlaiIlc4nbq6CurPHh9DvG4Lq-v1hTPutlYOyomcm3tXPWvqZHeHjkiCZAuxJm8i4yZO2Jiv4AVpw3UpvoL2cztpqpp_U87tu_G0yEln6rrbHV5Qrx4day7ROVYccVRuL99dZbWiZs0FO4cc3wqFliR76OIw--lb-4CF-t_rPeRBLixKEPaVdzvVK7w_VD9U6NwBMRdlqZvvCOgjw0amo9ZdwkH57jDyROF0H2y2VP7uYttz41dbF6EYbvpcc7yr3x0ZMyNz_Brr_CnvUHgqspTBpFyZQFr3EUXg1Td5mlkf56MttdOrhz5JszmrJkgb093O73YMD__vPPzwQ",
        e: "AQAB",
        use: "sig",
        kid: "URpsoOH-ArycSFUJg-tepnWYpfrdEu14d925icEpRAg",
        qi: "L_7JKxFtN4MPGovk6gyxhfpoqbDfpOAzfXZlwRaztUNm5MRGocUG-EOh4V8X1ASvjD_cMD1GONzhNchyXE1fPhAJ4RDw6N2RByMwg3vKws4cKOB8J2SKnwoBIg0Redqmf2PpunuFm9pAfVva2R--9arCzn7ytqfIcpuxlJcwu08",
        dp: "WPx-ZFDqQuz6Vk1TR1QrUteLtj00Mm2KjDrAC5brQ1ZkAqvcz_lhpEvxI5FWe-MiOU_VXsGW9U2v0IZ3gJLU2raWaPeXllm63i52E_vojZazfOFgm62ynKD4nMBMX6xQLR_UNbBRe5T_UlA0sjFlIdqmQ83GMwvFJH-Z8yi3frU",
        alg: "RS256",
        dq: "eh6gb6v3E8jxmJFJDFAYPjDAkB7iM96AmQs4BDvlZYVVig6f7_MV-4iMrNVGsm6WmXu9DMQ74JzK6trvWVSLF6UjeAJ0hO_mBuru7lYQ0TX0YU2I970rMpNBRBT1Gm4i5Kj2Rh7yX0qNedxObGTQYRyT23ixRJMGxE0W-NUwxxM",
        n: "iJHxw1m9TFZ4ZNSbqRV5QuVdxhbPLF7RGLvNiuPbAEchYxp8KfqF8rAr88ZPATiKmYT2wFXWMtiZXwCcV7diKYfOnnOKOYlC7BPidaoTNxIMEYVy243o-gGKvV9OAFGXkdgOrD-AyzZ35k_PpMEfowNkqijb6r3q9vtJ5Zayd8gh2nZUnHYvWvyVxd1UUbH10xUD6PatyT8gXt87sgYyRy-ClBMuUTWh3lczidzGLiavspzqvNBA_1MSlJ6YFMCooEEqiX3ZLCCJkusA6h2Gt7U_quxpEQD4hh_q-pNEkLRiIz1RNLbOmAf7YDWd1MMnocxHYUE8aZAT1mLXE3cRTw",
      },
    ],
  },
};

const oidc = new Provider("http://localhost:3000", configuration);

app.use("/", oidc.callback());
app.listen(3000);
