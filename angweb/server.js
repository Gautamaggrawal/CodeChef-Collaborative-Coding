const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/hackercat.ml/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/hackercat.ml/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/hackercat.ml/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use('/',express.static(path.join(__dirname + '/dist/angweb')));
app.get('/*',(req,res)=> res.sendFile(path.join(__dirname + '/dist/angweb/index.html')));

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
});

