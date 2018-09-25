var db = require('../mongoConfig');

/*
    insertUser checks if user already exists in db.
    if exists updates the refres_token and access_token
    else inserts the new user into db.
*/

exports.insertUser = function(id, access_token, refresh_token){
    console.log("id "+ id);
    db.findOne({id: id},function(err,data) {
        console.log("id "+ err+"   "+data);
        if(err) 
            return console.log(err + "databaseHelper.js :: Error at inserting user");

        if(data == null){
            console.log(err + "databaseHelper.js :: User is a new User");
            var user = new db({
                id : id, 
                access_token : access_token, 
                refresh_token : refresh_token,
                updated_at: Date.now()
            });
            user.save().then(data => {
                console.log("databaseHelper.js :: New user Added");
            }).catch(err => {
                console.log(err + "databaseHelper.js :: Error at New user");
            });
        }else{
            console.log(data + "databaseHelper.js :: User is already exists");
            exports.updateUser(id, access_token,refresh_token);
        }
    });
  }
  
  
  /*
      Updates the user if already exists.
  */
  
  exports.updateUser = function(id, access_token, refresh_token) {
    db.findOneAndUpdate({
        id : id, 
        access_token : access_token, 
        refresh_token : refresh_token,
        updated_at: Date.now()
    }).then(data => {
        console.log("databaseHelper.js :: Updated user");
    }).catch(err => {
        console.log(err + "databaseHelper.js :: Error at Update user");
    });
  }
  
  /*
      Returns User with matched access_token
  */
  
  exports.getUser =function(access_token) {
      return db.find({access_token: access_token},function(err,data){
        if(err) 
            console.log(err + "databaseHelper.js :: Error at fetching user");
        return data;
      }).exec();
  }