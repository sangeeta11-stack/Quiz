const express = require('express');
const mongoose = require('mongoose');

const UserRouter = require('./Routes/user');
const authRouter = require('./Routes/auth');
const err = require('./helper/projectErr');
const quizRouter = require('./Routes/quiz');
const examRouter = require('./Routes/exam');
const reportRouter = require('./Routes/report')

require('dotenv').config();

const app = express()

// userRoutes

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "";


app.use(express.json());

///user to userRoutes
app.use('/user', UserRouter);

//redirect authorize
app.use('/auth', authRouter);

// redirect quiz
app.use('/quiz', quizRouter);

// redirect exam
app.use('/exam', examRouter);

// redirect report
app.use('/report', reportRouter);

app.get('/', (req, res) => {
    res.send("this is my home page ");
})

// express error route

app.use((err, req, res, next) => {
    let message;
    let statusCode;
    let data = err.data || {};

    if (err.statusCode && err.statusCode < 500) {
        message = err.message;
        statusCode = err.statusCode;
    } else {
        // message = "Something went wrong, please try again later!";
        message = err.message;
        statusCode = 500;
    }

    let returnResponse = {
        status: "error",
        message: message,
        data: data
    };
    console.error(statusCode, message);
    res.status(statusCode).send(returnResponse);
});

// connected Database

mongoose.connect(MONGO_URI).then(() => {
    console.log("data base is connected successfully ");
    app.listen(PORT, () => {
        console.log("your server is start", PORT);
    })
}).catch((error) => {
    console.log("Database is not connected", error);
})
