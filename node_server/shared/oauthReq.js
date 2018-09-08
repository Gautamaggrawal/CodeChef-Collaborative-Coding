var request = require('request-promise');
var httpConfig = require('./httpConfig');
var codeChefReq = require('./codeChefReq');
const dbHelper = require('./database');

exports.getAuthorizationToken = function (code){
    return request.post(httpConfig.getAuthConfig(code))
    .then(function(res){
        console.log(res+'reached post call');
        response = JSON.parse(res);
        var access_token = response.result.data.access_token;
        var refresh_token = response.result.data.refresh_token;
        return codeChefReq.getLoggedInUser(access_token).then(function store(loggedInUser){
            console.log('oauthReq:: Update access_token');
            dbHelper.insertUser(loggedInUser.result.data.content.username, access_token, refresh_token);
            return loggedInUser;
        });
    }).catch(function(err){
        console.log(err + "oauthReq:: Invalid Authorization Code");
    });
}