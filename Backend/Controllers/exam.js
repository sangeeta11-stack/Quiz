const ProjectErr = require("../helper/projectErr");
const Quiz = require("../Models/quiz");
const Result = require("../Models/result");

const StartExam = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId, { name: 1, question_list: 1, is_published: 1 })
        if (!quiz) {
            const err = new ProjectErr("Quiz not found")
            err.statusCode = 404;
            throw err;
        }
        if (!quiz.is_published) {
            const err = new ProjectErr("Quiz is not published")
            err.statusCode = 405;
            throw err;
        }
        let returnResponse = { status: "success", message: "Quiz!", data: {quiz} };
        res.status(200).send(returnResponse)
    } catch (error) {
        next(error)
    }
}

const submitExam = async (req, res, next) => {
    try {
        const quizId = req.body.quizId;
        const attempted_questions = req.body.attempted_questions
        const quiz = await Quiz.findById(quizId, { answer: 1 })
        const answer = quiz.answer

        const userId = req.userId;
        const AllQuestions = Object.keys(answer);
        const total = AllQuestions.length;

        let score = 0;

        for (let i = 0; i < total; i++) {
            let question_number = AllQuestions[i];
            if (attempted_questions[question_number] && answer[question_number] == attempted_questions[question_number]) {
                score = score + 1;
            }
        }

        // result
        const result = new Result({ userId, quizId, score, total });
        const data = await result.save();

        let returnResponse = { status: "success", message: "Submitted!", data: { total, score, resultId:data._id } };
        res.status(200).send(returnResponse)
    } catch (error) {
        next(error)
    }
}

module.exports = { StartExam, submitExam }