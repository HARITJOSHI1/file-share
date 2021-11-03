const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("../functions/handlerFactory");

exports.createUser = factory.post(User);
