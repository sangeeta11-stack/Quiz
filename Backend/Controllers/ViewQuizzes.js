const Quiz = require("../Models/quiz")
const ProjectErr = require("../helper/projectErr");

const getAllQuizzes = async (req, res, next) => {
    try {
        const quiz = await Quiz.find({}, { name: 1, question_list: 1, answer: 1, created_by: 1 });

        if (!quiz) {
            const err = new ProjectErr("Quiz not Found");
            err.statusCode = 404;
            throw err;
        }
        let returnResponse = { status: "success", message: "Quiz created successfully", data: { quiz } };
        res.status(201).send(returnResponse)
    } catch (error) {
        next(error)
    }

}

module.exports = { getAllQuizzes }