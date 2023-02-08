'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cars, {foreignKey: 'id',sourceKey: 'id_car'});
      this.hasMany(models.Users, {foreignKey: 'id', sourceKey: 'id_user'});
    }
  }
  Orders.init({
    id_user: DataTypes.INTEGER,
    id_car: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    price: DataTypes.INTEGER,
    real_date_end: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};