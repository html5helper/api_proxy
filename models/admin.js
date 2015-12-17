"use strict";
module.exports = function(sequelize, DataTypes) {
    var admin = sequelize.define("admin", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        realname: DataTypes.STRING,
        crypt: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        registerTime: DataTypes.INTEGER,
        lastLogin: DataTypes.INTEGER,
        level: DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName:true
    });
    return admin;
};