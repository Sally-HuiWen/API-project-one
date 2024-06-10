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
        url: 'https://a0.muscache.com/im/pictures/49581486/a34a1304_original.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/49580606/74bb5809_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/49579779/15d7cf69_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/49575481/13a1b66e_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/49579588/8d61437c_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-561747388464695054/original/95850e08-cb43-41bc-94d7-04376e11502d.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-561747388464695054/original/4a833a84-3aad-426a-8059-6ed6c2baa7aa.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-561747388464695054/original/80e43a11-7637-4fcb-ad36-48c370e5326e.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-561747388464695054/original/8fb63989-1158-47f8-88cf-eaf60411f7a5.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-561747388464695054/original/1df38efa-5cc2-4e03-a636-ca8d8d96de05.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52903037/original/668d7abe-8b6f-4c27-a377-5d5476e7df86.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52903037/original/3dd9abda-9ac6-4f82-9875-3f41e43d0b71.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52903037/original/f8e58912-d69e-4617-ad69-06c0abd13a8c.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52903037/original/1d8be653-f650-41e5-bd3f-87ebb65aee5c.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52903037/original/1d8be653-f650-41e5-bd3f-87ebb65aee5c.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48380860/original/019d9473-db99-44cd-b174-4820511dd9cb.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48380860/original/e73f233c-efa1-4664-9078-706020462043.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48380860/original/894407e1-c8b2-45ce-bd6b-0af01bf7e5ff.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48380860/original/3e54611c-2f88-4d55-a8c5-1b5866344fae.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48380860/original/77e06920-c842-4110-98d1-87dbb412eb4d.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54403829/original/7590d493-17e3-48ac-9c8b-eb0370f8cdb6.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54403829/original/fd206b46-ce7f-4ad4-9b3c-6fc6c7ee3ef9.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54403829/original/91a65317-22df-4bde-bbf5-11dac0278295.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54403829/original/fe55217f-be8c-4d0a-a98a-20bdd5751b67.png?im_w=720',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54403829/original/4b5cdde5-e2cf-4920-831d-bc8223eb3260.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13244880/original/8bd8c67a-ce32-4d3a-ab5e-d4732cde8abf.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13244880/original/8064197c-f68d-48e3-9841-e736dacb2e56.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13244880/original/fd070383-0618-4f17-ba88-5c3c37288742.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13244880/original/9436827e-ffc9-497d-bd72-7950565d5e90.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13244880/original/dccf24a4-e0ba-4ad1-a6b2-f95bed30435e.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/55a19626-bcc4-40d5-8188-a14bc3b18c3b.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/fc7e14e9-f563-495e-94f9-b59b5217c579.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/3b6dd192-72f0-46a4-847b-0384859fc86b.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42950632/original/9fb3773d-6df3-489d-82e2-115dc6ebc78d.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42950632/original/6402bb28-ee78-449d-9cb3-e4e3a3798b00.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1161157646423930419/original/d8a98dd4-c23f-4b3e-8882-19efd7f2f1ca.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1161157646423930419/original/12876fdf-4195-4824-b6d6-98f035c62a96.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1161157646423930419/original/021886f5-91a3-468c-ab80-5636042bd7a2.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1161157646423930419/original/e41259b3-4f8f-44a2-aaf2-55416202a830.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1161157646423930419/original/93d2ce63-86bc-49ea-9578-a9415b011d58.png?im_w=1200',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1050069377302933177/original/826eee24-3997-4cdc-b352-44128dd0c61d.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1050069377302933177/original/f1b1ad49-2660-4f23-91ce-76dbf8bf349f.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1050069377302933177/original/a67d1017-9181-4f08-a53c-1d9158f59fb5.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1050069377302933177/original/7255696f-f117-4924-b699-d17181928c24.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1050069377302933177/original/35454ffa-6de7-4f14-9474-7d59913f2b36.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-739909282892497172/original/a264c958-efa9-440c-8449-128d9e3e3890.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53374152/original/744833fb-d539-4a6e-b5e1-5fa49a3997dd.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53374152/original/7679b10a-0e39-4ecf-b92f-2bed1c2c171b.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53374152/original/a5aa2157-9709-4b1c-883d-28873bae0588.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53374152/original/ae502bc2-42ef-4b7b-8bba-857cb5b3b617.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52749216/original/f4796358-fec4-417f-bb7c-0728f065bc6b.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52749216/original/5234aa94-819c-4646-bdbb-b98d361f55e6.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52749216/original/b872881e-2f20-4bac-a25b-cf7d8c8cb0ae.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52749216/original/f39d0c70-082e-4daf-ba27-122a1975ffb4.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52749216/original/22dfb18e-aa83-4c4d-b38e-ba33307ac3bf.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/1226efd5-dcd4-4777-8868-d7cf483e476e.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/d35e8faf-e5f3-412f-bd78-f02ab96e8d58.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/a62c6b90-28ab-406e-a2f3-07c56352f6bf.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/c3a4e525-a82e-41ac-bafa-e57bbcf2d8b7.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/7b95d7b2-5412-4225-a3b1-59c266eaa59f.jpg?im_w=720',
        preview: true,
      },{
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1117406325382308439/original/be0bc96c-ca41-4b9c-a72d-2e7d675b5461.png?im_w=720',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1117406325382308439/original/4b97ee6b-abd6-4d5c-8fe0-e495a6f069fa.png?im_w=1200',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1117406325382308439/original/06a8d0c9-5052-4a14-a3a1-e61382cf3f1b.png?im_w=1200',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1117406325382308439/original/fc2723d9-2961-402d-9161-d6eeb63b8d9e.png?im_w=720',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1117406325382308439/original/0f7d790a-e8c6-4b6c-a663-44e41aab9df3.png?im_w=720',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582137289665171294/original/05635af0-4248-4052-8f65-1f15f0357ad3.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582137289665171294/original/9cd5253a-e5bc-40f3-a5cf-5d90639f4fd4.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582137289665171294/original/25e60c4c-e92b-432b-a9e6-d0b8fd3e8a15.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582137289665171294/original/22e568e4-2cfb-4cdb-a67c-dfce7792a27e.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582137289665171294/original/76a31707-7a33-494f-9399-4b49d8be9be2.jpeg?im_w=720',
        preview: true,
      },{
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1131184574459872895/original/89224cf3-fdfc-4e04-a716-a79591fad767.png?im_w=1200',
        preview: true,
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1131184574459872895/original/38a34a37-4186-4348-ab00-a341de05a2d8.png?im_w=720',
        preview: true,
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1131184574459872895/original/bc7fe0a0-e07e-4ec7-b021-e05af6b1792c.png?im_w=720',
        preview: true,
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1131184574459872895/original/1ed10845-0ce2-4ad2-8a38-33519323adb0.png?im_w=720',
        preview: true,
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1131184574459872895/original/031be0be-61da-4970-8964-67557925e488.png?im_w=720',
        preview: true,
      },{
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45651180/original/58124551-76f1-4354-a617-c7e402ee11fe.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45651180/original/764f451b-03da-42d8-ad3c-13153d83e03e.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45651180/original/336fd85d-408e-4873-a704-b44a090fa10c.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45651180/original/5ec10b03-90ad-4b26-8476-6348586790cd.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/441599d1-1fe3-4a59-b0c5-53cf19359321.jpg?im_w=720',
        preview: true,
      },{
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-995532515328234103/original/ab98f212-3d0d-4df7-9eb8-6b0a891cec4c.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-995532515328234103/original/28ec19c7-3f29-4ad8-b1f6-2ff99d987d01.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-995532515328234103/original/2d8fc961-8f26-4581-892e-03c9a2c40b75.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-995532515328234103/original/b20e9c3e-dfe8-41b6-8caf-ef59d83009e7.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/cb004532-e59d-4964-b43d-b99635691cf3.jpg?im_w=1200',
        preview: true,
      },{
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/15856989/9361e549_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/15857647/6e327584_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/15857304/8308f070_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/16202042/b8ce5e46_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/16202030/5f3fdf30_original.jpg?im_w=720',
        preview: true,
      },{
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/5fd5a70e-f37f-47ef-b3a2-52f65e8da2de.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/bfe0564d-0dfd-4e11-9fc0-e7b0b39bea6f.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/9e1d11e2-f64d-477c-9e7c-ceac8b4880e3.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/e6be4242-0164-465e-836f-07e794f1e5bb.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/b5f4bdad-26b5-459e-850a-49ce5f445323.jpg?im_w=720',
        preview: true,
      },{
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1116131269569866917/original/2d1ecec3-8d6d-4467-ac31-c45e3d57be61.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/128f1e5c-0288-42ce-8ee3-bcbfa2dd9554.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/45bcfdbc-9a14-451e-8932-261aecbe40be.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/15d6577c-6808-459c-8a5c-398850b9a497.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/9cd83f9b-e42e-44b0-8307-b53869bf6bb2.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-831785990822685820/original/65185ff5-75e5-4d94-ba74-08970ac75a19.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-831785990822685820/original/0e5a0d63-d1ed-43f6-857e-9419bad9733b.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-831785990822685820/original/e6b75a55-2c28-407d-a5c3-6f38e0013774.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-831785990822685820/original/0732f97b-f8af-47de-90bf-f3b10202f9ed.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 21,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-831785990822685820/original/5f84099b-5a1e-4de9-a0b2-ff3f46044d9d.jpg?im_w=1200',
        preview: true,
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
    return queryInterface.bulkDelete(options, 'SpotImages')
      // {id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42]}});
    }
}
