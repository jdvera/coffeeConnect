module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Users.associate = function(models) {
    Users.belongsTo(models.Groups, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Users;
};
