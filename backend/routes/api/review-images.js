const express = require('express');
const router = express.Router();
const { Review, ReviewImage} = require('../../db/models')
const { requireAuth } = require ('../../utils/auth');

router.delete('/:imageId', requireAuth, async(req, res, next)=> {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {model: Review}
    });
    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.title = "reviewImage Not Found";
        err.status = 404;
        return next(err);
    }

    if (req.user.id !== reviewImage.Review.userId) {
        const err = new Error('Forbidden');
        err.status = 403;
        err.title = "not allow to delete other person's reviewImage"
        return next(err);
    }
    
    await reviewImage.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    })
});

module.exports = router;