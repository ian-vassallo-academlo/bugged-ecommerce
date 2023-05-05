'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
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
  purchases.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};