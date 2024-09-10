const express = require('express')
const { body } = require('express-validator');


const router = express.Router();

const { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz } = require('../Controllers/quiz')
const isAuthenticated = require('../middleware/isAuth');


// post // 
router.post('/', isAuthenticated, [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage('Please enter a valid name, minimum 10 characters long'),
    body('question_list')
        .custom(question_list => {
            if (question_list.length == 0) {
                return Promise.reject("Enter atleast 1 question")
            }
            return true;
        }),
    body('answer')
        .custom(answer => {
            if (Object.keys(answer).length == 0) {
                return Promise.reject("provide answers with questions")
            }
            return true;
        }),

], createQuiz);

// get / quizId
router.get('/:quizId', isAuthenticated, getQuiz)

// put 
router.put('/', isAuthenticated, updateQuiz)

// delete// quizId 
router.delete('/:quizId', isAuthenticated, deleteQuiz)

//Publish // patch
router.patch('/publish', isAuthenticated, publishQuiz)
module.exports = router