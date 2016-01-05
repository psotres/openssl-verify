'use strict';

var exec = require('child_process').exec;

exports.verifyCertificate = function verifyCertificate(cert, caDir, cb) {
	var command = 'openssl verify -purpose sslclient -CApath ' + caDir;

	var openssl = exec(command, function(err, stdout, stderr) {
		var validationResult = {}
		if (stderr) {
			validationResult.output = stderr.toString().trim();
			validationResult.validCert = false;
		} else if (stdout) {
			validationResult.output = stdout.toString().trim();
			validationResult.validCert = true;
		}
		if(validationResult.validCert) {
			validationResult.verifiedCA = validationResult.output.lastIndexOf('OK') == validationResult.output.length - 2;
			if(validationResult.verifiedCA) {
				validationResult.expired = validationResult.output.indexOf('certificate has expired') > -1;
			}
		}
		cb(err, validationResult);
	});

	openssl.stdin.write(cert);
	openssl.stdin.end();
};
