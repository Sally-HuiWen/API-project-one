'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Review');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([//make sure each booking has a review
      {
        spotId: 1,
        userId: 2,
        review: 'wonderful place to stay!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'It is cozy studio. However, it is not walking distance to Stanford!',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'super convenient for skiing!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'not bad',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 2,
        review: 'so so',
        stars: 3,
      },
      {
        spotId: 5,
        userId: 2,
        review: 'do not book there',
        stars: 1,
      },
      {
        spotId: 6,
        userId: 2,
        review: 'super cool',
        stars: 5,
      },
      {
        spotId: 7,
        userId: 3,
        review: 'amazing place',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 3,
        review: 'nice view',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 3,
        review: 'expressive place',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 1,
        review: 'good to stay',
        stars: 4,
      },
      {
        spotId: 11,
        userId: 1,
        review: 'not very clean',
        stars: 3,
      },
      {
        spotId: 12,
        userId: 1,
        review: 'quite cool spot',
        stars: 5,
      },
      {
        spotId: 13,
        userId: 3,
        review: 'will come back again',
        stars: 5,
      },
      {
        spotId: 14,
        userId: 3,
        review: 'highly recommended',
        stars: 5,
      },
      {
        spotId: 15,
        userId: 3,
        review: 'not very convenient place to live',
        stars: 4,
      },
      {
        spotId: 16,
        userId: 2,
        review: 'dirty floor',
        stars: 3,
      },
      {
        spotId: 17,
        userId: 2,
        review: 'nice experience!',
        stars: 5,
      },
      {
        spotId: 18,
        userId: 2,
        review: 'not easy to find',
        stars: 4,
      },
      {
        spotId: 19,
        userId: 1,
        review: 'the best place ever!',
        stars: 5,
      },
      {
        spotId: 20,
        userId: 1,
        review: 'I will recommend it to my friends!',
        stars: 5,
      },
      {
        spotId: 21,
        userId: 1,
        review: 'super comfortable!',
        stars: 5,
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
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, //'Reviews')
      {id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}});
  }
};
