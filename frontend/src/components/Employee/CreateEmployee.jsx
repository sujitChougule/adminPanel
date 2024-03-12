import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  clearErrors,
  createEmployee,
  getEmployee,
} from "../../action/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { CREATE_EMPLOYEE_RESET } from "../../constants/employeeConstant";
import { toast } from "react-toastify";
const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newemployee);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    designation: "HR",
    gender: "M",
    course: "",
  });
  const [checkboxes, setCheckboxes] = useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });

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
    setFormData({
      ...formData,
      course: listToString(selectedCourses),
    });

    dispatch(createEmployee(formData));
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (error) {
      toast.error("Invalid credentials");
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Employee Created Successfully");
      dispatch({ type: CREATE_EMPLOYEE_RESET });

      dispatch(getEmployee(""));
    }
  }, [dispatch, toast, error, success]);

  return (
    <>
      <div className="">
        <Button type="button" onClick={openModal} className="">
          Add Employee
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="max-w-md mx-auto my-8">
                    <h1 className="text-3xl font-bold mb-2">Create Employee</h1>
                    <p className="mb-6">Add Rmployee detail</p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <div>
                          <label
                            htmlFor="name"
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
                            htmlFor="email"
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
                          <label
                            htmlFor="number"
                            className="block text-sm font-medium mb-1">
                            Number
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="number"
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
                      </div>

                      <Button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                        Add
                      </Button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateEmployee;
