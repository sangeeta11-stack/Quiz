const ProjectErr = require("../helper/projectErr");
const Result = require("../Models/result");


const getReport = async (req, res, next) => {
    try {
        let report;
        if(!!req.params.resultId){
            const resultId = req.params.resultId;
           report = await Result.findById(resultId);
            if(report.userId.toString() !== req.userId){
                const err = new ProjectErr('You are not authorized!');
                err.statusCode = 405;
                throw err;
            }
        }
        else{
         report = await Result.find({userId:req.userId});
        }
        if (!report) {
            const err = new ProjectErr(" the data is not available");
            err.statusCode = 404;
            throw err;
        }
        
        let returnResponse = { status: "success", message: "Report!", data: {report} };
        res.status(200).send(returnResponse)
       
    } catch (error) {
        next(error)
    }
}

module.exports = { getReport }