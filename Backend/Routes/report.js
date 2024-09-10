const express = require('express');

const { getReport } = require('../Controllers/report');
const isAuthenticated = require('../middleware/isAuth');


const router = express.Router();

// get / resultId
router.get('/:resultId?', isAuthenticated, getReport )

module.exports = router