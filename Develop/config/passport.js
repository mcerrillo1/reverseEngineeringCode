//variables created to require necessary files and insatllations
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//variable to store reuirement  for ../models folder
var db = require("../models");

//uses passport and LocalStrategy, wanting login to have username/ email and password
passport.use(new LocalStrategy(
  //created property that wil require user to input an email
  {
    usernameField: "email"
  },
  function(email, password, done) {
    //When user signs in, run function that runs sequelize findOne which refers to db.User where email: email
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If statement that runs if there is an error in the submit "Incorrect email" message
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      //Runs error message if password is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If all information is correct, returns user
      return done(null, dbUser);
    });
  }
));


//bolierplate code needed for Sequelize to serialize and deserialize user input 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting passport
module.exports = passport;
