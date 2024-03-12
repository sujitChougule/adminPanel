const Employee = require("../models/employeeModel");

const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");
const catchAsyncError = require("../middleware/catchAsynError");
// get all Employee
exports.getAllEmployee = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const itemCount = await Employee.countDocuments();

  const apiFeatures = new ApiFeatures(Employee.find(), req.query).search();
  // .pagination(resultPerPage);
  const employee = await apiFeatures.query;

  res.status(200).json({
    success: true,
    employee,
    itemCount,
    resultPerPage,
  });
});
// get single product

exports.getEmployee = catchAsyncError(async (req, res, next) => {
  const item = await Employee.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  res.status(200).json({
    success: true,
    item,
  });
});
// create employee

exports.createEmployee = catchAsyncError(async (req, res, next) => {
  const { name, email, number, designation, gender, course } = req.body;
  const item = await Employee.create({
    name,
    email,
    number,
    designation,
    gender,
    course,
  });
  res.status(201).json({
    success: true,
    item,
  });
});

// update product

exports.updateEmployee = catchAsyncError(async (req, res, next) => {
  let product = await Employee.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Item not Available", 404));
  }
  product = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product

exports.deleteEmployee = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler("Item not found", 404));
  }

  await employee.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});
