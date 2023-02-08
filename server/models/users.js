'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    login: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: DataTypes.STRING,
    date_of_birth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};