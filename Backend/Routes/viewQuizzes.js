const express = require('express');

const isAuthenticated = require('../middleware/isAuth');
const { getAllQuizzes } = require('../Controllers/viewQuizzes');


const router = express.Router();

// get / resultId
router.get('/', isAuthenticated, getAllQuizzes)

module.exports = router