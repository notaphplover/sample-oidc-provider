const express = require('express');
const Provider = require('oidc-provider');

const app = express();

const oidc = new Provider('http://localhost:3000');
oidc.initialize().then(function () {
    app.use('/', oidc.callback);
    app.listen(3000);
});
