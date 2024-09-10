const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ResultSchema = new schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        quizId: {
            type: mongoose.Types.ObjectId,
            required: true,
            
        },
        score: {
            type: String,
            required: true
        },
        total: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;