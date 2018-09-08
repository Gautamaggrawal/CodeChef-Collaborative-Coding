var request = require('request-promise');
const httpConfig = require('./httpConfig');
const config = require('../config.json');


// Returns Logged In User
exports.getLoggedInUser = function(access_token) {
    return request.get(httpConfig.getCodeChefApiConfig(config.cc_apiUrl.loggedInUser, access_token))
    .then(function(res){
        console.log("codeChef.js:: get LoggedIn User called");
        return res;
    }).catch(function(err){
        console.log("codeChef.js::"+ err + "\nInvalid Access Token");
    });
}