const express = require('express');
const router = express.Router();
const { Spot, SpotImage} = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const { ValidationError } = require('sequelize');
const { Op } = require('sequelize');

router.delete('/:imageId', requireAuth, async(req, res, next)=> {
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {model: Spot}
    });
    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.title = "SpotImage Not Found";
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== spotImage.Spot.ownerId) {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = "not allow to delete other person's property"
        return next(err);
    }
    
    await spotImage.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    })

});


module.exports = router;