//redirect to controllers 
const express = require('express');
const { body } = require('express-validator');

const { registerUser, loginUser, isUserExist } = require('../Controllers/auth')

const router = express.Router();

// post / user 

router.post('/', [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Please enter a valid name, minimum 3 characters long'),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom((emailId) => {
            return isUserExist(emailId).then(status => {
                if (status) {
                    return Promise.reject("User already exist")
                }
            }).catch(error => {
                return Promise.reject(error)
            })
        }),
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
], registerUser);

// post / user / Login
router.post('/login', loginUser)

module.exports = router;