// communicate to the data base 
const express = require('express');

const User = require('../Models/user');
const ProjectErr = require('../helper/projectErr');
const { validationResult } = require('express-validator');


const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Authorization check
        if (req.userId != userId) {
            const err = new ProjectErr('You are not authorized!');
            err.statusCode = 401;
            err.data = { Error: "This is the aurthorisation error" }
            throw err;
        }

        // Find user by ID
        const user = await User.findById(userId, { name: 1, email: 1 });
        if (!user) {
            const err = new ProjectErr('No user found!');
            err.statusCode = 404;
            throw err;
        }

        // Success response
        const returnResponse = {
            status: "success",
            message: "Successfully found user!",
            data: user
        };
        res.send(returnResponse);
    } catch (error) {
        next(error); // Pass the error to the middleware
    }
};

const updateUser = async (req, res, next) => {
    try {
        const validationError =validationResult(req);
        if(!validationError.isEmpty()){
            const err = new ProjectErr('Validation Failed!')
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const userId = req.body._id;
        let ReturnResponse;
        if (req.userId != req.body._id) {
            const err = new ProjectErr('You are not authorized!');
            err.statusCode = 401;
            err.data = { Error: "This is the aurthorisation error" }
            throw err;
        }
        const user = await User.findById(userId, { name: 1, email: 1, password: 1 });
        if (!userId) {
            const err = new ProjectErr('No user exist');
            err.statusCode = 401;
            throw err;
        }
        user.update = req.body.name || req.body.password;
        await user.save();
        ReturnResponse = { status: "success", message: "SuccessFully User updated", data: {} }
        res.send(ReturnResponse)
    } catch (error) {
        next(error);
    }

}



module.exports = { getUser, updateUser };