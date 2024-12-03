'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');
const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Spot');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '171 Santa Rosa Avenue',
        city: 'Mountain View',
        state: 'CA',
        country: 'United States of America',
        lat: 37.3957831,
        lng: -122.0766539,
        name: 'Luxury Suite',
        description: 'This clean and modern bedroom suite conveniently locates near tech companies, highways, stores, restaurants and San Jose Airport.',
        price: 110.15,
      },
      {
        ownerId: 2,
        address: '3877 El Camino Real',
        city: 'Palo Alto',
        state: 'CA',
        country: 'United States of America',
        lat: 37.4175513,
        lng: -122.1307371,
        name: "Stanford traveler's love Studio",
        description: 'Enjoy a stylish experience at this centrally-located place. Everything inside is new! Queen bed, private backyard with BBQ Grill',
        price: 120.21,
      },
    {
      ownerId: 3,
      address: '11537 Snowpeak Way',
      city: 'Truckee',
      state: 'CA',
      country: 'United States of America',
      lat: 39.3549377,
      lng: -120.2600683,
      name: "Sweet resort ski in/ski out Tahoe Donner",
      description: 'Your home away from home located within the Tahoe Donner Downhill Ski resort gives you an easy access to many outdoor activities and ski in ski out',
      price: 260.87,
    },{
      ownerId: 1,
      address: '11741 127th st',
      city: 'South Ozone Park',
      state: 'NY',
      country: 'United States of America',
      lat: 40.6742532,
      lng: -73.8107530,
      name: 'Six bedrooms for big family trip',
      description: 'This clean and modern single family house is perfect for big family.',
      price: 250.17,
    },{
      ownerId: 1,
      address: '128 Hibiscus Ct',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.5501405,
      lng: -81.3755634,
      name: 'Sweet suite walking distance to downtown Orlando',
      description: '3 bedrooms with 2 bathrooms, near to restaurants and downtown Orlando',
      price: 160.66,
    },{
      ownerId: 1,
      address: '1631 S Weller St Unit A',
      city: 'Seattle',
      state: 'WA',
      country: 'United States of America',
      lat: 47.5971916,
      lng: -122.3102202,
      name: 'Luxury condo with private balcony',
      description: 'This clean condo conveniently locates near a nice park, 5 minutes drive from tech companies.',
      price: 80.22,
    },{
      ownerId: 1,
      address: '2026 S Lane St',
      city: 'Seattle',
      state: 'WA',
      country: 'United States of America',
      lat: 47.5968429,
      lng: -122.3051147,
      name: 'Cheery Seattle House with View',
      description: 'This homey, bright space is the perfect place for 1 to 2 adults and small children.',
      price: 125.99,
    },{
      ownerId: 1,
      address: '7435 86th Ave SE',
      city: 'Mercer Island',
      state: 'WA',
      country: 'United States of America',
      lat: 47.5358798,
      lng: -122.2239001,
      name: 'Stylish single family house with nice backyard',
      description: 'Centrally located near downtown, walking distance to sightseeing, dining, Pike Place Market, the waterfront, ferries',
      price: 110.16,
    },{
      ownerId: 1,
      address: '2326 15th Ave S Unit D',
      city: 'Seattle',
      state: 'WA',
      country: 'United States of America',
      lat: 47.5821405,
      lng: -122.3131468,
      name: 'Sky Cloud Room on the Top of the World',
      description: 'This room has a queen size bed, full closet with chest of drawers and rod for hanging clothes, heater, fan, fridge',
      price: 68.88,
    },{
      ownerId: 2,
      address: '123 Magic Kingdom Drive',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.418611,
      lng: -81.581111,
      name: 'Cool suite near to DisneyLand',
      description: 'The happiest place on Earth',
      price: 250.51,
    },
    {
      ownerId: 2,
      address: '6000 Sandy Boulevard',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.475833,
      lng: -81.466944,
      name: 'Warm condo near to outlets',
      description: 'small and clean, walking distance to Orlando International Premium Outlets',
      price: 180.61,
    },
    {
      ownerId: 2,
      address: '7007 Sea World Drive',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.411944,
      lng: -81.463056,
      name: "SeaWorld Family Fun Condo",
      description: 'Spacious condo perfect for families visiting SeaWorld.',
      price: 188.71,
    },
    {
      ownerId: 2,
      address: '1145 Vista Drive',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.352944,
      lng: -81.535556,
      name: 'Best view to see disney fireworks',
      description: 'good place to stay, very close to disneyland',
      price: 190.81,
    },
    {
      ownerId: 2,
      address: '1180 Seven Seas Drive',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.418611,
      lng: -81.583056,
      name: "Universal Studios Getaway",
      description: 'Stay close to Universal Studios in this stylish getaway. Ideal for thrill-seekers and theme park lovers.',
      price: 375.91,
    },
    {
      ownerId: 2,
      address: '6001 Destination Parkway',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 28.429722,
      lng: -81.4525,
      name: "Disney Adventure Apartment",
      description: "perfect for families visiting Disney World. Comfortable apartment with all amenities and close to parks.",
      price: 166.55,
    }, 
    {
      ownerId: 3,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.6608531,
      lng: -73.9652942,
      name: "Central Park Cozy Apartment",
      description: 'enjoy a stylish experience at this centrally-located place near Central Park. Newly furnished with all modern amenities.',
      price: 170.67,
    },
    {
      ownerId: 3,
      address: '456 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.712777,
      lng: -74.005975,
      name: "Nice Studio near to Broadway Theater District",
      description: 'experience the heart of New York in this charming studio located in the bustling Theater District. Walk to shows and fine dining.',
      price: 210.98
    },
    {
      ownerId: 3,
      address: '789 Fifth Ave',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.712776,
      lng: -74.005974,
      name: "Luxury Fifth Ave house",
      description: 'stay in this luxurious house on Fifth Avenue with stunning city views. Perfect for a high-end getaway.',
      price: 380.38
    },
    {
      ownerId: 3,
      address: '101 Wall St',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.712775,
      lng: -74.005973,
      name: "Wall Street Financial District house",
      description: 'modern loft in the Financial District, ideal for business travelers and tourists alike. Close to major subway lines.',
      price: 195.63
    },
    {
      ownerId: 3,
      address: '202 Lexington Ave',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.712774,
      lng: -74.005972,
      name: "Cozy Midtown Manhattan condo",
      description: 'A cozy retreat in the heart of Midtown Manhattan. Walking distance to Times Square and major attractions.',
      price: 165.26
    },
    {
      ownerId: 3,
      address: '303 Park Ave',
      city: 'New York',
      state: 'NY',
      country: 'The United States',
      lat: 40.712773,
      lng: -74.005971,
      name: "Elegant Park Avenue suite",
      description: 'Elegant residence on Park Avenue with classic New York charm. Perfect for a luxurious stay in the city.',
      price: 235.91,
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, //'Spots')
      {id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}});
}
};
