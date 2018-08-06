var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var Groups = sequelize.define("Groups", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        hashId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: DataTypes.STRING
    });

    Groups.associate = function (models) {
        Groups.hasMany(models.Users);
    };


    //  --- Passport stuff
    Groups.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the Groups Model lifecycle
    // In this case, before a Groups is created, we will automatically hash their password
    Groups.hook("beforeCreate", function (group) {
        group.password = bcrypt.hashSync(group.password, bcrypt.genSaltSync(10), null);
    });


    return Groups;
};
