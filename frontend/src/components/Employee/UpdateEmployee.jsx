import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  clearErrors,
  createEmployee,
  employeeDetails,
  getEmployee,
  updateEmployee,
} from "../../action/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  CREATE_EMPLOYEE_RESET,
  EMPLOYEE_DETAILS_RESET,
  UPDATE_EMPLOYEE_RESET,
} from "../../constants/employeeConstant";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "./createEmployee.scss";
const UpdateEmployee = () => {
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.editemployee);
  const { employee, loading } = useSelector((state) => state.detailsemployee);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    // number: "",
    // designation: "",
    // gender: "M",
    // course: "",
    name: employee.name,
    email: employee.email,
    number: employee.number,
    designation: employee.designation,
    gender: employee.gender,
    course: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });
  const [data, setData] = useState("");
  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  function listToString(list, delimiter = ", ") {
    return list.join(delimiter);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCourses = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    console.log("hello", listToString(selectedCourses));
    setData(listToString(selectedCourses));
    console.log(listToString(selectedCourses));

    //
    console.log("now", data);
    setFormData({
      ...formData,
      course: listToString(selectedCourses),
    });
    console.log(formData);
    dispatch(updateEmployee(formData, id));
    dispatch({
      type: EMPLOYEE_DETAILS_RESET,
    });
  };

  useEffect(() => {
    if (employee && employee._id !== id) {
      dispatch(employeeDetails(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      dispatch({ type: UPDATE_EMPLOYEE_RESET });
      navigate("/employee");
    }
  }, [dispatch, toast, error, isUpdated, error, employeeDetails]);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        number: employee.number,
        designation: employee.designation,
        gender: employee.gender,
        course: listToString(
          Object.keys(checkboxes).filter((key) => checkboxes[key])
        ),
      });
    }
  }, [employee, checkboxes]);

  return (
    <div className="updateEmployee">
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <label
                htmlFor="barcode"
                className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                name="name"
                placeholder="Employee name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="barcode"
                className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                name="email"
                placeholder="example@gamil.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1">
                Course
              </label>

              <input
                name="MCA"
                type="checkbox"
                checked={checkboxes.MCA}
                onChange={handleCheckboxChange}
              />
              <span>MCA</span>
              <input
                name="BCA"
                type="checkbox"
                checked={checkboxes.BCA}
                onChange={handleCheckboxChange}
              />
              <span>BCA</span>
              <input
                name="BSC"
                type="checkbox"
                checked={checkboxes.BSC}
                onChange={handleCheckboxChange}
              />
              <span>BSC</span>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Price"
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Designation:
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="HR">HR</option>
                <option value="Manager">Maneger</option>
                <option value="sales">Sales</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Gender:
              {/* <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select> */}
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleChange}
                />
                Female
              </label>
            </label>

            {/* <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1">
                Course
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="quantity"
                placeholder="electrical"
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
            </div> */}
          </div>

          <Button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
