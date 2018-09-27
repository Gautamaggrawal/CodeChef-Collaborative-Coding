var express = require('express');
var config = require('../../config.json');
var oauthReq = require('../../shared/oauthReq');
var dbHelper = require('../../shared/databaseHelper');

var router = express.Router();

//redirect unauthorized user
router.get('',function(req,res){
    res.redirect(config.angularUrl[0]);
});


router.get('/codechef', function(req, res, next) {
    
    /* Exchange authorization code for access token.
    *  getAuthConfig returns the auth configuration 
    */
    if(req.query.code != undefined){
        oauthReq.getAuthorizationToken(req.query.code).then(function (access_token){
            console.log(access_token);
            res.redirect(config.angularUrl[0]+'/home/?access_token='+ access_token);
        }).catch(function(err){
            res.redirect(config.angularUrl[0]);
            console.log(err + 'codechef.js:: Invalid authorization request');
        });
    }else{
        res.redirect(config.angularUrl[0]);
    }

});


/*
    Returns new Access Token
*/
router.get('/access_token',function(req,res){
    if(req.query.access_token != undefined){
        dbHelper.getUser(req.query.access_token).then(user =>{
            console.log('user' + user[0]);
            if(user != undefined){
                console.log('old acces_token '+ user[0].access_token);
                oauthReq.getNewAccessToken(user[0].refresh_token).then(data =>{
                    console.log('new acces_token '+ data);
                    res.send(JSON.stringify(data));
                });
            }else{
                res.status(403);
                res.send(JSON.stringify('Invalid User'));
            }
        });
    }else{
        res.redirect(config.angularUrl[0]);
    }
});

module.exports = router;
