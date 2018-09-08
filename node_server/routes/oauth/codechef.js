var express = require('express');
var config = require('../../config.json');
var oauthReq = require('../../shared/oauthReq');

var router = express.Router();


router.get('/codechef', function(req, res, next) {
    
    /* Exchange authorization code for access token.
    *  getAuthConfig returns the auth configuration 
    */
    oauthReq.getAuthorizationToken(req.query.code).then(function (data){
        console.log(JSON.stringify(data));
        res.redirect(config.angularUrl[0]+'/home/?data='+ JSON.stringify(data));
    }).catch(function(err){
        console.log(err + 'codechef.js:: Invalid authorization request');
    });

});

module.exports = router;
