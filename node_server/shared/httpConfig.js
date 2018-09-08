var config = require('../config.json');

// Authorization http config
exports.getAuthConfig = function (code){
    var params = {
        grant_type: 'authorization_code',
        code: code,
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uri: config.redirectUrl
    };

    var authOptions = {
        uri: config.cc_apiUrl.token,
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return authOptions;
}

// CodeChef Api http config
exports.getCodeChefApiConfig = function(url, access_token) {
    var codeChefOptions = {
        uri: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' +  access_token
        },
        json: true
    };
    
    return codeChefOptions;
}