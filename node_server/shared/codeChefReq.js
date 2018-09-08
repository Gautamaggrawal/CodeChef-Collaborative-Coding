var request = require('request-promise');
const httpConfig = require('./httpConfig');
const config = require('../config.json');
const dbHelper = require('./database');


// Saves Logged In User
exports.saveUser = function(access_token, refresh_token) {
    return request.get(httpConfig.getCodeChefApiConfig(config.cc_apiUrl.loggedInUser, access_token))
    .then(function(res){
        console.log("codeChef.js:: get LoggedIn User called");
        dbHelper.insertUser(res.result.data.content.username, access_token, refresh_token);
    }).catch(function(err){
        console.log("codeChef.js::"+ err + "\nInvalid Access Token");
    });
}