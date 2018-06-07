var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/groupName and password
passport.use(new LocalStrategy(
   // Our user will sign in using an groupName, rather than a "username"
   {
      usernameField: "groupName"
   },
   function (groupName, password, done) {
      // When a user tries to sign in this code runs
      db.Groups.findOne({
         where: {
            groupName: groupName
         }
      }).then(function (dbGroups) {
         // If there's no user with the given groupName
         if (!dbGroups) {
            return done(null, false, {
               message: "Incorrect groupName."
            });
         }
         // If there is a user with the given groupName, but the password the user gives us is incorrect
         else if (!dbGroups.validPassword(password)) {
            return done(null, false, {
               message: "Incorrect password."
            });
         }
         // If none of the above, return the user
         return done(null, dbGroups);
      });
   }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
   cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
   cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
