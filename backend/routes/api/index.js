// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const spotsRouter = require('./spot.js');
const reviewsRouter = require("./review.js");
const bookingsRouter = require('./booking.js');
const SpotImagesRouter = require("./spot-images.js")
const { restoreUser } = require("../../utils/auth.js");


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null 
  //my note: phase3
router.use(restoreUser);//check if the user is authorized user!

router.use('/session', sessionRouter);
  
router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', SpotImagesRouter);

//Do not remove it yet. You will be using it much later when setting up your frontend.
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});




module.exports = router;