const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json',{
  defaultValue: { users: [] }
});

db = low(adapter);

/*
    insertUser checks if user already exists in db.
    if exists updates the refres_token and access_token
    else inserts the new user into db.
*/

exports.insertUser = function(id, access_token, refresh_token){
  var user = db.get('users').find({id: id}).value();
  if((user == undefined)){
    console.log("user is a new user");
    db.get('users')
    .push({
        id : id, 
        access_token : access_token, 
        refresh_token : refresh_token
    }).write();
  } else{
    console.log("user already exists");
    exports.updateUser(id, access_token,refresh_token);
  };
}


/*
    Updates the user if already exists.
*/

exports.updateUser = function(id, access_token, refresh_token) {
  db.get('users')
  .find({id: id})
  .assign({
    access_token : access_token,
    refresh_token : refresh_token
  }).write();
}

/*
    Returns User with matched access_token
*/

exports.getUser =function(access_token) {
  return db.get('users')
  .find({access_token: access_token})
  .value();
}