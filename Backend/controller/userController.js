const User = require("../models/userModel");
const sendtoken = require("../utils/jwtToken.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleware/catchAsynError.js");

// register
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    sendtoken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  // finding email and password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //sending token for login cookie
  sendtoken(user, 200, res);
});

// logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    suucess: true,
    message: "Logged Out",
  });
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
