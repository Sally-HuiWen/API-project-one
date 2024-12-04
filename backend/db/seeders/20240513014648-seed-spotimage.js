'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage, Spot } = require('../models');
const { Op } = require('sequelize');
const path = require('path');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//a function to generate spot images dynamically
function generateSpotImages() {
  const spots = [
    {spotId: 1, images: 5},
    {spotId: 2, images: 5},
    {spotId: 3, images: 5},
    {spotId: 4, images: 5},
    {spotId: 5, images: 5},
    {spotId: 6, images: 5},
    {spotId: 7, images: 5},
    {spotId: 8, images: 5},
    {spotId: 9, images: 5},
    {spotId: 10, images: 5},
    {spotId: 11, images: 5},
    {spotId: 12, images: 5},
    {spotId: 13, images: 5},
    {spotId: 14, images: 5},
    {spotId: 15, images: 5},
    {spotId: 16, images: 5},
    {spotId: 17, images: 5},
    {spotId: 18, images: 5},
    {spotId: 19, images: 5},
    {spotId: 20, images: 5},
    {spotId: 21, images: 5},
  ];

  const basedUrl = 'https://bestbnb-june24.s3.us-west-1.amazonaws.com/bestBnb-seeding-images';
  const spotImages = [];
  spots.forEach(spot => {
    for (let i = 1; i <= spot.images; i++) {
      spotImages.push(
        {
          spotId: spot.spotId,
          url: `${basedUrl}/spot${spot.spotId}-image${i}.png`,
          preview: true,
        },
      )
    }
  });
  return spotImages;
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
    const spotImages = generateSpotImages();
    await SpotImage.bulkCreate(spotImages);
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    // Dynamically determine the spotIds used in the seed file
    const spotIds = Array.from({ length: 20 }, (_, i) => i + 1); // Generate spotIds 1 to 20
    return queryInterface.bulkDelete(options, {
    spotId: { [Op.in]: spotIds }, // Only delete records where spotId is within the range
    });
  }
}

//test, test
