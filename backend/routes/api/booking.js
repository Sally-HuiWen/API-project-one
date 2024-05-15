const express = require('express');
const router = express.Router();
const {Booking, Spot, SpotImage, Review, User, ReviewImage, } = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req,res)=> {
    const allCurrBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include:[
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: {model: SpotImage, attributes: ['preview', 'url']}
            },

        ] 
    })

    allCurrBookings.forEach(booking => {
        if (booking.Spot.SpotImages.preview === true) {
            booking.Spot.dataValues.previewImage = booking.Spot.SpotImages.preview.url;
        } else {
            booking.Spot.dataValues.previewImage = null;
        }

        delete booking.Spot.dataValues.SpotImages;
    })
    
 
    res.status(200).json({Bookings: allCurrBookings});
})








module.exports = router;