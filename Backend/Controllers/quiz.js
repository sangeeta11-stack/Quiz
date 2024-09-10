const { validationResult } = require('express-validator');


const ProjectErr = require("../helper/projectErr");
const Quiz = require("../Models/quiz")


const createQuiz = async (req, res, next) => {
    try {
        const validationError =validationResult(req);
        if(!validationError.isEmpty()){
            const err = new ProjectErr('Validation Failed!')
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const created_by = req.userId;
        console.log(req.body);
        const name = req.body.name;
        const question_list = req.body.question_list;
        const answer = req.body.answer;

        const quiz = new Quiz({ name, question_list, answer, created_by })

        const result = await quiz.save();
        let returnResponse = { status: "success", message: "Quiz created successfully", data: { quizId: result._id } };

        res.status(201).send(returnResponse)
    } catch (error) {
        next(error)
    }
}

const getQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId, { name: 1, question_list: 1, answer: 1, created_by: 1 });
        if (!quiz) {
            const err = new ProjectErr("Quiz not Found");
            err.statusCode = 404;
            throw err;
        }

        if (req.userId !== quiz.created_by.toString()){
            const err = new ProjectErr("you are not authorized");
            err.statusCode = 403;
            throw err;
        }

        let returnResponse = { status: "success", message: "Quiz created successfully", data: { quiz } };
        res.status(201).send(returnResponse)
    } catch (error) {
        next(error)
    }
}

const updateQuiz = async (req, res, next) => {
    try {
        const quizId = req.body._id;
        const validationError =validationResult(req);
        if(!validationError.isEmpty()){
            const err = new ProjectErr('Validation Failed!')
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            const err = new ProjectErr("Quiz not Found");
            err.statusCode = 404;
            throw err;
        }
        if (req.userId !== quiz.created_by.toString()){
            const err = new ProjectErr("you are not authorized");
            err.statusCode = 403;
            throw err;
        }
        if(quiz.is_published){
            const err = new ProjectErr("You cannot update published quiz");
            err.statusCode = 405;
            throw err;
        }
        
        quiz.name = req.body.name;
        quiz.question_list = req.body.question_list,
            quiz.answer = req.body.answer;
        await quiz.save();
        let returnResponse = { status: "success", message: "Quiz updated successfully", data: {} };
        res.status(201).send(returnResponse)
    } catch (error) {
        next(error)
    }

}

const deleteQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId); 
        if (!quiz) {
            const err = new ProjectErr("Quiz not Found");
            err.statusCode = 404;
            throw err;
        }
        if (req.userId !== quiz.created_by.toString()){
            const err = new ProjectErr("you are not authorized");
            err.statusCode = 403;
            throw err;
        }
        if(quiz.is_published){
            const err = new ProjectErr("You cannot delete published quiz");
            err.statusCode = 405;
            throw err;
        }
        await Quiz.deleteOne(quiz)
        let returnResponse = { status: "success", message: "Quiz deleted successfully", data: {} };
        res.status(201).send(returnResponse);
    } catch (error) {
        next(error)
    }

}

const publishQuiz = async (req, res, next) => {
    try {
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId)
        if (!quiz) {
            const err = new ProjectErr("Quiz not Found");
            err.statusCode = 404;
            throw err;
        }

        if (req.userId !== quiz.created_by.toString()){
            const err = new ProjectErr("you are not authorized");
            err.statusCode = 403;
            throw err;
        }

        quiz.is_published= true;
        await quiz.save();

        let returnResponse = { status: "success", message: "Quiz Published", data: {quiz} };
        res.status(201).send(returnResponse);

    } catch (error) {
        next(error)
    }

}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz }