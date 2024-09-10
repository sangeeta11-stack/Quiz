const mongoose = require('mongoose');
const schema = mongoose.Schema;


// schema
const QuizSchema = new schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        question_list: [{
            question_number:Number,
            question:String,
            options:{}
        }],
        answer: {
        },
        created_by: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        is_published: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Quiz = mongoose.model('quiz', QuizSchema);
// model

module.exports = Quiz;