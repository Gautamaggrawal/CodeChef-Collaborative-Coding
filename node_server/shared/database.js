const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json',{
  defaultValue: { users: [] }
});

db = low(adapter);

exports.insertUser = function(id, access_token, refresh_token){
  console.log(db.get('users').find({id: id}).value());
  console.log('value'  + db.get('users').has({id: id}).value());
  var user = db.get('users').find({id: id}).value();
  console.log(user);
  if((user == undefined)){
    console.log("user is a new");
    db.get('users')
      .push({
        id : id,
        access_token : access_token,
        refresh_token : refresh_token
      }).write();
  }else{
    console.log("user already exists");
    db.get('users').update({
      access_token : access_token,
      refresh_token : refresh_token
    }).write();
  };
}

//module.exports = db;