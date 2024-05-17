'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage, Spot } = require('../models');
const { Op } = require('sequelize');
const path = require('path');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: SpotImage');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'image1',
        preview: true,
      },
      {
        spotId: 1,
        url: 'image2',
        preview: false,
      },
      {
        spotId: 2,
        url: 'image3',
        preview: true,
      },
      {
        spotId: 2,
        url: 'image4',
        preview: false,
      },
      {
        spotId: 3,
        url: 'image5',
        preview: true,
      },
      {
        spotId: 3,
        url: 'image6',
        preview: false,
      },
      {
        spotId: 4,
        url: 'image7',
        preview: true,
      },
      {
        spotId: 4,
        url: 'image8',
        preview: false,
      },
      {
        spotId: 5,
        url: 'image9',
        preview: true,
      },
      {
        spotId: 5,
        url: 'image10',
        preview: false,
      },
      {
        spotId: 6,
        url: 'image11',
        preview: true,
      },
      {
        spotId: 6,
        url: 'image12',
        preview: false,
      },
      {
        spotId: 7,
        url: 'image13',
        preview: true,
      },
      {
        spotId: 7,
        url: 'image14',
        preview: false,
      },
      {
        spotId: 8,
        url: 'image15',
        preview: true,
      },
      {
        spotId: 8,
        url: 'image16',
        preview: false,
      },
      {
        spotId: 9,
        url: 'image17',
        preview: true,
      },
      {
        spotId: 9,
        url: 'image18',
        preview: false,
      },
      {
        spotId: 10,
        url: 'image19',
        preview: true,
      },
      {
        spotId: 10,
        url: 'image20',
        preview: false,
      },
      {
        spotId: 11,
        url: 'image21',
        preview: true,
      },
      {
        spotId: 11,
        url: 'image22',
        preview: false,
      },
      {
        spotId: 12,
        url: 'image23',
        preview: true,
      },
      {
        spotId: 12,
        url: 'image24',
        preview: false,
      },
      {
        spotId: 13,
        url: 'image25',
        preview: true,
      },
      {
        spotId: 13,
        url: 'image26',
        preview: false,
      },
      {
        spotId: 14,
        url: 'image27',
        preview: true,
      },
      {
        spotId: 14,
        url: 'image28',
        preview: false,
      },
      {
        spotId: 15,
        url: 'image29',
        preview: true,
      },
      {
        spotId: 15,
        url: 'image30',
        preview: false,
      },
      {
        spotId: 16,
        url: 'image31',
        preview: true,
      },
      {
        spotId: 16,
        url: 'image32',
        preview: false,
      },
      {
        spotId: 17,
        url: 'image33',
        preview: true,
      },
      {
        spotId: 17,
        url: 'image34',
        preview: false,
      },
      {
        spotId: 18,
        url: 'image35',
        preview: true,
      },
      {
        spotId: 18,
        url: 'image36',
        preview: false,
      },
      {
        spotId: 19,
        url: 'image37',
        preview: true,
      },
      {
        spotId: 19,
        url: 'image38',
        preview: false,
      },
      {
        spotId: 20,
        url: 'image39',
        preview: true,
      },
      {
        spotId: 20,
        url: 'image40',
        preview: false,
      },
      {
        spotId: 21,
        url: 'image41',
        preview: true,
      },
      {
        spotId: 21,
        url: 'image42',
        preview: false,
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, 'SpotImages');
      // {id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]}})
  }
}
