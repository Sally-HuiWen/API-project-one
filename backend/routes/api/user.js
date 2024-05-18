// backend/routes/api/users.js
const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a valid firstName.'),
  check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a valid lastName.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom(async(value)=> {
      const user = await User.findOne({where: {email: value}});
      if (user) {
        throw new Error('This email already exists!')
      }
      return true;
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .custom(async(value)=> {
      const user = await User.findOne({where: {username: value}});
      if (user) {
        throw new Error('This username already exists!')
      }
      return true;
    }),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up no firstName & lastName
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;//add firstName,lastName after adding columns
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });//add firstName,lastName after adding columns
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;