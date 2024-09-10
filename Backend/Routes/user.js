//redirect to controllers 
const express = require('express');
const { body } = require('express-validator');


const { getUser, updateUser } = require('../Controllers/user');
const isAuthenticated = require('../middleware/isAuth');


const router = express.Router();

//get /user/user_id
router.get('/:userId', isAuthenticated, getUser)


//put /user/
router.put('/:userId', [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Please enter a valid name, minimum 3 characters long'),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("enter atleaset 8 character password"),
    body('confirm_password')
        .trim()
        .custom((value, { req }) => {
            if (value != req.body.password) {
                return Promise.reject("Password mismatch")
            }
            return true;
        })
], isAuthenticated, updateUser);

module.exports = router;