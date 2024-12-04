'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete:'Cascade'
      })
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Ensure the URL format is valid
          isS3Url(value) {
            if (!value.startsWith('https://') || !value.includes('s3')) {
              throw new Error('URL must point to an S3 resource');
            }
          },
        },
      },
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};