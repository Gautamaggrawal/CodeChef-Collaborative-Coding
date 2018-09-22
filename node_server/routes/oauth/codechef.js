var express = require('express');
var config = require('../../config.json');
var oauthReq = require('../../shared/oauthReq');
var dbHelper = require('../../shared/databaseHelper');

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


/*
    Returns new Access Token
*/
router.get('/access_token',function(req,res){
    var user = dbHelper.getUser(req.query.access_token);
    console.log('user' + user);
    if(user != undefined){
        console.log('old acces_token '+ user.access_token);
        oauthReq.getNewAccessToken(user.refresh_token).then(data =>{
            console.log('new acces_token '+ data);
            res.send(JSON.stringify(data));
        });
    }else{
        res.status(403);
        res.send(JSON.stringify('Invalid User'));
    }
});

module.exports = router;
