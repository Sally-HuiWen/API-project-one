'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'

      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true,
      });

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state:{
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: {
          args: -90,
          msg: 'Latitude must be between -90 and 90.'
          },
        max: {
          args: 90,
          msg: 'Latitude must be between -90 and 90.'
          },
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: {
          args: -180,
          msg: 'Longitude must be between -180 and 180.'
          },
        max: {
          args: 180,
          msg: 'Longitude must be between -180 and 180.'
          },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL,
      
    },
  }, {
    indexes: [{unique: true, fields: ['lat','lng']}],
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};