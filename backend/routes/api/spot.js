const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review, User } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
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

//Create a Spot
const validateSpot= [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
    check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be within -180 and 180'),
    check('name')
    .isLength({max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('price')
    .isFloat({ min: 1 })
    .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

router.post('/', requireAuth, validateSpot, async(req,res)=> {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    res.status(201).json(newSpot);

})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req,res,next)=> {
    const spot = await Spot.findByPk(req.params.spotId);
    //if this spot does not exist, create error, statusCode 404
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot Not Found";
        err.status = 404;
        return next(err);
    };

    //if the user does not own this spot, create a error, statusCode 403

    if (spot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.title = "not match";
        err.status = 403;
        return next(err);

    }
    
    const {url, preview} = req.body;
    const newImageForSpot = await spot.createSpotImage({
        url,
        preview
    });
    const payload = {
        id: newImageForSpot.id,
        url,
        preview
    }

    res.status(200).json(payload);
})

module.exports = router;