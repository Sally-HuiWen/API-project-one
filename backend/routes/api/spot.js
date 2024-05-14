const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review, User } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');

//Get all Spots
router.get('/', async(req,res)=> {

    const allSpots = await Spot.findAll({
        include: 
        [
            {model: Review, attributes: ['stars']},
            {model: SpotImage, attributes: ['url','preview']},
        ]
    });

    //add avgRating and previewImage to allSpots;delete two other stuff.
    for (let spot of allSpots) {

        //find AvgRating for each spot, add it to each spot
        const ratingArr = [];
        for (let review of spot.Reviews) {
            ratingArr.push(review.stars);
        }

        const totalRating = ratingArr.reduce((acc,curr)=>acc+curr);
        const reviewNum = spot.Reviews.length;
        result = totalRating/reviewNum;

         //find previewImage for each spot and add it to each spot
        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });

        if (image) {
            previewUrl = image.url
        } else {
            previewUrl = null;
        }
        //Modification in place: Modified spot.dataValues directly to avoid modifying the original Sequelize model instance.
        spot.dataValues.avgRating = result;
        spot.dataValues.previewImage = previewUrl;

        delete spot.dataValues.Reviews;
        delete spot.dataValues.SpotImages; 
        
    }

    return res.status(200).json({Spots: allSpots});
});


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req,res)=> {
    const currentUserOwnerId = req.user.id;
    const currentUserSpots = await Spot.findAll({
        where: { ownerId: currentUserOwnerId},
        include: 
        [
            {model: Review, attributes: ['stars']},
            {model: SpotImage, attributes: ['url', 'preview']},
        
        ]

    })

    //add avgRating and previewImage to allSpots;delete two other stuff.
    for (let spot of currentUserSpots) {

        //find AvgRating for each spot, add it to each spot
        const ratingArr = [];
        for (let review of spot.Reviews) {
            ratingArr.push(review.stars);
        }

        const totalRating = ratingArr.reduce((acc,curr)=>acc+curr);
        const reviewNum = spot.Reviews.length;
        result = totalRating/reviewNum;

         //find previewImage for each spot and add it to each spot
        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });

        if (image) {
            previewUrl = image.url
        } else {
            previewUrl = null;
        }
        //Modification in place: Modified spot.dataValues directly to avoid modifying the original Sequelize model instance.
        spot.dataValues.avgRating = result;
        spot.dataValues.previewImage = previewUrl;

        delete spot.dataValues.Reviews;
        delete spot.dataValues.SpotImages; 
        
    }

    if (currentUserSpots.length >=1) res.status(200).json({spots: currentUserSpots});
    else res.json({ message: 'You do not have any spots posted yet!'})


});


//Get details of a Spot from an id
router.get('/:spotId', async(req,res)=> {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: Review},
            {model: SpotImage, attributes: ['id', 'url', 'preview']},
            {model: User, attributes: ['id', 'firstName', 'lastName']}
        ]
    });
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
          });
    }
    const {id, ownerId, address, city, state, lat, lng, name, description, price, createdAt, updatedAt, SpotImages } = spot;
    const spotRatingArr = spot.Reviews.map(review => review.stars)
    const num = spot.Reviews.length
    const spotAvgRating = (spotRatingArr.reduce((acc,curr) => acc + curr))/num
    
    const payload = {
        id,
        ownerId,
        address,
        city,
        state,
        lat,
        lng,
        name,
        description,
        price,
        createdAt,
        updatedAt,
        numReviews: num,
        avgStarRating: spotAvgRating,
        SpotImages,
        Owner: spot.User,

    }

    res.status(200).json(payload);

})



module.exports = router;