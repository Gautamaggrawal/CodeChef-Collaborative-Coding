var request = require('request-promise');
var httpConfig = require('./httpConfig');
var codeChefReq = require('./codeChefReq');

// request authorization from codechef
exports.getAuthorizationToken = function (code){
    return request.post(httpConfig.getAuthConfig(code))
    .then(function(res){
        console.log(res+'reached post call');
        response = JSON.parse(res);
        var access_token = response.result.data.access_token;
        var refresh_token = response.result.data.refresh_token;
        codeChefReq.saveUser(access_token, refresh_token);
        return access_token;
    }).catch(function(err){
        console.log(err + "oauthReq:: Invalid Authorization Code");
    });
}

// request for new access token after expiry of existing one.
exports.getNewAccessToken = function(refresh_token) {
    return request.post(httpConfig.getAccessTokenConfig(refresh_token)).then(function(res){
        var response = JSON.parse(res);
        var access_token = response.result.data.access_token;
        var refresh_token = response.result.data.refresh_token;
        codeChefReq.saveUser(access_token, refresh_token);
        return access_token;
    }).catch(function(err){
        console.log(err + "oauthReq:: Invalid getAccessToken");
    });  
}