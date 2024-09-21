const Result = require('../Models/result');
const Quiz = require('../Models/quiz'); // Import your Quiz model

const getReport = async (req, res, next) => {
  try {
    let reports;
    if (!!req.params.resultId) {
      const resultId = req.params.resultId;
      reports = await Result.findById(resultId).populate('quizId'); // Ensure quizId is populated
      if (reports.userId.toString() !== req.userId) {
        const err = new ProjectErr('You are not authorized!');
        err.statusCode = 405;
        throw err;
      }
    } else {
      reports = await Result.find({ userId: req.userId }).populate('quizId'); // Ensure quizId is populated
    }
    if (!reports) {
      const err = new ProjectErr("The data is not available");
      err.statusCode = 404;
      throw err;
    }
    const returnResponse = { status: "success", message: "Report!", data: { report: reports } };
    res.status(200).send(returnResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = { getReport };
