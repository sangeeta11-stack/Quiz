const express = require('express');

const { StartExam, submitExam } = require('../Controllers/exam');
const isAuthenticated = require('../middleware/isAuth');

const router = express.Router();

router.get('/:quizId',isAuthenticated, StartExam)

router.post('/', isAuthenticated, submitExam)

module.exports = router