'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Destination.init({
    account_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    method: DataTypes.STRING,
    headers: DataTypes.JSON,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
     // Add these to fix the issue
     createdAt: 'created_at',
     updatedAt: 'updated_at',
  });
  return Destination;
};