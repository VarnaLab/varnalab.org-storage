/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: undefined
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: undefined
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: undefined
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: undefined
    }
  }, {
    tableName: 'events'
  });
};
