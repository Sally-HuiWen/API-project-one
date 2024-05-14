const express = require('express');
const router = express.Router();
const {Review, Spot, User, ReviewImage } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

//Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res)=> {
    const {user} = req;
    const reviews = await user.getReviews({
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name','price']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    reviews.forEach(review => {
        review.Spot.dataValues.previewImage = review.ReviewImages[0].url;
    })

    res.status(200).json({Reviews: reviews});

    
})























module.exports = router;