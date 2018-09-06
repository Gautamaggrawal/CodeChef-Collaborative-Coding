var config = require('../config.json');

function getAuthConfig (code){
    var params = {
        grant_type: 'authorization_code',
        code: code,
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uri: config.redirectUrl
    };

    var authOptions = {
        uri: config.codeChefApiUrl + '/oauth/token',
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return authOptions;
}

exports.getAuthConfig = getAuthConfig;