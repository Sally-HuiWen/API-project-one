const express = require('express');
const router = express.Router();
const {Review, Spot, User, ReviewImage } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

//Get all Reviews of the Current User;in branch review
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
});

// Add an Image to a Review based on the Review's id; starting branch review-two

router.post('/:reviewId/images', requireAuth, async(req, res, next)=> {
    const review = await Review.findByPk(req.params.reviewId);
    //Error response: Couldn't find a Review with the specified id
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
          });
    }

    //check if req.user.id match review.userId
    if (req.user.id !== review.userId) {
        const err = new Error("The user did not leave this review!");
        err.title = "user review not match";
        err.status = 403;
        return next(err);

    }
    //Error response: Cannot add any more images because there is a maximum of 10 images per resource
    const images = await review.getReviewImages();
    if (images.length > 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = "too many images";
        err.status = 404;
        return next(err);
    }

    const {url} = req.body;
    const newImage = await review.createReviewImage({url});
    const payload = {
        id: newImage.id,
        url: newImage.url
    }
    res.status(201).json(payload);


})























module.exports = router;