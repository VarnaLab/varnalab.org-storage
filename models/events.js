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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: undefined
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    start_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: undefined
    },
    end_at: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: undefined
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: undefined
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: undefined
    }
  }, {
    tableName: 'events'
  });
};
