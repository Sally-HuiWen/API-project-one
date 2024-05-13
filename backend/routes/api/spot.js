const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review } = require('../../db/models')

//get all spots
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
}
)


module.exports = router;