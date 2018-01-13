/*Purpose of the file is to contain functions responsible for
router that are responsible for the user authentication and user creation*/

var user_db = require('../db/user_management_auth');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
