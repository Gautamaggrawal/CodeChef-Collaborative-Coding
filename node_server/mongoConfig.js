var mongoose = require('mongoose');
var config = require('./config.json');

var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    id: { type: String, required: true, index: {unique: true, dropDups: true}},
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    updated_at : Date
});

mongoose.connect(config.mongoDbUrl,{ useCreateIndex: true,useNewUrlParser: true })
    .then(
        () => { console.log('mongoDb.js:: Connected to MongDB'); },
        err => { console.log('mongoDb.js:: Connection to Mongodb Failed'); throw err;}
    );

module.exports = mongoose.model('TokenStore', tokenSchema);