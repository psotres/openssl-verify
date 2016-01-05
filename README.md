OpenSSL Certificate validation utility
======================================

A wrapper around [OpenSSL](http://www.openssl.org/) commands to allow certificate validation for Node.js

Usage
-----

Install with npm: `npm install ssl-utils --save`

```js
var openssl = require('openssl-verify');
var fs = require('fs');

var certificate = fs.readFileSync('certificate.pem', "utf8");

openssl.verifyCertificate(certificate, 'resources/cafolder', function(result) {
        console.log(result);
})
```

API
---

#### verifyCertificate(cert, caDir, cb)
Checks the validity of a provided certificate, and wheter or not it is trusted by any CA present in caDir.

* __cert__: String contents of the certificate (PEM encoded)
* __caDir__: String folder with trusted CA's
* __cb__: `Function` in the form of `function(err, result)` where `result` is an object containing boolean flags
  `validCert`, `verifiedCA` and `expired`; as well as `output` containing the raw output from OpenSSL.
  Those flags are evaluated in order, so if one of them is false the rest won't be included (they would be meaningless)
