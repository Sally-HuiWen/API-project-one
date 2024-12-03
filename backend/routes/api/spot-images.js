const express = require('express');
const multer = require('multer')// for handling file uploads
const router = express.Router();
const { Spot, SpotImage} = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {removeFileFromS3} = require('../../utils/AWS_helper')

//configure multer for handling file uploads
const upload = multer();

//delete spot image and remove from AWS S3 bucket
router.delete('/:imageId', requireAuth, async(req, res, next)=> {
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {model: Spot}
    });
    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.title = "spotImage Not Found";
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== spotImage.Spot.ownerId) {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = "not allow to delete other person's property"
        return next(err);
    }

     // Remove from AWS S3
     try {
        const imageUrl = spotImage.url; // Assuming 'url' is the column for the image's S3 URL
        await removeFileFromS3(imageUrl);
    } catch (error) {
        const err = new Error('Failed to delete image from AWS S3');
        err.status = 500;
        return next(err);
    }
    //remove from database
    await spotImage.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    })

});

module.exports = router;