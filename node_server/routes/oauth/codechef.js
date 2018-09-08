var express = require('express');
var config = require('../../config.json');
var oauthReq = require('../../shared/oauthReq');

var router = express.Router();


router.get('/codechef', function(req, res, next) {
    
    /* Exchange authorization code for access token.
    *  getAuthConfig returns the auth configuration 
    */
    oauthReq.getAuthorizationToken(req.query.code).then(function (access_token){
        console.log(access_token);
        res.redirect(config.angularUrl[0]+'/home/?access_token='+ access_token);
    }).catch(function(err){
        console.log(err + 'codechef.js:: Invalid authorization request');
    });

});

module.exports = router;
