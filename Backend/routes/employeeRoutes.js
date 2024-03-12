const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
const {
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployee,
  createEmployee,
} = require("../controller/employeeController");
router.route("/employees").get(getAllEmployee);
router.route("/employee/:id").put(updateEmployee).delete(deleteEmployee);
router.route("/employee/:id").get(getEmployee);

router.route("/employee/new").post(createEmployee);

module.exports = router;
