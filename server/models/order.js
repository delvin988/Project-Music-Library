'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'UserrId' });
    }
  }
  Order.init({
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: {
            msg: "orderId is required",
         },
         notEmpty: {
            msg: "orderId is required",
         },
      },
   },
    UserrId: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    status: DataTypes.STRING,
    paidDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};