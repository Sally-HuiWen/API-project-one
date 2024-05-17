'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');
const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Booking');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1 ,
        userId: 2,
        startDate: '2024-08-01',
        endDate: '2024-08-02',

      },
      {
        spotId: 2 ,
        userId: 3,
        startDate: '2024-08-11',
        endDate: '2024-08-15',

      },
      {
        spotId: 3 ,
        userId: 1,
        startDate: '2024-08-21',
        endDate: '2024-08-28',
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-12',
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2024-10-01',
        endDate: '2024-10-05',
      },
      {
        spotId: 5,
        userId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
      },
      {
        spotId: 6,
        userId: 2,
        startDate: '2024-09-15',
        endDate: '2024-09-20',
      },
      {
        spotId: 7,
        userId: 3,
        startDate: '2024-08-08',
        endDate: '2024-08-10',
      },
      {
        spotId: 8,
        userId: 3,
        startDate: '2024-09-01',
        endDate: '2024-09-08',
      },
      {
        spotId: 9,
        userId: 3,
        startDate: '2024-09-05',
        endDate: '2024-09-12',
      },
      {
        spotId: 10,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-03',
      },
      {
        spotId: 11,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
      },
      {
        spotId: 12,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-08',
      },
      {
        spotId: 13,
        userId: 3,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
      },
      {
        spotId: 14,
        userId: 3,
        startDate: '2024-09-01',
        endDate: '2024-09-09',
      },
      {
        spotId: 15,
        userId: 3,
        startDate: '2024-09-01',
        endDate: '2024-09-07',
      },
      {
        spotId: 16,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-08',
      },
      {
        spotId: 17,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-12',
      },
      {
        spotId: 18,
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-15',
      }, 
      {
        spotId: 19,
        userId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-12',
      }, 
      {
        spotId: 20,
        userId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-15',
      }, 
      {
        spotId: 21,
        userId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
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
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, 'Bookings');
      // {id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}}
  }
};
