const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator')

require('dotenv').config();

const User = require('../Models/user');
const ProjectErr = require('../helper/projectErr');

const SECRET_KEY = process.env.SECRET_KEY

const registerUser = async (req, res, next) => {

    try {

        // validation 
        const validationError =validationResult(req);
        if(!validationError.isEmpty()){
            const err = new ProjectErr('Validation Failed!')
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = await bcrypt.hash(req.body.password, 12);

        const user = new User({ email, name, password })

        const result = await user.save();
        let ReturnResponse;

        if (!result) {
            const err = new ProjectErr("No result found");
            err.statusCode = 404;
            err.data = { Error: "Email is not available " }
            throw err;
        }
        else {
            ReturnResponse = { status: "success", message: "Registration Done!", data: { userId: result._id } }
            res.send(ReturnResponse)
        }
    } catch (error) {
        next(error)
    }

}

const loginUser = async (req, res, next) => {
    let ReturnResponse;
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });
        if (!user) {
            const err = new ProjectErr("User emailId is not available please try again");
            err.statusCode = 401;
            err.data = { Error: "Email is not available " }
            throw err;
        }
        const status = await bcrypt.compare(password, user.password);
        if (!status) {
            const err = new ProjectErr("Email and password is not match, please try again");
            err.statusCode = 401;
            err.data = { Error: "Email is not available " }
            throw err;
        }
        else {
            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '5h' });
            
            ReturnResponse = { status: "success", message: "Successfully Login", data: { token:token , userId: user._id} }
            res.send(ReturnResponse)
        }
    } catch (error) {
        next(error)
    }

}

const isUserExist = async(email)=>{ 
    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }
    return true;
}

module.exports = { registerUser, loginUser, isUserExist };