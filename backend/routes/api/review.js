const express = require('express');
const router = express.Router();
const {Review, Spot, SpotImage, User, ReviewImage } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

//Get all Reviews of the Current User;in branch review
router.get('/current', requireAuth, async(req, res)=> {
    const {user} = req;
    const reviews = await user.getReviews({
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name','price'], include: {model: SpotImage, attributes: ['preview', 'url']}},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    reviews.forEach(review => {
        const targetSpotImage = review.Spot.SpotImages.find(image=> image.preview === true);
        if (targetSpotImage) {
            review.Spot.dataValues.previewImage = targetSpotImage.url;

        } else {
            review.Spot.dataValues.previewImage = null
        }
        delete review.Spot.dataValues.SpotImages;
        
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
        return res.status(403).json({
            "message": "Forbidden"
          });

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
});

//Edit a Review
const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
    check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.put('/:reviewId', requireAuth, validateReview, async(req, res)=> {
    const updatedReview = await Review.findByPk(req.params.reviewId);
    if (!updatedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        });
    }

    if (req.user.id !== updatedReview.userId) {
        return res.status(403).json({
            "message": "Forbidden"
          });
    }

    const {review, stars} = req.body;
    updatedReview.review = review;
    updatedReview.stars = stars;
    //alway forget to save!!!
    await updatedReview.save();

    res.status(200).json(updatedReview);
});

//Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res)=> {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        });
    }

    if (req.user.id !== review.userId) {
        return res.status(403).json({
            "message": "Forbidden"
          });
    }

    await review.destroy();
    res.status(200).json({
        "message": "Successfully deleted"
      });
});






















module.exports = router;