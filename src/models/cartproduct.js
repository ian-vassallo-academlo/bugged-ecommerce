'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {
        foreignKey: { allowNull: false }
      });
      this.belongsTo(models.user, {
        foreignKey: { allowNull: false }
      });
    }
  }
  cartProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'cartProduct',
    indexes: [
      {
        unique: true,
        fields: ['productId', 'userId']
      }
    ]
  });
  return cartProduct;
};