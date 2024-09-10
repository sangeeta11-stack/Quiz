const jwt = require('jsonwebtoken');

require('dotenv').config();

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const err = new Error("Not Authenticated");
            throw err;
        }

        const SECRET_KEY = process.env.SECRET_KEY;

        const token = authHeader.split(' ')[1];
        let decodedToken = {
            userId: String,
            iat: Number,
            exp: Number
        }
        try {
            decodedToken = jwt.verify(token, SECRET_KEY);

        } catch (error) {
            next(error);
        }
        if (!decodedToken) {
            throw new Error('user  is not authenticated');
        }


        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = isAuthenticated