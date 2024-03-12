const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please LogIn to for following resorce", 401));
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  next();
});