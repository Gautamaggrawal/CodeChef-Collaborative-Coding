var express = require('express');
var request = require('request-promise');

var oauthFunc = require('../../shared/oauthFunc');
var config = require('../../config.json');
var db = require('../../shared/database');

var router = express.Router();


router.get('/codechef', function(req, res, next) {
    
    // Exchange authorization code for access token.
    request.post(oauthFunc.getAuthConfig(req.query.code))
    .then(function(res){
        console.log(res+'reached post call');
        var response = JSON.parse(res);
        console.log('sad '+ response.result.data.access_token);
        var getUseroptions = {
            uri: config.codeChefApiUrl + '/users/me',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' +  response.result.data.access_token
            }
        };
        request.get(getUseroptions)
        .then(function(res){
            var response = JSON.parse(res);
            console.log(response.result.data.content.username);
        }).catch(function(err){
            //error while requesting current user
            console.log(err + "\nInvalid Access Token");
        });
    }).catch(function(err){
        //error while requesting access token
        console.log(err + "\nInvalid Authorization Code");
    });
    
    
});

module.exports = router;



    
    
    /*function(req, res) {
        console.log('reached post call');
        var status = JSON.parse(res.body);
        console.log('sad '+ status.result.data.access_token);
        //res.redirect('http://localhost:4200/home');
        //var access_token = qs.parse(token).access_token;
        //var github_client = github.client(access_token);
        /* Retrieve profile information about the current user.
        github_client.me().info(function(err, profile) {
            if (err) {
                return res.status(400).send({
                    message: 'User not found'
                });
            }
            var github_id = profile['id'];
            db.users.find({
                _id: github_id
            }, function(err, docs) {
                // The user doesn't have an account already
                if (_.isEmpty(docs)) {
                    // Create the user
                    var user = {
                        _id: github_id,
                        oauth_token: access_token
                    }
                    db.users.insert(user);
                }
                // Update the OAuth2 token
                else {
                    db.users.update({
                        _id: github_id
                    }, {
                        $set: {
                            oauth_token: access_token
                        }
                    })
                }
            });
        });
        res.send({
        //    token: access_token
        });
    });*/