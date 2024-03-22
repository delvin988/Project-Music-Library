'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bycrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite,{ foreignKey: 'UserId' });
      User.hasMany(models.Order,{ foreignKey: 'UserrId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: {
            msg: "username is required",
         },
         notEmpty: {
            msg: "username is required",
         },
      },
   },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
         msg: "Email already exists",
      },
      validate: {
         notNull: {
            msg: "Email is required",
         },
         notEmpty: {
            msg: "Email is required",
         },
         isEmail: {
            msg: "Invalid email format",
         },
      },
   },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: {
            msg: "password is required",
         },
         notEmpty: {
            msg: "password is required",
         },
         len: {
            args: [5],
            msg: "Password must be at least 5 characters long",
         },
      },
   },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Member",
      validate: {
         notNull: {
            msg: "role is required",
         },
         notEmpty: {
            msg: "role is required",
         },
      },
   },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
 });
  return User;
};