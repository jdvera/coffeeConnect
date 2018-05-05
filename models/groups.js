var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Groups = sequelize.define("Groups", {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Groups.associate = function(models) {
    Groups.hasMany(models.Users);
  };

//   Groups.validatePassword = function(password, passwd, done, user) {
//     bcrypt.compare(password, passwd, function(err, isMatch) {
//       if (err) {
//         done(err, false);
//       }
//       else if (isMatch) {
//         done(null, user);
//       }
//       else if (!isMatch) {
//         done(null, false);
//       }
//     })
//   };

//   Groups.beforeCreate(function(user, options) {
//     return cryptPassword(user.password)
//       .then(success => {
//         user.password = success;
//       })
//       .catch(err => {
//         if (err) console.log(err);
//       });
//   });

//   function cryptPassword(password) {
//     return new Promise(function(resolve, reject) {
//       bcrypt.genSalt(10, function(err, salt) {
//         if (err) return reject(err);
//         bcrypt.hash(password, salt, null, function(err, hash) {
//           if (err) return reject(err);
//           return resolve(hash);
//         });
//       });
//     });
//   }

  return Groups;
};
