'use strict';

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    event_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    received_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    processed_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    received_data: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('success', 'failed'),
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'logs',
    underscored: true
  });

  Log.associate = (models) => {
    Log.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    Log.belongsTo(models.Destination, { foreignKey: 'destination_id', as: 'destination' });
  };

  return Log;
};
